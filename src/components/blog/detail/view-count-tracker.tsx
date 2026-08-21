"use client";

import { useEffect, useRef } from "react";

export function ViewCountTracker({ slug }: { slug: string }) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return; // guards against double-invocation in strict mode
    fired.current = true;
    fetch("/api/blogs/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    }).catch(() => {
      // Silently ignore — a missed view count is not worth surfacing an error for.
    });
  }, [slug]);

  return null;
}
