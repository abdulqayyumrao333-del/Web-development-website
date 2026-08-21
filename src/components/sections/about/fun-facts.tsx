"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Sparkles, Lightbulb, BookOpen } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

const FACTS = [
  {
    icon: GraduationCap,
    label: "Academic",
    text: "Computer Science student at University of Education — class of 2028.",
    code: "EDU",
  },
  {
    icon: Sparkles,
    label: "Passion",
    text: "Passionate about AI and Full Stack Development — building things that think.",
    code: "AI",
  },
  {
    icon: Lightbulb,
    label: "Mindset",
    text: "Enjoys turning rough ideas into working software — the messier the idea, the better.",
    code: "BUILD",
  },
  {
    icon: BookOpen,
    label: "Growth",
    text: "Always learning through real-world projects — tutorials don't stick, shipping does.",
    code: "LEARN",
  },
];

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

function FlipCard({
  icon: Icon,
  label,
  text,
  code,
  index,
}: {
  icon: typeof GraduationCap;
  label: string;
  text: string;
  code: string;
  index: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <Reveal delay={0.12 + index * 0.07}>
      <button
        onClick={() => setFlipped((f) => !f)}
        aria-expanded={flipped}
        aria-label={flipped ? text : `Reveal: ${label}`}
        className="group h-44 w-full [perspective:1000px] focus:outline-none"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {/* ── FRONT ── */}
          <div
            className={[
              "absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl border [backface-visibility:hidden]",
              "border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm",
              "transition-all duration-300",
              "group-hover:border-accent-indigo/30",
            ].join(" ")}
            style={{ boxShadow: panelShadow }}
          >
            {/* diagonal texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.35]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                maskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 80%)",
              }}
            />

            {/* hover wash */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent-indigo/[0.06] to-transparent pointer-events-none"
            />

            {/* top-right bracket */}
            <div
              aria-hidden
              className="absolute top-3.5 right-3.5 h-5 w-5 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-colors duration-300 pointer-events-none"
            />

            {/* code — top left */}
            <span className="absolute top-3.5 left-4 font-mono text-[10px] text-accent-indigo/35 group-hover:text-accent-indigo/65 transition-colors duration-300 select-none">
              {code}
            </span>

            {/* icon */}
            <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/14 transition-colors duration-300">
              <Icon className="h-5 w-5 text-accent-indigo" strokeWidth={1.75} />
            </span>

            {/* label + tap hint */}
            <div className="text-center">
              <p className="text-sm font-medium leading-snug">{label}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-text-muted/60 group-hover:text-accent-indigo/50 transition-colors duration-300">
                tap to reveal
              </p>
            </div>
          </div>

          {/* ── BACK ── */}
          <div
            className={[
              "absolute inset-0 flex flex-col items-start justify-between rounded-2xl border p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]",
              "border-accent-indigo/25 bg-bg-surface-1",
            ].join(" ")}
            style={{
              boxShadow:
                "0 2px 4px rgba(15,23,42,0.06), 0 12px 32px -8px rgba(79,70,229,0.16)",
            }}
          >
            {/* top row */}
            <div className="flex items-center justify-between w-full">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent-indigo/20 bg-accent-indigo/10">
                <Icon className="h-3.5 w-3.5 text-accent-indigo" strokeWidth={2} />
              </span>
              <span className="font-mono text-[10px] text-accent-indigo/50 uppercase tracking-widest">
                {code}
              </span>
            </div>

            {/* text */}
            <p className="text-sm font-medium leading-relaxed text-text-primary">
              {text}
            </p>

            {/* bottom hint */}
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted/50">
              tap to flip back
            </p>
          </div>
        </motion.div>
      </button>
    </Reveal>
  );
}

export function FunFacts() {
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
        {/* glow top-center */}
        <div
          className="absolute inset-x-0 top-0 h-[380px]"
          style={{
            background:
              "radial-gradient(40% 80% at 50% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
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
                Fun Facts
              </p>
            </div>

            <div className="relative mb-4">
              
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                A few
                <br />
                <span className="text-accent-indigo">real</span>, small
                <br />
                <span className="text-accent-indigo">things</span>
              </h2>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mt-3 max-w-[13rem]">
              Tap each card to flip it — four things that actually describe how I work and think.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  4 cards
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  All true
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Tap to explore
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ══ RIGHT — flip cards ══ */}
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

            <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
              {FACTS.map((fact, i) => (
                <FlipCard
                  key={fact.text}
                  icon={fact.icon}
                  label={fact.label}
                  text={fact.text}
                  code={fact.code}
                  index={i}
                />
              ))}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                ABOUT · PERSONAL · 4 FACTS
              </p>
              <div className="flex gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1 w-4 rounded-full"
                    style={{
                      backgroundColor: `rgb(99 102 241 / ${0.65 - i * 0.12})`,
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