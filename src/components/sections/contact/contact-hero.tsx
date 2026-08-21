"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  MessageCircle,
  Mail,
  Send,
  Clock3,
  Globe2,
  Sparkles,
  Terminal,
  CheckCircle2,
} from "lucide-react";
import { siteConfig } from "@/config/site";

type Availability =
  | {
      status: "AVAILABLE" | "LIMITED" | "BOOKED";
    }
  | null;

const STATUS_CONFIG = {
  AVAILABLE: {
    dot: "bg-emerald-500",
    ping: "bg-emerald-400",
    label: "Available for new projects",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/[0.035]",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  LIMITED: {
    dot: "bg-amber-500",
    ping: "bg-amber-400",
    label: "Limited availability",
    border: "border-amber-500/20",
    bg: "bg-amber-500/[0.035]",
    text: "text-amber-600 dark:text-amber-400",
  },
  BOOKED: {
    dot: "bg-rose-500",
    ping: "",
    label: "Fully booked",
    border: "border-rose-500/20",
    bg: "bg-rose-500/[0.035]",
    text: "text-rose-600 dark:text-rose-400",
  },
} as const;

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 18px 45px -18px rgba(79,70,229,0.14), 0 35px 70px -30px rgba(79,70,229,0.10)";

const CONTACT_POINTS = [
  {
    icon: Clock3,
    label: "Response",
    value: "Within 24 hours",
  },
  {
    icon: Globe2,
    label: "Working globally",
    value: "Remote · UTC+5",
  },
  {
    icon: CheckCircle2,
    label: "First step",
    value: "Simple conversation",
  },
];

