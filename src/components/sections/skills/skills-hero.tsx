"use client";

import { m, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Database,
  Sparkles,
  Cloud,
  CheckCircle,
  Braces,
  Cpu,
  Layers3,
  Terminal,
} from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

// ============================================
// ANIMATION VARIANTS
// ============================================

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ============================================
// FLOATING ICONS
// ============================================

const FLOATING_ICONS = [
  {
    icon: Code2,
    top: "12%",
    left: "4%",
    delay: 0,
    duration: 5,
    size: "h-8 w-8",
  },
  {
    icon: Database,
    top: "72%",
    left: "7%",
    delay: 0.8,
    duration: 5.8,
    size: "h-9 w-9",
  },
  {
    icon: Sparkles,
    top: "16%",
    left: "91%",
    delay: 0.35,
    duration: 4.8,
    size: "h-7 w-7",
  },
  {
    icon: Cloud,
    top: "70%",
    left: "91%",
    delay: 1,
    duration: 6,
    size: "h-9 w-9",
  },
  {
    icon: Braces,
    top: "43%",
    left: "1.5%",
    delay: 0.5,
    duration: 6.2,
    size: "h-6 w-6",
  },
  {
    icon: Cpu,
    top: "44%",
    left: "95%",
    delay: 1.2,
    duration: 5.4,
    size: "h-7 w-7",
  },
];

// ============================================
// DATA
// ============================================

const TECH_TAGS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AI / ML",
];

const QUICK_STATS = [
  {
    label: "Frontend",
    value: "React · Next.js · TS",
    icon: Code2,
  },
  {
    label: "Backend",
    value: "Node.js · Python",
    icon: Database,
  },
  {
    label: "AI / ML",
    value: "LLMs · APIs · Automation",
    icon: Sparkles,
  },
  {
    label: "Cloud",
    value: "Docker · Vercel · Cloud",
    icon: Cloud,
  },
];

const TRUST_ITEMS = [
  "Modern stack",
  "Production focused",
  "Continuously evolving",
];

// ============================================
// MAIN COMPONENT
// ============================================

