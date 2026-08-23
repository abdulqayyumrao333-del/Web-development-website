"use client";

import { useEffect } from "react";
import { recordReadingHistory } from "@/lib/reading-history";

export function RecordReadingHistory({ slug, title, coverImage, category }: { slug: string; title: string; coverImage: string; category: string }) {
  useEffect(() => {
    recordReadingHistory({ slug, title, coverImage, category });
  }, [slug, title, coverImage, category]);

  return null;
}