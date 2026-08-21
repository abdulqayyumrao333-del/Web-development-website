"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Rocket,
  Award,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  ExternalLink,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/sections/reveal";

// ============================================================
// ANIMATION
// ============================================================

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 14,
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

// ============================================================
// DATA
// ============================================================

const stats = [
  {
    value: "5+",
    label: "Years Building",
    icon: Rocket,
  },
  {
    value: "50+",
    label: "Projects Shipped",
    icon: Code2,
  },
  {
    value: "30+",
    label: "Technologies",
    icon: Sparkles,
  },
  {
    value: "40+",
    label: "Happy Clients",
    icon: Award,
  },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: Twitter,
    href: "https://twitter.com",
    label: "Twitter",
  },
];

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AI / ML",
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export function AboutHero() {
  return (
    <section className="relative overflow-hidden">
      {/* ======================================================
          BACKGROUND
          ====================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Main soft background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(249,250,255,0.9) 0%, rgba(255,255,255,1) 45%, rgba(248,249,255,0.9) 100%)",
          }}
        />

        {/* Very subtle top glow */}
        <div
          className="absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(99,102,241,0.075) 0%, rgba(99,102,241,0.025) 38%, transparent 72%)",
          }}
        />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(99,102,241,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.035) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 75%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 75%)",
          }}
        />

        {/* Top border */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.18), transparent)",
          }}
        />
      </div>

      {/* ======================================================
          HERO CONTAINER
          ====================================================== */}

      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">

          {/* ==================================================
              LEFT CONTENT
              ================================================== */}

          <Reveal>
            <motion.div
              variants={container}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Eyebrow */}
              <motion.div
                variants={item}
                className="mb-6 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-accent-indigo/60" />

                <span className="text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-accent-indigo">
                  About Me
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/15 bg-emerald-500/[0.045] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wider text-emerald-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Available
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div variants={item}>
                <h1 className="max-w-3xl text-[3.2rem] font-semibold leading-[0.98] tracking-[-0.055em] text-text-primary sm:text-[4.3rem] lg:text-[4.7rem]">
                  I build
                  <br />

                  <span className="relative inline-block text-accent-indigo">
                    digital experiences.
                  </span>
                </h1>
              </motion.div>

              {/* Intro */}
              <motion.p
                variants={item}
                className="mt-7 max-w-xl text-base leading-7 text-text-secondary sm:text-[17px] sm:leading-8"
              >
                I&apos;m Abdul Qayyum — a Full Stack Developer, AI Engineer,
                and Web Automation specialist focused on turning complex
                ideas into fast, scalable, and intelligent digital products.
              </motion.p>

              {/* Role pills */}
              <motion.div
                variants={item}
                className="mt-6 flex flex-wrap gap-2"
              >
                {[
                  "Full Stack Development",
                  "AI Systems",
                  "Web Automation",
                ].map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-2 rounded-full border border-accent-indigo/10 bg-white/75 px-3.5 py-1.5 text-[10px] font-medium text-text-secondary shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-accent-indigo/25 hover:text-accent-indigo"
                  >
                    <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                    {role}
                  </span>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={item}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href="/resume"
                  className="group inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-5 py-3 text-sm font-medium text-white shadow-lg shadow-accent-indigo/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-indigo/90 hover:shadow-xl hover:shadow-accent-indigo/25"
                >
                  Download Resume

                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.8}
                  />
                </Link>

                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-medium text-text-secondary shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.025] hover:text-accent-indigo"
                >
                  View Projects

                  <ExternalLink
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    strokeWidth={1.7}
                  />
                </Link>
              </motion.div>

              {/* Trust row */}
              <motion.div
                variants={item}
                className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                      strokeWidth={1.5}
                    />
                  ))}

                  <span className="ml-1 text-xs font-semibold text-text-primary">
                    5.0
                  </span>
                </div>

                <span className="h-3 w-px bg-slate-200" />

                <span className="text-xs text-text-muted">
                  Trusted by 40+ clients worldwide
                </span>
              </motion.div>

              {/* Location / availability */}
              <motion.div
                variants={item}
                className="mt-8 flex flex-wrap items-center gap-5 border-t border-slate-200/70 pt-5"
              >
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <MapPin className="h-3.5 w-3.5 text-accent-indigo/70" />
                  Pakistan · Remote
                </div>

                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/70" />
                  Available for work
                </div>
              </motion.div>
            </motion.div>
          </Reveal>

          {/* ==================================================
              RIGHT PROFILE AREA
              ================================================== */}

          <Reveal delay={0.12}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto w-full max-w-[500px] lg:ml-auto"
            >
              {/* Soft background glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-accent-indigo/[0.035] blur-3xl"
              />

              {/* Main profile card */}
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 p-3 shadow-[0_30px_80px_-35px_rgba(79,70,229,0.28)] backdrop-blur-xl">

                {/* Card top accent */}
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent-indigo/30 to-transparent" />

                {/* Image */}
                <div className="relative aspect-[1.12/1] overflow-hidden rounded-[1.55rem] bg-slate-100">
                  <Image
                    src="/images/profile.jpg"
                    alt="Abdul Qayyum"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 500px"
                    className="object-cover object-center"
                  />

                  {/* Image overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent"
                  />

                  {/* Availability badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 rounded-full border border-white/50 bg-white/90 px-3 py-2 shadow-lg backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" />

                      <span className="text-[10px] font-medium text-slate-700">
                        Available for work
                      </span>
                    </div>
                  </div>

                  {/* Social buttons */}
                  <div className="absolute right-4 top-4 flex gap-1.5">
                    {socialLinks.map((social) => {
                      const Icon = social.icon;

                      return (
                        <Link
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/85 text-slate-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-accent-indigo"
                        >
                          <Icon
                            className="h-4 w-4"
                            strokeWidth={1.7}
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Profile information */}
                <div className="px-4 pb-4 pt-5 sm:px-5 sm:pb-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-accent-indigo/70">
                        Full Stack · Web Development
                      </p>

                      <h2 className="mt-1.5 text-2xl font-semibold tracking-tight text-text-primary">
                        Abdul Qayyum
                      </h2>

                      <p className="mt-1 text-sm text-text-muted">
                        Developer building useful digital products.
                      </p>
                    </div>

                    <div className="hidden shrink-0 rounded-xl border border-accent-indigo/10 bg-accent-indigo/[0.035] p-2.5 sm:block">
                      <Code2
                        className="h-5 w-5 text-accent-indigo/70"
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-slate-200 bg-slate-50/70 px-2.5 py-1 text-[9px] font-mono text-text-muted transition-colors duration-300 hover:border-accent-indigo/20 hover:text-accent-indigo"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating project badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.7,
                }}
                className="absolute -left-5 top-16 hidden rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-xl shadow-slate-900/[0.06] backdrop-blur-xl sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-indigo/[0.07]">
                    <Rocket
                      className="h-4 w-4 text-accent-indigo"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted">
                      Projects shipped
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-text-primary">
                      50+
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Floating AI badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.85,
                }}
                className="absolute -right-4 bottom-28 hidden rounded-2xl border border-slate-200/80 bg-white/95 px-4 py-3 shadow-xl shadow-slate-900/[0.06] backdrop-blur-xl sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/[0.07]">
                    <Sparkles
                      className="h-4 w-4 text-violet-500"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted">
                      Focus
                    </p>

                    <p className="mt-0.5 text-sm font-semibold text-text-primary">
                      Web Development
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </Reveal>
        </div>

        {/* ====================================================
            STATS
            ==================================================== */}

        <Reveal delay={0.2}>
          <div className="mt-14 border-y border-slate-200/70 py-5 sm:mt-16">
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-200/70 sm:grid-cols-4 sm:divide-y-0">
              {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className={`group flex items-center justify-center gap-3 px-4 py-4 transition-colors duration-300 hover:bg-accent-indigo/[0.018] ${
                      index >= 2
                        ? "border-t border-slate-200/70 sm:border-t-0"
                        : ""
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-accent-indigo/10 bg-accent-indigo/[0.035] transition-all duration-300 group-hover:border-accent-indigo/20 group-hover:bg-accent-indigo/[0.06]">
                      <Icon
                        className="h-4 w-4 text-accent-indigo/70"
                        strokeWidth={1.7}
                      />
                    </div>

                    <div>
                      <p className="text-lg font-semibold leading-none tracking-tight text-text-primary sm:text-xl">
                        {stat.value}
                      </p>

                      <p className="mt-1 text-[10px] text-text-muted">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* ====================================================
            BOTTOM INTRO STRIP
            ==================================================== */}

        <Reveal delay={0.25}>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-accent-indigo/10 bg-accent-indigo/[0.018] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-indigo/[0.07]">
                <Mail
                  className="h-3.5 w-3.5 text-accent-indigo/70"
                  strokeWidth={1.7}
                />
              </div>

              <div>
                <p className="text-xs font-medium text-text-primary">
                  Have an idea worth building?
                </p>

                <p className="mt-0.5 text-[10px] text-text-muted">
                  Let&apos;s turn it into something useful.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-xs font-medium text-accent-indigo transition-colors hover:text-accent-indigo/80"
            >
              Let&apos;s work together

              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}