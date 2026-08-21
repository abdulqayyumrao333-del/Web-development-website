import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { calculateReadingMinutes } from "@/lib/reading-time";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-");
}

/** Estimates reading time in whole minutes (minimum 1) from raw MDX content.
 * Delegates to the reading-time package (lib/reading-time.ts) — the same
 * calculation already used by the public site's blog-card/article-hero/
 * featured-article components — rather than a separate approximation.
 * Lives here (not lib/blog.ts) because lib/blog.ts imports the Prisma client
 * — this needs to be safe to import from Client Components for live preview. */
export function calculateReadingTime(contentMdx: string): number {
  return calculateReadingMinutes(contentMdx);
}

export type ContentStats = {
  words: number;
  characters: number;
  paragraphs: number;
  readingTime: number;
};

/** Live word/character/paragraph count plus reading time, for the editor's
 * stats display — reuses the same word-count logic as calculateReadingTime
 * instead of splitting the text a second time with different rules. */
export function getContentStats(contentMdx: string): ContentStats {
  const trimmed = contentMdx.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const characters = contentMdx.length;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length : 0;
  return { words, characters, paragraphs, readingTime: calculateReadingTime(contentMdx) };
}
