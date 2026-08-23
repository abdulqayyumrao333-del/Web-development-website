import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";
import { Calendar, Code2, Layers, Sparkles, Server, Database, Cloud, ChevronRight } from "lucide-react";

// Category icons mapping
const categoryIcons: Record<string, any> = {
  "Frontend": Code2,
  "Backend": Server,
  "Database": Database,
  "AI/ML": Sparkles,
  "DevOps": Cloud,
  "Languages": Code2,
  "Tools": Layers,
};

// Category colors
const categoryColors: Record<string, string> = {
  "Frontend": "from-blue-500/20 to-cyan-500/20",
  "Backend": "from-indigo-500/20 to-purple-500/20",
  "Database": "from-emerald-500/20 to-teal-500/20",
  "AI/ML": "from-rose-500/20 to-pink-500/20",
  "DevOps": "from-amber-500/20 to-orange-500/20",
  "Languages": "from-sky-500/20 to-blue-500/20",
  "Tools": "from-violet-500/20 to-purple-500/20",
};

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export async function TechnologyTimeline() {
  let skills: { id: string; name: string; category: string; learnedAt: Date }[] = [];

  try {
    const rows = await db.skill.findMany({
      where: { visible: true, learnedAt: { not: null } },
      orderBy: { learnedAt: "asc" },
    });
    skills = rows.filter((r): r is typeof r & { learnedAt: Date } => r.learnedAt !== null);
  } catch {
    skills = [];
  }

  // Group by year
  const groupedByYear = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const year = skill.learnedAt.getFullYear().toString();
    (acc[year] ??= []).push(skill);
    return acc;
  }, {});

  const years = Object.keys(groupedByYear).sort();

  if (skills.length === 0) {
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
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-accent-indigo/60" />
                <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                  Technology Timeline
                </p>
              </div>
              <div className="relative mb-4">
                <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                  When things
                  <br />
                  <span className="text-accent-indigo">were learned</span>
                </h2>
              </div>
              <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
                No specific learning dates have been recorded yet — this fills in as they're added via the CMS.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
              style={{ boxShadow: panelShadow }}
            >
              <Calendar className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
              <p className="text-sm text-text-secondary max-w-sm mx-auto">
                No specific learning dates have been recorded yet — this fills in as they're added via the CMS.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    );
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
                Technology Timeline
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                When things
                <br />
                <span className="text-accent-indigo">were learned</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              A chronological journey through the technologies I've picked up along the way.
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
                  {years.length} years
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Chronological
                </p>
              </div>
            </div>

            {/* Year indicators */}
            <div className="mt-8 hidden lg:flex flex-col gap-2">
              {years.map((year, i) => (
                <div key={year} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors">
                    {year}
                  </span>
                  <span className="ml-auto text-[8px] text-accent-indigo/15 group-hover:text-accent-indigo/30 transition-colors">
                    {(groupedByYear[year] ?? []).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Timeline ══ */}
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
              {years.map((year) => (
                <div key={year} className="relative">
                  {/* Year header */}
                  <Reveal delay={0.1 + parseInt(year) * 0.02}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-lg sm:text-xl font-bold text-text-primary">
                        {year}
                      </span>
                      <span className="h-px flex-1 bg-gradient-to-r from-accent-indigo/15 to-transparent" />
                      <span className="text-[10px] font-mono text-accent-indigo/30">
                        {(groupedByYear[year] ?? []).length} technologies
                      </span>
                    </div>
                  </Reveal>

                  {/* Skills for this year */}
                  <div className="flex flex-col gap-2.5 pl-1">
                    {(groupedByYear[year] ?? []).map((skill, i) => {
                      const Icon = categoryIcons[skill.category] || Layers;
                      const colorClass = categoryColors[skill.category] || "from-accent-indigo/20 to-accent-indigo/10";
                      const month = skill.learnedAt.toLocaleDateString(undefined, { month: "short" });
                      
                      return (
                        <Reveal key={skill.id} delay={0.15 + i * 0.04 + parseInt(year) * 0.02}>
                          <div
                            className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4"
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

                            <div className="relative flex items-center gap-3">
                              {/* Icon */}
                              <div className={`flex h-9 w-9 items-center justify-center rounded-lg border border-accent-indigo/12 bg-gradient-to-br ${colorClass} group-hover:border-accent-indigo/25 transition-all duration-300 group-hover:scale-105`}>
                                <Icon className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-semibold text-sm text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                                    {skill.name}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-mono text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors">
                                      {month}
                                    </span>
                                    <span className="text-[9px] font-mono text-accent-indigo/15 group-hover:text-accent-indigo/30 transition-colors">
                                      {String(i + 1).padStart(2, "0")}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[8px] font-mono uppercase tracking-wider text-accent-indigo/30 group-hover:text-accent-indigo/50 transition-colors">
                                    {skill.category}
                                  </span>
                                </div>
                              </div>

                              {/* Chevron on hover */}
                              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                                <ChevronRight className="h-4 w-4 text-accent-indigo/30" strokeWidth={1.75} />
                              </div>
                            </div>

                            {/* bottom accent line */}
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                          </div>
                        </Reveal>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* bottom strip */}
              <div className="mt-2 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                <p className="font-mono text-[11px] text-text-muted">
                  TIMELINE · {skills.length} TECHNOLOGIES · {years.length} YEARS
                </p>
                <div className="flex gap-1">
                  {years.map((_, i) => (
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}