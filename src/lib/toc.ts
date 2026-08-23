import { slugify } from "@/lib/utils";

export type TocEntry = { id: string; text: string; level: 2 | 3 };

/** Parses `## Heading` / `### Heading` lines from raw MDX. Ignores code fences. */
export function extractTableOfContents(contentMdx: string): TocEntry[] {
  const lines = contentMdx.split("\n");
  const entries: TocEntry[] = [];
  let inCodeFence = false;

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const [, hashes, rawText] = match;
    if (!hashes || !rawText) continue;

    const level = hashes.length as 2 | 3;
    const text = rawText.trim();
    entries.push({ id: slugify(text), text, level });
  }

  return entries;
}