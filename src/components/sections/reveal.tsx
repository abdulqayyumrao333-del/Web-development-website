"use client";

import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Wraps a section in a single scroll-triggered fade-up. Triggers once,
 * respects prefers-reduced-motion globally (see globals.css), and takes an
 * optional `delay` so sibling sections/cards can stagger without each one
 * re-implementing the same variants object.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a collection of items (cards, list items, etc.) in a staggered reveal.
 * Each child will appear sequentially with a slight delay between them.
 */
export function StaggerReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * A single item for use inside a StaggerReveal. Each child will be revealed
 * with a staggered delay.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * A decorative reveal badge that shows a subtle "Reveal" indicator
 * Useful for debugging or showcasing animation boundaries
 */
export function RevealBadge({ className }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-1 text-[8px] font-mono uppercase tracking-wider text-accent-indigo/30 ${className}`}>
      <Sparkles className="h-2.5 w-2.5" strokeWidth={1.5} />
      <span>Reveal</span>
    </div>
  );
}