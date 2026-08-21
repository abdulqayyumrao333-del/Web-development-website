import Image from "next/image";
import { Github, ExternalLink, FileText, Sparkles, Calendar, Clock, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getProjectTheme } from "@/lib/project-theme";
import type { Project } from "@/types";

const STATUS_LABEL: Record<Project["status"], string> = {
  PLANNED: "Planned",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  MAINTAINED: "Actively Maintained",
};

const STATUS_COLORS: Record<Project["status"], string> = {
  PLANNED: "border-amber-500/20 bg-amber-500/10 text-amber-500",
  IN_PROGRESS: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  COMPLETED: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  MAINTAINED: "border-violet-500/20 bg-violet-500/10 text-violet-500",
};

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function ProjectHero({ project }: { project: Project }) {
  const theme = getProjectTheme(project.categories);

  return (
    <section className="relative overflow-hidden border-b border-accent-indigo/8 bg-gradient-to-b from-bg-surface-1 to-bg-surface-1/80">
      
      {/* ── Subtle background glow ── */}
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
          className="absolute inset-x-0 top-0 h-[500px]"
          style={{
            background:
              "radial-gradient(45% 70% at 50% 0%, rgba(79,70,229,0.08) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">

        {/* ── Top Row: Categories + Status ── */}
        <div className="flex flex-wrap items-center gap-2">
          {project.categories.map((c) => (
            <span
              key={c}
              className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/15 bg-accent-indigo/[0.04] px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-accent-indigo/70"
            >
              <span className="h-1 w-1 rounded-full bg-accent-indigo/40" />
              {c}
            </span>
          ))}
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider ${STATUS_COLORS[project.status]}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${
              project.status === "COMPLETED" || project.status === "MAINTAINED" 
                ? "bg-emerald-400 animate-pulse" 
                : project.status === "IN_PROGRESS" 
                ? "bg-blue-400 animate-pulse" 
                : "bg-amber-400"
            }`} />
            {STATUS_LABEL[project.status]}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-amber-500">
              <Star className="h-2.5 w-2.5 fill-current" strokeWidth={2} />
              Featured
            </span>
          )}
        </div>

        {/* ── Title ── */}
        <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-text-primary">
          {project.title}
        </h1>

        {/* ── Summary ── */}
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-text-secondary leading-relaxed">
          {project.summary}
        </p>

        {/* ── Tech Stack ── */}
        {project.techStack.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-0.5 text-[9px] font-mono text-text-muted/60"
              >
                <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* ── Quick Stats ── */}
        <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-text-muted/50">
          {project.createdAt && (
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
              {new Date(project.createdAt).toLocaleDateString(undefined, { 
                year: "numeric", 
                month: "short" 
              })}
            </span>
          )}
          {project.status === "COMPLETED" && (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
              Completed
            </span>
          )}
          {project.status === "IN_PROGRESS" && (
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-400/60" strokeWidth={1.5} />
              Active Development
            </span>
          )}
        </div>

        {/* ── CTA Buttons ── */}
        <div className="mt-6 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm shadow-lg shadow-accent-indigo/20 hover:shadow-xl hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
              Live Demo
            </a>
          ) : null}

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 hover:bg-accent-indigo/[0.05] text-text-secondary hover:text-accent-indigo font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-indigo/30"
            >
              <Github className="h-4 w-4" strokeWidth={1.75} />
              View Source
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-accent-indigo/10 text-text-muted/50 text-sm">
              <FileText className="h-4 w-4" strokeWidth={1.75} />
              Repository link not published yet
            </span>
          )}
        </div>
      </div>

      {/* ── Cover Image ── */}
      <div className="relative mx-auto max-w-6xl px-6 pb-8 sm:pb-12">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/50 shadow-lg">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/10 via-accent-indigo/5 to-transparent flex items-center justify-center">
              <span className="text-4xl font-mono text-accent-indigo/20">No Image</span>
            </div>
          )}
          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-surface-1/60 to-transparent" />
        </div>
      </div>
    </section>
  );
}