export function ContactHero() {
  const [availability, setAvailability] = useState<Availability>(null);

  useEffect(() => {
    fetch("/api/availability")
      .then((res) => (res.ok ? res.json() : null))
      .then(setAvailability)
      .catch(() => setAvailability(null));
  }, []);

  const config = availability
    ? STATUS_CONFIG[availability.status]
    : null;

  return (
    <section className="relative w-full overflow-hidden py-20 sm:py-28 lg:py-32">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          margin: "0 calc(-50vw + 50%)",
          width: "100vw",
        }}
      >
        {/* Main background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(108deg, transparent 0%, rgba(99,102,241,0.025) 28%, rgba(99,102,241,0.05) 58%, rgba(99,102,241,0.025) 100%)",
          }}
        />

        {/* Central glow */}
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[850px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(79,70,229,0.085) 0%, rgba(79,70,229,0.03) 40%, transparent 72%)",
          }}
        />

        {/* Small side glow */}
        <div
          className="absolute right-0 top-0 h-[400px] w-[380px]"
          style={{
            background:
              "radial-gradient(circle at top right, rgba(99,102,241,0.055), transparent 72%)",
          }}
        />

        {/* Top line */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(99,102,241,0.18), transparent)",
          }}
        />

        {/* Bottom line */}
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(99,102,241,0.10), transparent)",
          }}
        />
      </div>

      {/* =========================================================
          SUBTLE GRID / DIAGONAL TEXTURE
      ========================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 20px)",
          maskImage:
            "radial-gradient(70% 65% at 50% 0%, black 0%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(70% 65% at 50% 0%, black 0%, transparent 100%)",
        }}
      />

      {/* =========================================================
          DECORATIVE FLOATING MARKS
      ========================================================== */}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[6%] top-[20%] text-accent-indigo/[0.055]"
        >
          <Terminal
            className="h-9 w-9"
            strokeWidth={1.2}
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute right-[7%] bottom-[18%] text-accent-indigo/[0.055]"
        >
          <Sparkles
            className="h-8 w-8"
            strokeWidth={1.2}
          />
        </motion.div>

        <span className="absolute left-[10%] top-[68%] font-mono text-[9px] tracking-[0.3em] text-accent-indigo/[0.12]">
          CONNECT
        </span>

        <span className="absolute right-[9%] top-[31%] font-mono text-[9px] tracking-[0.3em] text-accent-indigo/[0.12]">
          OPEN
        </span>
      </div>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Top metadata */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent-indigo/60" />

            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent-indigo/70">
              Contact
            </span>

            <span className="h-px w-8 bg-accent-indigo/20" />
          </div>

          {config && (
            <div
              className={[
                "inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5",
                config.border,
                config.bg,
                config.text,
              ].join(" ")}
            >
              <span className="relative flex h-2 w-2">
                {config.ping && (
                  <span
                    className={[
                      "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
                      config.ping,
                    ].join(" ")}
                  />
                )}

                <span
                  className={[
                    "relative inline-flex h-2 w-2 rounded-full",
                    config.dot,
                  ].join(" ")}
                />
              </span>

              <span className="font-mono text-[10px] uppercase tracking-wider">
                {config.label}
              </span>
            </div>
          )}
        </motion.div>

        {/* =======================================================
            MAIN CONTACT GRID
        ======================================================== */}

        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* =====================================================
              LEFT — MAIN MESSAGE
          ====================================================== */}

          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted/45">
                Start with a conversation
              </p>

              <h1
                className="font-bold tracking-[-0.045em] text-text-primary"
                style={{
                  fontSize: "clamp(3.1rem, 7vw, 5.7rem)",
                  lineHeight: "0.98",
                }}
              >
                Have an idea?
                <br />
                <span className="text-accent-indigo">
                  Let&apos;s talk.
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-7 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg"
            >
              Whether you have a product idea, need a technical
              partner, want to automate a process, or simply have
              a question — send me a message and we&apos;ll figure
              out the right next step.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#contact-form">
                <button
                  type="button"
                  className="group inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-accent-indigo/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-indigo/90 hover:shadow-xl hover:shadow-accent-indigo/30"
                >
                  <Send
                    className="h-4 w-4"
                    strokeWidth={1.75}
                  />

                  <span>Send a Message</span>

                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </button>
              </a>

              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noreferrer"
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 px-6 py-3.5 text-sm font-medium text-text-secondary transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/25 hover:bg-emerald-500/[0.025] hover:text-emerald-600 dark:hover:text-emerald-400"
                >
                  <MessageCircle
                    className="h-4 w-4"
                    strokeWidth={1.75}
                  />

                  WhatsApp
                </button>
              </a>
            </motion.div>

            {/* Small email link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-5"
            >
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="group inline-flex items-center gap-2 text-xs text-text-muted/60 transition-colors hover:text-accent-indigo"
              >
                <Mail
                  className="h-3.5 w-3.5"
                  strokeWidth={1.6}
                />

                <span>{siteConfig.links.email}</span>

                <ArrowRight
                  className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                  strokeWidth={1.7}
                />
              </a>
            </motion.div>
          </div>

          {/* =====================================================
              RIGHT — CONTACT INFORMATION CARD
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.14,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            {/* Ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-accent-indigo/[0.045] blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/15 bg-bg-surface-1/70 backdrop-blur-sm"
              style={{ boxShadow: panelShadow }}
            >
              {/* Card top */}
              <div className="border-b border-accent-indigo/10 px-6 py-5 sm:px-7">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-accent-indigo/50">
                      Direct line
                    </p>

                    <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-text-primary">
                      Let&apos;s make the first step simple.
                    </h2>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-accent-indigo/10 bg-accent-indigo/[0.04]">
                    <MessageCircle
                      className="h-4 w-4 text-accent-indigo/60"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              </div>

              {/* Contact points */}
              <div className="space-y-1 px-4 py-4">
                {CONTACT_POINTS.map((point) => {
                  const Icon = point.icon;

                  return (
                    <div
                      key={point.label}
                      className="group flex items-center gap-4 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-accent-indigo/[0.025]"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.035]">
                        <Icon
                          className="h-4 w-4 text-accent-indigo/55 transition-colors group-hover:text-accent-indigo"
                          strokeWidth={1.6}
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="font-mono text-[9px] uppercase tracking-wider text-text-muted/40">
                          {point.label}
                        </p>

                        <p className="mt-0.5 text-sm text-text-secondary">
                          {point.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Conversation block */}
              <div className="mx-4 mb-4 overflow-hidden rounded-xl border border-accent-indigo/10 bg-accent-indigo/[0.025]">
                <div className="flex items-center justify-between border-b border-accent-indigo/10 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted/50">
                      Open to conversations
                    </span>
                  </div>

                  <span className="font-mono text-[9px] text-accent-indigo/25">
                    01
                  </span>
                </div>

                <div className="px-4 py-4">
                  <p className="text-sm leading-relaxed text-text-muted/70">
                    Tell me what you&apos;re trying to build, what&apos;s
                    currently getting in the way, or simply where
                    you want to go next.
                  </p>
                </div>
              </div>

              {/* Card footer */}
              <div className="flex items-center justify-between border-t border-accent-indigo/10 px-6 py-3.5 sm:px-7">
                <span className="font-mono text-[9px] uppercase tracking-wider text-text-muted/35">
                  Remote · Global
                </span>

                <div className="flex gap-1">
                  <span className="h-1 w-6 rounded-full bg-accent-indigo/30" />
                  <span className="h-1 w-3 rounded-full bg-accent-indigo/15" />
                  <span className="h-1 w-1.5 rounded-full bg-accent-indigo/10" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =======================================================
            BOTTOM SIGNATURE
        ======================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.35,
          }}
          className="mt-14"
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent-indigo/15" />

            <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted/25">
              Ideas · Conversations · Possibilities
            </span>

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent-indigo/15" />
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.7,
          duration: 0.6,
        }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-text-muted/30 sm:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
          Scroll
        </span>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown
            className="h-3.5 w-3.5"
            strokeWidth={1.4}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}