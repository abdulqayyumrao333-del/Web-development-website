import { FolderGit2, BookMarked, Layers, Github, FileText, Clock, Sparkles, TrendingUp } from "lucide-react";
import { db } from "@/lib/db";
import { publishedPostWhere } from "@/lib/blog";
import { Reveal } from "@/components/sections/reveal";

const LEARNING_START_YEAR = 2024;

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

async function getGithubData(): Promise<{ repoCount: number | null; contributions: number | null }> {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME;
  if (!username) return { repoCount: null, contributions: null };

  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const profileRes = await fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } });
    const repoCount = profileRes.ok ? (await profileRes.json()).public_repos : null;

    let contributions: number | null = null;
    if (process.env.GITHUB_TOKEN) {
      const gqlRes = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query($login: String!) { user(login: $login) { contributionsCollection { contributionCalendar { totalContributions } } } }`,
          variables: { login: username },
        }),
        next: { revalidate: 3600 },
      });
      const gqlJson = await gqlRes.json();
      contributions = gqlJson?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;
    }
    return { repoCount, contributions };
  } catch {
    return { repoCount: null, contributions: null };
  }
}

export async function SuccessMetrics() {
  let projectCount = 0;
  let skillCount = 0;
  let blogCount = 0;

  try {
    [projectCount, skillCount, blogCount] = await Promise.all([
      db.project.count({ where: { visible: true } }),
      db.skill.count(),
      db.blogPost.count({ where: publishedPostWhere })
    ]);
  } catch {
    // database unavailable — real zeros, not fabricated placeholders
  }

  const { repoCount, contributions } = await getGithubData();
  const yearsLearning = new Date().getFullYear() - LEARNING_START_YEAR;

  const stats = [
    { icon: FolderGit2, label: "Projects", value: projectCount, color: "from-blue-500/20 to-cyan-500/20" },
    { icon: BookMarked, label: "Repositories", value: repoCount, color: "from-indigo-500/20 to-purple-500/20" },
    { icon: Layers, label: "Technologies", value: skillCount, color: "from-emerald-500/20 to-teal-500/20" },
    { icon: Clock, label: "Years Learning", value: yearsLearning, color: "from-amber-500/20 to-orange-500/20" },
    { icon: FileText, label: "Blog Posts", value: blogCount, color: "from-rose-500/20 to-pink-500/20" },
    { icon: Github, label: "Contributions", value: contributions, color: "from-violet-500/20 to-purple-500/20" },
  ];

  const totalStats = stats.filter(s => s.value !== null && s.value !== undefined).length;

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
                Real Numbers
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Not marketing
                <br />
                <span className="text-accent-indigo">stats — live data</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Real-time metrics pulled directly from live data sources — no fabricated numbers.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {stats.length} metrics
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {totalStats} available
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Live data
                </p>
              </div>
            </div>

            {/* Total summary */}
            <div className="mt-8 hidden lg:flex flex-col gap-2 p-3 rounded-xl border border-accent-indigo/10 bg-accent-indigo/[0.02]">
              <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">
                Total Impact
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5 text-accent-indigo/40" strokeWidth={1.5} />
                  <span className="text-lg font-bold text-text-primary">
                    {projectCount + (repoCount || 0) + (contributions || 0)}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-text-muted/30">combined</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Stats Grid ══ */}
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

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {stats.map(({ icon: Icon, label, value, color }, i) => (
                <Reveal key={label} delay={0.12 + i * 0.05}>
                  <div
                    className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 text-center"
                    style={{ boxShadow: panelShadow }}
                  >
                    {/* hover gradient */}
                    <div
                      aria-hidden
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${color} via-transparent to-transparent`}
                    />

                    {/* bracket */}
                    <div
                      aria-hidden
                      className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                    />

                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-indigo/6 mx-auto mb-2 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105">
                        <Icon className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                      </div>
                      <p className="font-mono text-xl sm:text-2xl font-bold text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                        {value !== null && value !== undefined ? value : "—"}
                      </p>
                      <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 group-hover:text-text-muted/60 transition-colors duration-300">
                        {label}
                      </p>
                    </div>

                    {/* bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                  </div>
                </Reveal>
              ))}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                METRICS · {stats.length} STATS · LIVE DATA
              </p>
              <div className="flex gap-1">
                {stats.map((_, i) => (
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