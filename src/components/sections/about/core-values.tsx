"use client";

import {
  ShieldCheck,
  BookOpen,
  Gem,
  Puzzle,
  Flag,
} from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { m, useReducedMotion } from "framer-motion";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "Build trust by delivering exactly what is promised.",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    text: "Technology changes every day, so learning never stops.",
  },
  {
    icon: Gem,
    title: "Quality First",
    text: "Prioritize maintainable, scalable software over shortcuts.",
  },
  {
    icon: Puzzle,
    title: "Problem Solving",
    text: "Focus on solving business problems instead of simply writing code.",
  },
  {
    icon: Flag,
    title: "Ownership",
    text: "Take responsibility from planning to deployment.",
  },
];

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Quiet elevation, matches the profile panel in the hero — one consistent depth language
const panelShadow =
  "0 1px 2px rgba(15,23,42,0.04), 0 16px 40px -18px rgba(79,70,229,0.16)";

// ============================================
// MAIN COMPONENT
// ============================================
export function CoreValues() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* ── Full-bleed background — optimized to match other components ── */}
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

      <div className="relative z-10">
        {/* ==========================================
            HEADER
            ========================================== */}
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-accent-indigo/60" />
            <span className="text-xs font-semibold tracking-[0.22em] text-accent-indigo uppercase">
              Core Values
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.02] text-text-primary">
            What guides <span className="text-accent-indigo">my work</span>
          </h2>
          <p className="mt-5 text-base text-text-secondary max-w-lg leading-relaxed">
            The principles that drive every decision, every line of code, and
            every collaboration.
          </p>
        </Reveal>

        {/* ==========================================
            EDITORIAL VALUES LIST
            ========================================== */}
        <Reveal delay={0.1}>
          <m.div
            variants={reduceMotion ? undefined : containerVariants}
            initial="hidden"
            animate="visible"
            className="relative mt-12 sm:mt-14 rounded-3xl border border-accent-indigo/12 bg-bg-surface overflow-hidden"
            style={{ boxShadow: panelShadow }}
          >
            {/* Corner bracket */}
            <div className="absolute top-5 right-5 h-8 w-8 border-t-2 border-r-2 border-accent-indigo/30 rounded-tr-lg pointer-events-none z-10" />

            {VALUES.map((value, i) => (
              <m.div
                key={value.title}
                variants={itemVariants}
                className={`group relative grid grid-cols-[auto_1fr] sm:grid-cols-[5rem_auto_1fr] items-start sm:items-center gap-4 sm:gap-6 px-5 sm:px-8 py-6 sm:py-8 overflow-hidden transition-colors hover:bg-accent-indigo/[0.04] ${
                  i !== VALUES.length - 1 ? "border-b border-accent-indigo/12" : ""
                }`}
              >
                {/* Left accent bar */}
                <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent-indigo scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300" />

                {/* Index numeral */}
                <span className="hidden sm:block font-mono text-4xl font-semibold text-text-muted/30 group-hover:text-accent-indigo/40 transition-colors duration-300 tabular-nums">
                  {(i + 1).toString().padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="flex-shrink-0 h-11 w-11 sm:h-12 sm:w-12 rounded-2xl bg-accent-indigo/10 flex items-center justify-center text-accent-indigo transition-transform duration-300 group-hover:scale-105">
                  <value.icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                </div>

                {/* Title + description */}
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-text-primary tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-text-secondary leading-relaxed max-w-md">
                    {value.text}
                  </p>
                </div>
              </m.div>
            ))}
          </m.div>
        </Reveal>

        {/* ==========================================
            BOTTOM LINE
            ========================================== */}
        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-xs text-text-muted">
            <span>{VALUES.length} core values</span>
            <span className="text-text-muted/50">·</span>
            <span>Built with integrity</span>
            <span className="text-text-muted/50">·</span>
            <span>Quality focused</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}