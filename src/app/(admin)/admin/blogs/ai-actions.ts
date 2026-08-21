"use server";

import { requireAdmin, getBlogs, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { checkAiRateLimit } from "@/lib/rate-limit";
import { toFriendlyAiError } from "@/lib/ai/groq";
import {
  generateIdeas,
  generateOutline,
  outlineToMarkdown,
  generateDraft,
  improveWriting,
  rewriteText,
  expandText,
  shortenText,
  summarizeText,
  generateTitles,
  generateExcerpt,
  generateSeoMetadata,
  suggestInternalLinks,
  InputTooLargeError,
  type RewriteStyle,
} from "@/lib/ai/blog-ai";

const AI_RATE_LIMIT_KEY = "blog-ai"; // single-admin site — one shared bucket is sufficient

async function guard(): Promise<string | null> {
  await requireAdmin();
  const allowed = await checkAiRateLimit(AI_RATE_LIMIT_KEY);
  if (!allowed) return "You're sending requests to the AI assistant too quickly — wait a moment and try again.";
  return null;
}

function wrapError(err: unknown): string {
  if (err instanceof InputTooLargeError) return err.message;
  return toFriendlyAiError(err);
}

export async function aiGenerateIdeas(input: {
  topic: string;
  audience?: string;
  keywords?: string;
  contentType?: string;
}): Promise<BlogActionResult<Awaited<ReturnType<typeof generateIdeas>>>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const data = await generateIdeas(input);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiGenerateOutline(input: {
  title: string;
  description?: string;
}): Promise<BlogActionResult<{ markdown: string }>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const outline = await generateOutline(input);
    return { success: true, data: { markdown: outlineToMarkdown(outline) } };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiGenerateDraft(input: {
  title: string;
  outline?: string;
  focusKeyword?: string;
  audience?: string;
  tone?: string;
  instructions?: string;
}): Promise<BlogActionResult<{ content: string }>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const content = await generateDraft(input);
    return { success: true, data: { content } };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiImproveWriting(selection: string): Promise<BlogActionResult<{ result: string }>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const result = await improveWriting(selection);
    return { success: true, data: { result } };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiRewriteText(
  selection: string,
  style: RewriteStyle,
): Promise<BlogActionResult<{ result: string }>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const result = await rewriteText(selection, style);
    return { success: true, data: { result } };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiExpandText(selection: string): Promise<BlogActionResult<{ result: string }>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const result = await expandText(selection);
    return { success: true, data: { result } };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiShortenText(selection: string): Promise<BlogActionResult<{ result: string }>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const result = await shortenText(selection);
    return { success: true, data: { result } };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiSummarizeText(
  selection: string,
): Promise<BlogActionResult<Awaited<ReturnType<typeof summarizeText>>>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const data = await summarizeText(selection);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiGenerateTitles(articleContext: string): Promise<BlogActionResult<{ titles: string[] }>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const titles = await generateTitles(articleContext);
    return { success: true, data: { titles } };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiGenerateExcerpt(articleContext: string): Promise<BlogActionResult<{ excerpt: string }>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const excerpt = await generateExcerpt(articleContext);
    return { success: true, data: { excerpt } };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiGenerateSeoMetadata(input: {
  title: string;
  excerpt: string;
  content: string;
  category: string;
}): Promise<BlogActionResult<Awaited<ReturnType<typeof generateSeoMetadata>>>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };
    const data = await generateSeoMetadata(input);
    return { success: true, data };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

export async function aiSuggestInternalLinks(input: {
  currentTitle: string;
  currentContent: string;
  excludePostId?: string;
}): Promise<BlogActionResult<Awaited<ReturnType<typeof suggestInternalLinks>>>> {
  try {
    const limitError = await guard();
    if (limitError) return { success: false, error: limitError };

    // Real published posts only — reuses the existing getBlogs() action
    // rather than a separate query, and only sends the minimum fields the
    // AI needs (never full content, analytics, or anything unrelated).
    const postsResult = await getBlogs();
    if (!postsResult.success) return { success: false, error: postsResult.error };

    const availablePosts = postsResult.data
      .filter((p) => p.status === "PUBLISHED" && p.id !== input.excludePostId)
      .map((p) => ({ slug: p.slug, title: p.title, category: p.category, tags: p.tags }));

    const data = await suggestInternalLinks({
      currentTitle: input.currentTitle,
      currentContent: input.currentContent,
      availablePosts,
    });
    return { success: true, data };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}
