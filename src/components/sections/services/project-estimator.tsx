"use client";

import { useState } from "react";
import { AlertCircle, Sparkles, Calendar, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import Link from "next/link";

const PROJECT_TYPES = [
  { label: "Portfolio Website", baseWeeks: 1, icon: "🎨" },
  { label: "Business Website", baseWeeks: 2, icon: "🏢" },
  { label: "SaaS Application", baseWeeks: 5, icon: "☁️" },
  { label: "AI Application", baseWeeks: 4, icon: "🧠" },
  { label: "Automation Tool", baseWeeks: 2, icon: "⚡" },
];

const FEATURES = [
  "Admin Dashboard",
  "Authentication",
  "AI Integration",
  "Payments",
  "Third-party API Integration",
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function ProjectEstimator() {
  const [type, setType] = useState(PROJECT_TYPES[0]!.label);
  const [features, setFeatures] = useState<string[]>([]);

  const selectedType = PROJECT_TYPES.find((t) => t.label === type)!;
  const extraWeeks = features.length;
  const low = selectedType.baseWeeks + extraWeeks;
  const high = low + Math.max(2, Math.ceil(low * 0.4));

  function toggleFeature(feature: string) {
    setFeatures((prev) => (prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]));
  }

  const totalFeatures = features.length;
  const maxFeatures = FEATURES.length;

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
                Estimator
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Get a rough
                <br />
                <span className="text-accent-indigo">timeline</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Select your project type and features for a rough timeline estimate.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {PROJECT_TYPES.length} types
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {FEATURES.length} features
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Instant estimate
                </p>
              </div>
            </div>

            {/* Selected summary */}
            <div className="mt-8 hidden lg:flex flex-col gap-2 p-3 rounded-xl border border-accent-indigo/10 bg-accent-indigo/[0.02]">
              <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">
                Current Selection
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-primary">{type}</span>
                <span className="text-xs text-text-muted/30">·</span>
                <span className="text-xs text-accent-indigo/60">{totalFeatures} features</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Clock className="h-3 w-3 text-accent-indigo/30" strokeWidth={1.5} />
                <span className="text-xs font-mono text-text-primary">
                  {low}–{high} weeks
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Estimator Card ══ */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8"
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
                {/* ── Project Type ── */}
                <div className="mb-6">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50 mb-3">
                    Project Type
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPES.map((t) => (
                      <button
                        key={t.label}
                        onClick={() => setType(t.label)}
                        aria-pressed={type === t.label}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300 ${
                          type === t.label
                            ? "border-accent-indigo bg-accent-indigo text-white shadow-sm shadow-accent-indigo/20"
                            : "border-accent-indigo/10 text-text-secondary hover:border-accent-indigo/30 hover:text-accent-indigo hover:bg-accent-indigo/[0.03]"
                        }`}
                      >
                        <span className="text-base">{t.icon}</span>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Features ── */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50">
                      Features Needed
                    </p>
                    <span className="text-[9px] font-mono text-accent-indigo/40">
                      {totalFeatures} / {maxFeatures} selected
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {FEATURES.map((f) => (
                      <button
                        key={f}
                        onClick={() => toggleFeature(f)}
                        aria-pressed={features.includes(f)}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300 ${
                          features.includes(f)
                            ? "border-accent-indigo bg-accent-indigo text-white shadow-sm shadow-accent-indigo/20"
                            : "border-accent-indigo/10 text-text-secondary hover:border-accent-indigo/30 hover:text-accent-indigo hover:bg-accent-indigo/[0.03]"
                        }`}
                      >
                        {features.includes(f) ? (
                          <CheckCircle className="h-3.5 w-3.5" strokeWidth={2} />
                        ) : (
                          <span className="h-3.5 w-3.5 rounded-full border-2 border-accent-indigo/20" />
                        )}
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ── Result ── */}
                <div className="relative overflow-hidden rounded-xl border border-accent-indigo/15 bg-gradient-to-br from-accent-indigo/[0.05] to-bg-surface-1/50 p-5 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-accent-indigo/60" strokeWidth={1.75} />
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50">
                      Estimated Timeline
                    </p>
                  </div>
                  <p className="font-mono text-3xl sm:text-4xl font-bold text-accent-indigo">
                    {low}–{high} <span className="text-lg font-normal text-text-secondary">weeks</span>
                  </p>
                  <div className="mt-2 flex justify-center gap-4 text-[10px] text-text-muted/40">
                    <span className="flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                      Base: {selectedType.baseWeeks}w
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-accent-indigo/20" />
                      Features: +{extraWeeks}w
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="h-1 w-1 rounded-full bg-accent-indigo/10" />
                      Buffer: {high - low}w
                    </span>
                  </div>
                </div>

                {/* ── Disclaimer ── */}
                <div className="mt-4 flex items-start gap-2 text-[10px] text-text-muted/40">
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                  <p>
                    This is a rough estimate only, not a quote — actual timelines and pricing depend
                    on full requirements discussed directly. No commitment is made by this tool.
                  </p>
                </div>

                {/* ── CTA ── */}
                <div className="mt-4 pt-4 border-t border-accent-indigo/8 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-text-muted/50">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span>Ready for a real quote?</span>
                  </div>
                  <Link href="/contact">
                    <button className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm shadow-md shadow-accent-indigo/20 hover:shadow-lg hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5">
                      Contact Me
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}