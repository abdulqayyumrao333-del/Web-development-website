"use client";

import { useRef, useState } from "react";
import { m } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight, Star, Sparkles } from "lucide-react";
import { getProjectTheme } from "@/lib/project-theme";
import type { Project } from "@/types";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function FeaturedProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const theme = getProjectTheme(project.categories);
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -3, y: px * 3 });
  }

  return (
    <m.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: tilt.x, rotateY: tilt.y }}
      transition={{
        opacity: { duration: 0.4, delay: index * 0.06 },
        y: { duration: 0.4, delay: index * 0.06 },
        rotateX: { type: "spring", stiffness: 250, damping: 22 },
        rotateY: { type: "spring", stiffness: 250, damping: 22 },
      }}
      className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-xl hover:shadow-accent-indigo/5 hover:-translate-y-1 flex flex-col h-full"
      style={{ transformPerspective: 1000, boxShadow: panelShadow }}
    >
      {/* ── Image Section ── */}
      <Link href={`/projects/${project.slug}`} className="block relative w-full aspect-video overflow-hidden bg-accent-indigo/5">
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/10 via-accent-indigo/5 to-transparent" />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface-1/80 via-transparent to-transparent" />
        
        {/* Category badge */}
        {project.categories && project.categories.length > 0 && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full border border-accent-indigo/20 bg-bg-surface-1/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-accent-indigo/70">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={1.5} />
            {project.categories[0]}
          </span>
        )}

        {/* Featured badge */}
        {project.featured && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-accent-indigo/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white">
            <Star className="h-3 w-3 fill-current" strokeWidth={2} />
            Featured
          </span>
        )}

        {/* Links - bottom right */}
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-bg-surface-1/80 backdrop-blur-sm border border-accent-indigo/10 text-text-muted/50 hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300 hover:scale-110"
              aria-label="View source code"
            >
              <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-bg-surface-1/80 backdrop-blur-sm border border-accent-indigo/10 text-text-muted/50 hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300 hover:scale-110"
              aria-label="View live demo"
            >
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            </a>
          )}
        </div>
      </Link>

      {/* ── Content Section ── */}
      <div className="relative flex-1 flex flex-col p-5 sm:p-6">
        <Link href={`/projects/${project.slug}`} className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base sm:text-lg font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300 line-clamp-1">
              {project.title}
            </h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-text-muted/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-indigo/70" strokeWidth={1.75} />
          </div>
          <p className="mt-2 text-sm text-text-secondary leading-relaxed line-clamp-2 flex-1">
            {project.summary}
          </p>
        </Link>

        {/* Tech Stack */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-0.5 text-[9px] font-mono text-text-muted/60 group-hover:text-text-muted/80 transition-colors"
              >
                <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[9px] font-mono text-text-muted/40">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* ── Footer ── */}
        <div className="mt-4 pt-3 border-t border-accent-indigo/8 flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-indigo/70 hover:text-accent-indigo transition-all duration-300 group-hover:gap-2.5"
          >
            <span>View Project</span>
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
          </Link>
        </div>

        {/* bottom accent line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
      </div>
    </m.div>
  );
}