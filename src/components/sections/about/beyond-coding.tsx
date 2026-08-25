"use client";

import { Reveal } from "@/components/sections/reveal";
import {
  Sparkles,
  Quote,
  Brain,
  Rocket,
  Coffee,
  BookOpen,
  Heart,
  Zap,
  Award,
} from "lucide-react";
import { m, useReducedMotion } from "framer-motion";

// ============================================
// ANIMATION VARIANTS
// ============================================
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ============================================
// MAIN COMPONENT
// ============================================
export function BeyondCoding() {
  const reduceMotion = useReducedMotion();

  // ===== INTERESTS DATA =====
  const interests = [
    {
      icon: <Brain className="h-[18px] w-[18px]" />,
      label: "AI & Machine Learning",
      description: "Exploring the future of intelligence",
    },
    {
      icon: <Rocket className="h-[18px] w-[18px]" />,
      label: "Personal Projects",
      description: "Building for the love of code",
    },
    {
      icon: <BookOpen className="h-[18px] w-[18px]" />,
      label: "Continuous Learning",
      description: "Never stop growing",
    },
    {
      icon: <Coffee className="h-[18px] w-[18px]" />,
      label: "Tech Communities",
      description: "Sharing knowledge with others",
    },
  ];

  const motivations = [
    { icon: <Heart className="h-3.5 w-3.5" />, label: "Passion for learning" },
    { icon: <Zap className="h-3.5 w-3.5" />, label: "Growth mindset" },
    { icon: <Award className="h-3.5 w-3.5" />, label: "Always building" },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
      <m.div initial="hidden" animate="visible" variants={reduceMotion ? undefined : containerVariants}>
        {/* ==========================================
            HEADER
            ========================================== */}
        <Reveal>
          <div className="flex items-center gap-2 mb-5">
            <span className="h-px w-8 bg-indigo-400 dark:bg-indigo-500" />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400">
              Beyond Coding
            </p>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.02] text-gray-900 dark:text-white max-w-2xl">
            Outside of <span className="text-accent-indigo">shipping features</span>
          </h2>
        </Reveal>

        {/* ==========================================
            SPLIT LAYOUT — pull-quote panel + interest timeline
            ========================================== */}
        <div className="mt-12 sm:mt-14 grid lg:grid-cols-[1fr_1.2fr] gap-6 lg:gap-8 items-start">
          {/* ===== LEFT: editorial pull-quote panel ===== */}
          <Reveal delay={0.06}>
            <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-gray-50/70 dark:bg-white/[0.03] p-8 sm:p-10 flex flex-col justify-between min-h-[320px]">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(80% 60% at 0% 0%, rgba(79,70,229,0.08) 0%, transparent 65%)",
                }}
              />
              <div className="absolute top-6 right-6 h-8 w-8 border-t-2 border-r-2 border-indigo-300/50 dark:border-indigo-500/30 rounded-tr-lg pointer-events-none" />

              <Quote className="relative h-9 w-9 text-indigo-200 dark:text-indigo-500/25 fill-current" />

              <p className="relative mt-6 text-xl sm:text-2xl leading-snug text-gray-800 dark:text-gray-100 font-medium">
                Outside software development, I spend time continuously
                learning about new technologies, exploring advancements in{" "}
                <span className="text-indigo-600 dark:text-indigo-400">AI</span>,
                and working on personal projects that push me to learn
                something I didn&apos;t know before.
              </p>

              <div className="relative mt-8 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  The passions and pursuits that shape my journey
                </span>
              </div>
            </div>
          </Reveal>

          {/* ===== RIGHT: interest timeline ===== */}
          <Reveal delay={0.1}>
            <m.div
              variants={reduceMotion ? undefined : containerVariants}
              className="relative pl-2"
            >
              {/* connecting line */}
              <div className="absolute left-[1.6rem] top-2 bottom-2 w-px bg-gray-200 dark:bg-white/10" />

              <div className="space-y-1">
                {interests.map((interest) => (
                  <m.div
                    key={interest.label}
                    variants={itemVariants}
                    className="group relative flex items-start gap-5 py-4 sm:py-5"
                  >
                    <span className="relative z-10 flex-shrink-0 h-11 w-11 rounded-2xl bg-white dark:bg-[var(--bg-primary)] border border-gray-200 dark:border-white/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-colors group-hover:border-indigo-300 dark:group-hover:border-indigo-500/40 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-500/10">
                      {interest.icon}
                    </span>
                    <div className="pt-1.5">
                      <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {interest.label}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {interest.description}
                      </p>
                    </div>
                  </m.div>
                ))}
              </div>
            </m.div>
          </Reveal>
        </div>

        {/* ==========================================
            BOTTOM MOTIVATION — pill badges, on-theme only
            ========================================== */}
        <Reveal delay={0.2}>
          <m.div
            variants={itemVariants}
            className="mt-10 sm:mt-12 flex flex-wrap justify-center items-center gap-2.5"
          >
            {motivations.map((m) => (
              <span
                key={m.label}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-white/10 text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors"
              >
                <span className="text-indigo-500 dark:text-indigo-400">{m.icon}</span>
                {m.label}
              </span>
            ))}
          </m.div>
        </Reveal>
      </m.div>
    </section>
  );
}