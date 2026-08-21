"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Rocket,
  Star,
  Mail,
  Github,
  Linkedin,
  Bot,
  Workflow,
  Layers3,
  CheckCircle2,
} from "lucide-react";

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
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AI / ML",
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[92vh] w-full items-center overflow-hidden">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
      >
        {/* Base */}
        <div className="absolute inset-0 bg-white dark:bg-slate-950" />

        {/* Main soft lavender glow */}
        <div
          className="
            absolute
            left-1/2
            top-[-320px]
            h-[700px]
            w-[1000px]
            -translate-x-1/2
            rounded-full
            bg-indigo-500/[0.055]
            blur-[120px]
            dark:bg-indigo-500/[0.09]
          "
        />

        {/* Right subtle glow */}
        <div
          className="
            absolute
            -right-[220px]
            top-[15%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-violet-500/[0.04]
            blur-[120px]
            dark:bg-violet-500/[0.07]
          "
        />

        {/* Bottom-left glow */}
        <div
          className="
            absolute
            -left-[220px]
            bottom-[-180px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-indigo-400/[0.035]
            blur-[120px]
          "
        />

        {/* Very subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.3] dark:opacity-[0.1]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(99,102,241,0.045) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(99,102,241,0.045) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 15%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 40%, black 15%, transparent 100%)",
          }}
        />

        {/* Top line */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-indigo-300/25
            to-transparent
          "
        />

        {/* Bottom line */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-indigo-300/20
            to-transparent
          "
        />
      </div>

      {/* =========================================================
          MINIMAL DECORATIVE ELEMENTS
      ========================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        {/* Top-right circle */}
        <div
          className="
            absolute
            -right-24
            -top-20
            h-64
            w-64
            rounded-full
            border
            border-indigo-200/35
            dark:border-indigo-400/10
          "
        />

        {/* Small left circle */}
        <div
          className="
            absolute
            -bottom-24
            -left-16
            h-52
            w-52
            rounded-full
            border
            border-indigo-200/25
            dark:border-indigo-400/[0.08]
          "
        />

        {/* Tiny dots */}
        <span className="absolute left-[7%] top-[35%] h-1.5 w-1.5 rounded-full bg-indigo-400/25" />

        <span className="absolute right-[9%] top-[36%] h-1 w-1 rounded-full bg-violet-400/30" />

        <span className="absolute right-[19%] bottom-[22%] h-1.5 w-1.5 rounded-full bg-indigo-400/25" />
      </div>

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-28 sm:px-8 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <motion.div
            variants={reduceMotion ? undefined : container}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* AVAILABLE BADGE */}

            <motion.div
              variants={item}
              className="
                mb-7
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-200/70
                bg-white/60
                px-3.5
                py-1.5
                shadow-[0_8px_25px_-15px_rgba(16,185,129,0.35)]
                backdrop-blur-xl
                dark:border-emerald-400/10
                dark:bg-white/[0.035]
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              <span
                className="
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-emerald-600/80
                  dark:text-emerald-400/80
                "
              >
                Available for work
              </span>
            </motion.div>

            {/* EYEBROW */}

            <motion.div
              variants={item}
              className="
                mb-3
                flex
                items-center
                gap-2
                text-[10px]
                font-mono
                uppercase
                tracking-[0.18em]
                text-slate-400
                dark:text-slate-500
              "
            >
              <span className="h-px w-7 bg-indigo-300/70" />

              Building digital experiences
            </motion.div>

            {/* MAIN HEADING */}

            <motion.h1
              variants={item}
              className="
                max-w-[720px]
                text-[50px]
                font-bold
                leading-[1.25]
                tracking-[-0.045em]
                text-slate-950
                sm:text-[62px]
                lg:text-[70px]
                xl:text-[76px]
                dark:text-white
              "
            >
              I build{" "}
              <span
                className="
                  inline-block
                  whitespace-nowrap
                  bg-gradient-to-r
                  from-indigo-600
                  via-indigo-500
                  to-violet-500
                  bg-clip-text
                  font-bold
                  text-transparent
                "
              >
                Intelligent
              </span>
              <br />
              Digital Products.
            </motion.h1>

            {/* DESCRIPTION */}

            <motion.p
              variants={item}
              className="
                mt-6
                max-w-[650px]
                text-[15px]
                leading-7
                text-slate-500
                sm:text-[16px]
                dark:text-slate-400
              "
            >
              Full Stack AI Developer, Web Automation Engineer & B2b Lead Generation expert
              creating fast, scalable and intelligent software that turns
              complex workflows into simple digital experiences.
            </motion.p>

            {/* FEATURE PILLS */}

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-2"
            >
              {[
                {
                  icon: Code2,
                  label: "Full Stack",
                },
                {
                  icon: Bot,
                  label: "AI Systems",
                },
                {
                  icon: Workflow,
                  label: "B2b Lead Generation",
                },
              ].map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.label}
                    className="
                      group
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-slate-200/80
                      bg-white/60
                      px-3.5
                      py-1.5
                      text-xs
                      font-medium
                      text-slate-500
                      shadow-[0_4px_15px_-10px_rgba(15,23,42,0.2)]
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-indigo-200
                      hover:text-indigo-600
                      dark:border-white/[0.07]
                      dark:bg-white/[0.03]
                      dark:text-slate-400
                    "
                  >
                    <Icon
                      className="
                        h-3.5
                        w-3.5
                        text-indigo-500/70
                        transition-colors
                        group-hover:text-indigo-500
                      "
                      strokeWidth={1.7}
                    />

                    {feature.label}
                  </div>
                );
              })}
            </motion.div>

            {/* STATS */}

            <motion.div
              variants={item}
              className="
                mt-8
                grid
                max-w-[580px]
                grid-cols-3
                gap-2
              "
            >
              {[
                {
                  icon: Rocket,
                  number: "5+",
                  label: "Years",
                },
                {
                  icon: Layers3,
                  number: "50+",
                  label: "Projects",
                },
                {
                  icon: Star,
                  number: "40+",
                  label: "Clients",
                },
              ].map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/80
                      bg-white/55
                      px-4
                      py-3.5
                      shadow-[0_10px_35px_-25px_rgba(79,70,229,0.35)]
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-indigo-200/70
                      hover:bg-white/75
                      dark:border-white/[0.07]
                      dark:bg-white/[0.025]
                    "
                  >
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -right-6
                        -top-6
                        h-16
                        w-16
                        rounded-full
                        bg-indigo-500/[0.06]
                        blur-xl
                      "
                    />

                    <div className="relative flex items-center gap-2.5">
                      <Icon
                        className="
                          h-4
                          w-4
                          shrink-0
                          text-indigo-500/60
                          transition-colors
                          group-hover:text-indigo-500
                        "
                        strokeWidth={1.7}
                      />

                      <div>
                        <div className="text-base font-bold text-slate-900 dark:text-white">
                          {stat.number}
                        </div>

                        <div
                          className="
                            text-[8px]
                            font-mono
                            uppercase
                            tracking-[0.12em]
                            text-slate-400
                            dark:text-slate-500
                          "
                        >
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* TECH STACK */}

            <motion.div
              variants={item}
              className="mt-5 flex flex-wrap gap-1.5"
            >
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-lg
                    border
                    border-slate-200/60
                    bg-white/40
                    px-2.5
                    py-1
                    text-[10px]
                    font-medium
                    text-slate-400
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-indigo-200
                    hover:bg-indigo-50/60
                    hover:text-indigo-600
                    dark:border-white/[0.06]
                    dark:bg-white/[0.02]
                    dark:hover:bg-indigo-500/[0.07]
                  "
                >
                  <span
                    className="
                      h-1
                      w-1
                      rounded-full
                      bg-indigo-400/40
                      transition-colors
                      group-hover:bg-indigo-500
                    "
                  />

                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA BUTTONS */}

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Link href="/projects">
                <button
                  className="
                    group
                    relative
                    inline-flex
                    h-11
                    items-center
                    gap-2
                    overflow-hidden
                    rounded-xl
                    bg-gradient-to-r
                    from-indigo-500
                    via-indigo-600
                    to-violet-600
                    px-5
                    text-sm
                    font-medium
                    text-white
                    shadow-[0_12px_25px_-10px_rgba(79,70,229,0.65)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-[0_16px_32px_-10px_rgba(79,70,229,0.7)]
                  "
                >
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      -left-10
                      w-8
                      rotate-[20deg]
                      bg-white/25
                      blur-sm
                      transition-all
                      duration-700
                      group-hover:left-[120%]
                    "
                  />

                  <Sparkles
                    className="relative h-4 w-4"
                    strokeWidth={1.7}
                  />

                  <span className="relative">View Projects</span>

                  <ArrowRight
                    className="
                      relative
                      h-4
                      w-4
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                    strokeWidth={1.7}
                  />
                </button>
              </Link>

              <Link href="/contact">
                <button
                  className="
                    group
                    inline-flex
                    h-11
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-200/80
                    bg-white/60
                    px-5
                    text-sm
                    font-medium
                    text-slate-600
                    shadow-sm
                    backdrop-blur-xl
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-indigo-200
                    hover:bg-white/80
                    hover:text-indigo-600
                    dark:border-white/[0.08]
                    dark:bg-white/[0.035]
                    dark:text-slate-300
                  "
                >
                  Let's Connect

                  <ArrowRight
                    className="
                      h-3.5
                      w-3.5
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                    strokeWidth={1.7}
                  />
                </button>
              </Link>
            </motion.div>

            {/* SOCIAL LINKS */}

            <motion.div
              variants={item}
              className="mt-5 flex items-center gap-2"
            >
              <span
                className="
                  mr-1
                  text-[9px]
                  font-mono
                  uppercase
                  tracking-[0.15em]
                  text-slate-300
                  dark:text-slate-600
                "
              >
                Find me
              </span>

              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200/70
                  bg-white/45
                  text-slate-400
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-indigo-200
                  hover:bg-indigo-50
                  hover:text-indigo-600
                  dark:border-white/[0.07]
                  dark:bg-white/[0.025]
                "
              >
                <Github className="h-3.5 w-3.5" strokeWidth={1.7} />
              </a>

              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200/70
                  bg-white/45
                  text-slate-400
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-indigo-200
                  hover:bg-indigo-50
                  hover:text-indigo-600
                  dark:border-white/[0.07]
                  dark:bg-white/[0.025]
                "
              >
                <Linkedin className="h-3.5 w-3.5" strokeWidth={1.7} />
              </a>

              <a
                href="mailto:abdul@example.com"
                aria-label="Email"
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-slate-200/70
                  bg-white/45
                  text-slate-400
                  backdrop-blur-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-indigo-200
                  hover:bg-indigo-50
                  hover:text-indigo-600
                  dark:border-white/[0.07]
                  dark:bg-white/[0.025]
                "
              >
                <Mail className="h-3.5 w-3.5" strokeWidth={1.7} />
              </a>
            </motion.div>
          </motion.div>

          {/* =====================================================
              RIGHT — PROFILE COMPOSITION
          ====================================================== */}

          <motion.div
            initial={
              reduceMotion
                ? undefined
                : {
                    opacity: 0,
                    x: 25,
                    scale: 0.97,
                  }
            }
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="
              relative
              flex
              min-h-[520px]
              items-center
              justify-center
              lg:justify-end
            "
          >
            <div
              className="
                relative
                h-[500px]
                w-[460px]
                max-w-full
                sm:h-[570px]
                sm:w-[540px]
              "
            >
              {/* =================================================
                  SOFT IMAGE GLOW
              ================================================== */}

              <div
                aria-hidden
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[390px]
                  w-[350px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-[42%]
                  bg-indigo-500/[0.09]
                  blur-[80px]
                  dark:bg-indigo-500/[0.13]
                "
              />

              {/* =================================================
                  LARGE BACK FRAME
              ================================================== */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[470px]
                  w-[370px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-[34px]
                  border
                  border-white/80
                  bg-white/30
                  shadow-[0_35px_90px_-40px_rgba(79,70,229,0.38)]
                  backdrop-blur-xl
                  sm:h-[510px]
                  sm:w-[400px]
                  dark:border-white/[0.07]
                  dark:bg-white/[0.025]
                "
              />

              {/* =================================================
                  SUBTLE OFFSET FRAME
              ================================================== */}

              <div
                aria-hidden
                className="
                  absolute
                  left-[calc(50%-155px)]
                  top-[calc(50%-215px)]
                  h-[430px]
                  w-[310px]
                  rotate-[-2deg]
                  rounded-[30px]
                  border
                  border-indigo-300/20
                  sm:left-[calc(50%-168px)]
                  sm:top-[calc(50%-235px)]
                  sm:h-[470px]
                  sm:w-[335px]
                  dark:border-indigo-400/[0.10]
                "
              />

              {/* =================================================
                  PROFILE IMAGE — LARGER
              ================================================== */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-10
                  w-[350px]
                  -translate-x-1/2
                  -translate-y-1/2
                  sm:w-[365px]
                "
              >
                <div
                  className="
                    relative
                    aspect-[0.78]
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-white/95
                    bg-slate-100
                    shadow-[0_35px_80px_-25px_rgba(15,23,42,0.30)]
                    dark:border-white/[0.09]
                    dark:bg-slate-900
                  "
                >
                  <Image
                    src="/images/profile.jpg"
                    alt="Abdul Qayyum"
                    fill
                    priority
                    sizes="(max-width: 640px) 320px, 365px"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      hover:scale-[1.025]
                    "
                  />

                  {/* Natural photo overlay */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-slate-950/[0.12]
                      via-transparent
                      to-white/[0.08]
                    "
                  />

                  {/* Image edge detail */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-3
                      rounded-[21px]
                      border
                      border-white/30
                    "
                  />

                  {/* Top-left bracket */}
                  <span
                    className="
                      absolute
                      left-5
                      top-5
                      h-6
                      w-6
                      border-l
                      border-t
                      border-white/85
                    "
                  />

                  {/* Bottom-right bracket */}
                  <span
                    className="
                      absolute
                      bottom-5
                      right-5
                      h-6
                      w-6
                      border-b
                      border-r
                      border-white/85
                    "
                  />
                </div>

                {/* Small image caption */}
                <div
                  className="
                    absolute
                    -bottom-4
                    left-6
                    rounded-lg
                    border
                    border-white/80
                    bg-white/75
                    px-3
                    py-1.5
                    shadow-[0_12px_30px_-15px_rgba(15,23,42,0.25)]
                    backdrop-blur-xl
                    dark:border-white/[0.08]
                    dark:bg-slate-950/70
                  "
                >
                  <span
                    className="
                      text-[9px]
                      font-mono
                      uppercase
                      tracking-[0.16em]
                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Abdul Qayyum · Developer
                  </span>
                </div>
              </div>

              {/* =================================================
                  PROJECTS FLOATING CARD
              ================================================== */}

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  left-0
                  top-[18%]
                  z-20
                  hidden
                  rounded-2xl
                  border
                  border-white/85
                  bg-white/80
                  px-3.5
                  py-3
                  shadow-[0_20px_45px_-20px_rgba(79,70,229,0.3)]
                  backdrop-blur-xl
                  sm:block
                  dark:border-white/[0.08]
                  dark:bg-slate-950/65
                "
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-xl
                      bg-indigo-50
                      text-indigo-500
                      dark:bg-indigo-500/10
                    "
                  >
                    <Code2 className="h-4 w-4" strokeWidth={1.7} />
                  </div>

                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      50+
                    </div>

                    <div className="text-[8px] uppercase tracking-wider text-slate-400">
                      Projects shipped
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* =================================================
                  AI CARD
              ================================================== */}

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, 6, 0],
                      }
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7,
                }}
                className="
                  absolute
                  right-0
                  top-[45%]
                  z-20
                  hidden
                  rounded-2xl
                  border
                  border-white/85
                  bg-white/80
                  px-3.5
                  py-3
                  shadow-[0_20px_45px_-20px_rgba(79,70,229,0.3)]
                  backdrop-blur-xl
                  sm:block
                  dark:border-white/[0.08]
                  dark:bg-slate-950/65
                "
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-xl
                      bg-violet-50
                      text-violet-500
                      dark:bg-violet-500/10
                    "
                  >
                    <Bot className="h-4 w-4" strokeWidth={1.7} />
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      Web Development
                    </div>

                    <div className="text-[8px] uppercase tracking-wider text-slate-400">
                      Smart systems
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* =================================================
                  SMALL TECH MARK
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-[12%]
                  left-[3%]
                  z-20
                  hidden
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/80
                  bg-white/70
                  text-indigo-500
                  shadow-[0_15px_35px_-20px_rgba(79,70,229,0.35)]
                  backdrop-blur-xl
                  sm:flex
                  dark:border-white/[0.08]
                  dark:bg-slate-950/70
                "
              >
                <Code2 className="h-4 w-4" strokeWidth={1.7} />
              </div>

              {/* =================================================
                  AVAILABLE BADGE
              ================================================== */}

              <div
                className="
                  absolute
                  bottom-[7%]
                  right-[1%]
                  z-30
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-emerald-200/80
                  bg-white/85
                  px-3.5
                  py-2
                  shadow-[0_15px_35px_-15px_rgba(16,185,129,0.3)]
                  backdrop-blur-xl
                  dark:border-emerald-400/10
                  dark:bg-slate-950/75
                "
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300">
                  Available
                </span>

                <CheckCircle2
                  className="h-3.5 w-3.5 text-emerald-500"
                  strokeWidth={1.7}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.1,
          duration: 0.6,
        }}
        className="
          absolute
          bottom-5
          left-1/2
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-1.5
          md:flex
        "
      >
        <span
          className="
            text-[8px]
            font-mono
            uppercase
            tracking-[0.25em]
            text-slate-300
            dark:text-slate-600
          "
        >
          Scroll
        </span>

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, 5, 0],
                }
          }
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            border
            border-slate-200/60
            bg-white/40
            dark:border-white/[0.06]
          "
        >
          <ArrowRight
            className="h-3 w-3 rotate-90 text-slate-400"
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}