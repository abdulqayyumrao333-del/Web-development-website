import { Code2, Sparkles, Workflow, Layers, Gauge, Puzzle, CheckCircle, Zap } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const INDICATORS = [
  { label: "Full Stack Development", icon: Code2, color: "from-blue-500/20 to-cyan-500/20" },
  { label: "AI Applications", icon: Sparkles, color: "from-rose-500/20 to-pink-500/20" },
  { label: "Web Automation", icon: Workflow, color: "from-amber-500/20 to-orange-500/20" },
  { label: "Modern Web Technologies", icon: Layers, color: "from-indigo-500/20 to-purple-500/20" },
  { label: "Performance Focused", icon: Gauge, color: "from-emerald-500/20 to-teal-500/20" },
  { label: "Problem Solving", icon: Puzzle, color: "from-violet-500/20 to-purple-500/20" },
  { label: "B2B Lead Generation", icon: Puzzle, color: "from-rose-500/20 to-pink-500/20" },
  { label: "Manual Research", icon: Puzzle, color: "from-rose-500/20 to-pink-500/20" },
  { label: "Prospect List building", icon: Puzzle, color: "from-rose-500/20 to-pink-500/20" },
  { label: "Decision makers List", icon: Puzzle, color: "from-rose-500/20 to-pink-500/20" },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function TrustIndicators() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">

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
      </div>

      <Reveal>
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:justify-between">
          {INDICATORS.map(({ label, icon: Icon, color }, i) => (
            <div
              key={label}
              className="group relative overflow-hidden rounded-full border border-accent-indigo/10 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm px-4 py-2.5 text-sm text-text-secondary transition-all duration-300 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5"
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
                className="absolute top-1 right-1 h-2 w-2 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/20 rounded-tr-sm transition-colors duration-300 pointer-events-none"
              />

              <div className="relative flex items-center gap-2">
                <Icon className="h-4 w-4 text-accent-indigo/60 group-hover:text-accent-indigo transition-colors duration-300" strokeWidth={1.75} />
                <span className="font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                  {label}
                </span>
                <span className="font-mono text-[7px] text-accent-indigo/8 group-hover:text-accent-indigo/20 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}