import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Sparkles, Rocket, Code2 } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { Button } from "@/components/ui/button";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// Confirmed real projects. GitHub/live links and screenshots are still
// pending — buttons stay disabled until those are provided (see /projects
// page implementation for full case studies).
const PROJECTS = [
  {
    title: "AI Study Assistant",
    summary:
      "An AI-powered learning assistant that helps students understand concepts, ask questions, and receive intelligent explanations using modern language models.",
    tech: ["Next.js", "OpenAI", "TypeScript"],
    icon: Sparkles,
  },

  {
    title: "Cold Email SaaS",
    summary:
      "A SaaS application that generates personalized cold emails using AI to help businesses improve outreach and save time.",
    tech: ["Python", "FastAPI", "AI"],
    icon: Rocket,
  },
  {
    title: "Personal Portfolio Website",
    summary:
      "A premium personal portfolio built with Next.js featuring an interactive resume, AI assistant, developer terminal, PWA support, and enterprise-grade SEO.",
    tech: ["Next.js", "React", "TypeScript"],
    icon: Code2,
  },
];

export function FeaturedProjects() {
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
                Featured Work
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Selected
                <br />
                <span className="text-accent-indigo">projects</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              A curated selection of projects I've built — from AI tools to full-stack applications.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {PROJECTS.length} projects
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Curated
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Case studies
                </p>
              </div>
            </div>

            {/* View all link */}
            <Link
              href="/projects"
              className="mt-8 hidden lg:inline-flex items-center gap-2 text-xs font-medium text-text-muted/50 hover:text-accent-indigo transition-colors group"
            >
              <span>View all projects</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
            </Link>
          </div>
        </Reveal>

        {/* ══ RIGHT ── Projects Grid ══ */}
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {PROJECTS.map(({ title, summary, tech, icon: Icon }, i) => (
                <Reveal key={title} delay={0.12 + i * 0.06}>
                  <div
                    className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-xl hover:shadow-accent-indigo/5 hover:-translate-y-1 h-full flex flex-col"
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
                      className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
                    />

                    <div className="relative flex-1 flex flex-col p-5 sm:p-6">
                      {/* Icon */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 group-hover:bg-accent-indigo/16 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent-indigo/10">
                        <Icon className="h-6 w-6 text-accent-indigo" strokeWidth={1.75} />
                      </div>

                      {/* Title */}
                      <h3 className="mt-4 text-lg font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300">
                        {title}
                      </h3>

                      {/* Summary */}
                      <p className="mt-2 text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors duration-300 flex-1 leading-relaxed">
                        {summary}
                      </p>

                      {/* Tech Stack */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {tech.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-0.5 text-[9px] font-mono text-text-muted/60 group-hover:text-text-muted/80 transition-colors"
                          >
                            <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="mt-5 flex gap-2">
                        <button
                          disabled
                          className="inline-flex items-center gap-1.5 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-1.5 text-xs text-text-muted/40 cursor-not-allowed opacity-60"
                        >
                          <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
                          GitHub
                        </button>
                        <button
                          disabled
                          className="inline-flex items-center gap-1.5 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-1.5 text-xs text-text-muted/40 cursor-not-allowed opacity-60"
                        >
                          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Live Demo
                        </button>
                      </div>

                      {/* index number */}
                      <span className="absolute bottom-2 right-2 font-mono text-[7px] text-accent-indigo/8 group-hover:text-accent-indigo/20 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* bottom accent line */}
                    <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                  </div>
                </Reveal>
              ))}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                FEATURED · {PROJECTS.length} PROJECTS · CASE STUDIES
              </p>
              <div className="flex gap-1">
                {PROJECTS.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 ? "1.25rem" : "0.5rem",
                      backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.10, 0.40 - i * 0.08)})`,
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