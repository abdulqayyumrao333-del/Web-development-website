"use client";

import { m, useReducedMotion } from "framer-motion";
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
    <section className="relative isolate flex min-h-[92vh] w-full overflow-x-hidden overflow-y-visible">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white dark:bg-slate-950" />

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
          DECORATIVE ELEMENTS
      ========================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
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

        <span className="absolute left-[7%] top-[35%] h-1.5 w-1.5 rounded-full bg-indigo-400/25" />

        <span className="absolute right-[9%] top-[36%] h-1 w-1 rounded-full bg-violet-400/30" />

        <span className="absolute right-[19%] bottom-[22%] h-1.5 w-1.5 rounded-full bg-indigo-400/25" />
      </div>

      {/* =========================================================
          MAIN CONTAINER
      ========================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-7xl
          px-4
          py-20
          sm:px-8
          sm:py-28
          lg:px-10
        "
      >
        <div
          className="
            grid
            items-center
            gap-12
            lg:grid-cols-[1.02fr_0.98fr]
            lg:gap-10
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <m.div
            variants={reduceMotion ? undefined : container}
            initial={false}
            animate="visible"
            className="relative min-w-0"
          >
            {/* AVAILABLE BADGE */}

            <m.div
              variants={item}
              className="
                mb-6
                inline-flex
                max-w-full
                items-center
                gap-2
                rounded-full
                border
                border-emerald-200/70
                bg-white/60
                px-3
                py-1.5
                shadow-[0_8px_25px_-15px_rgba(16,185,129,0.35)]
                backdrop-blur-xl
                dark:border-emerald-400/10
                dark:bg-white/[0.035]
                sm:mb-7
                sm:px-3.5
              "
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>

              <span
                className="
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.14em]
                  text-emerald-600/80
                  dark:text-emerald-400/80
                  sm:text-[9px]
                "
              >
                Available for work
              </span>
            </m.div>

            {/* EYEBROW */}

            <m.div
              variants={item}
              className="
                mb-3
                flex
                items-center
                gap-2
                text-[9px]
                font-mono
                uppercase
                tracking-[0.15em]
                text-slate-400
                dark:text-slate-500
                sm:text-[10px]
                sm:tracking-[0.18em]
              "
            >
              <span className="h-px w-6 shrink-0 bg-indigo-300/70 sm:w-7" />

              <span>Building digital experiences</span>
            </m.div>

            {/* =====================================================
                MAIN HEADING
            ====================================================== */}

            <m.h1
              variants={item}
              className="
                max-w-[720px]
                text-[38px]
                font-bold
                leading-[1.12]
                tracking-[-0.045em]
                text-slate-950
                sm:text-[54px]
                sm:leading-[1.18]
                md:text-[62px]
                lg:text-[70px]
                xl:text-[76px]
                dark:text-white
              "
            >
              I build{" "}
              <span
                className="
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
            </m.h1>

            {/* DESCRIPTION */}

            <m.p
              variants={item}
              className="
                mt-5
                max-w-[650px]
                text-[14px]
                leading-6
                text-slate-500
                sm:mt-6
                sm:text-[16px]
                sm:leading-7
                dark:text-slate-400
              "
            >
              Full Stack AI Developer, Web Automation Engineer & B2B Lead
              Generation expert creating fast, scalable and intelligent
              software that turns complex workflows into simple digital
              experiences.
            </m.p>

            {/* FEATURE PILLS */}

            <m.div
              variants={item}
              className="mt-6 flex flex-wrap items-center gap-2 sm:mt-7"
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
                  label: "B2B Lead Generation",
                },
              ].map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.label}
                    className="
                      group
                      inline-flex
                      max-w-full
                      items-center
                      gap-1.5
                      rounded-full
                      border
                      border-slate-200/80
                      bg-white/60
                      px-3
                      py-1.5
                      text-[10px]
                      font-medium
                      text-slate-500
                      shadow-[0_4px_15px_-10px_rgba(15,23,42,0.2)]
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:border-indigo-200
                      hover:text-indigo-600
                      sm:gap-2
                      sm:px-3.5
                      sm:text-xs
                      dark:border-white/[0.07]
                      dark:bg-white/[0.03]
                      dark:text-slate-400
                    "
                  >
                    <Icon
                      className="
                        h-3.5
                        w-3.5
                        shrink-0
                        text-indigo-500/70
                        transition-colors
                        group-hover:text-indigo-500
                      "
                      strokeWidth={1.7}
                    />

                    <span className="truncate">{feature.label}</span>
                  </div>
                );
              })}
            </m.div>

            {/* STATS */}

            <m.div
              variants={item}
              className="
                mt-7
                grid
                max-w-[580px]
                grid-cols-3
                gap-2
                sm:mt-8
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
                      min-w-0
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/80
                      bg-white/55
                      px-2.5
                      py-3
                      shadow-[0_10px_35px_-25px_rgba(79,70,229,0.35)]
                      backdrop-blur-xl
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-indigo-200/70
                      hover:bg-white/75
                      sm:rounded-2xl
                      sm:px-4
                      sm:py-3.5
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

                    <div className="relative flex items-center gap-1.5 sm:gap-2.5">
                      <Icon
                        className="
                          h-3.5
                          w-3.5
                          shrink-0
                          text-indigo-500/60
                          transition-colors
                          group-hover:text-indigo-500
                          sm:h-4
                          sm:w-4
                        "
                        strokeWidth={1.7}
                      />

                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                          {stat.number}
                        </div>

                        <div
                          className="
                            truncate
                            text-[7px]
                            font-mono
                            uppercase
                            tracking-[0.08em]
                            text-slate-400
                            sm:text-[8px]
                            sm:tracking-[0.12em]
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
            </m.div>

            {/* TECH STACK */}

            <m.div
              variants={item}
              className="mt-4 flex flex-wrap gap-1.5 sm:mt-5"
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
                    px-2
                    py-1
                    text-[9px]
                    font-medium
                    text-slate-400
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-indigo-200
                    hover:bg-indigo-50/60
                    hover:text-indigo-600
                    sm:px-2.5
                    sm:text-[10px]
                    dark:border-white/[0.06]
                    dark:bg-white/[0.02]
                    dark:hover:bg-indigo-500/[0.07]
                  "
                >
                  <span
                    className="
                      h-1
                      w-1
                      shrink-0
                      rounded-full
                      bg-indigo-400/40
                      transition-colors
                      group-hover:bg-indigo-500
                    "
                  />

                  {tech}
                </span>
              ))}
            </m.div>

            {/* CTA BUTTONS */}

            <m.div
              variants={item}
              className="mt-6 flex flex-wrap items-center gap-3 sm:mt-7"
            >
              <Link
                href="/projects"
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
                  px-4
                  text-sm
                  font-medium
                  text-white
                  shadow-[0_12px_25px_-10px_rgba(79,70,229,0.65)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_16px_32px_-10px_rgba(79,70,229,0.7)]
                  sm:px-5
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
              </Link>

              <Link
                href="/contact"
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
                  px-4
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
                  sm:px-5
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
              </Link>
            </m.div>

            {/* SOCIAL LINKS */}

            <m.div
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
                href="https://github.com/abdulqayyumrao333-del"
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
                href="https://linkedin.com/in/abdul-qayyum"
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
                href="mailto:abdulqayyumrao333@gmail.com"
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
            </m.div>
          </m.div>

          {/* =====================================================
              RIGHT — PROFILE COMPOSITION
          ====================================================== */}

          <m.div
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
              min-h-[410px]
              w-full
              items-center
              justify-center
              overflow-visible
              sm:min-h-[520px]
              lg:justify-end
            "
          >
            <div
              className="
                relative
                h-[390px]
                w-[300px]
                max-w-[calc(100vw-32px)]
                sm:h-[500px]
                sm:w-[460px]
                md:h-[570px]
                md:w-[540px]
              "
            >
              {/* SOFT IMAGE GLOW */}

              <div
                aria-hidden
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[280px]
                  w-[250px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-[42%]
                  bg-indigo-500/[0.09]
                  blur-[70px]
                  sm:h-[390px]
                  sm:w-[350px]
                  sm:blur-[80px]
                  dark:bg-indigo-500/[0.13]
                "
              />

              {/* LARGE BACK FRAME */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[370px]
                  w-[275px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-[28px]
                  border
                  border-white/80
                  bg-white/30
                  shadow-[0_25px_70px_-35px_rgba(79,70,229,0.38)]
                  backdrop-blur-xl
                  sm:h-[470px]
                  sm:w-[370px]
                  sm:rounded-[34px]
                  md:h-[510px]
                  md:w-[400px]
                  dark:border-white/[0.07]
                  dark:bg-white/[0.025]
                "
              />

              {/* SUBTLE OFFSET FRAME */}

              <div
                aria-hidden
                className="
                  absolute
                  left-[calc(50%-115px)]
                  top-[calc(50%-175px)]
                  h-[350px]
                  w-[230px]
                  rotate-[-2deg]
                  rounded-[25px]
                  border
                  border-indigo-300/20
                  sm:left-[calc(50%-145px)]
                  sm:top-[calc(50%-215px)]
                  sm:h-[430px]
                  sm:w-[310px]
                  sm:rounded-[30px]
                  md:left-[calc(50%-168px)]
                  md:top-[calc(50%-235px)]
                  md:h-[470px]
                  md:w-[335px]
                  dark:border-indigo-400/[0.10]
                "
              />

              {/* =================================================
                  PROFILE IMAGE
              ================================================== */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-10
                  w-[260px]
                  -translate-x-1/2
                  -translate-y-1/2
                  sm:w-[320px]
                  md:w-[365px]
                "
              >
                <div
                  className="
                    relative
                    aspect-[0.78]
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-white/95
                    bg-slate-100
                    shadow-[0_30px_70px_-25px_rgba(15,23,42,0.30)]
                    sm:rounded-[28px]
                    dark:border-white/[0.09]
                    dark:bg-slate-900
                  "
                >
                  <Image
                    src="/images/profile.jpg"
                    alt="Abdul Qayyum"
                    fill
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 365px"
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      hover:scale-[1.025]
                    "
                  />

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

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-2
                      rounded-[19px]
                      border
                      border-white/30
                      sm:inset-3
                      sm:rounded-[21px]
                    "
                  />

                  <span
                    className="
                      absolute
                      left-4
                      top-4
                      h-5
                      w-5
                      border-l
                      border-t
                      border-white/85
                      sm:left-5
                      sm:top-5
                      sm:h-6
                      sm:w-6
                    "
                  />

                  <span
                    className="
                      absolute
                      bottom-4
                      right-4
                      h-5
                      w-5
                      border-b
                      border-r
                      border-white/85
                      sm:bottom-5
                      sm:right-5
                      sm:h-6
                      sm:w-6
                    "
                  />
                </div>

                {/* IMAGE CAPTION */}

                <div
                  className="
                    absolute
                    -bottom-3
                    left-4
                    max-w-[calc(100%-16px)]
                    rounded-lg
                    border
                    border-white/80
                    bg-white/75
                    px-2.5
                    py-1.5
                    shadow-[0_12px_30px_-15px_rgba(15,23,42,0.25)]
                    backdrop-blur-xl
                    sm:-bottom-4
                    sm:left-6
                    sm:px-3
                    dark:border-white/[0.08]
                    dark:bg-slate-950/70
                  "
                >
                  <span
                    className="
                      whitespace-nowrap
                      text-[8px]
                      font-mono
                      uppercase
                      tracking-[0.12em]
                      text-slate-400
                      sm:text-[9px]
                      sm:tracking-[0.16em]
                      dark:text-slate-500
                    "
                  >
                    Abdul Qayyum
                  </span>
                </div>
              </div>

              {/* PROJECTS FLOATING CARD */}

              <m.div
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
              </m.div>

              {/* AI CARD */}

              <m.div
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
              </m.div>

              {/* SMALL TECH MARK */}

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

              {/* AVAILABLE BADGE */}

              <div
                className="
                  absolute
                  bottom-[5%]
                  right-0
                  z-30
                  flex
                  items-center
                  gap-1.5
                  rounded-full
                  border
                  border-emerald-200/80
                  bg-white/85
                  px-2.5
                  py-1.5
                  shadow-[0_15px_35px_-15px_rgba(16,185,129,0.3)]
                  backdrop-blur-xl
                  sm:bottom-[7%]
                  sm:right-[1%]
                  sm:gap-2
                  sm:px-3.5
                  sm:py-2
                  dark:border-emerald-400/10
                  dark:bg-slate-950/75
                "
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[9px] font-medium text-slate-600 sm:text-[10px] dark:text-slate-300">
                  Available
                </span>

                <CheckCircle2
                  className="h-3.5 w-3.5 text-emerald-500"
                  strokeWidth={1.7}
                />
              </div>
            </div>
          </m.div>
        </div>
      </div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================== */}

      <m.div
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

        <m.div
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
        </m.div>
      </m.div>
    </section>
  );
}