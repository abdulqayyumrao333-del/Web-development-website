import {
  Search, BookOpen, ClipboardList, Palette,
  Code2, TestTube2, Rocket, Wrench,
  ArrowRight, Sparkles
} from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const STEPS = [
  { icon: Search,        title: "Discover",     detail: "Understand the problem before touching a keyboard.", phase: "Research" },
  { icon: BookOpen,      title: "Research",     detail: "Study constraints, prior art, and best approaches.", phase: "Research" },
  { icon: ClipboardList, title: "Planning",     detail: "Architecture, scope, and timeline defined up front.", phase: "Planning" },
  { icon: Palette,       title: "UI / UX",      detail: "Design the experience before writing production code.", phase: "Design" },
  { icon: Code2,         title: "Development",  detail: "Build incrementally, commit often, review continuously.", phase: "Build" },
  { icon: TestTube2,     title: "Testing",      detail: "Unit, integration, and manual QA at every layer.", phase: "Build" },
  { icon: Rocket,        title: "Deployment",   detail: "Ship to production with CI/CD and zero downtime.", phase: "Ship" },
  { icon: Wrench,        title: "Maintenance",  detail: "Monitor, iterate, and improve based on real feedback.", phase: "Ship" },
];

// Phase colors
const phaseColors: Record<string, string> = {
  "Research": "from-blue-500/20 to-cyan-500/20",
  "Planning": "from-indigo-500/20 to-purple-500/20",
  "Design": "from-rose-500/20 to-pink-500/20",
  "Build": "from-emerald-500/20 to-teal-500/20",
  "Ship": "from-amber-500/20 to-orange-500/20",
};

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function WorkflowTimeline() {
  // Get unique phases
  const phases = [...new Set(STEPS.map(s => s.phase))];

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
          className="absolute inset-x-0 top-0 h-[400px]"
          style={{
            background:
              "radial-gradient(50% 70% at 30% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
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
                How I Work
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                From idea
                <br />
                <span className="text-accent-indigo">to maintained</span>
                <br />
                product
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Eight deliberate steps — none skipped, none rushed.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {STEPS.length} stages
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Every project
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  In this order
                </p>
              </div>
            </div>

            {/* Phase indicators */}
            <div className="mt-8 hidden lg:flex flex-col gap-2">
              {phases.map((phase, i) => (
                <div key={phase} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 uppercase tracking-wider transition-colors">
                    {phase}
                  </span>
                  <span className="ml-auto text-[8px] text-accent-indigo/15 group-hover:text-accent-indigo/30 transition-colors">
                    {STEPS.filter(s => s.phase === phase).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT — pipeline ══ */}
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

            {/* single card — all steps as cards */}
            <div className="flex flex-col gap-3">
              {STEPS.map(({ icon: Icon, title, detail, phase }, i) => {
                const phaseColor = phaseColors[phase] || "from-accent-indigo/20 to-accent-indigo/10";
                const isFirst = i === 0;
                const isLast = i === STEPS.length - 1;
                const phaseSteps = STEPS.filter(s => s.phase === phase);
                const stepInPhase = phaseSteps.findIndex(s => s.title === title) + 1;

                return (
                  <Reveal key={title} delay={0.12 + i * 0.055}>
                    <div
                      className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 sm:p-5"
                      style={{ boxShadow: panelShadow }}
                    >
                      {/* Animated gradient overlay */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
                      />

                      {/* Phase color strip - top */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${phaseColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
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

                      {/* bracket - small */}
                      <div
                        aria-hidden
                        className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                      />

                      <div className="relative flex items-center gap-4">
                        {/* Step number with icon */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="relative">
                            <div className="absolute inset-0 rounded-lg bg-accent-indigo/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className={`relative flex h-10 w-10 items-center justify-center rounded-lg border border-accent-indigo/15 bg-gradient-to-br ${phaseColor} group-hover:border-accent-indigo/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-indigo/10`}>
                              <Icon className="h-4.5 w-4.5 text-accent-indigo" strokeWidth={1.75} />
                            </div>
                          </div>
                          
                          {/* Phase badge */}
                          <span className="hidden sm:inline-block text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-accent-indigo/8 bg-accent-indigo/[0.03] text-accent-indigo/30 group-hover:text-accent-indigo/50 group-hover:border-accent-indigo/15 transition-colors">
                            {phase}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm sm:text-base text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                                {title}
                              </span>
                              <span className="text-[9px] font-mono text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-text-muted/20 group-hover:text-text-muted/40 transition-colors">
                              {stepInPhase}/{phaseSteps.length}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-text-muted leading-relaxed mt-0.5 group-hover:text-text-secondary transition-colors duration-300">
                            {detail}
                          </p>
                        </div>

                        {/* Arrow on hover */}
                        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                          <ArrowRight className="h-4 w-4 text-accent-indigo/30" strokeWidth={1.75} />
                        </div>
                      </div>

                      {/* Progress bar at bottom */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/30 to-transparent transition-all duration-700 rounded-b-full" />
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                WORKFLOW · {STEPS.length} STAGES · {phases.length} PHASES
              </p>
              <div className="flex gap-1">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 ? "1rem" : i === STEPS.length - 1 ? "1rem" : "0.5rem",
                      backgroundColor:
                        i === 0
                          ? "rgb(99 102 241 / 0.65)"
                          : i === STEPS.length - 1
                          ? "rgb(34 197 94 / 0.55)"
                          : `rgb(99 102 241 / ${Math.max(0.08, 0.35 - i * 0.04)})`,
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