export function SkillsHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative mx-auto max-w-6xl overflow-visible px-6 py-20 sm:py-24 lg:py-28">
      {/* =========================================================
          FULL BLEED BACKGROUND
      ========================================================= */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          margin: "0 calc(-50vw + 50%)",
        }}
      >
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(99,102,241,0.025) 30%, rgba(99,102,241,0.055) 55%, rgba(99,102,241,0.028) 100%)",
          }}
        />

        {/* Top ambient glow */}
        <div
          className="absolute inset-x-0 top-0 h-[520px]"
          style={{
            background:
              "radial-gradient(45% 75% at 50% 0%, rgba(79,70,229,0.10) 0%, rgba(79,70,229,0.035) 45%, transparent 100%)",
          }}
        />

        {/* Left glow */}
        <div
          className="absolute left-0 top-20 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.045) 0%, transparent 70%)",
          }}
        />

        {/* Right glow */}
        <div
          className="absolute right-0 top-24 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.045) 0%, transparent 70%)",
          }}
        />

        {/* Top border */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.14) 25%, rgba(99,102,241,0.22) 50%, rgba(99,102,241,0.14) 75%, transparent 100%)",
          }}
        />

        {/* Bottom border */}
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(99,102,241,0.08) 25%, rgba(99,102,241,0.14) 50%, rgba(99,102,241,0.08) 75%, transparent 100%)",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 75%)",
          }}
        />
      </div>

      {/* =========================================================
          FLOATING DECORATIVE ICONS
      ========================================================= */}

      {!reduceMotion &&
        FLOATING_ICONS.map(
          ({ icon: Icon, top, left, delay, duration, size }, index) => (
            <m.div
              key={index}
              aria-hidden
              className="pointer-events-none absolute hidden text-accent-indigo/[0.10] md:block"
              style={{
                top,
                left,
              }}
              animate={{
                y: [0, -12, 0],
                rotate: [0, index % 2 === 0 ? 3 : -3, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent-indigo/10 blur-xl" />
                <Icon
                  className={`relative ${size}`}
                  strokeWidth={1.35}
                />
              </div>
            </m.div>
          )
        )}

      {/* =========================================================
          MAIN HERO CONTENT
      ========================================================= */}

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <m.div
          variants={container}
          initial={false}
          animate="visible"
          className="w-full"
        >
          {/* =====================================================
              EYEBROW
          ===================================================== */}

          <m.div variants={item}>
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent-indigo/60" />

              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-indigo/40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-indigo/70" />
                </span>

                <p className="text-label-sm uppercase tracking-[0.22em] text-accent-indigo">
                  Skills & Technologies
                </p>
              </div>

              <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent-indigo/60" />
            </div>
          </m.div>

          {/* =====================================================
              MAIN HEADING
          ===================================================== */}

          <m.div variants={item}>
            <h1 className="text-4xl font-bold leading-[1.06] tracking-[-0.035em] text-text-primary sm:text-5xl lg:text-6xl">
              What I{" "}
              <span className="relative inline-block text-accent-indigo">
                build with
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent-indigo/60 to-transparent"
                />
              </span>
            </h1>
          </m.div>

          {/* =====================================================
              DESCRIPTION
          ===================================================== */}

          <m.div variants={item}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
              A continuously evolving toolkit of languages, frameworks,
              platforms, and AI technologies I use to build fast, scalable,
              production-ready digital experiences.
            </p>
          </m.div>

          {/* =====================================================
              TECH PILLS
          ===================================================== */}

          <m.div variants={item}>
            <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2">
              {TECH_TAGS.map((tech, index) => (
                <m.span
                  key={tech}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                          scale: 1.03,
                        }
                  }
                  transition={{
                    duration: 0.2,
                  }}
                  className={[
                    "group inline-flex items-center gap-2 rounded-full border",
                    "border-accent-indigo/12 bg-bg-surface-1/55",
                    "px-3.5 py-1.5",
                    "text-sm text-text-secondary",
                    "shadow-sm shadow-accent-indigo/[0.03]",
                    "backdrop-blur-sm",
                    "transition-all duration-300",
                    "hover:border-accent-indigo/30",
                    "hover:bg-accent-indigo/[0.05]",
                    "hover:text-accent-indigo",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      index === 0
                        ? "bg-accent-indigo/70"
                        : "bg-accent-indigo/35",
                      "transition-all duration-300",
                      "group-hover:bg-accent-indigo",
                      "group-hover:shadow-[0_0_8px_rgba(99,102,241,0.5)]",
                    ].join(" ")}
                  />
                  {tech}
                </m.span>
              ))}
            </div>
          </m.div>

          {/* =====================================================
              QUICK STATS
          ===================================================== */}

          <m.div variants={item}>
            <div className="mx-auto mt-9 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
              {QUICK_STATS.map((stat) => {
                const Icon = stat.icon;

                return (
                  <m.div
                    key={stat.label}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -3,
                          }
                    }
                    transition={{
                      duration: 0.2,
                    }}
                    className={[
                      "group relative overflow-hidden rounded-xl border",
                      "border-accent-indigo/10",
                      "bg-bg-surface-1/55",
                      "px-3 py-4",
                      "text-center",
                      "backdrop-blur-sm",
                      "transition-all duration-300",
                      "hover:border-accent-indigo/25",
                      "hover:bg-accent-indigo/[0.035]",
                      "hover:shadow-lg hover:shadow-accent-indigo/[0.04]",
                    ].join(" ")}
                  >
                    {/* Card glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.08), transparent 65%)",
                      }}
                    />

                    <div className="relative">
                      <div className="mb-2 flex justify-center">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.04] text-accent-indigo/60 transition-colors duration-300 group-hover:border-accent-indigo/20 group-hover:bg-accent-indigo/[0.08] group-hover:text-accent-indigo">
                          <Icon
                            className="h-4 w-4"
                            strokeWidth={1.65}
                          />
                        </span>
                      </div>

                      <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-accent-indigo/55 transition-colors duration-300 group-hover:text-accent-indigo/75">
                        {stat.label}
                      </p>

                      <p className="mt-1.5 truncate text-[11px] text-text-muted/65 transition-colors duration-300 group-hover:text-text-muted/85">
                        {stat.value}
                      </p>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </m.div>

          {/* =====================================================
              CTA BUTTONS
          ===================================================== */}

          <m.div variants={item}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {/* Primary */}
              <Link
                href="#ecosystem"
                className={[
                  "group inline-flex items-center justify-center gap-2",
                  "rounded-xl px-6 py-3",
                  "bg-accent-indigo text-white",
                  "text-sm font-medium",
                  "shadow-lg shadow-accent-indigo/20",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5",
                  "hover:bg-accent-indigo/90",
                  "hover:shadow-xl hover:shadow-accent-indigo/30",
                ].join(" ")}
              >
                Explore Skills
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.75}
                />
              </Link>

              {/* Secondary */}
              <Link
                href="/projects"
                className={[
                  "group inline-flex items-center justify-center gap-2",
                  "rounded-xl px-6 py-3",
                  "border border-accent-indigo/15",
                  "bg-bg-surface-1/55",
                  "text-sm font-medium text-text-secondary",
                  "backdrop-blur-sm",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5",
                  "hover:border-accent-indigo/30",
                  "hover:bg-accent-indigo/[0.05]",
                  "hover:text-accent-indigo",
                ].join(" ")}
              >
                View Projects
                <ArrowRight
                  className="h-4 w-4 opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                  strokeWidth={1.75}
                />
              </Link>

              {/* Tertiary */}
              <Link
                href="/contact"
                className={[
                  "inline-flex items-center justify-center gap-2",
                  "rounded-xl px-6 py-3",
                  "border border-accent-indigo/10",
                  "bg-transparent",
                  "text-sm font-medium text-text-muted",
                  "transition-all duration-300",
                  "hover:-translate-y-0.5",
                  "hover:border-accent-indigo/20",
                  "hover:bg-accent-indigo/[0.025]",
                  "hover:text-text-primary",
                ].join(" ")}
              >
                Hire Me
              </Link>
            </div>
          </m.div>

          {/* =====================================================
              TRUST INDICATOR
          ===================================================== */}

          <m.div variants={item}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-text-muted/45">
              <div className="flex items-center gap-1.5">
                <CheckCircle
                  className="h-3.5 w-3.5 text-emerald-500/55"
                  strokeWidth={2}
                />

                <span className="text-text-muted/55">
                  Continuously evolving
                </span>
              </div>

              <span
                aria-hidden
                className="hidden text-text-muted/20 sm:inline"
              >
                ·
              </span>

              {TRUST_ITEMS.slice(1).map((trust) => (
                <span
                  key={trust}
                  className="text-text-muted/45"
                >
                  {trust}
                </span>
              ))}
            </div>
          </m.div>

          {/* =====================================================
              BOTTOM TECH SIGNATURE
          ===================================================== */}

          <m.div variants={item}>
            <div className="mx-auto mt-9 flex w-full max-w-xl items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-indigo/15" />

              <div className="flex items-center gap-2 whitespace-nowrap">
                <Terminal
                  className="h-3 w-3 text-accent-indigo/30"
                  strokeWidth={1.5}
                />

                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted/25">
                  Full Stack · AI · Modern Tech
                </span>

                <Layers3
                  className="h-3 w-3 text-accent-indigo/30"
                  strokeWidth={1.5}
                />
              </div>

              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-indigo/15" />
            </div>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}