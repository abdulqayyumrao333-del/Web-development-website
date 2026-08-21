import { Layers, Clock, Puzzle, Sparkles, Plug, ArrowRight, CheckCircle } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import Link from "next/link";

const FACTORS = [
  { icon: Layers, label: "Scope", description: "Project size & requirements" },
  { icon: Clock, label: "Timeline", description: "Deadlines & delivery" },
  { icon: Puzzle, label: "Complexity", description: "Technical challenges" },
  { icon: Sparkles, label: "Features", description: "Core functionality" },
  { icon: Plug, label: "Integrations", description: "Third-party connections" },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function PricingPhilosophy() {
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
                Pricing
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                How pricing
                <br />
                <span className="text-accent-indigo">actually works</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Every project is unique — pricing is tailored to your specific needs, not a one-size-fits-all table.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {FACTORS.length} factors
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Custom quotes
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Transparent
                </p>
              </div>
            </div>

            {/* Factor list */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {FACTORS.map(({ icon: Icon, label }, i) => (
                <div key={label} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <Icon className="h-3 w-3 text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors" strokeWidth={1.75} />
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors">
                    {label}
                  </span>
                </div>
              ))}
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

            {/* ── Description Card ── */}
            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8 mb-4"
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

              {/* bracket */}
              <div
                aria-hidden
                className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
              />

              <div className="relative">
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
                  Every project is different, so there's no fixed price list here — a landing page
                  and a full SaaS platform aren't comparable, and pretending otherwise with a
                  generic pricing table would misrepresent both. Instead, pricing is worked out per
                  project based on:
                </p>

                {/* Factors Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {FACTORS.map(({ icon: Icon, label, description }, i) => (
                    <div
                      key={label}
                      className="group/factor relative overflow-hidden rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 p-3 text-center transition-all duration-300 hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.03]"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Icon className="h-4 w-4 text-accent-indigo/60 group-hover/factor:text-accent-indigo transition-colors" strokeWidth={1.75} />
                        <p className="text-xs font-medium text-text-primary group-hover/factor:text-accent-indigo transition-colors">
                          {label}
                        </p>
                        <p className="text-[8px] text-text-muted/40 group-hover/factor:text-text-muted/60 transition-colors hidden sm:block">
                          {description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* bottom accent line */}
                <div className="mt-6 h-px w-12 rounded-full bg-accent-indigo/20" />
              </div>
            </div>

            {/* ── CTA Card ── */}
            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-accent-indigo/[0.03] to-bg-surface-1/50 p-5 sm:p-6"
              style={{ boxShadow: panelShadow }}
            >
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8">
                    <CheckCircle className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Ready for a quote?
                    </p>
                    <p className="text-xs text-text-muted/60">
                      Use the Project Estimator or reach out directly
                    </p>
                  </div>
                </div>
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm shadow-md shadow-accent-indigo/20 hover:shadow-lg hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5">
                    Get a Quote
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}