"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Flame, Eye, Sparkles, ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/sections/blog-card";
import type { BlogPost } from "@prisma/client";

interface TrendingArticlesProps {
  initialPosts?: BlogPost[];
}

export function TrendingArticles({ initialPosts = [] }: TrendingArticlesProps) {
  const [posts, setPosts] = useState(initialPosts || []);

  useEffect(() => {
    if (initialPosts && initialPosts.length > 0) return;
    fetch("/api/blog/trending")
      .then((res) => res.json())
      .then((data) => setPosts(data || []))
      .catch(() => setPosts([]));
  }, [initialPosts]);

  const totalViews = posts.reduce((acc, p) => acc + (p.viewCount || 0), 0);

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">

      {/* Full-bleed background */}
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
              "radial-gradient(40% 70% at 60% 0%, rgba(79,70,229,0.06) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* header row */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-accent-indigo/60" />
          <Flame className="h-4 w-4 text-orange-500" strokeWidth={1.75} />
          <h2 className="text-label-sm uppercase tracking-widest text-accent-indigo">
            {"Trending Now"}
          </h2>
        </div>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-text-muted/50 hover:text-accent-indigo transition-colors duration-200"
        >
          {"View all"}
          <ArrowRight
            className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>

      {/* empty state */}
      {posts.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-10 text-center"
          style={{ boxShadow: "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px -8px rgba(79,70,229,0.10)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.35]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(99,102,241,0.07) 0px, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 12px)",
              maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
            }}
          />
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-accent-indigo/15 bg-accent-indigo/8 mx-auto mb-4">
            <Flame className="h-5 w-5 text-accent-indigo/50" strokeWidth={1.5} />
          </div>
          <p className="text-sm text-text-muted/60">
            {"Trending will appear here once posts get enough views."}
          </p>
          <p className="text-xs text-text-muted/40 mt-1">
            {"Views are tracked in real-time."}
          </p>
        </div>
      ) : (
        <>
          {/* blog cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* bottom strip */}
          <div className="mt-4 flex items-center justify-between rounded-lg border border-accent-indigo/10 bg-accent-indigo/[0.025] px-4 py-2.5">
            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-text-muted">
              <span className="flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-accent-indigo/40" strokeWidth={1.5} />
                {totalViews.toLocaleString()}
                {" total views"}
              </span>
              <span className="h-3 w-px bg-accent-indigo/15" />
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent-indigo/40" strokeWidth={1.5} />
                {posts.length}
                {" trending "}
                {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(posts.length, 5) }).map((_, i) => (
                <span
                  key={i}
                  className="h-1 w-2 rounded-full"
                  style={{
                    backgroundColor: `rgb(99 102 241 / ${Math.max(0.10, 0.55 - i * 0.10)})`,
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}