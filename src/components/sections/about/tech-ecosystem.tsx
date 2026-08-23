import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";
import { Code2, Layers, Sparkles, Zap, Server, Database, Cloud, Cpu } from "lucide-react";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// Category icons mapping
const categoryIcons: Record<string, any> = {
  "Frontend": Code2,
  "Backend": Server,
  "Database": Database,
  "AI/ML": Sparkles,
  "DevOps": Cloud,
  "Tools": Zap,
  "Languages": Cpu,
};

// Category colors mapping
const categoryColors: Record<string, string> = {
  "Frontend": "from-blue-500/20 to-cyan-500/20",
  "Backend": "from-indigo-500/20 to-purple-500/20",
  "Database": "from-emerald-500/20 to-teal-500/20",
  "AI/ML": "from-rose-500/20 to-pink-500/20",
  "DevOps": "from-amber-500/20 to-orange-500/20",
  "Tools": "from-violet-500/20 to-purple-500/20",
  "Languages": "from-sky-500/20 to-blue-500/20",
};

export async function TechEcosystem() {
  let skills: { id: string; name: string; category: string }[] = [];
  try {
    skills = await db.skill.findMany({ orderBy: { order: "asc" } });
  } catch {
    skills = [];
  }

  // group by category — preserves order within each group
  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category]!.push(skill);
    return acc;
  }, {});
  const categories = Object.keys(grouped);

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
          className="absolute inset-x-0 top-0 h-[420px]"
          style={{
            background:
              "radial-gradient(45% 70% at 60% 0%, rgba(79,70,229,0.07) 0%, transparent 100%)",
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
                Tech Ecosystem
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Everything
                <br />
                <span className="text-accent-indigo">I work</span>
                <br />
                with
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Tools and technologies across the full stack — from UI to infrastructure.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {skills.length} technologies
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {categories.length} categories
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Actively used
                </p>
              </div>
            </div>

            {/* category index — desktop */}
            {categories.length > 0 && (
              <div className="mt-8 hidden lg:flex flex-col gap-2">
                {categories.map((cat, i) => {
                  const Icon = categoryIcons[cat] || Code2;
                  return (
                    <div key={cat} className="flex items-center gap-2 group cursor-default">
                      <span className="font-mono text-[10px] text-accent-indigo/30 w-4 text-right group-hover:text-accent-indigo/60 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-3 bg-accent-indigo/15 group-hover:bg-accent-indigo/30 transition-colors" />
                      <Icon className="h-3 w-3 text-accent-indigo/25 group-hover:text-accent-indigo/50 transition-colors" strokeWidth={1.75} />
                      <span className="font-mono text-[10px] text-text-muted/45 group-hover:text-text-muted/70 uppercase tracking-wider truncate max-w-[8rem] transition-colors">
                        {cat}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Reveal>

        {/* ══ RIGHT ══ */}
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

          {skills.length === 0 ? (
            <Reveal delay={0.08}>
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                style={{ boxShadow: panelShadow }}
              >
                <p className="font-mono text-sm text-text-muted">
                  Skills will appear here once published.
                </p>
              </div>
            </Reveal>
          ) : categories.length > 0 ? (
            <div className="flex flex-col gap-4">
              {categories.map((cat, ci) => {
                const Icon = categoryIcons[cat] || Code2;
                const colorClass = categoryColors[cat] || "from-accent-indigo/20 to-accent-indigo/10";
                const skillCount = grouped[cat]!.length;
                
                return (
                  <Reveal key={cat} delay={0.1 + ci * 0.06}>
                    <div
                      className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-500 hover:border-accent-indigo/30 hover:shadow-2xl hover:shadow-accent-indigo/10 hover:-translate-y-0.5"
                      style={{ boxShadow: panelShadow }}
                    >
                      {/* Animated gradient background */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
                      />

                      {/* Category color strip - top */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      />

                      {/* Glow orb */}
                      <div
                        aria-hidden
                        className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent-indigo/5 blur-3xl group-hover:bg-accent-indigo/10 transition-all duration-700"
                      />

                      {/* diagonal texture */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.3] group-hover:opacity-[0.4] transition-opacity duration-500"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(135deg, rgba(99,102,241,0.06) 0px, rgba(99,102,241,0.06) 1px, transparent 1px, transparent 12px)",
                          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                          WebkitMaskImage:
                            "linear-gradient(to bottom, black 0%, transparent 100%)",
                        }}
                      />

                      {/* bracket - animated */}
                      <div
                        aria-hidden
                        className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-all duration-300 pointer-events-none group-hover:h-8 group-hover:w-8"
                      />

                      <div className="relative p-5 sm:p-6">
                        {/* Header with category name, icon, and count */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <div className="absolute inset-0 rounded-xl bg-accent-indigo/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              <div className={`relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-accent-indigo/15 bg-gradient-to-br ${colorClass} group-hover:border-accent-indigo/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-indigo/10`}>
                                <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-accent-indigo" strokeWidth={1.75} />
                              </div>
                            </div>
                            <div>
                              <h3 className="font-semibold text-base sm:text-lg text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                                {cat}
                              </h3>
                              <p className="text-xs text-text-muted/60 font-mono">
                                {skillCount} {skillCount === 1 ? 'tool' : 'tools'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-accent-indigo/20 group-hover:text-accent-indigo/50 transition-colors duration-300">
                              {String(ci + 1).padStart(2, "0")}
                            </span>
                            <div className="h-6 w-px bg-accent-indigo/10 group-hover:bg-accent-indigo/20 transition-colors" />
                            <span className="font-mono text-[10px] text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors uppercase tracking-wider">
                              {cat.substring(0, 3)}
                            </span>
                          </div>
                        </div>

                        {/* Tech badges in a clean grid */}
                        <div className="flex flex-wrap gap-2">
                          {grouped[cat]!.map((skill, i) => (
                            <span
                              key={skill.id}
                              className={`
                                inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium
                                border border-accent-indigo/12 bg-bg-surface-1/60
                                text-text-secondary hover:text-accent-indigo
                                hover:border-accent-indigo/30 hover:bg-accent-indigo/[0.06]
                                transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-accent-indigo/5
                                cursor-default
                              `}
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/30 group-hover:bg-accent-indigo/60 transition-colors" />
                              {skill.name}
                            </span>
                          ))}
                        </div>

                        {/* Bottom progress indicator */}
                        <div className="mt-4 flex items-center gap-3">
                          <div className="flex-1 h-0.5 rounded-full bg-accent-indigo/8 group-hover:bg-accent-indigo/20 transition-colors">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-accent-indigo/40 to-accent-indigo/10 transition-all duration-700 group-hover:opacity-100"
                              style={{ width: `${Math.min(100, (skillCount / 10) * 100)}%` }}
                            />
                          </div>
                          <span className="font-mono text-[9px] text-text-muted/30 group-hover:text-text-muted/50 transition-colors">
                            {skillCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}

              {/* bottom strip */}
              <div className="mt-1 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                <p className="font-mono text-[11px] text-text-muted">
                  TECH · {skills.length} TOOLS · {categories.length} CATEGORIES
                </p>
                <div className="flex gap-1">
                  {categories.map((_, i) => (
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
          ) : (
            <Reveal delay={0.1}>
              <div
                className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-6 py-8 sm:px-8"
                style={{ boxShadow: panelShadow }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-[0.35]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                    maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, black 0%, transparent 100%)",
                  }}
                />
                <div className="relative flex flex-wrap justify-center gap-3">
                  {skills.map((skill, i) => (
                    <span
                      key={skill.id}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border border-accent-indigo/12 bg-bg-surface-1/60 text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 hover:bg-accent-indigo/[0.06] transition-all duration-300 hover:scale-105 cursor-default"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/30" />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}