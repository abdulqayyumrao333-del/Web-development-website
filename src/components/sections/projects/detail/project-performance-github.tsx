"use client";

import { useEffect, useState } from "react";
import { Gauge, Github, Star, GitFork, CircleDot, ScrollText, Sparkles, Clock, GitCommit } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import type { Project } from "@/types";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// ── ProjectPerformance ──
export function ProjectPerformance() {
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

        {/* ── LEFT ── */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Performance
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Measured,
                <br />
                <span className="text-accent-indigo">not assumed</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Verified performance metrics and quality scores from real audits.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Lighthouse
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Coming soon
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Verified
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── RIGHT ── */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
              style={{ boxShadow: panelShadow }}
            >
              {/* diagonal texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              {/* bracket */}
              <div
                aria-hidden
                className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
              />

              <div className="relative">
                <Gauge className="h-12 w-12 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                  No verified Lighthouse audit exists for this project yet — scores will appear here once one has actually been run, never estimated.
                </p>
                <div className="mt-4 flex justify-center gap-4 text-[10px] text-text-muted/30">
                  <span className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-accent-indigo/20" />
                    Performance
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-accent-indigo/15" />
                    Accessibility
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-accent-indigo/10" />
                    SEO
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── ProjectGithubStats ──
type RepoStats = {
  stars: number;
  forks: number;
  openIssues: number;
  license: string | null;
  latestCommit: { message: string; date: string; url: string } | null;
  contributorCount: number | null;
};

export function ProjectGithubStats({ project }: { project: Project }) {
  const [stats, setStats] = useState<RepoStats | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    if (!project.githubUrl) return;
    fetch(`/api/github/repo?url=${encodeURIComponent(project.githubUrl)}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setStats(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [project.githubUrl]);

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

        {/* ── LEFT ── */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                GitHub
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Live from
                <br />
                <span className="text-accent-indigo">GitHub</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Real-time repository stats, activity, and health metrics.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {stats ? `${stats.stars} stars` : "Loading..."}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Live data
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Real-time
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── RIGHT ── */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            {!project.githubUrl ? (
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                style={{ boxShadow: panelShadow }}
              >
                <Github className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                  Repository not linked yet — this fills in once published.
                </p>
              </div>
            ) : status === "loading" ? (
              <div className="grid gap-3.5 sm:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-xl bg-accent-indigo/5 animate-pulse h-24" />
                ))}
              </div>
            ) : status === "error" || !stats ? (
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                style={{ boxShadow: panelShadow }}
              >
                <Github className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                <p className="text-sm text-text-secondary max-w-sm mx-auto">
                  Repository data is temporarily unavailable.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 text-center" style={{ boxShadow: panelShadow }}>
                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-indigo/6 mx-auto mb-2 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105">
                        <Star className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                      </div>
                      <p className="font-mono text-xl sm:text-2xl font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                        {stats.stars}
                      </p>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 group-hover:text-text-muted/60 transition-colors">
                        Stars
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 text-center" style={{ boxShadow: panelShadow }}>
                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-indigo/6 mx-auto mb-2 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105">
                        <GitFork className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                      </div>
                      <p className="font-mono text-xl sm:text-2xl font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                        {stats.forks}
                      </p>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 group-hover:text-text-muted/60 transition-colors">
                        Forks
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 text-center" style={{ boxShadow: panelShadow }}>
                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-indigo/6 mx-auto mb-2 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105">
                        <CircleDot className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                      </div>
                      <p className="font-mono text-xl sm:text-2xl font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                        {stats.openIssues}
                      </p>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 group-hover:text-text-muted/60 transition-colors">
                        Open Issues
                      </p>
                    </div>
                  </div>

                  <div className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 text-center" style={{ boxShadow: panelShadow }}>
                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-indigo/6 mx-auto mb-2 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105">
                        <ScrollText className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                      </div>
                      <p className="font-mono text-sm font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300 truncate max-w-[8rem] mx-auto">
                        {stats.license ?? "No license"}
                      </p>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 group-hover:text-text-muted/60 transition-colors">
                        License
                      </p>
                    </div>
                  </div>
                </div>

                {/* Latest Commit */}
                {stats.latestCommit && (
                  <a
                    href={stats.latestCommit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <div
                      className="relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4"
                      style={{ boxShadow: panelShadow }}
                    >
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-indigo/[0.03] to-transparent"
                      />
                      <div className="relative flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105">
                          <GitCommit className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">Latest Commit</p>
                          <p className="text-sm text-text-secondary group-hover:text-text-primary transition-colors line-clamp-1">
                            {stats.latestCommit.message}
                          </p>
                        </div>
                        <Clock className="h-3.5 w-3.5 text-text-muted/20 group-hover:text-accent-indigo/30 transition-colors shrink-0" strokeWidth={1.5} />
                      </div>
                    </div>
                  </a>
                )}

                {/* bottom strip */}
                <div className="mt-0.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                  <p className="font-mono text-[11px] text-text-muted">
                    GITHUB · LIVE DATA · REAL-TIME
                  </p>
                  <div className="flex gap-1">
                    <span className="h-1 w-4 rounded-full bg-accent-indigo/40" />
                    <span className="h-1 w-2 rounded-full bg-accent-indigo/20" />
                    <span className="h-1 w-2 rounded-full bg-accent-indigo/15" />
                    <span className="h-1 w-2 rounded-full bg-accent-indigo/10" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}