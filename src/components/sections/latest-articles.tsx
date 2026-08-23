import Link from "next/link";
import { ArrowRight, PenLine, Sparkles, BookOpen } from "lucide-react";
import { db } from "@/lib/db";
import { publishedPostWhere } from "@/lib/blog";
import { Reveal } from "@/components/sections/reveal";
import { BlogCard } from "@/components/sections/blog-card";
import type { BlogPost } from "@prisma/client";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

async function getLatestPosts(): Promise<BlogPost[]> {
  try {
    return await db.blogPost.findMany({ 
      where: publishedPostWhere, 
      orderBy: { publishedAt: "desc" }, 
      take: 3 
    });
  } catch (error) {
    console.warn("[LatestArticles] Could not reach the database — showing empty state.", error);
    return [];
  }
}

export async function LatestArticles() {
  const posts = await getLatestPosts();

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
                Writing
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Latest
                <br />
                <span className="text-accent-indigo">articles</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Recent posts on full-stack development, AI, and engineering insights.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {posts.length} articles
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  Latest posts
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Read below
                </p>
              </div>
            </div>

            {/* View all link */}
            {posts.length > 0 && (
              <Link
                href="/blog"
                className="mt-8 hidden lg:inline-flex items-center gap-2 text-xs font-medium text-text-muted/50 hover:text-accent-indigo transition-colors group"
              >
                <span>View all posts</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
              </Link>
            )}
          </div>
        </Reveal>

        {/* ══ RIGHT ── Content ══ */}
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

            {posts.length === 0 ? (
              <Reveal delay={0.1}>
                <div
                  className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm px-8 py-16 text-center"
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
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent-indigo/15 bg-accent-indigo/8 mx-auto mb-4">
                      <PenLine className="h-7 w-7 text-accent-indigo/40" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      No articles yet
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary/80 max-w-sm mx-auto">
                      First post coming soon. Stay tuned for insights on full-stack development, AI, and engineering.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-3 py-1">
                      <Sparkles className="h-3 w-3 text-accent-indigo/40" strokeWidth={1.5} />
                      <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                  {posts.map((post, i) => (
                    <Reveal key={post.id} delay={0.12 + i * 0.06}>
                      <BlogCard post={post} />
                    </Reveal>
                  ))}
                </div>

                {/* bottom strip */}
                <div className="mt-0.5 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                  <p className="font-mono text-[11px] text-text-muted">
                    BLOG · {posts.length} ARTICLES · LATEST
                  </p>
                  <div className="flex gap-1">
                    {posts.map((_, i) => (
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
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}