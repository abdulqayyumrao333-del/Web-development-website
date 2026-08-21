import { Calendar, CheckCircle2, Circle, Clock, Sparkles } from "lucide-react";
import { Reveal } from "@/components/sections/reveal";
import { categorizeTechStack } from "@/lib/categorize-tech";
import { formatDate } from "@/lib/utils";
import type { Project } from "@/types";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// ── ProjectTechStack ──
export function ProjectTechStack({ project }: { project: Project }) {
  const grouped = categorizeTechStack(project.techStack);
  const entries = Object.entries(grouped);

  if (entries.length === 0) return null;

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
                Tech Stack
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Built
                <br />
                <span className="text-accent-indigo">with</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              The technologies and tools used to build this project.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {entries.length} categories
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {project.techStack.length} technologies
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Full stack
                </p>
              </div>
            </div>

            {/* Tech category list */}
            <div className="mt-8 hidden lg:flex flex-col gap-1.5">
              {entries.map(([category, techs], i) => (
                <div key={category} className="flex items-center gap-2 group cursor-default">
                  <span className="font-mono text-[10px] text-accent-indigo/25 w-4 text-right group-hover:text-accent-indigo/50 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px w-3 bg-accent-indigo/12 group-hover:bg-accent-indigo/25 transition-colors" />
                  <span className="font-mono text-[10px] text-text-muted/40 group-hover:text-text-muted/70 transition-colors truncate max-w-[5rem]">
                    {category}
                  </span>
                  <span className="ml-auto text-[8px] text-accent-indigo/15 group-hover:text-accent-indigo/30 transition-colors">
                    {techs!.length}
                  </span>
                </div>
              ))}
            </div>
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

            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map(([category, techs], i) => (
                <Reveal key={category} delay={0.12 + i * 0.05}>
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
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[10px] font-mono uppercase tracking-wider text-accent-indigo/50 group-hover:text-accent-indigo/70 transition-colors">
                          {category}
                        </p>
                        <span className="font-mono text-[8px] text-accent-indigo/15 group-hover:text-accent-indigo/30 transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {techs!.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-0.5 text-[9px] font-mono text-text-muted/60 group-hover:text-text-muted/80 transition-colors"
                          >
                            <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* bottom accent line */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* bottom strip */}
            <div className="mt-3.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
              <p className="font-mono text-[11px] text-text-muted">
                TECH · {entries.length} CATEGORIES · {project.techStack.length} TOOLS
              </p>
              <div className="flex gap-1">
                {entries.map((_, i) => (
                  <span
                    key={i}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === 0 ? "1.25rem" : "0.5rem",
                      backgroundColor: `rgb(99 102 241 / ${i === 0 ? 0.65 : Math.max(0.10, 0.40 - i * 0.06)})`,
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

// ── ProjectTimeline ──
const STATUS_ICON = {
  PLANNED: Circle,
  IN_PROGRESS: Clock,
  COMPLETED: CheckCircle2,
  MAINTAINED: CheckCircle2,
} as const;

const STATUS_COLORS = {
  PLANNED: "text-amber-500 border-amber-500/20 bg-amber-500/10",
  IN_PROGRESS: "text-blue-500 border-blue-500/20 bg-blue-500/10",
  COMPLETED: "text-emerald-500 border-emerald-500/20 bg-emerald-500/10",
  MAINTAINED: "text-violet-500 border-violet-500/20 bg-violet-500/10",
} as const;

export function ProjectTimeline({ project }: { project: Project }) {
  if (!project.startDate && !project.endDate) return null;
  const StatusIcon = STATUS_ICON[project.status];
  const statusColor = STATUS_COLORS[project.status];

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
                Timeline
              </p>
            </div>
            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Where this
                <br />
                <span className="text-accent-indigo">stands</span>
              </h2>
            </div>
            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Project timeline, status, and key milestones.
            </p>
            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                {project.startDate && (
                  <p className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                    Started: {formatDate(project.startDate)}
                  </p>
                )}
                {project.endDate && (
                  <p className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                    Completed: {formatDate(project.endDate)}
                  </p>
                )}
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  {project.status.replace("_", " ").toLowerCase()}
                </p>
              </div>
            </div>
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
                {/* Status Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider ${statusColor}`}>
                    <StatusIcon className="h-3.5 w-3.5" strokeWidth={2} />
                    {project.status.replace("_", " ").toLowerCase()}
                  </div>
                  {project.endDate && project.status === "COMPLETED" && (
                    <span className="text-[9px] font-mono text-emerald-500/30 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                      Done
                    </span>
                  )}
                  {project.status === "IN_PROGRESS" && (
                    <span className="text-[9px] font-mono text-blue-500/30 flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
                      </span>
                      Active
                    </span>
                  )}
                </div>

                {/* Timeline Cards */}
                <div className="space-y-3">
                  {project.startDate && (
                    <div className="flex items-center gap-4 rounded-lg border border-accent-indigo/8 bg-accent-indigo/[0.02] px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6">
                        <Calendar className="h-4 w-4 text-accent-indigo/60" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">Started</p>
                        <p className="text-sm font-medium text-text-primary">{formatDate(project.startDate)}</p>
                      </div>
                    </div>
                  )}

                  {project.endDate && (
                    <div className="flex items-center gap-4 rounded-lg border border-accent-indigo/8 bg-accent-indigo/[0.02] px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/12 bg-emerald-500/6">
                        <Calendar className="h-4 w-4 text-emerald-500/60" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">Completed</p>
                        <p className="text-sm font-medium text-text-primary">{formatDate(project.endDate)}</p>
                      </div>
                    </div>
                  )}

                  {/* Duration */}
                  {project.startDate && project.endDate && (
                    <div className="flex items-center gap-4 rounded-lg border border-accent-indigo/8 bg-accent-indigo/[0.02] px-4 py-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6">
                        <Clock className="h-4 w-4 text-accent-indigo/60" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">Duration</p>
                        <p className="text-sm font-medium text-text-primary">
                          {Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                        </p>
                      </div>
                    </div>
                  )}
                </div>

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