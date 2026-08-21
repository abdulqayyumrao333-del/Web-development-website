import { Layers, Sparkles, Workflow, Globe, Boxes, Puzzle } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const FOCUS_AREAS = [
  { icon: Layers,    title: "Full Stack Development",  code: "FS", desc: "End-to-end product engineering" },
  { icon: Sparkles,  title: "Artificial Intelligence", code: "AI", desc: "LLMs, agents & automation" },
  { icon: Workflow,  title: "Workflow Automation",      code: "WF", desc: "Systems that run themselves" },
  { icon: Globe,     title: "Modern Web Applications", code: "WA", desc: "Fast, accessible, scalable" },
  { icon: Boxes,     title: "Software Architecture",   code: "SA", desc: "Scalable system design" },
  { icon: Puzzle,    title: "Problem Solving",         code: "PS", desc: "First-principles thinking" },
];

const FEATURED_INDICES = new Set([0, 3]);

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function CurrentFocus() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* ── Full-bleed background — same as Education section ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ margin: "0 calc(-50vw + 50%)" }}
      >
        {/* halka blue horizontal sweep */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(99,102,241,0.032) 35%, rgba(99,102,241,0.055) 65%, rgba(99,102,241,0.038) 100%)",
          }}
        />
        {/* top hairline */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.18) 25%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.18) 75%, transparent 100%)",
          }}
        />
        {/* bottom hairline */}
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.10) 25%, rgba(99,102,241,0.14) 50%, rgba(99,102,241,0.10) 75%, transparent 100%)",
          }}
        />
        {/* directional ambient glow top-right */}
        <div
          className="absolute inset-x-0 top-0 h-[380px]"
          style={{
            background:
              "radial-gradient(55% 100% at 80% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
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
                Current Focus
              </p>
            </div>

            <div className="relative mb-4">
            
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Where my
                <br />
                <span className="text-accent-indigo">attention is</span>
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mt-3 max-w-[13rem]">
              Six areas I keep circling back to — the through-line across every project.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  6 active domains
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Actively building
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Updated 2025
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT — bento grid ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glow behind grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-6 left-1/4 h-40 w-40 rounded-full bg-accent-indigo/5 blur-2xl"
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
              {FOCUS_AREAS.map(({ icon: Icon, title, code, desc }, i) => {
                const featured = FEATURED_INDICES.has(i);
                return (
                  <div
                    key={title}
                    className={[
                      "group relative overflow-hidden rounded-2xl border transition-all duration-300",
                      "bg-bg-surface-1/70 backdrop-blur-sm",
                      "border-accent-indigo/12 hover:border-accent-indigo/30",
                      featured
                        ? "col-span-2 p-5 sm:p-6 flex flex-col justify-between min-h-[130px] sm:min-h-[148px]"
                        : "col-span-1 p-4 sm:p-5 flex flex-col justify-between min-h-[130px] sm:min-h-[148px]",
                    ].join(" ")}
                    style={{ boxShadow: panelShadow }}
                  >
                    {/* diagonal texture — matches Education card */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
                      }}
                    />

                    {/* hover accent wash */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent-indigo/[0.05] to-transparent"
                    />

                    {/* top-right bracket — same detail as before */}
                    <div
                      aria-hidden
                      className="absolute top-3.5 right-3.5 h-5 w-5 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-colors duration-300 pointer-events-none"
                    />

                    {/* header row: icon + code */}
                    <div className="relative flex items-start justify-between">
                      <span
                        className={[
                          "flex items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8",
                          "group-hover:bg-accent-indigo/14 transition-colors duration-300",
                          featured ? "h-10 w-10" : "h-9 w-9",
                        ].join(" ")}
                      >
                        <Icon
                          className={featured ? "h-5 w-5 text-accent-indigo" : "h-4 w-4 text-accent-indigo"}
                          strokeWidth={1.75}
                        />
                      </span>
                      <span className="font-mono text-[10px] text-accent-indigo/40 group-hover:text-accent-indigo/70 transition-colors duration-300 pt-0.5">
                        {code}
                      </span>
                    </div>

                    {/* bottom: title + desc (desc only on featured) */}
                    <div className="relative mt-3">
                      <p
                        className={[
                          "font-medium leading-snug",
                          featured ? "text-base sm:text-lg" : "text-sm",
                        ].join(" ")}
                      >
                        {title}
                      </p>
                      {featured && (
                        <p className="mt-1 text-xs text-text-secondary leading-relaxed">
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* bottom strip — same as Education card */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                FOCUS · 6 DOMAINS · 2025
              </p>
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    className="h-1 w-3 rounded-full"
                    style={{
                      backgroundColor:
                        i < 3
                          ? `rgb(99 102 241 / ${0.7 - i * 0.15})`
                          : "rgb(99 102 241 / 0.10)",
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