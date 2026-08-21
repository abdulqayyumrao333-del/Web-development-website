"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  GraduationCap,
  Code2,
  Bot,
  Briefcase,
  Rocket,
  Layers,
  MapPin,
} from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const MILESTONES = [
  {
    year: "2024",
    title: "Started BS Computer Science",
    text: "Began Bachelor of Science in Computer Science at the University of Education.",
    icon: GraduationCap,
    category: "Education",
    tag: "EDU",
  },
  {
    year: "2024",
    title: "Started learning web development",
    text: "Began learning modern web development and JavaScript.",
    icon: Code2,
    category: "Skills",
    tag: "SKILL",
  },
  {
    year: "2025",
    title: "First real-world projects",
    text: "Started building real-world portfolio projects.",
    icon: Layers,
    category: "Projects",
    tag: "BUILD",
  },
  {
    year: "2025",
    title: "Explored AI development",
    text: "Began exploring AI application development and automation.",
    icon: Bot,
    category: "AI",
    tag: "AI",
  },
  {
    year: "2025",
    title: "Started freelancing",
    text: "Started working on freelance-oriented software projects and building a professional portfolio.",
    icon: Briefcase,
    category: "Work",
    tag: "WORK",
  },
  {
    year: "2026",
    title: "Enterprise portfolio build",
    text: "Building a production-grade personal portfolio with enterprise architecture, PWA support, AI integration, and advanced SEO.",
    icon: Rocket,
    category: "Current",
    tag: "NOW",
    current: true,
  },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

function TimelineItem({
  milestone,
  index,
  isActive,
  onHover,
  total,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
  total: number;
}) {
  const Icon = milestone.icon;
  const isLast = index === total - 1;
  const showYear = index === 0 || milestone.year !== MILESTONES[index - 1].year;

  return (
    <li
      className="relative"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      {/* year label — only on year change */}
      {showYear && (
        <div className="flex items-center gap-3 mb-3 ml-0">
          <span className="font-mono text-[11px] font-semibold tracking-[0.2em] uppercase text-accent-indigo/60">
            {milestone.year}
          </span>
          <span
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(to right, rgba(99,102,241,0.2), transparent)",
            }}
          />
        </div>
      )}

      <div className="flex gap-5 pb-3">
        {/* track dot + connector */}
        <div className="relative flex flex-col items-center shrink-0 pt-1">
          {/* connector down */}
          {!isLast && (
            <div
              className="absolute top-11 bottom-0 left-1/2 w-px -translate-x-1/2 transition-all duration-500"
              style={{
                background: isActive
                  ? "linear-gradient(to bottom, rgba(99,102,241,0.5), rgba(99,102,241,0.12))"
                  : "linear-gradient(to bottom, rgba(99,102,241,0.15), transparent)",
              }}
            />
          )}

          {/* icon circle */}
          <div
            className={[
              "relative z-10 flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300",
              isActive || isLast
                ? "border-accent-indigo/40 bg-accent-indigo/12"
                : "border-accent-indigo/14 bg-bg-surface-1/80",
            ].join(" ")}
            style={{
              boxShadow: isActive
                ? "0 0 0 4px rgba(99,102,241,0.07), 0 4px 12px rgba(99,102,241,0.12)"
                : "0 1px 3px rgba(15,23,42,0.05)",
            }}
          >
            <Icon
              className={[
                "h-4 w-4 transition-colors duration-300",
                isActive || isLast
                  ? "text-accent-indigo"
                  : "text-accent-indigo/40",
              ].join(" ")}
              strokeWidth={1.75}
            />
            {/* current pulse ring */}
            {isLast && (
              <span className="absolute -inset-1 rounded-xl border border-accent-indigo/20 animate-pulse" />
            )}
          </div>
        </div>

        {/* card */}
        <div
          className={[
            "group relative flex-1 overflow-hidden rounded-2xl border transition-all duration-300 mb-3",
            isLast
              ? "border-accent-indigo/30 bg-bg-surface-1/80"
              : isActive
              ? "border-accent-indigo/25 bg-bg-surface-1/80"
              : "border-accent-indigo/10 bg-bg-surface-1/60 hover:border-accent-indigo/20",
          ].join(" ")}
          style={{ boxShadow: panelShadow }}
        >
          {/* diagonal texture — top portion */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.35]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, transparent 100%)",
            }}
          />

          {/* hover wash */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent-indigo/[0.04] to-transparent"
          />

          {/* top-right bracket */}
          <div
            aria-hidden
            className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-colors duration-300 pointer-events-none"
          />

          {/* accent bottom line on active */}
          <div
            className="absolute bottom-0 left-0 h-px rounded-full transition-all duration-500 bg-gradient-to-r from-accent-indigo to-accent-indigo/30"
            style={{ width: isActive ? "100%" : "0%" }}
          />

          <div className="relative px-5 py-4 sm:px-6 sm:py-5">
            {/* header row */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-semibold text-sm leading-snug">{milestone.title}</h3>

              <div className="flex items-center gap-2 shrink-0">
                <span className="flex items-center gap-1 font-mono text-[10px] text-text-muted/50">
                  <Calendar className="h-2.5 w-2.5" strokeWidth={1.5} />
                  {milestone.year}
                </span>
                <span
                  className={[
                    "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest border",
                    isLast
                      ? "border-accent-indigo/30 bg-accent-indigo/10 text-accent-indigo"
                      : "border-accent-indigo/12 bg-transparent text-accent-indigo/45",
                  ].join(" ")}
                >
                  {isLast && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-indigo/70 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-indigo" />
                    </span>
                  )}
                  {milestone.tag}
                </span>
              </div>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed">
              {milestone.text}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

export function JourneyTimeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (rect.height - window.innerHeight))
      );
      setProgress(scrollProgress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28"
    >
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
                Journey
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Milestones
                <br />
                <span className="text-accent-indigo">so far</span>
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mt-3 max-w-[13rem]">
              Two years of deliberate progress — each step a foundation for the
              next.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {MILESTONES.length} milestones
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  2024 — 2026
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Continuous growth
                </p>
              </div>
            </div>

            {/* scroll progress bar */}
            <div className="mt-8 space-y-1.5">
              <div className="w-full max-w-[10rem] h-1 rounded-full bg-accent-indigo/10 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent-indigo to-accent-indigo/50"
                  style={{ width: `${progress * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="font-mono text-[10px] text-text-muted/40 tracking-widest">
                {Math.round(progress * 100)}% read
              </p>
            </div>

            {/* year anchors */}
            <div className="mt-6 hidden lg:flex flex-col gap-2">
              {["2024", "2025", "2026"].map((y) => (
                <div key={y} className="flex items-center gap-2">
                  <span className="h-px w-4 bg-accent-indigo/25" />
                  <span className="font-mono text-[11px] text-text-muted/50">
                    {y}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT ══ */}
        <Reveal delay={0.1}>
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <ol className="relative">
              {MILESTONES.map((milestone, index) => (
                <TimelineItem
                  key={index}
                  milestone={milestone}
                  index={index}
                  isActive={activeIndex === index}
                  onHover={setActiveIndex}
                  total={MILESTONES.length}
                />
              ))}
            </ol>

            {/* track end */}
            <div className="flex items-center gap-3 mt-1 ml-0 pl-14">
              <MapPin className="h-3 w-3 text-accent-indigo/25 shrink-0" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted/40">
                What's next — to be written
              </span>
            </div>

            {/* bottom strip */}
            <div className="mt-4 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                JOURNEY · 2024–2026 · {MILESTONES.length} MILESTONES
              </p>
              <div className="flex gap-1">
                {MILESTONES.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 w-2 rounded-full transition-colors duration-300"
                    style={{
                      backgroundColor:
                        activeIndex === i
                          ? "rgb(99 102 241 / 0.8)"
                          : i === MILESTONES.length - 1
                          ? "rgb(99 102 241 / 0.5)"
                          : `rgb(99 102 241 / ${0.25 - i * 0.02})`,
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