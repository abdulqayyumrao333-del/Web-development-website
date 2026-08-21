const GROUNDING_RULE = `Never fabricate statistics, research citations, client names, testimonials, project metrics, awards, employment history, education credentials, or personal achievements. If a factual claim would need verification, say so explicitly rather than presenting it as confirmed fact. Prefer restructuring and improving supplied information over inventing new claims.`;

export function ideasSystemPrompt(): string {
  return `You are a technical content strategist helping a software developer plan blog posts for their personal portfolio. ${GROUNDING_RULE}\n\nRespond with JSON: { "ideas": [{ "title": string, "description": string, "angle": string }] }. Provide 5-10 ideas.`;
}

export function ideasUserPrompt({
  topic,
  audience,
  keywords,
  contentType,
}: {
  topic: string;
  audience?: string;
  keywords?: string;
  contentType?: string;
}): string {
  return [
    `Topic: ${topic}`,
    audience ? `Audience: ${audience}` : null,
    keywords ? `Keywords to consider: ${keywords}` : null,
    contentType ? `Content type: ${contentType}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function outlineSystemPrompt(): string {
  return `You are a technical writing editor helping structure a blog post outline. ${GROUNDING_RULE}\n\nRespond with JSON: { "introduction": string, "sections": [{ "heading": string, "subheadings": string[] }], "conclusion": string, "cta": string }.`;
}

export function outlineUserPrompt({ title, description }: { title: string; description?: string }): string {
  return [`Title: ${title}`, description ? `Description: ${description}` : null].filter(Boolean).join("\n");
}

export function draftSystemPrompt(): string {
  return `You are a senior technical writer drafting a blog post in Markdown/MDX. ${GROUNDING_RULE}\n\nWrite in the requested tone. Use proper Markdown: ## for H2, ### for H3, fenced code blocks with language tags, bullet/numbered lists where appropriate. Do not include front-matter or a title heading (the title is handled separately) — start directly with the introduction. Output only the article body in Markdown, no preamble or explanation.`;
}

export function draftUserPrompt({
  title,
  outline,
  focusKeyword,
  audience,
  tone,
  instructions,
}: {
  title: string;
  outline?: string;
  focusKeyword?: string;
  audience?: string;
  tone?: string;
  instructions?: string;
}): string {
  return [
    `Title: ${title}`,
    outline ? `Outline to follow:\n${outline}` : null,
    focusKeyword ? `Focus keyword (use naturally, don't force it): ${focusKeyword}` : null,
    audience ? `Audience: ${audience}` : null,
    tone ? `Tone: ${tone}` : null,
    instructions ? `Additional instructions: ${instructions}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function titlesSystemPrompt(): string {
  return `You generate blog post title options for a technical portfolio blog. ${GROUNDING_RULE}\n\nRespond with JSON: { "titles": string[] }. Provide 5-8 options, varied in style (direct, question, how-to, listicle where fitting).`;
}

export function excerptSystemPrompt(): string {
  return `You write concise blog post excerpts (1-2 sentences, under 300 characters) for a technical portfolio blog. ${GROUNDING_RULE}\n\nRespond with JSON: { "excerpt": string }.`;
}

export function summarySystemPrompt(): string {
  return `You summarize technical articles. ${GROUNDING_RULE}\n\nRespond with JSON: { "summary": string, "keyPoints": string[] }. Summary should be 2-3 sentences. Provide 3-6 key points.`;
}
