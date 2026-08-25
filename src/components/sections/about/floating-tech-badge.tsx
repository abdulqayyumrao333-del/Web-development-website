"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

export function FloatingTechBadge({
  name,
  category,
  index,
}: {
  name: string;
  category: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <m.div
      className="relative"
      animate={{ y: [0, -5, 0] }}
      transition={{
        duration: 3.5 + (index % 3) * 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: (index % 6) * 0.35,
      }}
    >
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        aria-label={`${name} — ${category}`}
        className={[
          "group relative overflow-hidden",
          "rounded-xl border px-4 py-2.5",
          "text-sm font-medium leading-none",
          "transition-all duration-300",
          // base
          "border-accent-indigo/14 bg-bg-surface-1/70 text-text-secondary backdrop-blur-sm",
          // hover
          "hover:border-accent-indigo/35 hover:text-text-primary hover:bg-bg-surface-1",
        ].join(" ")}
        style={{
          boxShadow: hovered
            ? "0 4px 16px -4px rgba(79,70,229,0.18), 0 1px 4px rgba(15,23,42,0.06)"
            : "0 1px 3px rgba(15,23,42,0.04), 0 4px 12px -4px rgba(79,70,229,0.08)",
        }}
      >
        {/* hover wash */}
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent-indigo/[0.07] to-transparent pointer-events-none"
        />

        {/* left accent bar — appears on hover */}
        <span
          aria-hidden
          className="absolute left-0 inset-y-0 w-0.5 rounded-r-full bg-accent-indigo/0 group-hover:bg-accent-indigo/60 transition-colors duration-300 pointer-events-none"
        />

        <span className="relative">{name}</span>
      </button>

      {/* tooltip */}
      <AnimatePresence>
        {hovered && (
          <m.span
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap z-10"
          >
            <span className="block rounded-lg border border-accent-indigo/20 bg-bg-surface-1 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-accent-indigo/70 shadow-md">
              {category}
            </span>
            {/* tooltip arrow */}
            <span
              aria-hidden
              className="absolute left-1/2 -bottom-[5px] -translate-x-1/2 h-2 w-2 rotate-45 border-b border-r border-accent-indigo/20 bg-bg-surface-1"
            />
          </m.span>
        )}
      </AnimatePresence>
    </m.div>
  );
}