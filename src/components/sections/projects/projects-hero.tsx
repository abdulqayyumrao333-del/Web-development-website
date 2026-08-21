import Link from "next/link";
import { ArrowRight, Github, Star, GitFork, FolderGit2, Cpu } from "lucide-react";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/sections/reveal";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

async function getStats() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  let projectCount = 0;
  let skillCount = 0;
  let repoCount: number | null = null;
  let starCount: number | null = null;

  try {
    [projectCount, skillCount] = await Promise.all([
      db.project.count({ where: { visible: true } }),
      db.skill.count(),
    ]);
  } catch {
    // DB unavailable
  }

  if (username) {
    try {
      const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
      };
      if (process.env.GITHUB_TOKEN)
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, {
          headers,
          next: { revalidate: 3600 },
        }),
        fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`,
          { headers, next: { revalidate: 3600 } }
        ),
      ]);

      if (profileRes.ok)
        repoCount = (await profileRes.json()).public_repos;
      if (reposRes.ok) {
        const repos = await reposRes.json();
        starCount = repos.reduce(
          (sum: number, r: { stargazers_count: number }) =>
            sum + r.stargazers_count,
          0
        );
      }
    } catch {
      repoCount = null;
      starCount = null;
    }
  }

  return { projectCount, skillCount, repoCount, starCount };
}

export async function ProjectsHero() {
  const { projectCount, skillCount, repoCount, starCount } = await getStats();

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* Full-bleed background */}
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
        {/* top-left glow */}
        <div
          className="absolute top-0 left-0 h-[500px] w-[600px]"
          style={{
            background:
              "radial-gradient(50% 60% at 0% 0%, rgba(79,70,229,0.08) 0%, transparent 100%)",
          }}
        />
        {/* bottom-right glow */}
        <div
          className="absolute bottom-0 right-0 h-[400px] w-[500px]"
          style={{
            background:
              "radial-gradient(50% 60% at 100% 100%, rgba(79,70,229,0.05) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* diagonal texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 -z-10 opacity-[0.20]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 18px)",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      {/* ══ HERO — asymmetric two-column ══ */}
      <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end mb-12 sm:mb-16">

        {/* LEFT — editorial heading */}
        <Reveal>
          <div>
            {/* eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Projects
              </p>
            </div>

            {/* large heading */}
            <h1
              className="font-bold tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              {"What"}
              <br />
              {"Abdul Qayyum"}
              <br />
              <span className="text-accent-indigo">{"has built"}</span>
            </h1>

            {/* sub-copy */}
            <p className="mt-5 max-w-lg text-base sm:text-lg text-text-secondary leading-relaxed">
              {"Featured work, live GitHub activity, and the technologies behind them \u2014 pulled from real, current data."}
            </p>

            {/* CTA row */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" strokeWidth={1.75} />
                  {"View GitHub"}
                </a>
              </Button>

              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">{"Contact Me"}</Link>
              </Button>

              <Button size="lg" variant="ghost" asChild>
                <Link href="/resume" className="inline-flex items-center gap-2">
                  {"Resume"}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* RIGHT — "currently building" card */}
        <Reveal delay={0.1}>
          <div
            className="relative overflow-hidden rounded-2xl border border-accent-indigo/15 bg-bg-surface-1/70 backdrop-blur-sm p-5 w-full lg:w-52"
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
            <div className="relative">
              {/* live dot */}
              <div className="flex items-center gap-2 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  {"Live data"}
                </span>
              </div>

              <p className="font-mono text-[10px] uppercase tracking-widest text-accent-indigo/50 mb-1">
                {"Currently"}
              </p>
              <p className="font-semibold text-sm leading-snug text-text-primary">
                {"Building enterprise-grade portfolio"}
              </p>

              <div className="mt-4 h-px w-full bg-accent-indigo/10" />

              <div className="mt-3 space-y-1.5">
                {["Next.js 15", "TypeScript", "AI Integration"].map((tech) => (
                  <div key={tech} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-accent-indigo/40" />
                    <span className="font-mono text-[10px] text-text-muted/70">{tech}</span>
                  </div>
                ))}
              </div>

              {/* spinning ring — same as Education seal */}
              <div className="mt-4 flex justify-end">
                <div className="relative flex h-8 w-8 items-center justify-center">
                  <span className="absolute inset-0 rounded-full border border-dashed border-accent-indigo/25 animate-[spin_12s_linear_infinite]" />
                  <span className="absolute inset-1.5 rounded-full border border-accent-indigo/15" />
                  <Cpu className="relative h-3 w-3 text-accent-indigo/50" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ══ STATS — featured layout ══ */}
      <Reveal delay={0.15}>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr] gap-3">

          {/* FEATURED — project count, spans full height left */}
          <div
            className="group relative overflow-hidden rounded-2xl border border-accent-indigo/15 bg-bg-surface-1/70 backdrop-blur-sm sm:row-span-2 flex flex-col justify-between p-6 sm:p-8 min-h-[10rem] sm:min-h-[16rem]"
            style={{ boxShadow: panelShadow }}
          >
            {/* diagonal texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-[0.35]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent-indigo/[0.06] to-transparent"
            />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8">
                  <FolderGit2 className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                </div>
                <span className="font-mono text-[10px] text-accent-indigo/30 group-hover:text-accent-indigo/55 transition-colors duration-200">
                  PROJ
                </span>
              </div>
            </div>

            <div className="relative">
              <p
                className="font-mono font-bold tabular-nums leading-none text-text-primary"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
              >
                {projectCount}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-text-muted/60">
                {"Featured Projects"}
              </p>
              <div className="mt-4 h-px w-0 group-hover:w-full rounded-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-500" />
            </div>
          </div>

          {/* TECH count */}
          <div
            className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm flex items-center gap-5 p-5 sm:p-6"
            style={{ boxShadow: panelShadow }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent-indigo/[0.04] to-transparent"
            />
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-indigo/14 bg-accent-indigo/8 group-hover:bg-accent-indigo/14 transition-colors duration-200">
              <Cpu className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
            </div>
            <div className="relative min-w-0">
              <p className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-text-primary">
                {skillCount}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted/60 mt-0.5">
                {"Technologies"}
              </p>
            </div>
            <span className="absolute top-3 right-3 font-mono text-[9px] text-accent-indigo/20 group-hover:text-accent-indigo/45 transition-colors duration-200 select-none">
              TECH
            </span>
            <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full rounded-full bg-gradient-to-r from-accent-indigo/35 to-transparent transition-all duration-500" />
          </div>

          {/* REPO count */}
          <div
            className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm flex items-center gap-5 p-5 sm:p-6"
            style={{ boxShadow: panelShadow }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent-indigo/[0.04] to-transparent"
            />
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent-indigo/14 bg-accent-indigo/8 group-hover:bg-accent-indigo/14 transition-colors duration-200">
              <Github className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
            </div>
            <div className="relative min-w-0">
              <p className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-text-primary">
                {repoCount !== null ? repoCount : "\u2014"}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted/60 mt-0.5">
                {"GitHub Repos"}
              </p>
            </div>
            <span className="absolute top-3 right-3 font-mono text-[9px] text-accent-indigo/20 group-hover:text-accent-indigo/45 transition-colors duration-200 select-none">
              REPO
            </span>
            <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full rounded-full bg-gradient-to-r from-accent-indigo/35 to-transparent transition-all duration-500" />
          </div>

          {/* STAR count — spans 2 cols on desktop */}
          <div
            className="group relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-bg-surface-1/70 backdrop-blur-sm sm:col-span-2 flex items-center justify-between gap-5 p-5 sm:p-6"
            style={{ boxShadow: panelShadow }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-emerald-500/[0.04] to-transparent"
            />
            <div className="relative flex items-center gap-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/8 group-hover:bg-emerald-500/14 transition-colors duration-200">
                <Star className="h-4 w-4 text-emerald-500" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-text-primary">
                  {starCount !== null ? starCount : "\u2014"}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted/60 mt-0.5">
                  {"GitHub Stars"}
                </p>
              </div>
            </div>
            <span className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-emerald-500/30 group-hover:text-emerald-500/55 transition-colors duration-200 pr-2">
              STAR
            </span>
            <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full rounded-full bg-gradient-to-r from-emerald-500/35 to-transparent transition-all duration-500" />
          </div>
        </div>

        {/* bottom strip */}
        <div className="mt-3 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
          <p className="font-mono text-[11px] text-text-muted">
            {"PROJECTS \u00B7 LIVE GITHUB DATA \u00B7 REAL-TIME"}
          </p>
          <div className="flex gap-1">
            {[0.65, 0.40, 0.22, 0.10].map((o, i) => (
              <span
                key={i}
                className="h-1 w-3 rounded-full"
                style={{ backgroundColor: `rgb(99 102 241 / ${o})` }}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}