"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { History, Clock, ArrowRight, BookOpen } from "lucide-react";
import { getReadingHistory, type ReadingHistoryEntry } from "@/lib/reading-history";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function ContinueReading() {
  const [history, setHistory] = useState<ReadingHistoryEntry[] | null>(null);

  useEffect(() => {
    setHistory(getReadingHistory());
  }, []);

  if (!history || history.length === 0) return null;

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">

      {/* ── Full-bleed background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ margin: "0 calc(-50vw + 50%)" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(99,102,241,0.032) 35%, rgba(99,102,241,0.055) 65%, rgba(99,102,241,0.038) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.18) 25%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.18) 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.10) 25%, rgba(99,102,241,0.14) 50%, rgba(99,102,241,0.10) 75%, transparent 100%)",
          }}
        />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6">
          <History className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50">
            Continue Reading
          </p>
          <p className="text-xs text-text-muted/30">
            {history.length} article{history.length !== 1 ? 's' : ''} in your history
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-[10px] text-text-muted/20">
          <Clock className="h-3 w-3" strokeWidth={1.5} />
          <span>Recent</span>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-accent-indigo/10 scrollbar-track-transparent">
        {history.map((entry) => (
          <Link
            key={entry.slug}
            href={`/blog/${entry.slug}`}
            className="group relative shrink-0 w-64 overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5"
            style={{ boxShadow: panelShadow }}
          >
            {/* hover gradient */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
            />

            {/* bracket */}
            <div
              aria-hidden
              className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
            />

            <div className="relative flex items-center gap-3 p-3">
              {/* Image */}
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-accent-indigo/5">
                <Image
                  src={entry.coverImage}
                  alt={entry.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface-1/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="line-clamp-2 text-sm font-medium text-text-primary group-hover:text-accent-indigo transition-colors duration-300 leading-snug">
                  {entry.title}
                </p>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-text-muted/40">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" strokeWidth={1.5} />
                    {entry.category || "General"}
                  </span>
                  <span className="text-accent-indigo/15">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" strokeWidth={1.5} />
                    {new Date(entry.visitedAt).toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>

              {/* Arrow on hover */}
              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                <ArrowRight className="h-4 w-4 text-accent-indigo/40" strokeWidth={1.75} />
              </div>
            </div>

            {/* bottom accent line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
          </Link>
        ))}
      </div>

      {/* bottom strip */}
      <div className="mt-4 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2">
        <p className="font-mono text-[10px] text-text-muted/50">
          READING HISTORY · {history.length} ARTICLES
        </p>
        <div className="flex gap-1">
          {history.slice(0, 4).map((_, i) => (
            <span
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === 0 ? "1rem" : "0.5rem",
                backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.5 : Math.max(0.10, 0.30 - i * 0.06)})`,
              }}
            />
          ))}
          {history.length > 4 && (
            <span className="text-[8px] font-mono text-text-muted/20">+{history.length - 4}</span>
          )}
        </div>
      </div>
    </section>
  );
}