import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, Clock, User, Tag, Sparkles, BookOpen, ArrowLeft } from "lucide-react";
import { calculateReadingMinutes } from "@/lib/reading-time";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@prisma/client";

const LEVEL_LABEL: Record<NonNullable<BlogPost["level"]>, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

const LEVEL_COLORS: Record<NonNullable<BlogPost["level"]>, string> = {
  BEGINNER: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  INTERMEDIATE: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  ADVANCED: "border-rose-500/20 bg-rose-500/10 text-rose-500",
};

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function ArticleHero({ post }: { post: BlogPost }) {
  const minutes = calculateReadingMinutes(post.contentMdx);
  const wasUpdated = post.updatedAt.getTime() - post.publishedAt.getTime() > 1000 * 60 * 60 * 24;

  return (
    <header className="relative overflow-hidden border-b border-accent-indigo/8 bg-gradient-to-b from-bg-surface-1 to-bg-surface-1/80">
      
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

      {/* ── Decorative floating elements ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 rounded-full border border-accent-indigo/5 animate-[spin_20s_linear_infinite]" />
        <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full border border-accent-indigo/5 animate-[spin_15s_linear_infinite]" />
        <div className="absolute top-1/3 right-5 w-16 h-16 rounded-full border border-accent-indigo/5 animate-[spin_25s_linear_infinite]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 pt-8 sm:pt-12 lg:pt-16">

        {/* ── Back to Blog ── */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-text-muted/60 hover:text-accent-indigo transition-colors duration-300 group mb-6"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" strokeWidth={1.75} />
          <span>Back to Blog</span>
        </Link>

        {/* ── Category & Level Badges ── */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/15 bg-accent-indigo/[0.04] px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-accent-indigo/70">
            <BookOpen className="h-3 w-3" strokeWidth={1.5} />
            {post.category}
          </span>
          {post.level && (
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-wider ${LEVEL_COLORS[post.level]}`}>
              {post.level === "BEGINNER" && "🌱"}
              {post.level === "INTERMEDIATE" && "📘"}
              {post.level === "ADVANCED" && "🚀"}
              {LEVEL_LABEL[post.level]}
            </span>
          )}
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/8 bg-accent-indigo/[0.02] px-2.5 py-1 text-[9px] font-mono text-text-muted/50">
              <Tag className="h-2.5 w-2.5" strokeWidth={1.5} />
              {tag}
            </span>
          ))}
        </div>

        {/* ── Title ── */}
        <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-text-primary">
          {post.title}
        </h1>

        {/* ── Subtitle ── */}
        {post.subtitle && (
          <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
            {post.subtitle}
          </p>
        )}

        {/* ── Meta Info ── */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-text-muted/60">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" strokeWidth={1.5} />
            Abdul Qayyum
          </span>
          <span className="text-accent-indigo/20">|</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
            {formatDate(post.publishedAt)}
          </span>
          <span className="text-accent-indigo/20">|</span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
            {minutes} min read
          </span>
          {wasUpdated && (
            <>
              <span className="text-accent-indigo/20">|</span>
              <span className="inline-flex items-center gap-1 text-xs text-text-muted/40">
                <Sparkles className="h-3 w-3" strokeWidth={1.5} />
                Updated {formatDate(post.updatedAt)}
              </span>
            </>
          )}
        </div>

        {/* ── Technologies ── */}
        {post.technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted/30 mr-1">Tech:</span>
            {post.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.02] px-2.5 py-0.5 text-[9px] font-mono text-text-muted/50"
              >
                <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Cover Image ── */}
      <div className="relative mx-auto max-w-5xl px-6 mt-8 pb-8 sm:pb-12">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/50 shadow-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />
          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-bg-surface-1/60 to-transparent" />
          
          {/* Featured badge if featured */}
          {post.featured && (
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 backdrop-blur-sm px-3 py-1.5">
              <Sparkles className="h-3 w-3 text-amber-500" strokeWidth={1.5} />
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-500">
                Featured
              </span>
            </div>
          )}

          {/* Reading time on image */}
          <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1.5">
            <Clock className="h-3 w-3 text-white/60" strokeWidth={1.5} />
            <span className="text-[10px] font-mono text-white/60">{minutes} min read</span>
          </div>
        </div>
      </div>
    </header>
  );
}