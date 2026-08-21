import { Reveal } from "@/components/sections/reveal";
import { Check, Shield, Code, Sparkles, Zap, ArrowRight } from "lucide-react";

const PRINCIPLES = [
  { 
    label: "Reliable", 
    desc: "Proven in production, not just trending on X.",
    icon: Shield,
  },
  { 
    label: "Maintainable", 
    desc: "Code someone else — or future me — can understand.",
    icon: Code,
  },
  { 
    label: "Appropriate", 
    desc: "Right tool for the job, not the flashiest one.",
    icon: Zap,
  },
  { 
    label: "Simple", 
    desc: "Complexity is a cost. Simplicity is a choice.",
    icon: Sparkles,
  },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function TechnologyPhilosophy() {
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
              "radial-gradient(40% 60% at 70% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
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
                Philosophy
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                How I
                <br />
                <span className="text-accent-indigo">choose</span>
                <br />
                what to
                <br />
                build with
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              My approach to technology selection — built on experience, not hype.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Opinion, not rules
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Applied to every project
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Earned through mistakes
                </p>
              </div>
            </div>

            {/* Principles counter */}
            <div className="mt-8 hidden lg:flex items-center gap-3">
              <div className="flex -space-x-1">
                {PRINCIPLES.map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full border border-bg-primary"
                    style={{
                      backgroundColor: `rgb(99 102 241 / ${0.65 - i * 0.12})`,
                    }}
                  />
                ))}
              </div>
              <span className="font-mono text-[10px] text-text-muted/40">
                {PRINCIPLES.length} principles
              </span>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div className="flex flex-col gap-3.5">

              {/* ── Pull-quote card ── */}
              <div
                className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-500 hover:border-accent-indigo/30 hover:shadow-2xl hover:shadow-accent-indigo/10"
                style={{ boxShadow: panelShadow }}
              >
                {/* animated gradient overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
                />

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

                {/* bracket */}
                <div
                  aria-hidden
                  className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-all duration-300 pointer-events-none group-hover:h-8 group-hover:w-8"
                />

                {/* large decorative quote mark */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -top-4 right-10 select-none font-mono text-[8rem] font-bold leading-none text-accent-indigo/[0.04] group-hover:text-accent-indigo/[0.08] transition-colors duration-700"
                >
                  "
                </span>

                <div className="relative px-7 py-8 sm:px-10 sm:py-10 space-y-4">
                  <Reveal delay={0.14}>
                    <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
                      I don't choose technologies simply because they're popular.
                      I prefer technologies that are{" "}
                      <span className="font-semibold text-text-primary">
                        reliable, well-documented, maintainable,
                      </span>{" "}
                      and appropriate for the project's actual requirements.
                    </p>
                  </Reveal>

                  <Reveal delay={0.19}>
                    <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
                      My focus is on writing{" "}
                      <span className="font-semibold text-text-primary">
                        clean, scalable software
                      </span>{" "}
                      rather than chasing every new framework that shows up on my timeline.
                    </p>
                  </Reveal>

                  <Reveal delay={0.24}>
                    <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
                      Whenever possible, I prioritize{" "}
                      <span className="font-semibold text-text-primary">
                        simplicity, long-term maintainability, performance,
                      </span>{" "}
                      and developer experience — in that order of consideration, not as an afterthought.
                    </p>
                  </Reveal>

                  {/* Bottom accent line */}
                  <div className="pt-2">
                    <div className="h-px w-12 rounded-full bg-accent-indigo/20 group-hover:w-24 transition-all duration-700" />
                  </div>
                </div>
              </div>

              {/* ── Four principle cards ── */}
              <Reveal delay={0.28}>
                <div className="grid grid-cols-2 gap-2.5">
                  {PRINCIPLES.map(({ label, desc, icon: Icon }, i) => (
                    <div
                      key={label}
                      className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/90 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-4 sm:p-5"
                      style={{ boxShadow: panelShadow }}
                    >
                      {/* hover gradient */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] to-transparent"
                      />

                      {/* diagonal texture */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 top-0 h-16 opacity-[0.3]"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(135deg, rgba(99,102,241,0.06) 0px, rgba(99,102,241,0.06) 1px, transparent 1px, transparent 12px)",
                          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                        }}
                      />

                      {/* bracket - small */}
                      <div
                        aria-hidden
                        className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                      />

                      <div className="relative flex flex-col gap-2.5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-110">
                              <Icon className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                            </div>
                            <span className="font-semibold text-sm text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                              {label}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors duration-300">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <p className="text-xs text-text-muted leading-relaxed">
                          {desc}
                        </p>

                        {/* Checkmark on hover */}
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Check className="h-3 w-3 text-accent-indigo/30" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* bottom strip */}
              <div className="flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                <p className="font-mono text-[11px] text-text-muted">
                  TECH · PHILOSOPHY · {PRINCIPLES.length} PRINCIPLES
                </p>
                <div className="flex gap-1">
                  {[0.65, 0.35, 0.20, 0.10].map((o, i) => (
                    <span
                      key={i}
                      className="h-1 w-3 rounded-full"
                      style={{ backgroundColor: `rgb(99 102 241 / ${o})` }}
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