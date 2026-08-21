"use client";

import { Sparkles, ArrowRight, Bot, Zap } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function AiAssistantCallout() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-10 sm:py-14">

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

      <div className="grid lg:grid-cols-[minmax(0,15rem)_1fr] gap-10 lg:gap-16 items-start">

        {/* ══ LEFT ══ */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                AI Assistant
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Need
                <br />
                <span className="text-accent-indigo">guidance?</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Not sure which service fits your needs? Let my AI assistant help you decide.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  AI-powered
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Instant guidance
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  No spam
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Callout Card ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <button
              onClick={() => document.querySelector<HTMLButtonElement>('[aria-label="Open AI assistant"]')?.click()}
              className="group relative w-full overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-xl hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-6 sm:p-8 text-left"
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
                className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.3]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              {/* bracket - animated */}
              <div
                aria-hidden
                className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
              />

              <div className="relative flex items-center gap-4 sm:gap-5">
                {/* Icon with glow */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-accent-indigo/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/16 group-hover:border-accent-indigo/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-indigo/10">
                    <Bot className="h-6 w-6 sm:h-7 sm:w-7 text-accent-indigo" strokeWidth={1.75} />
                  </div>
                  {/* Decorative sparkle */}
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-accent-indigo/40 animate-pulse" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm sm:text-base text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                      Not sure which service fits?
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-accent-indigo/15 bg-accent-indigo/[0.05] text-accent-indigo/60 group-hover:border-accent-indigo/25 group-hover:bg-accent-indigo/[0.08] transition-colors">
                      <Zap className="h-2.5 w-2.5" strokeWidth={2} />
                      AI-powered
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mt-1 group-hover:text-text-secondary/90 transition-colors">
                    Ask Abdul's AI — it can point you to the right service before you fill out the form below.
                  </p>
                </div>

                {/* Arrow on hover */}
                <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                  <ArrowRight className="h-5 w-5 text-accent-indigo/40" strokeWidth={1.75} />
                </div>
              </div>

              {/* bottom accent line */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />

              {/* Pulses indicator */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[8px] font-mono text-emerald-500/50">Online</span>
              </div>
            </button>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                AI · INSTANT GUIDANCE · NO SPAM
              </p>
              <div className="flex gap-1">
                <span className="h-1 w-4 rounded-full bg-accent-indigo/40" />
                <span className="h-1 w-2 rounded-full bg-accent-indigo/20" />
                <span className="h-1 w-2 rounded-full bg-accent-indigo/15" />
                <span className="h-1 w-2 rounded-full bg-accent-indigo/10" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}