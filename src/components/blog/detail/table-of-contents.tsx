"use client";

import { useEffect, useState } from "react";
import { ChevronDown, List, BookOpen, Sparkles, Check } from "lucide-react";
import type { TocEntry } from "@/lib/toc";

export function TableOfContents({ headings }: { headings: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const list = (
    <ul className="space-y-1.5">
      {headings.map((h) => {
        const isActive = activeId === h.id;
        const isSubItem = h.level === 3;
        return (
          <li key={h.id} className={isSubItem ? "ml-4" : ""}>
            <a
              href={`#${h.id}`}
              className={`group flex items-start gap-2 py-1.5 text-sm transition-all duration-300 rounded-lg px-2.5 hover:bg-accent-indigo/[0.03] ${
                isActive
                  ? "text-accent-indigo bg-accent-indigo/[0.04] font-medium"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <span className="flex-1 line-clamp-1">{h.text}</span>
              {isActive && (
                <span className="shrink-0 mt-0.5">
                  <Check className="h-3.5 w-3.5 text-accent-indigo" strokeWidth={2} />
                </span>
              )}
              {!isActive && (
                <span className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/30" />
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* ── Desktop: Sticky Sidebar ── */}
      <nav
        aria-label="Table of contents"
        className="sticky top-28 hidden max-h-[70vh] overflow-y-auto lg:block"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.1) transparent" }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6">
            <BookOpen className="h-3.5 w-3.5 text-accent-indigo" strokeWidth={1.75} />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50">
            On this page
          </p>
          <span className="ml-auto text-[8px] font-mono text-accent-indigo/15">
            {headings.length}
          </span>
        </div>

        <div className="relative">
          {/* Vertical line indicator */}
          <div
            className="absolute left-[11px] top-0 bottom-0 w-px bg-accent-indigo/8"
            aria-hidden
          />
          {list}
        </div>

        {/* bottom accent */}
        <div className="mt-4 h-px w-12 rounded-full bg-gradient-to-r from-accent-indigo/20 to-transparent" />
      </nav>

      {/* ── Mobile: Collapsible ── */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm lg:hidden">
        {/* diagonal texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-[0.3]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          }}
        />

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          className="flex w-full items-center justify-between px-4 py-3.5 text-sm font-medium hover:bg-accent-indigo/[0.02] transition-colors duration-200"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
            <span className="text-text-secondary">Table of contents</span>
            <span className="text-[8px] font-mono text-accent-indigo/20 ml-1">
              {headings.length}
            </span>
          </span>
          <ChevronDown
            className={`h-4 w-4 text-text-muted/40 transition-transform duration-300 ${
              mobileOpen ? "rotate-180" : ""
            }`}
            strokeWidth={1.75}
          />
        </button>

        {mobileOpen && (
          <div className="border-t border-accent-indigo/8 px-4 py-3">
            {list}
          </div>
        )}
      </div>
    </>
  );
}