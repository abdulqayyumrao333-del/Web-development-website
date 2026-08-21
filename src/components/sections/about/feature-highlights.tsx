import { Check } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const FEATURES = [
  {
    title: "Clean Code",
    detail: "Readable, maintainable, well-structured.",
  },
  {
    title: "Fast Communication",
    detail: "Updates before you have to ask.",
  },
  {
    title: "Performance Focus",
    detail: "Optimised from day one, not retrofitted.",
  },
  {
    title: "SEO Friendly",
    detail: "Semantic HTML, meta, and Core Web Vitals.",
  },
  {
    title: "Modern Stack",
    detail: "Right tool for the job, every time.",
  },
  {
    title: "Mobile First",
    detail: "Designed for thumbs, enhanced for desktops.",
  },
  {
    title: "Long-term Support",
    detail: "I don't disappear after delivery.",
  },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function FeatureHighlights() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* ── Full-bleed background — consistent with site system ── */}
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
        {/* glow — bottom-right this time for section variety */}
        <div
          className="absolute inset-x-0 bottom-0 h-[380px]"
          style={{
            background:
              "radial-gradient(55% 100% at 85% 100%, rgba(79,70,229,0.06) 0%, transparent 100%)",
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
                What You Get
              </p>
            </div>

            <div className="relative mb-4">
              
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Working
                <br />
                <span className="text-accent-indigo">with me,</span>
                <br />
                in practice
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mt-3 max-w-[13rem]">
              Not just deliverables — a working style you'll actually want to hire again.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {FEATURES.length} guarantees
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Every project
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  No exceptions
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT — feature rows ══ */}
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

            {/* single card wrapping all rows */}
            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm"
              style={{ boxShadow: panelShadow }}
            >
              {/* diagonal texture — top only */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-[0.4]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              {/* feature rows */}
              <ul className="relative divide-y divide-accent-indigo/8">
                {FEATURES.map(({ title, detail }, i) => (
                  <Reveal key={title} delay={0.12 + i * 0.04}>
                    <li className="group flex items-center gap-4 px-6 py-4 sm:px-8 sm:py-5 transition-colors duration-200 hover:bg-accent-indigo/[0.03]">

                      {/* index */}
                      <span className="shrink-0 font-mono text-[11px] text-accent-indigo/30 group-hover:text-accent-indigo/60 transition-colors duration-200 w-5 text-right select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* check icon */}
                      <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/8 group-hover:bg-emerald-500/14 transition-colors duration-200">
                        <Check className="h-3 w-3 text-emerald-500" strokeWidth={2.5} />
                      </span>

                      {/* title + detail */}
                      <div className="flex min-w-0 flex-1 items-baseline justify-between gap-4">
                        <p className="font-medium text-sm leading-snug group-hover:text-text-primary transition-colors duration-200">
                          {title}
                        </p>
                        <p className="hidden sm:block shrink-0 text-xs text-text-muted group-hover:text-text-secondary transition-colors duration-200 text-right max-w-[14rem]">
                          {detail}
                        </p>
                      </div>

                      {/* right arrow — reveals on hover */}
                      <span className="shrink-0 text-accent-indigo/0 group-hover:text-accent-indigo/40 transition-colors duration-200 text-xs font-mono select-none">
                        →
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>

              {/* bottom strip */}
              <div className="flex items-center justify-between border-t border-accent-indigo/10 bg-accent-indigo/[0.025] px-6 py-2.5 sm:px-8">
                <p className="font-mono text-[11px] text-text-muted">
                  QUALITY · STANDARDS · EVERY DELIVERY
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span
                      key={i}
                      className="h-1 w-2.5 rounded-full"
                      style={{
                        backgroundColor:
                          i < 4
                            ? `rgb(34 197 94 / ${0.65 - i * 0.12})`
                            : "rgb(99 102 241 / 0.10)",
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