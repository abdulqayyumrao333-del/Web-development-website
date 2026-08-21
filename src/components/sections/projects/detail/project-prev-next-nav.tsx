import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { db } from "@/lib/db";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export async function ProjectPrevNextNav({ currentOrder }: { currentOrder: number }) {
  let prev: { title: string; slug: string } | null = null;
  let next: { title: string; slug: string } | null = null;

  try {
    [prev, next] = await Promise.all([
      db.project.findFirst({ 
        where: { order: { lt: currentOrder }, visible: true }, 
        orderBy: { order: "desc" }, 
        select: { title: true, slug: true } 
      }),
      db.project.findFirst({ 
        where: { order: { gt: currentOrder }, visible: true }, 
        orderBy: { order: "asc" }, 
        select: { title: true, slug: true } 
      }),
    ]);
  } catch {
    prev = null;
    next = null;
  }

  if (!prev && !next) return null;

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-8 sm:py-12">

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

      <div className="flex items-center justify-between gap-4">
        {/* ── Previous ── */}
        {prev ? (
          <Link
            href={`/projects/${prev.slug}`}
            className="group relative flex-1 overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 sm:p-5"
            style={{ boxShadow: panelShadow }}
          >
            {/* hover gradient */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-indigo/[0.03] to-transparent"
            />

            {/* bracket */}
            <div
              aria-hidden
              className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/20 rounded-tr-sm transition-colors duration-300 pointer-events-none"
            />

            <div className="relative flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105 shrink-0">
                <ArrowLeft className="h-4 w-4 text-accent-indigo/60 group-hover:text-accent-indigo transition-colors" strokeWidth={1.75} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40 group-hover:text-text-muted/60 transition-colors">
                  Previous Project
                </p>
                <p className="text-sm font-medium text-text-primary group-hover:text-accent-indigo transition-colors duration-300 truncate">
                  {prev.title}
                </p>
              </div>
            </div>

            {/* bottom accent line */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {/* ── Divider ── */}
        <div className="hidden sm:flex items-center gap-2 text-text-muted/20">
          <Sparkles className="h-4 w-4" strokeWidth={1.5} />
          <span className="h-6 w-px bg-accent-indigo/10" />
          <Sparkles className="h-4 w-4" strokeWidth={1.5} />
        </div>

        {/* ── Next ── */}
        {next ? (
          <Link
            href={`/projects/${next.slug}`}
            className="group relative flex-1 overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 sm:p-5 text-right"
            style={{ boxShadow: panelShadow }}
          >
            {/* hover gradient */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-l from-accent-indigo/[0.03] to-transparent"
            />

            {/* bracket */}
            <div
              aria-hidden
              className="absolute top-2 left-2 h-3 w-3 border-t border-l border-accent-indigo/0 group-hover:border-accent-indigo/20 rounded-tl-sm transition-colors duration-300 pointer-events-none"
            />

            <div className="relative flex items-center gap-3 justify-end">
              <div className="flex-1 min-w-0">
                <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40 group-hover:text-text-muted/60 transition-colors">
                  Next Project
                </p>
                <p className="text-sm font-medium text-text-primary group-hover:text-accent-indigo transition-colors duration-300 truncate">
                  {next.title}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105 shrink-0">
                <ArrowRight className="h-4 w-4 text-accent-indigo/60 group-hover:text-accent-indigo transition-colors" strokeWidth={1.75} />
              </div>
            </div>

            {/* bottom accent line */}
            <div className="absolute bottom-0 right-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-l from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>

      {/* ── Bottom strip ── */}
      <div className="mt-3 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2">
        <p className="font-mono text-[11px] text-text-muted">
          NAVIGATE · {prev ? "PREVIOUS" : "—"} · {next ? "NEXT" : "—"}
        </p>
        <div className="flex gap-1">
          {prev && (
            <span className="h-1 w-3 rounded-full bg-accent-indigo/40" />
          )}
          <span className="h-1 w-3 rounded-full bg-accent-indigo/20" />
          {next && (
            <span className="h-1 w-3 rounded-full bg-accent-indigo/40" />
          )}
        </div>
      </div>
    </section>
  );
}