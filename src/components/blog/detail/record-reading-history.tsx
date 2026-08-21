"use client";

import { useEffect } from "react";
import { recordReadingHistory } from "@/lib/reading-history";

export function RecordReadingHistory({ slug, title, coverImage }: { slug: string; title: string; coverImage: string }) {
  useEffect(() => {
    recordReadingHistory({ slug, title, coverImage });
  }, [slug, title, coverImage]);

  return null;
}
