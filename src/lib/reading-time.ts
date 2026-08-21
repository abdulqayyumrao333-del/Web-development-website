import readingTime from "reading-time";

/** Returns whole minutes, minimum 1, computed fresh from the actual MDX source. */
export function calculateReadingMinutes(contentMdx: string): number {
  const stats = readingTime(contentMdx);
  return Math.max(1, Math.ceil(stats.minutes));
}
