import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";
import { BarChart3, TrendingUp, Target, Award } from "lucide-react";

const LEVELS = [
  { key: "ADVANCED", label: "Advanced", color: "from-emerald-500/20 to-emerald-500/10", barColor: "bg-emerald-500", icon: Award },
  { key: "INTERMEDIATE", label: "Intermediate", color: "from-blue-500/20 to-blue-500/10", barColor: "bg-blue-500", icon: Target },
  { key: "BEGINNER", label: "Beginner", color: "from-amber-500/20 to-amber-500/10", barColor: "bg-amber-500", icon: TrendingUp },
  { key: "LEARNING", label: "Learning", color: "from-violet-500/20 to-violet-500/10", barColor: "bg-violet-500", icon: BarChart3 },
] as const;

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export async function ExperienceLevels() {
  let counts: Record<string, number> = {};
  let totalRated = 0;

  try {
    const skills = await db.skill.findMany({ where: { visible: true, level: { not: null } }, select: { level: true } });
    for (const s of skills) {
      if (s.level) counts[s.level] = (counts[s.level] ?? 0) + 1;
    }
    totalRated = skills.length;
  } catch {
    counts = {};
  }

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
                Experience Levels
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Self-assessed,
                <br />
                <span className="text-accent-indigo">not inflated</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Honest self-assessment of skill levels across my technology stack.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {totalRated} rated skills
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {LEVELS.length} levels
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Honest assessment
                </p>
              </div>
            </div>

            {/* Level indicators */}
            <div className="mt-8 hidden lg:flex flex-col gap-2">
              {LEVELS.map(({ label, barColor }, i) => (
                <div key={label} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <span className={`h-1.5 w-1.5 rounded-full ${barColor}`} />
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Level Cards ══ */}
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

            {totalRated === 0 ? (
              <Reveal delay={0.08}>
                <div
                  className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                  style={{ boxShadow: panelShadow }}
                >
                  <BarChart3 className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-sm text-text-secondary max-w-sm mx-auto">
                    Skill levels haven't been self-rated yet — no percentages are shown until Abdul sets them, rather than defaulting to a made-up number.
                  </p>
                </div>
              </Reveal>
            ) : (
              <div className="flex flex-col gap-3.5">
                {LEVELS.map(({ key, label, color, barColor, icon: Icon }, i) => {
                  const count = counts[key] ?? 0;
                  const pct = totalRated > 0 ? Math.round((count / totalRated) * 100) : 0;
                  const isHighest = count === Math.max(...Object.values(counts));
                  
                  return (
                    <Reveal key={key} delay={0.12 + i * 0.06}>
                      <div
                        className={`group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5 sm:p-6 ${
                          isHighest ? 'border-accent-indigo/20' : ''
                        }`}
                        style={{ boxShadow: panelShadow }}
                      >
                        {/* hover gradient overlay */}
                        <div
                          aria-hidden
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
                        />

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

                        {/* bracket - animated */}
                        <div
                          aria-hidden
                          className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                        />

                        <div className="relative flex items-center gap-4">
                          {/* icon with ring */}
                          <div className="relative shrink-0">
                            <div className="absolute inset-[-6px] rounded-xl border border-accent-indigo/0 group-hover:border-accent-indigo/10 transition-all duration-500 scale-75 group-hover:scale-100" />
                            <div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-accent-indigo/15 bg-gradient-to-br ${color} group-hover:bg-accent-indigo/14 transition-all duration-300 group-hover:scale-110`}>
                              <Icon className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                            </div>
                          </div>

                          {/* content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-base sm:text-lg text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                                    {label}
                                  </span>
                                  {isHighest && (
                                    <span className="inline-block text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/10 text-emerald-500/60">
                                      Highest
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-text-muted/60 mt-0.5">
                                  {count} skill{count !== 1 ? 's' : ''} at this level
                                </p>
                              </div>
                              <span className="font-mono text-xl sm:text-2xl font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                                {count}
                              </span>
                            </div>

                            {/* progress bar */}
                            <div className="mt-3">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[9px] font-mono text-text-muted/40">
                                  Distribution
                                </span>
                                <span className="text-[9px] font-mono text-accent-indigo/40">
                                  {pct}%
                                </span>
                              </div>
                              <div className="h-1.5 w-full overflow-hidden rounded-full bg-accent-indigo/8">
                                <div 
                                  className={`h-full rounded-full ${barColor} transition-all duration-1000 group-hover:opacity-100`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* index number */}
                          <span className="font-mono text-[9px] text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors shrink-0 self-start">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* bottom accent line on hover */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                      </div>
                    </Reveal>
                  );
                })}

                {/* bottom strip */}
                <div className="mt-0.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                  <p className="font-mono text-[11px] text-text-muted">
                    LEVELS · {totalRated} SKILLS · HONEST ASSESSMENT
                  </p>
                  <div className="flex gap-1">
                    {LEVELS.map((_, i) => (
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
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}