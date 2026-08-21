import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";
import { BookOpen } from "lucide-react";

export async function CurrentlyLearning() {
  let items: { id: string; name: string; category: string; progress: number }[] = [];
  try {
    items = await db.learningItem.findMany({ orderBy: { order: "asc" } });
  } catch {
    items = [];
  }

  if (items.length === 0) return null;

  // Derived from the real fetched data — not fabricated
  const avgProgress = Math.round(
    items.reduce((sum, item) => sum + item.progress, 0) / items.length
  );

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
                Currently Learning
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                What I'm
                <br />
                <span className="text-accent-indigo">working on</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              The skills and technologies I'm actively learning right now.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {items.length} in progress
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {avgProgress}% avg
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Always growing
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Learning Items ══ */}
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

            <div className="relative rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm overflow-hidden">
              <div className="absolute top-5 right-5 h-6 w-6 border-t border-r border-accent-indigo/25 rounded-tr-md pointer-events-none" />

              {items.map((item, i) => (
                <div
                  key={item.id}
                  className={`group relative px-5 sm:px-7 py-5 sm:py-6 transition-colors duration-300 hover:bg-accent-indigo/[0.03] ${
                    i !== items.length - 1 ? "border-b border-accent-indigo/8" : ""
                  }`}
                >
                  {/* left accent bar on hover */}
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-indigo scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300" />

                  {/* index number */}
                  <span className="absolute top-3 right-4 font-mono text-[10px] text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm sm:text-base font-medium text-text-primary">
                        {item.name}
                      </p>
                      <span className="inline-flex items-center mt-1.5 px-2 py-0.5 rounded-full border border-accent-indigo/12 bg-accent-indigo/6 text-[10px] uppercase tracking-wider text-text-muted">
                        {item.category}
                      </span>
                    </div>
                    <p className="font-mono text-xl sm:text-2xl font-semibold tabular-nums text-text-primary shrink-0">
                      {item.progress}
                      <span className="text-xs text-text-muted font-sans font-normal ml-0.5">%</span>
                    </p>
                  </div>

                  <div className="relative mt-4 h-1.5 w-full overflow-hidden rounded-full bg-accent-indigo/8">
                    <div
                      className="relative h-full rounded-full bg-gradient-to-r from-accent-indigo/60 to-accent-indigo transition-all duration-700"
                      style={{ width: `${item.progress}%` }}
                    >
                      {/* soft glow at the leading edge */}
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-accent-indigo/40 blur-[3px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                LEARNING · {items.length} SKILLS · {avgProgress}% AVG
              </p>
              <div className="flex gap-1">
                {Array.from({ length: 6 }).map((_, i) => (
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