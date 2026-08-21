import { Reveal } from "@/components/sections/reveal";
import { ArrowRight, Target, Rocket, Sparkles, Zap, Globe, Users, ChevronRight } from "lucide-react";

const ROADMAP = [
  {
    goal: "Become an Expert Full Stack Engineer",
    detail: "Master the full spectrum — frontend, backend, infrastructure, and everything in between.",
    code: "SKILL",
    icon: Target,
  },
  {
    goal: "Build AI Products",
    detail: "Ship real AI-powered tools that solve actual business problems, not demos.",
    code: "AI",
    icon: Sparkles,
  },
  {
    goal: "Launch SaaS Products",
    detail: "Build and own software products with recurring revenue and real users.",
    code: "SAAS",
    icon: Rocket,
  },
  {
    goal: "Grow Qaynova",
    detail: "Turn Qaynova Agency into a recognized name in digital product development.",
    code: "QNV",
    icon: Zap,
  },
  {
    goal: "Build a Global Software Company",
    detail: "Scale from agency to a product company operating across borders.",
    code: "GLOBAL",
    icon: Globe,
  },
  {
    goal: "Mentor Future Developers",
    detail: "Give back by helping the next generation find their footing in software.",
    code: "MENTOR",
    icon: Users,
  },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function Roadmap() {
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
          className="absolute bottom-0 right-0 h-[400px] w-[500px]"
          style={{
            background:
              "radial-gradient(50% 60% at 100% 100%, rgba(79,70,229,0.07) 0%, transparent 100%)",
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
                Long-Term Direction
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Where
                <br />
                <span className="text-accent-indigo">this is</span>
                <br />
                heading
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Goals I'm working toward — a direction, not a résumé.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {ROADMAP.length} goals
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  In progress
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Long horizon
                </p>
              </div>
            </div>

            {/* step index — desktop only */}
            <div className="mt-8 hidden lg:flex flex-col gap-2">
              {ROADMAP.map(({ code }, i) => (
                <div key={code} className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-accent-indigo/35 w-4 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/20" />
                  <span className="font-mono text-[10px] text-text-muted/50 uppercase tracking-wider">
                    {code}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT — roadmap rows ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            {/* single card wrapping all rows */}
            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm"
              style={{ boxShadow: panelShadow }}
            >
              {/* diagonal texture — top */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              {/* rows */}
              <ol className="relative divide-y divide-accent-indigo/8">
                {ROADMAP.map(({ goal, detail, code, icon: Icon }, i) => {
                  const isFirst = i === 0;
                  const isLast = i === ROADMAP.length - 1;
                  return (
                    <Reveal key={code} delay={0.12 + i * 0.06}>
                      <li className="group relative flex items-start gap-4 px-6 py-5 sm:px-8 sm:py-6 transition-all duration-300 hover:bg-accent-indigo/[0.03]">

                        {/* hover wash with gradient */}
                        <div
                          aria-hidden
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent-indigo/[0.04] to-transparent"
                        />

                        {/* step number with icon */}
                        <div
                          className={[
                            "relative shrink-0 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 mt-0.5",
                            isFirst
                              ? "border-accent-indigo/40 bg-accent-indigo/12 shadow-md shadow-accent-indigo/10"
                              : "border-accent-indigo/14 bg-bg-surface-1 group-hover:border-accent-indigo/30 group-hover:bg-accent-indigo/8",
                          ].join(" ")}
                        >
                          {isFirst ? (
                            <Icon className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                          ) : (
                            <span
                              className={[
                                "font-mono text-[11px] font-semibold transition-colors duration-300",
                                isFirst
                                  ? "text-accent-indigo"
                                  : "text-accent-indigo/40 group-hover:text-accent-indigo/70",
                              ].join(" ")}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          )}

                          {/* first step pulse ring */}
                          {isFirst && (
                            <span className="absolute -inset-1 rounded-xl border border-accent-indigo/20 animate-pulse pointer-events-none" />
                          )}
                        </div>

                        {/* connector line */}
                        {!isLast && (
                          <div className="absolute left-[3.4rem] top-[4.2rem] w-px h-[calc(100%-2.5rem)] bg-gradient-to-b from-accent-indigo/15 to-transparent" />
                        )}

                        {/* content */}
                        <div className="relative flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-sm sm:text-base leading-snug text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                                {goal}
                              </p>
                              <p className="mt-1.5 text-sm text-text-secondary leading-relaxed">
                                {detail}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 mt-0.5">
                              <span className="hidden sm:block font-mono text-[10px] uppercase tracking-widest text-accent-indigo/25 group-hover:text-accent-indigo/50 transition-colors duration-300">
                                {code}
                              </span>
                              <ChevronRight
                                className="h-4 w-4 text-accent-indigo/0 group-hover:text-accent-indigo/40 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
                                strokeWidth={2}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    </Reveal>
                  );
                })}
              </ol>

              {/* bottom strip */}
              <div className="flex items-center justify-between border-t border-accent-indigo/10 bg-accent-indigo/[0.025] px-6 py-2.5 sm:px-8">
                <p className="font-mono text-[11px] text-text-muted">
                  ROADMAP · {ROADMAP.length} GOALS · LONG HORIZON
                </p>
                <div className="flex gap-1">
                  {ROADMAP.map((_, i) => (
                    <span
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: i === 0 ? "1.25rem" : "0.375rem",
                        backgroundColor:
                          i === 0
                            ? "rgb(99 102 241 / 0.65)"
                            : `rgb(99 102 241 / ${Math.max(0.08, 0.28 - i * 0.04)})`,
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