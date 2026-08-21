import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Mail, Globe, Sparkles, User, Briefcase, ArrowRight } from "lucide-react";
import { db } from "@/lib/db";
import { siteConfig } from "@/config/site";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export async function AuthorCard() {
  let topSkills: { id: string; name: string }[] = [];
  try {
    topSkills = await db.skill.findMany({ take: 5, orderBy: { order: "asc" } });
  } catch {
    topSkills = [];
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm p-6 sm:p-8"
      style={{ boxShadow: panelShadow }}
    >
      {/* hover gradient */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
      />

      {/* diagonal texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-20 opacity-[0.3]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(99,102,241,0.05) 0px, rgba(99,102,241,0.05) 1px, transparent 1px, transparent 12px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      {/* bracket */}
      <div
        aria-hidden
        className="absolute top-3 right-3 h-4 w-4 border-t border-r border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-tr-sm transition-colors duration-300 pointer-events-none"
      />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start">
        {/* ── Avatar ── */}
        <div className="relative shrink-0">
          <div className="relative h-20 w-20 rounded-full ring-2 ring-accent-indigo/20 overflow-hidden">
            <Image
              src="/images/profile.jpg"
              alt={siteConfig.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          {/* Status dot */}
          <span className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-2 ring-bg-surface-1" />
        </div>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-lg font-semibold text-text-primary">
              {siteConfig.name}
            </p>
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available
            </span>
          </div>

          <p className="mt-1.5 text-sm text-text-secondary/80 leading-relaxed">
            Full Stack Developer &amp; AI Developer, building web applications, automation
            tools, and AI-integrated products.
          </p>

          {/* ── Skills ── */}
          {topSkills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {topSkills.map((s) => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-0.5 text-[9px] font-mono text-text-muted/60"
                >
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  {s.name}
                </span>
              ))}
            </div>
          )}

          {/* ── Social Links ── */}
          <div className="mt-4 flex items-center gap-2">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="group flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 text-text-muted/50 hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300 hover:scale-105"
            >
              <Github className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 text-text-muted/50 hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300 hover:scale-105"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <a
              href={`mailto:${siteConfig.links.email}`}
              aria-label="Email"
              className="group flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 text-text-muted/50 hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300 hover:scale-105"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
            </a>
            <Link
              href="/"
              aria-label="Portfolio"
              className="group flex h-8 w-8 items-center justify-center rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 text-text-muted/50 hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300 hover:scale-105"
            >
              <Globe className="h-4 w-4" strokeWidth={1.75} />
            </Link>
            <div className="ml-auto flex items-center gap-1.5 text-[9px] font-mono text-text-muted/20">
              <Sparkles className="h-3 w-3" strokeWidth={1.5} />
              <span>Author</span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom accent line */}
      <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
    </div>
  );
}