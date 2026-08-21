"use client";

import { useMemo, useState } from "react";
import { Search, Grid3x3, Sparkles, Filter } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { FeaturedProjectCard } from "@/components/sections/projects/featured-project-card";
import type { Project } from "@/types";

const ALL_CATEGORIES = [
  "All", "AI", "Full Stack", "Frontend", "Backend", "Automation", "Open Source", "University", "Personal", "SaaS",
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.categories.includes(activeCategory);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [projects, activeCategory, query]);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

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
        <div
          className="absolute inset-x-0 top-0 h-[380px]"
          style={{
            background:
              "radial-gradient(55% 100% at 20% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* ══ LEFT ══ */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Browse Projects
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Filter by
                <br />
                <span className="text-accent-indigo">category</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Explore my projects by category or search for specific technologies.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {projects.length} projects
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {ALL_CATEGORIES.length - 1} categories
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Live data
                </p>
              </div>
            </div>

            {/* Category count */}
            <div className="mt-8 hidden lg:flex flex-wrap gap-1.5">
              {ALL_CATEGORIES.filter(c => c !== "All").map((cat) => {
                const count = projects.filter(p => p.categories.includes(cat)).length;
                return (
                  <div key={cat} className="flex items-center gap-1.5 px-2 py-1 rounded-lg border border-accent-indigo/8 bg-accent-indigo/[0.02]">
                    <span className="font-mono text-[8px] text-accent-indigo/30">{count}</span>
                    <span className="font-mono text-[8px] text-text-muted/30 uppercase tracking-wider">{cat.slice(0, 3)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Content ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 left-1/4 h-40 w-40 rounded-full bg-accent-indigo/5 blur-2xl"
            />

            {/* ── Filter Bar ── */}
            <div className="mb-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Categories */}
                <div className="flex flex-wrap gap-1.5">
                  {ALL_CATEGORIES.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      aria-pressed={activeCategory === category}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-300 ${
                        activeCategory === category
                          ? "border-accent-indigo bg-accent-indigo text-white shadow-sm shadow-accent-indigo/20"
                          : "border-accent-indigo/10 text-text-secondary hover:border-accent-indigo/30 hover:text-accent-indigo hover:bg-accent-indigo/[0.03]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-56">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-accent-indigo/30" strokeWidth={1.75} />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects..."
                    aria-label="Search projects"
                    className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 py-2 pl-9 pr-4 text-sm text-text-secondary placeholder:text-text-muted/30 outline-none transition-all duration-300 focus:border-accent-indigo/40 focus:bg-bg-surface-1 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted/40 hover:text-text-muted transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Results count */}
              <div className="mt-3 flex items-center gap-2 text-xs text-text-muted/50">
                <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                <span>{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</span>
                {activeCategory !== "All" && (
                  <>
                    <span className="text-accent-indigo/20">·</span>
                    <span className="text-accent-indigo/40">Category: {activeCategory}</span>
                  </>
                )}
                {query && (
                  <>
                    <span className="text-accent-indigo/20">·</span>
                    <span className="text-accent-indigo/40">Search: "{query}"</span>
                  </>
                )}
              </div>
            </div>

            {/* ── Projects Grid ── */}
            {filtered.length === 0 ? (
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                style={{ boxShadow: panelShadow }}
              >
                <Search className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                  No projects match that filter yet.
                </p>
                <p className="text-xs text-text-muted/50 mt-1">
                  Try adjusting your search or category filter
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {filtered.map((project) => (
                  <FeaturedProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                PROJECTS · {filtered.length} SHOWING · {ALL_CATEGORIES.length - 1} CATEGORIES
              </p>
              <div className="flex gap-1">
                {ALL_CATEGORIES.filter(c => c !== "All").map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 ? "1.25rem" : "0.5rem",
                      backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.10, 0.40 - i * 0.04)})`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}