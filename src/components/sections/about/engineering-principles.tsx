import { Reveal } from "@/components/sections/reveal";
import { ENGINEERING_PRINCIPLES } from "@/config/engineering-principles";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function EngineeringPrinciples() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* ── Full-bleed background — same as Education & CurrentFocus ── */}
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
                Principles
              </p>
            </div>

            <div className="relative mb-4">
              
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                How I
                <br />
                <span className="text-accent-indigo">approach</span>
                <br />
                the <span className="text-accent-indigo">work</span>
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mt-3 max-w-[13rem]">
              The mental models behind every decision I make when building software.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {ENGINEERING_PRINCIPLES.length} core principles
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Applied daily
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Battle-tested
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT — principles grid ══ */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {ENGINEERING_PRINCIPLES.map(({ icon: Icon, title }, i) => (
                <Reveal key={title} delay={0.1 + i * 0.05}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm transition-all duration-300 hover:border-accent-indigo/30 flex items-center gap-5 px-5 py-4 sm:px-6 sm:py-5"
                    style={{ boxShadow: panelShadow }}
                  >
                    {/* hover diagonal texture */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
                      }}
                    />

                    {/* hover wash */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent-indigo/[0.05] to-transparent"
                    />

                    {/* top-right bracket */}
                    <div
                      aria-hidden
                      className="absolute top-3.5 right-3.5 h-5 w-5 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-colors duration-300 pointer-events-none"
                    />

                    {/* index number */}
                    <span
                      aria-hidden
                      className="absolute bottom-3 right-4 font-mono text-[11px] text-accent-indigo/20 group-hover:text-accent-indigo/45 transition-colors duration-300 select-none"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* icon */}
                    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/14 transition-colors duration-300">
                      <Icon
                        className="h-5 w-5 text-accent-indigo"
                        strokeWidth={1.75}
                      />
                    </span>

                    {/* text */}
                    <div className="relative min-w-0">
                      <p className="font-medium text-sm leading-snug group-hover:text-text-primary transition-colors duration-300">
                        {title}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                ENG · PRINCIPLES · CORE
              </p>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(ENGINEERING_PRINCIPLES.length, 6) }).map((_, i) => (
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