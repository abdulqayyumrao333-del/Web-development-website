import { Reveal } from "@/components/sections/reveal";
import { Code2, Layers, Server, Database, Shield, Sparkles, Rocket, GitBranch, Zap } from "lucide-react";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// Confirmed by Abdul — only technologies actually used, grouped as provided.
const STACK_GROUPS = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "HTML", "CSS"], icon: Code2, color: "from-blue-500/20 to-cyan-500/20" },
  { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"], icon: Layers, color: "from-indigo-500/20 to-purple-500/20" },
  { group: "Backend", items: ["Node.js", "Express.js"], icon: Server, color: "from-emerald-500/20 to-teal-500/20" },
  { group: "Database", items: ["PostgreSQL", "Prisma", "MySQL"], icon: Database, color: "from-amber-500/20 to-orange-500/20" },
  { group: "Authentication", items: ["NextAuth.js"], icon: Shield, color: "from-rose-500/20 to-pink-500/20" },
  { group: "AI", items: ["OpenAI", "Anthropic", "Groq"], icon: Sparkles, color: "from-violet-500/20 to-purple-500/20" },
  { group: "Deployment", items: ["Vercel"], icon: Rocket, color: "from-cyan-500/20 to-blue-500/20" },
  { group: "Version Control", items: ["Git", "GitHub"], icon: GitBranch, color: "from-gray-500/20 to-gray-400/20" },
];

export function TechStack() {
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
                Tech Stack
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Tools I
                <br />
                <span className="text-accent-indigo">reach for</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              A curated list of technologies I use to build modern applications.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {STACK_GROUPS.length} categories
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {STACK_GROUPS.reduce((acc, g) => acc + g.items.length, 0)} tools
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Modern stack
                </p>
              </div>
            </div>

            {/* Category list */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {STACK_GROUPS.map((g, i) => (
                <div key={g.group} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <g.icon className="h-3 w-3 text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors" strokeWidth={1.75} />
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors truncate max-w-[6rem]">
                    {g.group}
                  </span>
                  <span className="ml-auto text-[8px] text-accent-indigo/15 group-hover:text-accent-indigo/30 transition-colors">
                    {g.items.length}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Tech Stack Grid ══ */}
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

            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-2">
              {STACK_GROUPS.map(({ group, items, icon: Icon, color }, i) => (
                <Reveal key={group} delay={0.12 + i * 0.06}>
                  <div
                    className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5"
                    style={{ boxShadow: panelShadow }}
                  >
                    {/* hover gradient */}
                    <div
                      aria-hidden
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${color} via-transparent to-transparent`}
                    />

                    {/* bracket */}
                    <div
                      aria-hidden
                      className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                    />

                    <div className="relative">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105 shrink-0">
                          <Icon className="h-4.5 w-4.5 text-accent-indigo" strokeWidth={1.75} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/40 group-hover:text-text-muted/60 transition-colors">
                            {group}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {items.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-0.5 text-[9px] font-mono text-text-muted/60 group-hover:text-text-muted/80 transition-colors"
                              >
                                <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="font-mono text-[7px] text-accent-indigo/8 group-hover:text-accent-indigo/20 transition-colors shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* bottom accent line */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                TECH · {STACK_GROUPS.length} CATEGORIES · MODERN STACK
              </p>
              <div className="flex gap-1">
                {STACK_GROUPS.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 ? "1.25rem" : "0.5rem",
                      backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.10, 0.40 - i * 0.06)})`,
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