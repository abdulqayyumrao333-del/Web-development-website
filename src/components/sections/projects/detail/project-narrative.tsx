import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/sections/reveal";
import { Calendar, User, Clock, Target, Lightbulb, Sparkles } from "lucide-react";
import type { Project } from "@/types";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

function EmptyNote({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/12 bg-accent-indigo/6 mb-4">
        <Sparkles className="h-5 w-5 text-accent-indigo/40" strokeWidth={1.75} />
      </div>
      <p className="text-sm text-text-secondary">{text}</p>
      <p className="text-xs text-text-muted/50 mt-1">This section is being prepared</p>
    </div>
  );
}

// ── ProjectOverview ──
export function ProjectOverview({ project }: { project: Project }) {
  // Count how many metadata fields are present
  const hasMetadata = project.role || project.startDate || project.endDate || project.status;

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

        {/* ── LEFT ── */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                Overview
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                What this
                <br />
                <span className="text-accent-indigo">is</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              A detailed look at the project, its purpose, and key details.
            </p>
            {hasMetadata && (
              <div className="mt-6 flex items-stretch gap-3">
                <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
                <div className="space-y-2.5 text-xs text-text-muted font-mono">
                  {project.role && (
                    <p className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                      Role: {project.role}
                    </p>
                  )}
                  {project.startDate && (
                    <p className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                      Started: {formatDate(project.startDate)}
                    </p>
                  )}
                  {project.endDate && (
                    <p className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                      Completed: {formatDate(project.endDate)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* ── RIGHT ── */}
        <Reveal delay={0.1}>
          <div className="relative">

            {/* ambient glows */}
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8"
              style={{ boxShadow: panelShadow }}
            >
              {/* diagonal texture */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              {/* bracket */}
              <div
                aria-hidden
                className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
              />

              <div className="relative">
                {/* Description */}
                <div className="space-y-4">
                  {project.description.split('\n\n').map((paragraph, i) => (
                    <p 
                      key={i} 
                      className={`text-base sm:text-lg text-text-secondary leading-relaxed ${i > 0 ? 'mt-4' : ''}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Metadata Cards */}
                {hasMetadata && (
                  <div className="mt-6 pt-6 border-t border-accent-indigo/8 grid grid-cols-2 gap-3">
                    {project.role && (
                      <div className="flex items-center gap-2.5 rounded-lg border border-accent-indigo/8 bg-accent-indigo/[0.02] px-3 py-2.5">
                        <User className="h-4 w-4 text-accent-indigo/40" strokeWidth={1.75} />
                        <div>
                          <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">Role</p>
                          <p className="text-xs font-medium text-text-primary">{project.role}</p>
                        </div>
                      </div>
                    )}
                    {project.startDate && (
                      <div className="flex items-center gap-2.5 rounded-lg border border-accent-indigo/8 bg-accent-indigo/[0.02] px-3 py-2.5">
                        <Calendar className="h-4 w-4 text-accent-indigo/40" strokeWidth={1.75} />
                        <div>
                          <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">Started</p>
                          <p className="text-xs font-medium text-text-primary">{formatDate(project.startDate)}</p>
                        </div>
                      </div>
                    )}
                    {project.endDate && (
                      <div className="flex items-center gap-2.5 rounded-lg border border-accent-indigo/8 bg-accent-indigo/[0.02] px-3 py-2.5">
                        <Clock className="h-4 w-4 text-accent-indigo/40" strokeWidth={1.75} />
                        <div>
                          <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">Completed</p>
                          <p className="text-xs font-medium text-text-primary">{formatDate(project.endDate)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* bottom accent line */}
                <div className="mt-6 h-px w-12 rounded-full bg-accent-indigo/20" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── ProjectProblem ──
export function ProjectProblem({ project }: { project: Project }) {
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

        {/* ── LEFT ── */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                The Problem
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                What needed
                <br />
                <span className="text-accent-indigo">solving</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              The challenge that this project was built to address.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Challenge
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {project.caseStudyProblem ? "Defined" : "Coming soon"}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Read below
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── RIGHT ── */}
        <Reveal delay={0.1}>
          <div className="relative">

            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8"
              style={{ boxShadow: panelShadow }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              <div
                aria-hidden
                className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
              />

              <div className="relative">
                {project.caseStudyProblem ? (
                  <div className="space-y-4">
                    {project.caseStudyProblem.split('\n\n').map((paragraph, i) => (
                      <p 
                        key={i} 
                        className={`text-base sm:text-lg text-text-secondary leading-relaxed ${i > 0 ? 'mt-4' : ''}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <EmptyNote text="Detailed documentation will be added soon." />
                )}
                {project.caseStudyProblem && (
                  <div className="mt-6 h-px w-12 rounded-full bg-accent-indigo/20" />
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── ProjectSolution ──
export function ProjectSolution({ project }: { project: Project }) {
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

        {/* ── LEFT ── */}
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-accent-indigo/60" />
              <p className="text-label-sm uppercase tracking-widest text-accent-indigo">
                The Solution
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                How it was
                <br />
                <span className="text-accent-indigo">approached</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              The approach and strategy used to solve the problem.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Solution
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {project.caseStudySolution ? "Defined" : "Coming soon"}
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Read below
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── RIGHT ── */}
        <Reveal delay={0.1}>
          <div className="relative">

            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-64 w-64 rounded-full bg-accent-indigo/8 blur-3xl"
            />

            <div
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8"
              style={{ boxShadow: panelShadow }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                  maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                }}
              />

              <div
                aria-hidden
                className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
              />

              <div className="relative">
                {project.caseStudySolution ? (
                  <div className="space-y-4">
                    {project.caseStudySolution.split('\n\n').map((paragraph, i) => (
                      <p 
                        key={i} 
                        className={`text-base sm:text-lg text-text-secondary leading-relaxed ${i > 0 ? 'mt-4' : ''}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                ) : (
                  <EmptyNote text="Detailed documentation will be added soon." />
                )}
                {project.caseStudySolution && (
                  <div className="mt-6 h-px w-12 rounded-full bg-accent-indigo/20" />
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}