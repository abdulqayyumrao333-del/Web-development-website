import { Reveal } from "@/components/sections/reveal";
import { ENGINEERING_PRINCIPLES } from "@/config/engineering-principles";
import { ArrowRight, CheckCircle, Code, Zap, Shield, Sparkles } from "lucide-react";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// Additional content for featured cards
const FEATURED_CONTENT = {
  0: { // Clean Code
    tag: "Core Principle",
    metrics: [
      { label: "Readability", value: "95%" },
      { label: "Maintainability", value: "90%" },
      { label: "Test Coverage", value: "85%" },
    ],
    quote: "Code is read more than it's written.",
  },
  7: { // Problem-First Thinking
    tag: "Core Principle",
    metrics: [
      { label: "Problem Understanding", value: "98%" },
      { label: "Solution Efficiency", value: "92%" },
      { label: "User Impact", value: "90%" },
    ],
    quote: "A well-defined problem is already half-solved.",
  },
};

export function EngineeringPrinciplesBento() {
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
                Engineering Principles
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                The same
                <br />
                <span className="text-accent-indigo">principles</span>
                <br />
                from every angle
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Core engineering principles that guide every decision, every line of code.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {ENGINEERING_PRINCIPLES.length} principles
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Battle-tested
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Applied daily
                </p>
              </div>
            </div>

            {/* Principles list */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {ENGINEERING_PRINCIPLES.map(({ title }, i) => (
                <div key={title} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors truncate">
                    {title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Bento Grid ══ */}
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

            <div className="grid auto-rows-[160px] grid-cols-2 sm:grid-cols-4 gap-3.5">
              {ENGINEERING_PRINCIPLES.map(({ icon: Icon, title }, i) => {
                const isFirst = i === 0;
                const isLast = i === ENGINEERING_PRINCIPLES.length - 1;
                const isFeatured = isFirst || isLast;
                const spanClass = isFeatured ? "col-span-2 row-span-2" : "col-span-2 sm:col-span-1";
                const heightClass = isFeatured ? "h-[340px]" : "h-[160px]";
                const featuredContent = FEATURED_CONTENT[i as keyof typeof FEATURED_CONTENT];
                
                return (
                  <Reveal key={title} delay={0.12 + i * 0.05} className={spanClass}>
                    <div
                      className={`group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-xl hover:shadow-accent-indigo/5 hover:-translate-y-1 p-6 flex flex-col ${heightClass}`}
                      style={{ boxShadow: panelShadow }}
                    >
                      {/* Animated gradient overlay */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.05] via-transparent to-transparent"
                      />

                      {/* diagonal texture */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
                        }}
                      />

                      {/* bracket - animated */}
                      <div
                        aria-hidden
                        className={`absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none ${isFeatured ? 'top-4 right-4 h-5 w-5' : ''}`}
                      />

                      {/* icon with ring */}
                      <div className="relative">
                        <div className="absolute inset-[-6px] rounded-xl border border-accent-indigo/0 group-hover:border-accent-indigo/10 transition-all duration-500 scale-75 group-hover:scale-100" />
                        <div className={`relative flex items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/14 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-indigo/10 ${isFeatured ? 'h-12 w-12' : 'h-10 w-10'}`}>
                          <Icon className={`${isFeatured ? 'h-5 w-5' : 'h-4 w-4'} text-accent-indigo`} strokeWidth={1.75} />
                        </div>
                      </div>

                      {/* content */}
                      <div className="flex-1 flex flex-col justify-end mt-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={`font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300 ${isFeatured ? 'text-base sm:text-lg' : 'text-sm'}`}>
                              {title}
                            </p>
                            
                            {/* ── FEATURED CONTENT ── */}
                            {isFeatured && featuredContent && (
                              <div className="mt-3 space-y-2">
                                {/* Tag */}
                                <span className="inline-block text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-accent-indigo/15 bg-accent-indigo/[0.05] text-accent-indigo/50">
                                  {featuredContent.tag}
                                </span>
                                
                                {/* Metrics */}
                                <div className="flex gap-3">
                                  {featuredContent.metrics.map((metric) => (
                                    <div key={metric.label} className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[9px] font-mono text-text-muted/40">
                                          {metric.label}
                                        </span>
                                        <span className="text-[10px] font-mono text-accent-indigo/60">
                                          {metric.value}
                                        </span>
                                      </div>
                                      <div className="mt-0.5 h-1 w-full rounded-full bg-accent-indigo/8 overflow-hidden">
                                        <div 
                                          className="h-full rounded-full bg-gradient-to-r from-accent-indigo/40 to-accent-indigo transition-all duration-1000 group-hover:opacity-100"
                                          style={{ width: metric.value }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Quote */}
                                <div className="flex items-start gap-1.5 pt-1">
                                  <span className="text-accent-indigo/20 text-sm font-serif leading-none">"</span>
                                  <p className="text-[10px] text-text-muted/60 italic leading-relaxed">
                                    {featuredContent.quote}
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          <span className="font-mono text-[9px] text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* bottom accent line on hover */}
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                        
                        {/* arrow on hover for featured cards */}
                        {isFeatured && (
                          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                            <ArrowRight className="h-4 w-4 text-accent-indigo/30" strokeWidth={1.5} />
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                PRINCIPLES · {ENGINEERING_PRINCIPLES.length} CORE · BATTLE-TESTED
              </p>
              <div className="flex gap-1">
                {ENGINEERING_PRINCIPLES.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 || i === ENGINEERING_PRINCIPLES.length - 1 ? "1.25rem" : "0.5rem",
                      backgroundColor: `rgb(99 102 241 / ${i === 0 || i === ENGINEERING_PRINCIPLES.length - 1 ? 0.65 : Math.max(0.10, 0.40 - i * 0.05)})`,
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