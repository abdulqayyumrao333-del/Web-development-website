import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, Sparkles, Calendar } from "lucide-react";
import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";
import { calculateReadingMinutes } from "@/lib/reading-time";
import { formatDate } from "@/lib/utils";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

export async function FeaturedArticle() {
  let post: Awaited<ReturnType<typeof db.blogPost.findFirst>> = null;
  try {
    post = await db.blogPost.findFirst({ 
      where: { featured: true, status: "PUBLISHED" }, 
      orderBy: { publishedAt: "desc" } 
    });
  } catch {
    post = null;
  }

  if (!post) return null;
  const minutes = calculateReadingMinutes(post.contentMdx);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16">

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
      </div>

      <Reveal>
        <Link href={`/blog/${post.slug}`} className="group block">
          <div
            className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm transition-all duration-500 hover:border-accent-indigo/30 hover:shadow-2xl hover:shadow-accent-indigo/10"
            style={{ boxShadow: panelShadow }}
          >
            {/* hover gradient */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-accent-indigo/[0.05] via-transparent to-transparent"
            />

            {/* diagonal texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-[0.35]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
                maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
              }}
            />

            {/* brackets - animated */}
            <div
              aria-hidden
              className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-accent-indigo/0 group-hover:border-accent-indigo/35 rounded-tr-md transition-all duration-300 pointer-events-none group-hover:h-8 group-hover:w-8"
            />
            <div
              aria-hidden
              className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-accent-indigo/0 group-hover:border-accent-indigo/25 rounded-bl-md transition-all duration-300 pointer-events-none group-hover:h-8 group-hover:w-8"
            />

            <div className="grid gap-0 md:grid-cols-2">
              {/* ── Image ── */}
              <div className="relative aspect-video overflow-hidden bg-accent-indigo/5 md:aspect-auto md:min-h-[320px]">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface-1/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-bg-surface-1/80" />
                
                {/* Featured Badge on Image */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/20 bg-bg-surface-1/80 backdrop-blur-sm px-3 py-1.5">
                  <Sparkles className="h-3 w-3 text-accent-indigo/70" strokeWidth={1.5} />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent-indigo/70">
                    Featured
                  </span>
                </div>
              </div>

              {/* ── Content ── */}
              <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-accent-indigo/50">
                    <BookOpen className="h-2.5 w-2.5" strokeWidth={1.5} />
                    {post.category}
                  </span>
                  <span className="text-accent-indigo/15">·</span>
                  <span className="flex items-center gap-1 text-[9px] font-mono text-text-muted/40">
                    <Clock className="h-2.5 w-2.5" strokeWidth={1.5} />
                    {minutes} min read
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary group-hover:text-accent-indigo transition-colors duration-300 leading-[1.1]">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm sm:text-base text-text-secondary/80 group-hover:text-text-secondary transition-colors duration-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-3 text-xs text-text-muted/40">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {formatDate(post.publishedAt)}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-indigo group-hover:gap-2.5 transition-all duration-300">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-accent-indigo/15 to-transparent" />
                </div>
              </div>
            </div>

            {/* bottom accent line on hover */}
            <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-accent-indigo/40 to-transparent transition-all duration-700 rounded-b-full" />
          </div>
        </Link>
      </Reveal>
    </section>
  );
}