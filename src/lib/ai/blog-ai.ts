import { z } from "zod";
import { groqComplete, groqCompleteJson } from "@/lib/ai/groq";
import {
  ideasSystemPrompt,
  ideasUserPrompt,
  outlineSystemPrompt,
  outlineUserPrompt,
  draftSystemPrompt,
  draftUserPrompt,
  titlesSystemPrompt,
  excerptSystemPrompt,
  summarySystemPrompt,
} from "@/lib/ai/prompts/blog";
import {
  improveWritingSystemPrompt,
  rewriteSystemPrompt,
  expandSystemPrompt,
  shortenSystemPrompt,
} from "@/lib/ai/prompts/rewrite";
import { seoMetadataSystemPrompt, seoMetadataUserPrompt, internalLinkSystemPrompt, internalLinkUserPrompt } from "@/lib/ai/prompts/seo";

// --- Input limits — protect against oversized prompts, never silently truncate meaningful content ---
export const MAX_SELECTION_CHARS = 6000;
export const MAX_ARTICLE_CHARS = 12000;
export const MAX_INSTRUCTION_CHARS = 1000;

export class InputTooLargeError extends Error {}

function assertWithinLimit(value: string, max: number, label: string) {
  if (value.length > max) {
    throw new InputTooLargeError(`${label} is too long for the AI assistant (${value.length}/${max} characters). Try a shorter selection.`);
  }
}

// --- Schemas for structured (JSON-mode) responses — every AI JSON response is validated before use ---
const ideasSchema = z.object({
  ideas: z
    .array(z.object({ title: z.string(), description: z.string(), angle: z.string() }))
    .min(1)
    .max(10),
});

const outlineSchema = z.object({
  introduction: z.string(),
  sections: z.array(z.object({ heading: z.string(), subheadings: z.array(z.string()).default([]) })),
  conclusion: z.string(),
  cta: z.string(),
});

const titlesSchema = z.object({ titles: z.array(z.string()).min(1).max(10) });
const excerptSchema = z.object({ excerpt: z.string() });
const summarySchema = z.object({ summary: z.string(), keyPoints: z.array(z.string()) });

const seoMetadataSchema = z.object({
  seoTitle: z.string(),
  metaDescription: z.string(),
  focusKeyword: z.string(),
  secondaryKeywords: z.array(z.string()),
  slug: z.string(),
});

const internalLinkSchema = z.object({
  suggestions: z.array(z.object({ slug: z.string(), title: z.string(), reason: z.string() })),
});

// --- Ideas ---
export async function generateIdeas(input: { topic: string; audience?: string; keywords?: string; contentType?: string }) {
  assertWithinLimit(input.topic, 300, "Topic");
  const raw = await groqCompleteJson({ system: ideasSystemPrompt(), prompt: ideasUserPrompt(input) });
  const parsed = ideasSchema.safeParse(raw);
  if (!parsed.success) throw new Error("AI returned an unexpected format for ideas.");
  return parsed.data.ideas;
}

// --- Outline ---
export async function generateOutline(input: { title: string; description?: string }) {
  assertWithinLimit(input.title, 300, "Title");
  const raw = await groqCompleteJson({ system: outlineSystemPrompt(), prompt: outlineUserPrompt(input) });
  const parsed = outlineSchema.safeParse(raw);
  if (!parsed.success) throw new Error("AI returned an unexpected format for the outline.");
  return parsed.data;
}

/** Renders a generated outline as markdown so it can be dropped straight
 * into the content editor or shown in the preview panel identically. */
export function outlineToMarkdown(outline: z.infer<typeof outlineSchema>): string {
  const sections = outline.sections
    .map((s) => {
      const subheadings = s.subheadings.map((sh) => `### ${sh}`).join("\n\n");
      return `## ${s.heading}${subheadings ? `\n\n${subheadings}` : ""}`;
    })
    .join("\n\n");
  return [outline.introduction, sections, `## Conclusion\n\n${outline.conclusion}`, `**Suggested CTA:** ${outline.cta}`]
    .filter(Boolean)
    .join("\n\n");
}

// --- Draft ---
export async function generateDraft(input: {
  title: string;
  outline?: string;
  focusKeyword?: string;
  audience?: string;
  tone?: string;
  instructions?: string;
}) {
  assertWithinLimit(input.title, 300, "Title");
  if (input.outline) assertWithinLimit(input.outline, MAX_ARTICLE_CHARS, "Outline");
  if (input.instructions) assertWithinLimit(input.instructions, MAX_INSTRUCTION_CHARS, "Instructions");

  return groqComplete({ system: draftSystemPrompt(), prompt: draftUserPrompt(input), maxTokens: 3000 });
}

