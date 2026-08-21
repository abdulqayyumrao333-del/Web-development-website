import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star, Sparkles, Zap, Award, Code2, CheckCircle } from "lucide-react";
import type { Skill, Testimonial } from "@prisma/client";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

const LEVEL_LABEL: Record<NonNullable<Skill["level"]>, string> = {
  LEARNING: "Learning",
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

const LEVEL_COLORS: Record<NonNullable<Skill["level"]>, string> = {
  LEARNING: "border-violet-500/20 bg-violet-500/10 text-violet-500",
  BEGINNER: "border-amber-500/20 bg-amber-500/10 text-amber-500",
  INTERMEDIATE: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  ADVANCED: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
};

const LEVEL_EMOJIS: Record<NonNullable<Skill["level"]>, string> = {
  LEARNING: "🌱",
  BEGINNER: "📖",
  INTERMEDIATE: "📘",
  ADVANCED: "🚀",
};

// ── SkillCard ──
export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5"
      style={{ boxShadow: panelShadow }}
    >
      {/* hover gradient */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
      />

      {/* bracket */}
      <div
        aria-hidden
        className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
      />

      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6 group-hover:bg-accent-indigo/12 transition-all duration-300 group-hover:scale-105">
              <Code2 className="h-4 w-4 text-accent-indigo" strokeWidth={1.75} />
            </div>
            <span className="font-semibold text-sm text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
              {skill.name}
            </span>
          </div>
          {skill.level && (
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider ${LEVEL_COLORS[skill.level]}`}>
              {LEVEL_EMOJIS[skill.level]}
              {LEVEL_LABEL[skill.level]}
            </span>
          )}
        </div>

        {skill.description && (
          <p className="mt-2 text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors duration-300 leading-relaxed">
            {skill.description}
          </p>
        )}

        {/* bottom accent line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
      </div>
    </div>
  );
}

// ── TestimonialCard ──
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 hover:-translate-y-0.5 p-5 flex flex-col h-full"
      style={{ boxShadow: panelShadow }}
    >
      {/* hover gradient */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
      />

      {/* bracket */}
      <div
        aria-hidden
        className="absolute top-2 right-2 h-3 w-3 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
      />

      <div className="relative flex-1 flex flex-col">
        {/* Stars */}
        <div className="flex gap-0.5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" strokeWidth={1.5} />
          ))}
        </div>

        {/* Quote */}
        <p className="mt-3 flex-1 text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors duration-300 leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        {/* Author */}
        <div className="mt-4 flex items-center gap-3 pt-3 border-t border-accent-indigo/8">
          <Avatar
            src={testimonial.avatar ?? undefined}
            alt={testimonial.name}
            initials={testimonial.name.slice(0, 2).toUpperCase()}
            size={40}
            className="ring-2 ring-accent-indigo/20"
          />
          <div>
            <p className="text-sm font-medium text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
              {testimonial.name}
            </p>
            <p className="text-xs text-text-muted/60 group-hover:text-text-muted/80 transition-colors">
              {testimonial.role}
              {testimonial.company ? ` · ${testimonial.company}` : ""}
            </p>
          </div>
          <div className="ml-auto text-[8px] font-mono text-accent-indigo/10 group-hover:text-accent-indigo/20 transition-colors">
            <CheckCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
          </div>
        </div>

        {/* bottom accent line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
      </div>
    </div>
  );
}