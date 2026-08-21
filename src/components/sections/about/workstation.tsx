"use client";

import { Monitor, TerminalSquare, Code2, GitBranch, Sparkles, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

// Browser intentionally omitted — not yet confirmed, and left out rather than guessed.
const SETUP = [
  { icon: Monitor, label: "Operating System", value: "Windows", description: "Windows 11 Pro" },
  { icon: TerminalSquare, label: "Terminal", value: "PowerShell", description: "PowerShell 7 + Oh My Posh" },
  { icon: Code2, label: "Editor", value: "VS Code", description: "VS Code with custom config" },
  { icon: GitBranch, label: "Git Workflow", value: "Git & GitHub", description: "Feature branch workflow" },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function Workstation() {
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
                Workstation
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                My daily
                <br />
                <span className="text-accent-indigo">toolkit</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              The tools and setup I rely on to ship code, debug issues, and build products people love.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {SETUP.length} core tools
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Battle-tested
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Daily drivers
                </p>
              </div>
            </div>

            {/* Setup summary */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {SETUP.map(({ label, value }, i) => (
                <div key={label} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors">
                    {label}
                  </span>
                  <span className="ml-auto text-[9px] text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT — Setup Cards ══ */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {SETUP.map(({ icon: Icon, label, value, description }, i) => (
                <Reveal key={label} delay={0.1 + i * 0.06}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-xl hover:shadow-accent-indigo/10 hover:-translate-y-1 p-6 sm:p-7"
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

                    {/* top-right bracket - animated */}
                    <div
                      aria-hidden
                      className="absolute top-3.5 right-3.5 h-5 w-5 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-all duration-300 pointer-events-none group-hover:h-7 group-hover:w-7"
                    />

                    {/* index number */}
                    <span
                      aria-hidden
                      className="absolute bottom-3 right-4 font-mono text-[11px] text-accent-indigo/15 group-hover:text-accent-indigo/40 transition-colors duration-300 select-none"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* icon with glow ring */}
                    <div className="relative mb-4">
                      <div className="absolute inset-[-8px] rounded-full border border-accent-indigo/0 group-hover:border-accent-indigo/10 transition-all duration-500 scale-75 group-hover:scale-100" />
                      <div className="absolute inset-0 rounded-xl bg-accent-indigo/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/16 group-hover:border-accent-indigo/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-indigo/10">
                        <Icon className="h-6 w-6 text-accent-indigo" strokeWidth={1.75} />
                      </span>
                    </div>

                    {/* label and value */}
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-accent-indigo/40 group-hover:text-accent-indigo/70 transition-colors duration-300">
                          {label}
                        </p>
                        <Check className="h-3 w-3 text-accent-indigo/0 group-hover:text-accent-indigo/30 transition-all duration-300 opacity-0 group-hover:opacity-100" strokeWidth={2} />
                      </div>
                      <p className="mt-1.5 font-semibold text-text-primary text-lg sm:text-xl group-hover:text-accent-indigo transition-colors duration-300">
                        {value}
                      </p>
                      {description && (
                        <p className="mt-1 text-xs text-text-muted/60 leading-relaxed group-hover:text-text-muted/80 transition-colors duration-300">
                          {description}
                        </p>
                      )}
                    </div>

                    {/* bottom accent line on hover */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />

                    {/* subtle arrow on hover */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                      <ArrowUpRight className="h-3.5 w-3.5 text-accent-indigo/30" strokeWidth={1.5} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                SETUP · {SETUP.length} TOOLS · DAILY DRIVERS
              </p>
              <div className="flex gap-1">
                {SETUP.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 ? "1.25rem" : "0.5rem",
                      backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.10, 0.40 - i * 0.08)})`,
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