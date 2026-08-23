"use client";

const STORAGE_KEY = "aq-reading-history";
const MAX_ENTRIES = 6;

export type ReadingHistoryEntry = { slug: string; title: string; coverImage: string; category: string; visitedAt: number };

export function recordReadingHistory(entry: Omit<ReadingHistoryEntry, "visitedAt">) {
  if (typeof window === "undefined") return;
  try {
    const existing = getReadingHistory().filter((e) => e.slug !== entry.slug);
    const updated = [{ ...entry, visitedAt: Date.now() }, ...existing].slice(0, MAX_ENTRIES);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable (private browsing, etc.) — feature just no-ops
  }
}

export function getReadingHistory(): ReadingHistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
