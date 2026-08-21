export function seoMetadataSystemPrompt(): string {
  return `You are an SEO specialist suggesting metadata for a technical blog post. Base suggestions only on the article content provided — never invent claims about the article that aren't there.\n\nRespond with JSON: { "seoTitle": string (max 70 chars), "metaDescription": string (max 160 chars), "focusKeyword": string, "secondaryKeywords": string[] (3-5 items), "slug": string (lowercase, hyphenated) }.`;
}

export function seoMetadataUserPrompt({
  title,
  excerpt,
  content,
  category,
}: {
  title: string;
  excerpt: string;
  content: string;
  category: string;
}): string {
  // Content is truncated by the caller before this prompt is built — see
  // MAX_CONTENT_CHARS_FOR_SEO in blog-ai.ts — to keep the request small and
  // avoid sending more than the SEO analysis actually needs.
  return `Title: ${title}\nCategory: ${category}\nExcerpt: ${excerpt}\n\nContent:\n${content}`;
}

export function internalLinkSystemPrompt(): string {
  return `You suggest internal links from a technical blog to OTHER existing articles on the same blog, based only on the list of real published articles provided below. You must only reference articles that appear in that exact list — never invent a title, slug, or article that isn't listed.\n\nRespond with JSON: { "suggestions": [{ "slug": string, "title": string, "reason": string }] }. Only include genuinely relevant suggestions (0-5 items) — an empty array is a valid and expected response if nothing fits well.`;
}

export function internalLinkUserPrompt({
  currentTitle,
  currentContent,
  availablePosts,
}: {
  currentTitle: string;
  currentContent: string;
  availablePosts: { slug: string; title: string; category: string; tags: string[] }[];
}): string {
  const postList = availablePosts
    .map((p) => `- slug: "${p.slug}" | title: "${p.title}" | category: ${p.category} | tags: ${p.tags.join(", ")}`)
    .join("\n");

  return `Current article: "${currentTitle}"\n\nContent:\n${currentContent}\n\nOther existing published articles (ONLY suggest from this list):\n${postList || "(none available)"}`;
}
