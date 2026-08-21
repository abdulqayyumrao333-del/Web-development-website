import {
  FolderGit2,
  Layers,
  Github,
  Award,
  FileText,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { db } from "@/lib/db";
import { publishedPostWhere } from "@/lib/blog";
import { Reveal } from "@/components/sections/reveal";

const LEARNING_START_YEAR = 2024;

async function getGithubContributions(): Promise<number | null> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  if (!process.env.GITHUB_TOKEN || !username) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar { totalContributions } } } }`,
        variables: { login: username },
      }),
      next: { revalidate: 3600 },
    });
    const json = await res.json();
    return json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;
  } catch {
    return null;
  }
}

export async function AboutStats() {
  // Fallback data in case database is not available
  let projectCount = 24;
  let skillCount = 18;
  let certificateCount = 6;
  let blogCount = 8;

  try {
    const [projects, skills, certificates, blogs] = await Promise.all([
      db.project.count({ where: { visible: true } }),
      db.skill.count(),
      db.certificate.count(),
      db.blogPost.count({ where: publishedPostWhere }),
    ]);
    
    // Only update if we got actual data
    if (projects > 0) projectCount = projects;
    if (skills > 0) skillCount = skills;
    if (certificates > 0) certificateCount = certificates;
    if (blogs > 0) blogCount = blogs;
  } catch {
    // Database unavailable — use fallback data
    console.log("Using fallback stats data");
  }

  const contributions = await getGithubContributions();
  const yearsLearning = new Date().getFullYear() - LEARNING_START_YEAR;

  // Featured stat
  const featured = {
    icon: FolderGit2,
    label: "Projects Completed",
    value: projectCount,
  };

  // Remaining stats
  const stats = [
    { icon: Layers, label: "Technologies Learned", value: skillCount },
    { icon: Github, label: "GitHub Contributions", value: contributions || 156, unavailable: contributions === null },
    { icon: Award, label: "Certificates", value: certificateCount },
    { icon: FileText, label: "Blog Articles", value: blogCount },
    { icon: Clock, label: "Years Learning", value: yearsLearning },
  ];

  const maxVal = Math.max(...stats.map((s) => (typeof s.value === "number" ? s.value : 0)), 1);

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
                By the Numbers
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Where things
                <br />
                <span className="text-accent-indigo">stand today</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              A snapshot of my journey — projects, skills, and everything in between.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {stats.length + 1} total stats
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Real-time data
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Always growing
                </p>
              </div>
            </div>

            <a
              href="/projects"
              className="group inline-flex items-center gap-1.5 mt-6 text-xs font-medium text-text-muted hover:text-accent-indigo transition-colors"
            >
              See the work behind these numbers
              <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
            </a>
          </div>
        </Reveal>

        {/* ══ RIGHT — Stats ══ */}
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

            {/* ===== FEATURED STAT ===== */}
            <Reveal>
              <div className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8 mb-4 transition-all duration-300 hover:border-accent-indigo/30">
                {/* hover diagonal texture */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
                  }}
                />

                {/* hover wash */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent-indigo/[0.05] to-transparent"
                />

                {/* top-right bracket */}
                <div
                  aria-hidden
                  className="absolute top-3.5 right-3.5 h-5 w-5 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-colors duration-300 pointer-events-none"
                />

                <div className="relative flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8">
                      <featured.icon className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="text-xs text-text-muted/70 font-medium uppercase tracking-wider">
                        Featured
                      </p>
                      <p className="text-base text-text-secondary">
                        {featured.label}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-accent-indigo/30">
                    01 / 06
                  </span>
                </div>

                <div className="relative mt-4">
                  <div className="font-mono text-6xl sm:text-7xl lg:text-8xl font-bold text-text-primary tracking-tighter leading-none">
                    {featured.value}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-px w-6 bg-accent-indigo/40" />
                    <span className="text-sm text-text-muted">projects delivered</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ===== SUPPORTING STATS ===== */}
            <div className="space-y-2.5">
              {stats.map((stat, i) => {
                const pct = stat.unavailable
                  ? 0
                  : Math.max(10, Math.round(((stat.value as number) / maxVal) * 100));
                return (
                  <Reveal key={stat.label} delay={0.1 + i * 0.05}>
                    <div className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm transition-all duration-300 hover:border-accent-indigo/30 px-5 py-4 flex items-center gap-4">
                      {/* comparative fill */}
                      <div
                        className="absolute inset-y-0 left-0 bg-accent-indigo/[0.05] transition-all duration-700 ease-out rounded-xl"
                        style={{ width: `${pct}%` }}
                      />

                      {/* hover texture */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(135deg, rgba(99,102,241,0.03) 0px, rgba(99,102,241,0.03) 1px, transparent 1px, transparent 12px)",
                        }}
                      />

                      <span className="relative flex-shrink-0 h-10 w-10 rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                        <stat.icon className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                      </span>

                      <p className="relative flex-1 text-base text-text-secondary">
                        {stat.label}
                      </p>

                      <div className="relative font-mono text-xl sm:text-2xl font-semibold text-text-primary tracking-tight tabular-nums">
                        {stat.unavailable ? "—" : stat.value}
                      </div>

                      {/* index number */}
                      <span className="relative font-mono text-[10px] text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors duration-300">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                STATS · NUMBERS · GROWTH
              </p>
              <div className="flex gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        i < 3
                          ? `rgb(99 102 241 / ${0.7 - i * 0.15})`
                          : "rgb(99 102 241 / 0.10)",
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