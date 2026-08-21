import { Reveal } from "@/components/sections/reveal";
import { ArrowRight, Target, Eye, Lightbulb } from "lucide-react";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function MissionVision() {
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
              "radial-gradient(40% 70% at 50% 0%, rgba(79,70,229,0.07) 0%, transparent 100%)",
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
                Mission & Vision
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Purpose
                <br />
                <span className="text-accent-indigo">&amp; direction</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              The guiding principles that define my work and where I'm headed as an engineer.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Mission + Vision
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Clear direction
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Purpose driven
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Content ══ */}
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

            {/* ── Mission + Vision — two editorial columns ── */}
            <div className="grid gap-4 md:grid-cols-2">
              
              {/* MISSION CARD */}
              <Reveal>
                <div className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-7 sm:p-9 transition-all duration-300 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5">
                  
                  {/* gradient overlay on hover */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] to-transparent"
                  />

                  {/* top-right bracket */}
                  <div
                    aria-hidden
                    className="absolute top-4 right-4 h-5 w-5 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-colors duration-300 pointer-events-none"
                  />

                  {/* icon */}
                  <div className="relative flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-indigo/10 border border-accent-indigo/15">
                      <Target className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-indigo">
                      Mission
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-accent-indigo/30">01</span>
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
                    Build <span className="font-semibold text-text-primary">reliable, scalable</span>, and 
                    <span className="font-semibold text-text-primary"> user-focused</span> software that solves
                    <span className="font-semibold text-text-primary"> real problems</span> through 
                    <span className="font-semibold text-text-primary"> thoughtful engineering</span> and modern technology.
                  </p>

                  {/* bottom accent line with arrow */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-accent-indigo/40 to-transparent" />
                    <ArrowRight className="h-4 w-4 text-accent-indigo/40 group-hover:text-accent-indigo/70 group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
                  </div>
                </div>
              </Reveal>

              {/* VISION CARD */}
              <Reveal delay={0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-7 sm:p-9 transition-all duration-300 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5">
                  
                  {/* gradient overlay on hover */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] to-transparent"
                  />

                  {/* top-right bracket */}
                  <div
                    aria-hidden
                    className="absolute top-4 right-4 h-5 w-5 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-colors duration-300 pointer-events-none"
                  />

                  {/* icon */}
                  <div className="relative flex items-center gap-3 mb-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-indigo/10 border border-accent-indigo/15">
                      <Eye className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-indigo">
                      Vision
                    </span>
                    <span className="ml-auto font-mono text-[10px] text-accent-indigo/30">02</span>
                  </div>

                  <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
                    Become a <span className="font-semibold text-text-primary">highly skilled</span> software engineer, 
                    build <span className="font-semibold text-text-primary">impactful AI-powered</span> products, 
                    and 
                    contribute <span className="font-semibold text-text-primary">meaningful solutions</span> used around the world.
                  </p>

                  {/* bottom accent line with arrow */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-accent-indigo/40 to-transparent" />
                    <ArrowRight className="h-4 w-4 text-accent-indigo/40 group-hover:text-accent-indigo/70 group-hover:translate-x-1 transition-all duration-300" strokeWidth={1.5} />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── Philosophy Card ── */}
            <Reveal delay={0.15}>
              <div className="group relative mt-4 overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-7 sm:p-9 transition-all duration-300 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5">
                
                {/* gradient overlay on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] to-transparent"
                />

                {/* top-right bracket */}
                <div
                  aria-hidden
                  className="absolute top-4 right-4 h-5 w-5 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-colors duration-300 pointer-events-none"
                />

                {/* header with icon */}
                <div className="relative flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-indigo/10 border border-accent-indigo/15">
                    <Lightbulb className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-indigo">
                    Problem-Solving Philosophy
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-accent-indigo/30">03</span>
                </div>

                <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
                  Every successful project starts with <span className="font-semibold text-text-primary">understanding the real problem</span> 
                  before writing any code. I prefer <span className="font-semibold text-text-primary">planning first</span>, 
                  <span className="font-semibold text-text-primary"> building incrementally</span>, 
                  <span className="font-semibold text-text-primary"> testing continuously</span>, and 
                  <span className="font-semibold text-text-primary"> improving through feedback</span> rather than rushing to complete features.
                </p>

                {/* philosophy chips with icons */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { label: "Plan first", icon: "→" },
                    { label: "Build incrementally", icon: "→" },
                    { label: "Test continuously", icon: "→" },
                    { label: "Improve through feedback", icon: "→" },
                  ].map((p) => (
                    <span
                      key={p.label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/15 bg-accent-indigo/[0.04] px-3.5 py-1.5 font-mono text-[11px] text-accent-indigo/70 hover:bg-accent-indigo/[0.08] hover:border-accent-indigo/25 transition-all duration-300"
                    >
                      <span className="text-accent-indigo/40">{p.icon}</span>
                      {p.label}
                    </span>
                  ))}
                </div>

                {/* bottom accent line */}
                <div className="mt-6 h-px w-16 rounded-full bg-accent-indigo/30 group-hover:w-32 transition-all duration-500" />
              </div>
            </Reveal>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                MISSION · VISION · PHILOSOPHY
              </p>
              <div className="flex gap-1">
                {[0.65, 0.40, 0.20].map((o, i) => (
                  <span
                    key={i}
                    className="h-1 w-4 rounded-full"
                    style={{ backgroundColor: `rgb(99 102 241 / ${o})` }}
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