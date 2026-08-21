import { GraduationCap, BookOpen, Calendar, MapPin } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const ACADEMIC_INTERESTS = [
  { code: "SE", label: "Software Engineering" },
  { code: "AI", label: "Artificial Intelligence" },
  { code: "WD", label: "Web Development" },
  { code: "FS", label: "Full Stack Development" },
  { code: "AT", label: "Automation" },
  { code: "SD", label: "System Design" },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function Education() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* ── Full-bleed background layer — no rounded corners, no clipping ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ margin: "0 calc(-50vw + 50%)" }}
      >
        {/* halka blue horizontal sweep — left se right tak */}
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
      </div>

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* ══ LEFT ══ */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Education
              </p>
            </div>

            <div className="relative mb-4">
              
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Academic
                <br />
                <span className="text-accent-indigo">background</span>
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mt-3 max-w-[13rem]">
              Formal foundations backing every line of production code.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-accent-indigo/50" />
                  University of Education
                </p>
                <p className="flex items-center gap-1.5">
                  <Calendar className="h-3 w-3 text-accent-indigo/50" />
                  2024 — 2028
                </p>
                <p className="flex items-center gap-1.5">
                  <BookOpen className="h-3 w-3 text-accent-indigo/50" />
                  B.S. Computer Science
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT — card ══ */}
        <Reveal delay={0.1}>
          <div className="relative">
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
                className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-[0.4]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              {/* header */}
              <div className="relative flex flex-col gap-0 sm:flex-row sm:items-stretch">
                <div className="flex-1 p-6 sm:p-8">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent-indigo/20 bg-accent-indigo/8">
                      <GraduationCap className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="font-semibold text-[0.95rem] leading-snug">
                        Bachelor of <span className="text-accent-indigo">Science</span>
                      </p>
                      <p className="text-sm text-text-secondary">in Computer Science</p>
                    </div>
                  </div>

                  <div className="mt-1 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    <p className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
                      In progress · Graduating 2028
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex w-40 shrink-0 flex-col items-center justify-center gap-2 border-l border-accent-indigo/10 bg-accent-indigo/[0.025] px-6 py-8">
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <span className="absolute inset-0 rounded-full border border-dashed border-accent-indigo/30 animate-[spin_18s_linear_infinite]" />
                    <span className="absolute inset-2 rounded-full border border-accent-indigo/20" />
                    <span className="absolute inset-4 rounded-full bg-accent-indigo/8" />
                    <GraduationCap className="relative h-5 w-5 text-accent-indigo/80" strokeWidth={1.5} />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted text-center leading-snug">
                    UOE<br />Est. 2028
                  </p>
                </div>
              </div>

              {/* perforated divider */}
              <div
                className="relative h-px w-full"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, rgba(99,102,241,0.2) 0 5px, transparent 5px 12px)",
                }}
              />

              {/* interests */}
              <div className="relative p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-label-sm uppercase tracking-widest text-text-muted">
                    Academic Interests
                  </p>
                  <span className="font-mono text-xs text-accent-indigo/50">
                    {ACADEMIC_INTERESTS.length} fields
                  </span>
                </div>

                <ul className="grid grid-cols-1 gap-x-4 gap-y-0.5 sm:grid-cols-2">
                  {ACADEMIC_INTERESTS.map(({ code, label }) => (
                    <li
                      key={code}
                      className="group flex items-center gap-3 rounded-lg px-2 py-2.5 transition-all duration-200 hover:bg-accent-indigo/5"
                    >
                      <span className="w-7 shrink-0 font-mono text-[11px] font-medium text-accent-indigo/55 transition-colors duration-200 group-hover:text-accent-indigo">
                        {code}
                      </span>
                      <span className="h-px w-4 shrink-0 rounded-full bg-border transition-colors duration-200 group-hover:bg-accent-indigo/30" />
                      <span className="text-sm text-text-secondary transition-colors duration-200 group-hover:text-text-primary">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                  <p className="font-mono text-[11px] text-text-muted">
                    PROG · CS · <span className="text-accent-indigo">2024–2028</span>
                  </p>
                  <div className="flex gap-1">
                    {[...Array(4)].map((_, i) => (
                      <span
                        key={i}
                        className="h-1 w-4 rounded-full"
                        style={{
                          backgroundColor:
                            i < 1
                              ? "rgb(99 102 241 / 0.7)"
                              : i < 2
                              ? "rgb(99 102 241 / 0.35)"
                              : "rgb(99 102 241 / 0.12)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}