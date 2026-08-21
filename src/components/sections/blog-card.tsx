import Link from "next/link";
import Image from "next/image";
import { Clock, BookOpen, Sparkles, Tag, ArrowRight } from "lucide-react";
import { calculateReadingMinutes } from "@/lib/reading-time";
import { formatDate } from "@/lib/utils";
import type { BlogPost } from "@prisma/client";

const LEVEL_COLORS: Record<NonNullable<BlogPost["level"]>, string> = {
  BEGINNER: "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
  INTERMEDIATE: "border-blue-500/20 bg-blue-500/10 text-blue-500",
  ADVANCED: "border-rose-500/20 bg-rose-500/10 text-rose-500",
};

const LEVEL_EMOJIS: Record<NonNullable<BlogPost["level"]>, string> = {
  BEGINNER: "🌱",
  INTERMEDIATE: "📘",
  ADVANCED: "🚀",
};

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export function BlogCard({ post }: { post: BlogPost }) {
  const minutes = calculateReadingMinutes(post.contentMdx);
  const wasUpdated = post.updatedAt.getTime() - post.publishedAt.getTime() > 1000 * 60 * 60 * 24;

  return (
    <Link href={`/blog/${post.slug}`}>
      <div
        className="group relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-400 hover:border-accent-indigo/30 hover:shadow-xl hover:shadow-accent-indigo/5 hover:-translate-y-1 h-full flex flex-col"
        style={{ boxShadow: panelShadow }}
      >
        {/* hover gradient */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent-indigo/[0.04] via-transparent to-transparent"
        />

        {/* ── Image Section ── */}
        <div className="relative aspect-video overflow-hidden bg-accent-indigo/5">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-surface-1/80 via-transparent to-transparent" />

          {/* Featured badge */}
          {post.featured && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-accent-indigo/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white">
              <Sparkles className="h-3 w-3 fill-current" strokeWidth={2} />
              Featured
            </span>
          )}

          {/* Level badge */}
          {post.level && (
            <span className={`absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider backdrop-blur-sm ${LEVEL_COLORS[post.level]}`}>
              {LEVEL_EMOJIS[post.level]}
              {post.level.toLowerCase()}
            </span>
          )}

          {/* Category badge - bottom left */}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/20 bg-bg-surface-1/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-accent-indigo/70">
            <BookOpen className="h-2.5 w-2.5" strokeWidth={1.5} />
            {post.category}
          </span>

          {/* Reading time - bottom right */}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono text-white/60">
            <Clock className="h-3 w-3" strokeWidth={1.5} />
            {minutes} min
          </span>
        </div>

        {/* ── Content Section ── */}
        <div className="relative flex-1 flex flex-col p-5 sm:p-6">
          {/* Title */}
          <h3 className="text-base sm:text-lg font-semibold text-text-primary group-hover:text-accent-indigo transition-colors duration-300 line-clamp-2 leading-snug">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm text-text-secondary/80 group-hover:text-text-secondary transition-colors duration-300 line-clamp-2 flex-1 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Technologies */}
          {post.technologies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-0.5 text-[9px] font-mono text-text-muted/60 group-hover:text-text-muted/80 transition-colors"
                >
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  {tech}
                </span>
              ))}
              {post.technologies.length > 3 && (
                <span className="text-[9px] font-mono text-text-muted/40">
                  +{post.technologies.length - 3}
                </span>
              )}
            </div>
          )}

          {/* ── Footer ── */}
          <div className="mt-4 pt-3 border-t border-accent-indigo/8 flex items-center justify-between">
            <span className="text-[10px] font-mono text-text-muted/40 group-hover:text-text-muted/60 transition-colors">
              {formatDate(post.publishedAt)}
              {wasUpdated && (
                <span className="ml-2 inline-flex items-center gap-1 text-[8px] text-accent-indigo/20">
                  <Sparkles className="h-2 w-2" strokeWidth={1.5} />
                  Updated
                </span>
              )}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-indigo/70 group-hover:text-accent-indigo transition-all duration-300 group-hover:gap-2">
              Read
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} />
            </span>
          </div>

          {/* bottom accent line */}
          <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
        </div>
      </div>
    </Link>
  );
}