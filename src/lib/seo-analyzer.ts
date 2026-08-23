import { getContentStats } from "@/lib/utils";

export type SeoCheck = {
  label: string;
  passed: boolean;
  message: string;
};

export type SeoAnalysis = {
  score: "Excellent" | "Good" | "Needs Improvement";
  passedCount: number;
  totalCount: number;
  checks: SeoCheck[];
};

function extractHeadings(content: string): { level: number; text: string }[] {
  const matches = [...content.matchAll(/^(#{1,6})\s+(.+)$/gm)];
  return matches.map((m) => ({ level: (m[1] ?? "").length, text: (m[2] ?? "").trim() }));
}

function extractLinks(content: string): { text: string; url: string }[] {
  return [...content.matchAll(/(?<!!)\[([^\]]*)\]\(([^)]+)\)/g)].map((m) => ({ text: m[1] ?? "", url: m[2] ?? "" }));
}

function extractImages(content: string): { alt: string; url: string }[] {
  return [...content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)].map((m) => ({ alt: m[1] ?? "", url: m[2] ?? "" }));
}

export function analyzeSeo({
  seoTitle,
  title,
  seoDescription,
  excerpt,
  focusKeyword,
  slug,
  contentMdx,
  canonicalUrl,
  siteHostname,
}: {
  seoTitle: string;
  title: string;
  seoDescription: string;
  excerpt: string;
  focusKeyword: string;
  slug: string;
  contentMdx: string;
  canonicalUrl: string;
  siteHostname: string;
}): SeoAnalysis {
  const effectiveTitle = seoTitle || title;
  const effectiveDescription = seoDescription || excerpt;
  const stats = getContentStats(contentMdx);
  const headings = extractHeadings(contentMdx);
  const links = extractLinks(contentMdx);
  const images = extractImages(contentMdx);
  const internalLinks = links.filter((l) => l.url.startsWith("/") || l.url.includes(siteHostname));
  const externalLinks = links.filter((l) => !l.url.startsWith("/") && !l.url.includes(siteHostname) && l.url.startsWith("http"));
  const keyword = focusKeyword.trim().toLowerCase();

  const checks: SeoCheck[] = [
    {
      label: "Title length",
      passed: effectiveTitle.length >= 30 && effectiveTitle.length <= 70,
      message:
        effectiveTitle.length === 0
          ? "No title set."
          : effectiveTitle.length < 30
            ? "Title is short — aim for 30–70 characters."
            : effectiveTitle.length > 70
              ? "Title is long — Google may truncate it."
              : "Title length is good.",
    },
    {
      label: "Meta description length",
      passed: effectiveDescription.length >= 70 && effectiveDescription.length <= 160,
      message:
        effectiveDescription.length === 0
          ? "No description set."
          : effectiveDescription.length < 70
            ? "Description is short — aim for 70–160 characters."
            : effectiveDescription.length > 160
              ? "Description is long — Google may truncate it."
              : "Description length is good.",
    },
    {
      label: "Focus keyword usage",
      passed: keyword.length > 0 && effectiveTitle.toLowerCase().includes(keyword) && contentMdx.toLowerCase().includes(keyword),
      message:
        keyword.length === 0
          ? "No focus keyword set."
          : !effectiveTitle.toLowerCase().includes(keyword)
            ? "Focus keyword doesn't appear in the title."
            : !contentMdx.toLowerCase().includes(keyword)
              ? "Focus keyword doesn't appear in the content."
              : "Focus keyword is used in both the title and content.",
    },
    {
      label: "Heading structure",
      passed: headings.some((h) => h.level === 2),
      message:
        headings.length === 0
          ? "No headings found — break up long content with headings."
          : headings.some((h) => h.level === 2)
            ? "Good heading structure."
            : "Add some H2 headings to structure the content.",
    },
    {
      label: "Image alt text",
      passed: images.length === 0 || images.every((img) => img.alt.trim().length > 0),
      message:
        images.length === 0
          ? "No images in the content yet."
          : images.every((img) => img.alt.trim().length > 0)
            ? "All images have alt text."
            : `${images.filter((img) => !img.alt.trim()).length} image(s) missing alt text.`,
    },
    {
      label: "Canonical availability",
      passed: true, // always resolvable — falls back to the post's own URL automatically
      message: canonicalUrl ? "Custom canonical URL set." : "Using this post's own URL as canonical.",
    },
    {
      label: "Slug quality",
      passed: slug.length >= 3 && slug.length <= 75 && slug.split("-").length <= 8,
      message:
        slug.length === 0
          ? "No slug set."
          : slug.length > 75
            ? "Slug is quite long — shorter slugs tend to perform better."
            : "Slug looks good.",
    },
    {
      label: "Reading time",
      passed: stats.readingTime >= 2,
      message: `${stats.readingTime} min read.`,
    },
    {
      label: "Internal links",
      passed: internalLinks.length > 0,
      message:
        internalLinks.length > 0
          ? `${internalLinks.length} internal link(s) found.`
          : "No internal links yet — consider linking to related posts.",
    },
    {
      label: "External links",
      passed: true, // informational only — not having external links isn't a real problem
      message:
        externalLinks.length > 0 ? `${externalLinks.length} external link(s) found.` : "No external links (that's fine).",
    },
    {
      label: "Content length",
      passed: stats.words >= 300,
      message:
        stats.words === 0
          ? "No content written yet."
          : stats.words < 300
            ? `Only ${stats.words} words — thin content can rank poorly. Aim for 300+.`
            : `${stats.words} words — good length.`,
    },
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const ratio = passedCount / checks.length;
  const score: SeoAnalysis["score"] = ratio >= 0.85 ? "Excellent" : ratio >= 0.6 ? "Good" : "Needs Improvement";

  return { score, passedCount, totalCount: checks.length, checks };
}
