export type SeoIssue = { severity: "error" | "warning"; message: string };
export type SeoAuditResult = { score: number; issues: SeoIssue[] };

const TITLE_MIN = 30;
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;

/**
 * Audits a single piece of content against real, checkable rules only.
 * Nothing here is an estimate or a fabricated "AI score" — every point
 * deducted maps to a specific, inspectable issue in the `issues` array.
 */
export function auditContent(input: {
  title: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  summary?: string | null;
  coverImage?: string | null;
  slug: string;
}): SeoAuditResult {
  const issues: SeoIssue[] = [];
  const effectiveTitle = input.seoTitle ?? input.title;
  const effectiveDescription = input.seoDescription ?? input.summary ?? "";

  if (!input.seoTitle) {
    issues.push({ severity: "warning", message: "No custom SEO title set — falling back to the content title." });
  } else if (effectiveTitle.length < TITLE_MIN || effectiveTitle.length > TITLE_MAX) {
    issues.push({
      severity: "warning",
      message: `SEO title is ${effectiveTitle.length} characters — recommended range is ${TITLE_MIN}–${TITLE_MAX}.`,
    });
  }

  if (!input.seoDescription) {
    issues.push({ severity: "error", message: "No meta description set." });
  } else if (effectiveDescription.length < DESC_MIN || effectiveDescription.length > DESC_MAX) {
    issues.push({
      severity: "warning",
      message: `Meta description is ${effectiveDescription.length} characters — recommended range is ${DESC_MIN}–${DESC_MAX}.`,
    });
  }

  if (!input.coverImage || input.coverImage.includes("placeholder")) {
    issues.push({ severity: "warning", message: "Using a placeholder cover image — no real Open Graph image yet." });
  }

  if (!/^[a-z0-9-]+$/.test(input.slug)) {
    issues.push({ severity: "error", message: "Slug contains characters outside a-z, 0-9, and hyphens." });
  }

  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const score = Math.max(0, 100 - errorCount * 25 - warningCount * 10);

  return { score, issues };
}

/** Finds real exact-match duplicate titles/descriptions across a content set. */
export function findDuplicates(
  items: { id: string; title: string; seoTitle?: string | null; seoDescription?: string | null }[]
): { duplicateTitles: string[][]; duplicateDescriptions: string[][] } {
  const byTitle = new Map<string, string[]>();
  const byDescription = new Map<string, string[]>();

  for (const item of items) {
    const title = (item.seoTitle ?? item.title).trim().toLowerCase();
    if (title) byTitle.set(title, [...(byTitle.get(title) ?? []), item.id]);

    const desc = item.seoDescription?.trim().toLowerCase();
    if (desc) byDescription.set(desc, [...(byDescription.get(desc) ?? []), item.id]);
  }

  return {
    duplicateTitles: [...byTitle.values()].filter((ids) => ids.length > 1),
    duplicateDescriptions: [...byDescription.values()].filter((ids) => ids.length > 1),
  };
}

/** Scans raw MDX/markdown for image syntax with empty or missing alt text. */
export function findMissingAltText(mdxContent: string): number {
  const imagePattern = /!\[(.*?)\]\([^)]*\)/g;
  let missingCount = 0;
  let match: RegExpExecArray | null;
  while ((match = imagePattern.exec(mdxContent)) !== null) {
    if (!match[1] || match[1].trim() === "") missingCount++;
  }
  return missingCount;
}
