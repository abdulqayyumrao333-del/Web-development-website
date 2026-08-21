"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Star, GitFork, CircleDot, Github, Sparkles, ArrowUpRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/sections/reveal";
import type { RepoSummary } from "@/app/api/github/repos/route";

const PAGE_SIZE = 6;
type SortKey = "updated" | "stars" | "name";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function GithubReposList() {
  const [repos, setRepos] = useState<RepoSummary[] | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("updated");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => {
        if (!res.ok) throw new Error("unavailable");
        return res.json();
      })
      .then((json) => {
        setRepos(json.repos);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const filtered = useMemo(() => {
    if (!repos) return [];
    const q = query.trim().toLowerCase();
    const matched = repos.filter(
      (r) =>
        q === "" ||
        r.name.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.language?.toLowerCase().includes(q) ||
        r.topics.some((t) => t.toLowerCase().includes(q))
    );
    const sorted = [...matched].sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars;
      if (sort === "name") return a.name.localeCompare(b.name);
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return sorted.sort((a, b) => (a.isPinned === b.isPinned ? 0 : a.isPinned ? -1 : 1));
  }, [repos, query, sort]);

  const pinnedCount = filtered.filter(r => r.isPinned).length;

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
                GitHub Repos
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                All
                <br />
                <span className="text-accent-indigo">Repositories</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Every open source project, experiment, and contribution — all in one place.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {repos?.length || 0} repos
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {pinnedCount} pinned
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Live data
                </p>
              </div>
            </div>

            {/* Sort options - desktop */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {(["updated", "stars", "name"] as SortKey[]).map((key, i) => (
                <button
                  key={key}
                  onClick={() => setSort(key)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-all duration-300 ${
                    sort === key
                      ? "bg-accent-indigo/10 text-accent-indigo font-medium"
                      : "text-text-muted/60 hover:text-text-muted hover:bg-accent-indigo/[0.03]"
                  }`}
                >
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12" />
                  <span className="font-mono text-[10px] uppercase tracking-wider">
                    {key === "updated" ? "Recent" : key}
                  </span>
                  {sort === key && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent-indigo" />
                  )}
                </button>
              ))}
            </div>

            {/* GitHub link */}
            <a
              href="https://github.com/abdulqayyumrao333"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 hidden lg:inline-flex items-center gap-2 text-xs font-medium text-text-muted/50 hover:text-accent-indigo transition-colors group"
            >
              <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span>View all on GitHub</span>
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </a>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Repos Grid ══ */}
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

            {status === "loading" ? (
              <div className="grid gap-3.5 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl bg-accent-indigo/5 animate-pulse h-36" />
                ))}
              </div>
            ) : status === "error" || !repos ? (
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                style={{ boxShadow: panelShadow }}
              >
                <Github className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                  Repository list is temporarily unavailable.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* ── Filter Bar ── */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  {/* Search */}
                  <div className="relative w-full sm:w-56">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-accent-indigo/30" strokeWidth={1.75} />
                    <input
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setVisibleCount(PAGE_SIZE);
                      }}
                      placeholder="Search repos..."
                      aria-label="Search repositories"
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

                  {/* Sort pills - mobile */}
                  <div className="flex flex-wrap gap-1.5">
                    {(["updated", "stars", "name"] as SortKey[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSort(key)}
                        className={`rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-all duration-300 ${
                          sort === key
                            ? "border-accent-indigo bg-accent-indigo text-white shadow-sm shadow-accent-indigo/20"
                            : "border-accent-indigo/10 text-text-muted/60 hover:border-accent-indigo/30 hover:text-accent-indigo"
                        }`}
                      >
                        {key === "updated" ? "Recent" : key}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Results count ── */}
                <div className="flex items-center gap-2 text-xs text-text-muted/50">
                  <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                  <span>{filtered.length} repo{filtered.length !== 1 ? 's' : ''} found</span>
                  {query && (
                    <>
                      <span className="text-accent-indigo/20">·</span>
                      <span className="text-accent-indigo/40">Search: "{query}"</span>
                    </>
                  )}
                  {sort === "stars" && (
                    <>
                      <span className="text-accent-indigo/20">·</span>
                      <span className="text-accent-indigo/40">Sorted by stars</span>
                    </>
                  )}
                </div>

                {/* ── Repos Grid ── */}
                {filtered.length === 0 ? (
                  <div
                    className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                    style={{ boxShadow: panelShadow }}
                  >
                    <Search className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                    <p className="text-sm text-text-secondary max-w-sm mx-auto">
                      No repositories match that search.
                    </p>
                    <p className="text-xs text-text-muted/50 mt-1">
                      Try adjusting your search terms
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {filtered.slice(0, visibleCount).map((repo, i) => (
                      <Reveal key={repo.name} delay={(i % PAGE_SIZE) * 0.03}>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 block h-full"
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

                          <div className="relative">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="font-semibold text-sm text-text-primary group-hover:text-accent-indigo transition-colors duration-300 truncate">
                                  {repo.name}
                                </span>
                                {repo.isPinned && (
                                  <span className="inline-flex items-center gap-0.5 text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full border border-accent-indigo/20 bg-accent-indigo/10 text-accent-indigo/60 group-hover:border-accent-indigo/30 group-hover:bg-accent-indigo/15 transition-colors shrink-0">
                                    <Sparkles className="h-2 w-2" strokeWidth={1.5} />
                                    Pinned
                                  </span>
                                )}
                              </div>
                              <ArrowUpRight className="h-3.5 w-3.5 text-text-muted/20 group-hover:text-accent-indigo/40 transition-colors shrink-0 mt-0.5" strokeWidth={1.5} />
                            </div>

                            {repo.description && (
                              <p className="mt-1 text-xs text-text-muted/70 line-clamp-2 group-hover:text-text-muted/90 transition-colors">
                                {repo.description}
                              </p>
                            )}

                            <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[10px] text-text-muted/50">
                              {repo.language && (
                                <span className="flex items-center gap-1">
                                  <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/40" />
                                  {repo.language}
                                </span>
                              )}
                              <span className="flex items-center gap-0.5">
                                <Star className="h-3 w-3" strokeWidth={1.5} />
                                {repo.stars}
                              </span>
                              <span className="flex items-center gap-0.5">
                                <GitFork className="h-3 w-3" strokeWidth={1.5} />
                                {repo.forks}
                              </span>
                              <span className="flex items-center gap-0.5">
                                <CircleDot className="h-3 w-3" strokeWidth={1.5} />
                                {repo.openIssues}
                              </span>
                            </div>

                            {/* Updated date */}
                            <p className="mt-1.5 text-[8px] font-mono text-text-muted/30 group-hover:text-text-muted/50 transition-colors">
                              Updated {new Date(repo.updatedAt).toLocaleDateString(undefined, { 
                                year: "numeric", 
                                month: "short", 
                                day: "numeric" 
                              })}
                            </p>

                            {/* index number */}
                            <span className="absolute bottom-1 right-1 font-mono text-[7px] text-accent-indigo/8 group-hover:text-accent-indigo/20 transition-colors">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>

                          {/* bottom accent line */}
                          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                        </a>
                      </Reveal>
                    ))}
                  </div>
                )}

                {/* ── Load More ── */}
                {visibleCount < filtered.length && (
                  <div className="mt-2 flex justify-center">
                    <button
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-accent-indigo/12 bg-bg-surface-1/50 hover:border-accent-indigo/30 hover:bg-accent-indigo/[0.03] text-text-secondary hover:text-accent-indigo font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Load more
                      <span className="text-[10px] text-text-muted/40">({filtered.length - visibleCount} remaining)</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                GITHUB · {repos?.length || 0} REPOS · {pinnedCount} PINNED
              </p>
              <div className="flex gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 ? "1.25rem" : "0.5rem",
                      backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.10, 0.40 - i * 0.06)})`,
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