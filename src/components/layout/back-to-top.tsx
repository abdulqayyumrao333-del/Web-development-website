"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      id="back-to-top"
      className="no-print fixed bottom-24 right-6 z-40 rounded-full bg-accent-indigo p-3 text-white shadow-md hover:shadow-glow"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}
