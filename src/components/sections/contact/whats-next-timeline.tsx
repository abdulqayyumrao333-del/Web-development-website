import { Send, Search, MessagesSquare, ClipboardList, Code2, ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const STEPS = [
  { icon: Send, title: "You send a message", description: "Share your project idea, requirements, and timeline" },
  { icon: Search, title: "I review your requirements", description: "I analyze your needs and ask clarifying questions" },
  { icon: MessagesSquare, title: "We discuss the project", description: "Deep dive into scope, budget, and deliverables" },
  { icon: ClipboardList, title: "Planning & proposal", description: "Detailed plan, timeline, and proposal prepared" },
  { icon: Code2, title: "Development begins", description: "Your project moves into active development" },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function WhatsNextTimeline() {
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
                What Happens Next
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                From message
                <br />
                <span className="text-accent-indigo">to first commit</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              A clear, transparent process from your first message to the first line of code.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {STEPS.length} steps
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Clear process
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Transparent
                </p>
              </div>
            </div>

            {/* Step indicators */}
            <div className="mt-8 hidden lg:flex flex-col gap-2">
              {STEPS.map(({ title }, i) => (
                <div key={title} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors truncate max-w-[7rem]">
                    {title}
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

              <ol className="relative divide-y divide-accent-indigo/8">
                {STEPS.map(({ icon: Icon, title, description }, i) => {
                  const isFirst = i === 0;
                  const isLast = i === STEPS.length - 1;
                  
                  return (
                    <Reveal key={title} delay={0.12 + i * 0.06}>
                      <li className="group relative flex items-start gap-4 px-6 py-5 sm:px-8 sm:py-6 transition-colors duration-200 hover:bg-accent-indigo/[0.03]">
                        
                        {/* hover wash */}
                        <div
                          aria-hidden
                          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent-indigo/[0.04] to-transparent"
                        />

                        {/* step number with icon */}
                        <div
                          className={[
                            "relative shrink-0 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 mt-0.5",
                            isFirst
                              ? "border-accent-indigo/40 bg-accent-indigo/12 shadow-md shadow-accent-indigo/10"
                              : isLast
                              ? "border-emerald-500/30 bg-emerald-500/8 group-hover:bg-emerald-500/14"
                              : "border-accent-indigo/14 bg-bg-surface-1 group-hover:border-accent-indigo/30 group-hover:bg-accent-indigo/8",
                          ].join(" ")}
                        >
                          <Icon
                            className={[
                              "h-4.5 w-4.5 transition-colors duration-300",
                              isFirst
                                ? "text-accent-indigo"
                                : isLast
                                ? "text-emerald-500"
                                : "text-accent-indigo/40 group-hover:text-accent-indigo",
                            ].join(" ")}
                            strokeWidth={1.75}
                          />
                          {/* first step pulse ring */}
                          {isFirst && (
                            <span className="absolute -inset-1 rounded-xl border border-accent-indigo/20 animate-pulse pointer-events-none" />
                          )}
                          {/* last step shine */}
                          {isLast && (
                            <span className="absolute -inset-1 rounded-xl border border-emerald-500/20 animate-pulse pointer-events-none" />
                          )}
                        </div>

                        {/* content */}
                        <div className="relative flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-semibold text-sm sm:text-base text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                              {title}
                            </p>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="font-mono text-[10px] text-accent-indigo/25 group-hover:text-accent-indigo/45 transition-colors">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {i < STEPS.length - 1 && (
                                <ArrowRight className="h-3.5 w-3.5 text-accent-indigo/15 group-hover:text-accent-indigo/30 transition-colors" strokeWidth={1.5} />
                              )}
                              {isLast && (
                                <Sparkles className="h-3.5 w-3.5 text-emerald-500/30" strokeWidth={1.5} />
                              )}
                            </div>
                          </div>
                          <p className="mt-1 text-xs sm:text-sm text-text-muted group-hover:text-text-secondary transition-colors duration-300">
                            {description}
                          </p>
                        </div>
                      </li>
                    </Reveal>
                  );
                })}
              </ol>

              {/* bottom strip */}
              <div className="flex items-center justify-between border-t border-accent-indigo/10 bg-accent-indigo/[0.025] px-6 py-2.5 sm:px-8">
                <p className="font-mono text-[11px] text-text-muted">
                  PROCESS · {STEPS.length} STEPS · CLEAR PATH
                </p>
                <div className="flex gap-1">
                  {STEPS.map((_, i) => (
                    <span
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        width: i === 0 ? "1.25rem" : i === STEPS.length - 1 ? "1.25rem" : "0.5rem",
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}