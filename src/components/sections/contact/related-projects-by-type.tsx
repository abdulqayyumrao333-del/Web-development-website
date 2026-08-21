"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, FolderGit2, Sparkles } from "lucide-react";

type ProjectSummary = { id: string; title: string; slug: string; summary: string; categories: string[] };

// Maps form project-type options to real project category tags used in the DB.
const TYPE_TO_CATEGORY: Record<string, string[]> = {
  "Portfolio Website": ["Personal"],
  "Business Website": ["Full Stack"],
  "AI Application": ["AI"],
  SaaS: ["SaaS"],
  "Workflow Automation": ["Automation"],
  "API Development": ["Full Stack"],
  "Full Stack Application": ["Full Stack"],
};

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function RelatedProjectsByType({ projectType }: { projectType?: string }) {
  const [projects, setProjects] = useState<ProjectSummary[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectType || !TYPE_TO_CATEGORY[projectType]) {
      setLoading(false);
      return;
    }
    fetch("/api/projects")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  }, [projectType]);

  if (!projectType || !TYPE_TO_CATEGORY[projectType]) return null;

  const relevantCategories = TYPE_TO_CATEGORY[projectType];
  const matches = projects?.filter((p) => p.categories.some((c) => relevantCategories.includes(c))).slice(0, 2) ?? [];

  if (loading) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-4 animate-pulse" style={{ boxShadow: panelShadow }}>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-4 rounded bg-accent-indigo/10" />
          <div className="h-3 w-24 rounded bg-accent-indigo/10" />
        </div>
        <div className="space-y-2">
          <div className="h-8 rounded bg-accent-indigo/5" />
          <div className="h-8 rounded bg-accent-indigo/5" />
        </div>
      </div>
    );
  }

  if (matches.length === 0) return null;

  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-lg hover:shadow-accent-indigo/5 p-4"
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
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg border border-accent-indigo/12 bg-accent-indigo/6">
            <FolderGit2 className="h-3.5 w-3.5 text-accent-indigo" strokeWidth={1.75} />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-accent-indigo/60 group-hover:text-accent-indigo/80 transition-colors">
            Related Work
          </p>
          <span className="ml-auto flex items-center gap-1 text-[8px] font-mono text-accent-indigo/20 group-hover:text-accent-indigo/40 transition-colors">
            <Sparkles className="h-2.5 w-2.5" strokeWidth={1.5} />
            {matches.length} project{matches.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="space-y-1.5">
          {matches.map((p) => (
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              target="_blank"
              className="group/link flex items-center justify-between gap-2 rounded-lg border border-accent-indigo/8 bg-bg-surface-1/30 px-3 py-2 transition-all duration-300 hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.04] hover:shadow-sm"
            >
              <span className="text-sm text-text-secondary group-hover/link:text-accent-indigo transition-colors duration-300">
                {p.title}
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-text-muted/30 group-hover/link:text-accent-indigo/60 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" strokeWidth={1.75} />
            </Link>
          ))}
        </div>

        {/* bottom accent line */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
      </div>
    </div>
  );
}