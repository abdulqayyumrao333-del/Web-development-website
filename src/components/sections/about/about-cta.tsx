"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  User,
  FileText,
  Mail,
  Star,
  Clock,
  Shield,
  Phone,
} from "lucide-react";

// ============================================
// ANIMATION VARIANTS
// ============================================
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ============================================
// MAIN COMPONENT
// ============================================
export function AboutCta() {
  const reduceMotion = useReducedMotion();

  // Primary action — the single dominant CTA
  const primaryAction = {
    label: "Hire Me",
    icon: <User className="h-4 w-4" />,
    href: "/contact",
  };

  // Secondary action — visually strong, second tier
  const secondaryAction = {
    label: "View Projects",
    icon: <Briefcase className="h-4 w-4" />,
    href: "/projects",
  };

  // Tertiary links — quiet, text-led
  const tertiaryLinks = [
    { label: "Download Resume", icon: <FileText className="h-3.5 w-3.5" />, href: "/resume" },
    { label: "Contact Me", icon: <Mail className="h-3.5 w-3.5" />, href: "/contact" },
  ];

  const trustFeatures = [
    { icon: <Star className="w-4 h-4" />, label: "No upfront payment" },
    { icon: <Clock className="w-4 h-4" />, label: "Free consultation" },
    { icon: <Shield className="w-4 h-4" />, label: "24/7 support" },
  ];

  return (
    <section className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={reduceMotion ? undefined : container}
        className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* ==========================================
            BACKGROUND — quiet radial wash + corner brackets
            ========================================== */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(85% 60% at 15% 0%, rgba(79,70,229,0.10) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        </div>

        {/* Corner brackets — small premium detail, no glow */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-indigo-300/50 dark:border-indigo-500/30 rounded-tl-lg pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-indigo-300/50 dark:border-indigo-500/30 rounded-br-lg pointer-events-none" />

        <div className="relative z-10 px-6 sm:px-12 lg:px-16 pt-14 sm:pt-20 pb-0">
          {/* ===== TOP: eyebrow + heading + subtitle (left-aligned, editorial) ===== */}
          <div className="max-w-2xl">
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="h-px w-8 bg-indigo-400 dark:bg-indigo-500" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-indigo-600 dark:text-indigo-400">
                Ready to collaborate?
              </span>
            </motion.div>

            <motion.h2
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-gray-900 dark:text-white"
            >
              Let&apos;s build{" "}
              <span className="text-indigo-600 dark:text-indigo-400">something amazing</span>{" "}
              together
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-5 text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed"
            >
              Have a project in mind? I&apos;m always open to new opportunities
              and would love to hear about what you&apos;re building.
            </motion.p>

            {/* Contact indicator */}
            <motion.div
              variants={item}
              className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-white/[0.04] border border-gray-200 dark:border-white/10"
            >
              <Phone className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Available for calls &amp; meetings
              </span>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
            </motion.div>
          </div>

          {/* ===== ACTIONS ===== */}
          <motion.div
            variants={item}
            className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4"
          >
            <Link href={primaryAction.href} className="group">
              <span className="flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium text-sm shadow-sm transition-colors">
                {primaryAction.icon}
                {primaryAction.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>

            <Link href={secondaryAction.href} className="group">
              <span className="flex items-center gap-2.5 px-7 py-3.5 rounded-lg border border-gray-300 dark:border-white/15 text-gray-700 dark:text-gray-200 font-medium text-sm hover:border-gray-400 dark:hover:border-white/30 hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors">
                {secondaryAction.icon}
                {secondaryAction.label}
              </span>
            </Link>

            <div className="flex items-center gap-5 pl-1">
              {tertiaryLinks.map((link) => (
                <Link key={link.label} href={link.href} className="group">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-transparent group-hover:border-gray-400 dark:group-hover:border-white/40 group-hover:text-gray-700 dark:group-hover:text-gray-200 pb-0.5 transition-colors">
                    {link.icon}
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ==========================================
              TRUST RAIL — divided strip, consistent with Hero stats
              ========================================== */}
          <motion.div
            variants={item}
            className="mt-14 sm:mt-16 border-t border-gray-200 dark:border-white/10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 dark:divide-white/10">
              {trustFeatures.map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2.5 py-5 sm:py-6 sm:px-6 first:sm:pl-0 text-sm text-gray-500 dark:text-gray-400"
                >
                  <span className="text-indigo-500 dark:text-indigo-400">{feature.icon}</span>
                  {feature.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}