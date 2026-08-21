import Link from "next/link";
import { Mail, Sparkles, Tag, FolderOpen, Hash, ArrowRight, CheckCircle } from "lucide-react";
import { db } from "@/lib/db";
import { Reveal } from "@/components/sections/reveal";
import { NewsletterForm } from "@/components/sections/newsletter-form";

const panelShadow =
  "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10), 0 32px 64px -16px rgba(79,70,229,0.08)";

// ── BlogNewsletter ──
export function BlogNewsletter() {
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
                Newsletter
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Get articles
                <br />
                <span className="text-accent-indigo">by email</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Subscribe to get the latest articles delivered straight to your inbox.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  Weekly updates
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  No spam
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Unsubscribe anytime
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
              className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-gradient-to-br from-bg-surface-1/95 to-bg-surface-1/70 backdrop-blur-sm p-8 sm:p-10 text-center"
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
                  <Mail className="h-7 w-7 text-accent-indigo" strokeWidth={1.75} />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-text-primary">
                  Get new articles <span className="text-accent-indigo">by email</span>
                </h3>

                <p className="mt-2 text-sm text-text-secondary/80 leading-relaxed max-w-sm mx-auto">
                  Subscribe to receive the latest articles, project updates, and technical insights directly in your inbox.
                </p>

                <div className="mt-6 max-w-sm mx-auto">
                  <NewsletterForm />
                </div>

                {/* Trust badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-3 py-1">
                  <CheckCircle className="h-3 w-3 text-emerald-500/40" strokeWidth={1.5} />
                  <span className="text-[9px] font-mono uppercase tracking-wider text-text-muted/40">
                    No spam · Unsubscribe anytime
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── CategoriesTagsCloud ──
export async function CategoriesTagsCloud() {
  let categories: string[] = [];
  let tags: string[] = [];

  try {
    const posts = await db.blogPost.findMany({ 
      where: { status: "PUBLISHED" }, 
      select: { category: true, tags: true } 
    });
    categories = Array.from(new Set(posts.map((p) => p.category)));
    tags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  } catch {
    categories = [];
    tags = [];
  }

  if (categories.length === 0 && tags.length === 0) return null;

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
                Browse
              </p>
            </div>

            <div className="relative mb-4">
              <h2 className="relative text-h2 font-semibold tracking-tight leading-tight">
                Categories
                <br />
                <span className="text-accent-indigo">&amp; tags</span>
              </h2>
            </div>

            <p className="text-base text-text-secondary leading-relaxed mt-3 max-w-[14rem]">
              Explore articles by category or discover related content through tags.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="w-0.5 rounded-full bg-gradient-to-b from-accent-indigo/60 via-accent-indigo/25 to-transparent" />
              <div className="space-y-2.5 text-xs text-text-muted font-mono">
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/50" />
                  {categories.length} categories
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-emerald-500/70" />
                  {tags.length} tags
                </p>
                <p className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent-indigo/30" />
                  Click to explore
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

            <div className="flex flex-col gap-4">
              {/* Categories */}
              {categories.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FolderOpen className="h-4 w-4 text-accent-indigo/40" strokeWidth={1.75} />
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50">
                      Categories
                    </p>
                    <span className="ml-auto text-[8px] font-mono text-accent-indigo/20">
                      {categories.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <Link
                        key={c}
                        href={`/blog?category=${encodeURIComponent(c)}`}
                        className="group inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/15 bg-accent-indigo/[0.04] px-4 py-1.5 text-sm font-medium text-accent-indigo/80 hover:bg-accent-indigo/10 hover:border-accent-indigo/30 hover:text-accent-indigo transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo/30 group-hover:bg-accent-indigo/50 transition-colors" />
                        {c}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {tags.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="h-4 w-4 text-accent-indigo/40" strokeWidth={1.75} />
                    <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted/50">
                      Tags
                    </p>
                    <span className="ml-auto text-[8px] font-mono text-accent-indigo/20">
                      {tags.length}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t) => (
                      <Link
                        key={t}
                        href={`/blog?tag=${encodeURIComponent(t)}`}
                        className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-1 text-xs text-text-secondary hover:border-accent-indigo/25 hover:text-accent-indigo hover:bg-accent-indigo/[0.03] transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <span className="text-accent-indigo/30 text-[8px]">#</span>
                        {t}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* bottom strip */}
              <div className="mt-2 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
                <p className="font-mono text-[11px] text-text-muted">
                  BROWSE · {categories.length} CATEGORIES · {tags.length} TAGS
                </p>
                <div className="flex gap-1">
                  <span className="h-1 w-4 rounded-full bg-accent-indigo/40" />
                  <span className="h-1 w-2 rounded-full bg-accent-indigo/20" />
                  <span className="h-1 w-2 rounded-full bg-accent-indigo/15" />
                  <span className="h-1 w-2 rounded-full bg-accent-indigo/10" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}