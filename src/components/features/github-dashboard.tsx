"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Star, Users, GitFork, BookMarked, Github, ExternalLink, Calendar, Code2 } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

type GithubDashboardData = {
  username: string;
  name: string | null;
  avatarUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  featuredRepos: { name: string; description: string | null; stars: number; url: string; language: string | null }[];
  contributionsLastYear: number | null;
};

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "";

const PANEL_SHADOW =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// Shared visual treatment for every "glass card" surface in this component —
// previously duplicated verbatim across the stat cards and repo cards.
const CARD_BASE =
  "group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5";

function CardChrome() {
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
      />
      <div
        aria-hidden
        className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
      />
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
    </>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Star;
}) {
  return (
    <div className={`${CARD_BASE} p-4 text-center`} style={{ boxShadow: PANEL_SHADOW }}>
      <CardChrome />
      <div className="relative">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105 mx-auto">
          <Icon className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
        </div>
        <p className="mt-2 font-mono text-xl sm:text-2xl font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
          {value.toLocaleString()}
        </p>
        <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 group-hover:text-text-muted/60 transition-colors">
          {label}
        </p>
      </div>
    </div>
  );
}

function RepoCard({
  repo,
}: {
  repo: GithubDashboardData["featuredRepos"][number];
}) {
  return (
    <a href={repo.url} target="_blank" rel="noopener noreferrer" aria-label={`View ${repo.name} on GitHub`}>
      <div className={`${CARD_BASE} p-4 h-full`} style={{ boxShadow: PANEL_SHADOW }}>
        <CardChrome />
        <div className="relative">
          <div className="flex items-start justify-between gap-2">
            <p className="font-semibold text-sm text-text-primary group-hover:text-accent-indigo transition-colors duration-300 truncate">
              {repo.name}
            </p>
            <ExternalLink
              className="h-3.5 w-3.5 text-text-muted/20 group-hover:text-accent-indigo/40 transition-colors shrink-0 mt-0.5"
              strokeWidth={1.5}
            />
          </div>

          {repo.description && (
            <p className="mt-1 text-xs text-text-muted/70 line-clamp-2 group-hover:text-text-muted/90 transition-colors">
              {repo.description}
            </p>
          )}

          <div className="mt-3 flex items-center gap-3 text-[10px] text-text-muted/50">
            {repo.language && (
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-accent-indigo/40" />
                {repo.language}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" strokeWidth={1.5} />
              {repo.stars}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

export function GithubDashboard() {
  const [data, setData] = useState<GithubDashboardData | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/github", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("unavailable");
        return res.json();
      })
      .then((json: GithubDashboardData) => {
        setData(json);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setStatus("error");
      });

    // Cancel the in-flight request if the component unmounts before it resolves,
    // avoiding a "set state on unmounted component" warning/leak.
    return () => controller.abort();
  }, []);

  const stats = useMemo(
    () =>
      data
        ? [
            { label: "Public Repos", value: data.publicRepos, icon: BookMarked },
            { label: "Total Stars", value: data.totalStars, icon: Star },
            { label: "Followers", value: data.followers, icon: Users },
            { label: "Following", value: data.following, icon: GitFork },
          ]
        : [],
    [data]
  );

  // ── LOADING STATE ──
  if (status === "loading") {
    return (
      <div className="grid gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-accent-indigo/5 animate-pulse" />
        ))}
      </div>
    );
  }

  // ── ERROR STATE ──
  if (status === "error" || !data) {
    return (
      <div
        className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-8 sm:p-10 text-center"
        style={{ boxShadow: PANEL_SHADOW }}
      >
        <Github className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
        <p className="text-sm text-text-secondary max-w-sm mx-auto">
          GitHub stats are temporarily unavailable — view the profile directly instead.
        </p>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-sm text-accent-indigo hover:text-accent-indigo/80 transition-colors"
        >
          github.com/{GITHUB_USERNAME}
          <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
        </a>
      </div>
    );
  }

  // ── MAIN CONTENT ──
  return (
    <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

      {/* ══ LEFT ══ */}
      <Reveal>
        <div className="lg:sticky lg:top-28">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-accent-indigo/60" />
          </div>

          <div className="relative mb-4">
            <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
              Open Source
              <br />
              <span className="text-accent-indigo">Presence</span>
            </h2>
          </div>

          <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
            My open source contributions, projects, and community presence on GitHub.
          </p>

          <div className="mt-6 flex items-stretch gap-3">
            <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
            <div className="space-y-2.5 text-xs text-text-muted font-mono">
              <p className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                {data.publicRepos} repos
              </p>
              <p className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                {data.followers} followers
              </p>
              <p className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                Active developer
              </p>
            </div>
          </div>

          {/* Profile summary */}
          <div className="mt-8 hidden lg:flex flex-col gap-3">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-accent-indigo/10 bg-accent-indigo/[0.02]">
              <Image
                src={data.avatarUrl}
                alt={data.name ?? data.username}
                width={40}
                height={40}
                className="rounded-full ring-2 ring-accent-indigo/20"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-primary truncate">
                  {data.name ?? data.username}
                </p>
                {data.bio && (
                  <p className="text-[10px] text-text-muted/60 truncate">{data.bio}</p>
                )}
              </div>
            </div>
            {data.contributionsLastYear !== null && (
              <div className="flex items-center gap-2 text-[10px] text-text-muted/40">
                <Calendar className="h-3 w-3" strokeWidth={1.5} />
                <span>{data.contributionsLastYear.toLocaleString()} contributions last year</span>
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {/* ══ RIGHT ── GitHub Stats ══ */}
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

          <div className="flex flex-col gap-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map(({ label, value, icon }, i) => (
                <Reveal key={label} delay={0.12 + i * 0.05}>
                  <StatCard label={label} value={value} icon={icon} />
                </Reveal>
              ))}
            </div>

            {/* Top Languages */}
            {data.topLanguages.length > 0 && (
              <Reveal delay={0.2}>
                <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-xl border border-accent-indigo/10 bg-accent-indigo/[0.02]">
                  <Code2 className="h-3.5 w-3.5 text-accent-indigo/30 mr-1" strokeWidth={1.75} />
                  {data.topLanguages.map((lang) => (
                    <span
                      key={lang.name}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-1 text-[10px] text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/25 transition-all duration-300"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/40" />
                      {lang.name}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}

            {/* Featured Repos */}
            {data.featuredRepos.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {data.featuredRepos.map((repo, i) => (
                  <Reveal key={repo.name} delay={0.25 + i * 0.05}>
                    <RepoCard repo={repo} />
                  </Reveal>
                ))}
              </div>
            )}

            {/* bottom strip */}
            <div className="mt-1 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                GITHUB · {data.publicRepos} REPOS · {data.followers} FOLLOWERS
              </p>
              <div className="flex gap-1">
                <span className="h-1 w-4 rounded-full bg-accent-indigo/40" />
                <span className="h-1 w-2 rounded-full bg-accent-indigo/20" />
                <span className="h-1 w-2 rounded-full bg-accent-indigo/15" />
                <span className="h-1 w-2 rounded-full bg-accent-indigo/10" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}