import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ChevronDown, Sparkles, Layers, Code2, Server, Database, Cloud, Cpu, Zap } from "lucide-react";

const LEVEL_LABEL: Record<string, string> = {
  LEARNING: "Learning",
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

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

// Category colors
const categoryColors: Record<string, string> = {
  "Frontend": "from-blue-500/20 to-cyan-500/20",
  "Backend": "from-indigo-500/20 to-purple-500/20",
  "Database": "from-emerald-500/20 to-teal-500/20",
  "AI/ML": "from-rose-500/20 to-pink-500/20",
  "DevOps": "from-amber-500/20 to-orange-500/20",
  "Tools": "from-violet-500/20 to-purple-500/20",
  "Languages": "from-sky-500/20 to-blue-500/20",
};

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export async function SkillsEcosystem() {
  let skills: {
    id: string;
    name: string;
    category: string;
    description: string | null;
    level: string | null;
  }[] = [];

  try {
    skills = await db.skill.findMany({ where: { visible: true }, orderBy: [{ category: "asc" }, { order: "asc" }] });
  } catch {
    skills = [];
  }

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
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
                Skills Ecosystem
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Organized
                <br />
                <span className="text-accent-indigo">by category</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Only categories with real, published entries appear here — nothing is padded out.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {skills.length} skills
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {categories.length} categories
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Real entries
                </p>
              </div>
            </div>

            {/* Category list */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {categories.map((category, i) => {
                const Icon = categoryIcons[category] || Layers;
                return (
                  <div key={category} className="flex items-center gap-2 group cursor-default">
                    <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                    <Icon className="h-3 w-3 text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors" strokeWidth={1.75} />
                    <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors truncate max-w-[7rem]">
                      {category}
                    </span>
                    <span className="ml-auto text-[8px] text-accent-indigo/15 group-hover:text-accent-indigo/30 transition-colors">
                      {grouped[category]!.length}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Skills Accordion ══ */}
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

            {categories.length === 0 ? (
              <Reveal delay={0.08}>
                <div
                  className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
                  style={{ boxShadow: panelShadow }}
                >
                  <Layers className="h-10 w-10 text-accent-indigo/30 mx-auto mb-4" strokeWidth={1.5} />
                  <p className="text-sm text-text-secondary max-w-sm mx-auto">
                    Skills will appear here once published.
                  </p>
                </div>
              </Reveal>
            ) : (
              <div className="flex flex-col gap-3.5">
                <div
                  className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm"
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

                  <div className="relative divide-y divide-accent-indigo/8">
                    {categories.map((category, ci) => {
                      const Icon = categoryIcons[category] || Layers;
                      const colorClass = categoryColors[category] || "from-accent-indigo/20 to-accent-indigo/10";
                      const skillCount = 	grouped[category]!.length;
                      
                      return (
                        <div key={category} className="group">
                          <Accordion type="multiple" defaultValue={[categories[0]!]}>
                            <AccordionItem value={category} className="border-0">
                              <AccordionTrigger className="px-5 sm:px-6 py-4 sm:py-5 hover:no-underline hover:bg-accent-indigo/[0.03] transition-colors duration-200">
                                <div className="flex items-center gap-3 w-full">
                                  {/* Icon */}
                                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-gradient-to-br ${colorClass} group-hover:border-accent-indigo/25 transition-all duration-300`}>
                                    <Icon className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                                  </div>
                                  
                                  {/* Category name */}
                                  <span className="font-semibold text-sm sm:text-base text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                                    {category}
                                  </span>
                                  
                                  {/* Count */}
                                  <span className="ml-auto font-mono text-[10px] text-accent-indigo/30 group-hover:text-accent-indigo/50 transition-colors duration-300">
                                    {skillCount} skill{skillCount !== 1 ? 's' : ''}
                                  </span>
                                  
                                  {/* Chevron */}
                                  <ChevronDown className="h-4 w-4 text-text-muted/30 group-hover:text-accent-indigo/50 transition-all duration-300 shrink-0" strokeWidth={1.75} />
                                </div>
                              </AccordionTrigger>
                              
                              <AccordionContent>
                                <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                                  <div className="flex flex-wrap gap-2">
                                    {grouped[category]!.map((skill, si) => (
                                      <div
                                        key={skill.id}
                                        className="group/skill relative inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/10 bg-bg-surface-1/50 px-3.5 py-1.5 text-sm transition-all duration-300 hover:border-accent-indigo/30 hover:bg-accent-indigo/[0.05] hover:shadow-sm hover:shadow-accent-indigo/5 hover:-translate-y-0.5"
                                        title={skill.description ?? undefined}
                                      >
                                        <span className="text-text-secondary group-hover/skill:text-accent-indigo transition-colors duration-300">
                                          {skill.name}
                                        </span>
                                        {skill.level && (
                                          <span className={`text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${
                                            skill.level === "ADVANCED" ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-500/60" :
                                            skill.level === "INTERMEDIATE" ? "border-blue-500/20 bg-blue-500/10 text-blue-500/60" :
                                            skill.level === "BEGINNER" ? "border-amber-500/20 bg-amber-500/10 text-amber-500/60" :
                                            "border-violet-500/20 bg-violet-500/10 text-violet-500/60"
                                          }`}>
                                            {LEVEL_LABEL[skill.level]}
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* bottom strip */}
                <div className="mt-0.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                  <p className="font-mono text-[11px] text-text-muted">
                    ECOSYSTEM · {skills.length} SKILLS · {categories.length} CATEGORIES
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
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}