import { getContentStats } from "@/lib/utils";

export function ReadingStats({ content }: { content: string }) {
  const stats = getContentStats(content);

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted" aria-live="polite">
      <span>{stats.words.toLocaleString()} words</span>
      <span>{stats.characters.toLocaleString()} characters</span>
      <span>{stats.paragraphs.toLocaleString()} paragraphs</span>
      <span>{stats.readingTime} min read</span>
    </div>
  );
}