// --- Improve / Rewrite / Expand / Shorten (selection-based) ---
export async function improveWriting(selection: string) {
  assertWithinLimit(selection, MAX_SELECTION_CHARS, "Selected text");
  return groqComplete({ system: improveWritingSystemPrompt(), prompt: selection, temperature: 0.4 });
}

const REWRITE_STYLES = ["professional", "technical", "simple", "concise", "conversational", "educational"] as const;
export type RewriteStyle = (typeof REWRITE_STYLES)[number];

export async function rewriteText(selection: string, style: RewriteStyle) {
  assertWithinLimit(selection, MAX_SELECTION_CHARS, "Selected text");
  return groqComplete({ system: rewriteSystemPrompt(style), prompt: selection, temperature: 0.6 });
}

export async function expandText(selection: string) {
  assertWithinLimit(selection, MAX_SELECTION_CHARS, "Selected text");
  return groqComplete({ system: expandSystemPrompt(), prompt: selection, temperature: 0.6 });
}

export async function shortenText(selection: string) {
  assertWithinLimit(selection, MAX_SELECTION_CHARS, "Selected text");
  return groqComplete({ system: shortenSystemPrompt(), prompt: selection, temperature: 0.4 });
}

export async function summarizeText(selection: string) {
  assertWithinLimit(selection, MAX_ARTICLE_CHARS, "Content");
  const raw = await groqCompleteJson({ system: summarySystemPrompt(), prompt: selection });
  const parsed = summarySchema.safeParse(raw);
  if (!parsed.success) throw new Error("AI returned an unexpected format for the summary.");
  return parsed.data;
}

// --- Titles / Excerpt ---
export async function generateTitles(articleContext: string) {
  assertWithinLimit(articleContext, MAX_ARTICLE_CHARS, "Content");
  const raw = await groqCompleteJson({ system: titlesSystemPrompt(), prompt: articleContext });
  const parsed = titlesSchema.safeParse(raw);
  if (!parsed.success) throw new Error("AI returned an unexpected format for titles.");
  return parsed.data.titles;
}

export async function generateExcerpt(articleContext: string) {
  assertWithinLimit(articleContext, MAX_ARTICLE_CHARS, "Content");
  const raw = await groqCompleteJson({ system: excerptSystemPrompt(), prompt: articleContext });
  const parsed = excerptSchema.safeParse(raw);
  if (!parsed.success) throw new Error("AI returned an unexpected format for the excerpt.");
  return parsed.data.excerpt;
}

// --- SEO metadata ---
const MAX_CONTENT_CHARS_FOR_SEO = 6000; // SEO analysis doesn't need the full article — first ~6000 chars is plenty of signal

export async function generateSeoMetadata(input: { title: string; excerpt: string; content: string; category: string }) {
  const truncatedContent = input.content.slice(0, MAX_CONTENT_CHARS_FOR_SEO);
  const raw = await groqCompleteJson({
    system: seoMetadataSystemPrompt(),
    prompt: seoMetadataUserPrompt({ ...input, content: truncatedContent }),
  });
  const parsed = seoMetadataSchema.safeParse(raw);
  if (!parsed.success) throw new Error("AI returned an unexpected format for SEO metadata.");
  return parsed.data;
}

// --- Internal linking ---
export async function suggestInternalLinks(input: {
  currentTitle: string;
  currentContent: string;
  availablePosts: { slug: string; title: string; category: string; tags: string[] }[];
}) {
  const truncatedContent = input.currentContent.slice(0, MAX_CONTENT_CHARS_FOR_SEO);
  const raw = await groqCompleteJson({
    system: internalLinkSystemPrompt(),
    prompt: internalLinkUserPrompt({ ...input, currentContent: truncatedContent }),
  });
  const parsed = internalLinkSchema.safeParse(raw);
  if (!parsed.success) throw new Error("AI returned an unexpected format for link suggestions.");

  // Never trust the AI's slug claims directly — only return suggestions that
  // match a real, actually-existing post from the list we gave it.
  const validSlugs = new Set(input.availablePosts.map((p) => p.slug));
  return parsed.data.suggestions.filter((s) => validSlugs.has(s.slug));
}
