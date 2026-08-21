"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Flame, TrendingUp, Eye, Sparkles } from "lucide-react";
import { BlogCard } from "@/components/sections/blog-card";
import type { BlogPost } from "@prisma/client";

interface TrendingArticlesProps {
  initialPosts?: BlogPost[];
}

export function TrendingArticles({ initialPosts = [] }: TrendingArticlesProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(!initialPosts.length);

  useEffect(() => {
    if (initialPosts.length) return;

    fetch("/api/blog/trending")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [initialPosts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-pulse text-muted-foreground">Loading trending...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-accent-indigo/12 bg-bg-surface-1/70 backdrop-blur-sm p-8 text-center">
        <Flame className="h-10 w-10 text-accent-indigo/30 mx-auto mb-3" strokeWidth={1.5} />
        <p className="text-sm text-text-muted/60">Trending will appear here once posts get enough views.</p>
        <p className="text-xs text-text-muted/40 mt-1">Real analytics coming soon.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Flame className="h-5 w-5 text-orange-500" strokeWidth={1.75} />
        <h2 className="text-lg font-bold text-text-primary">Trending Now</h2>
        <span className="text-xs text-muted-foreground/40">🔥 Hot topics</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Trending stats */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground/40 pt-2 border-t border-accent-indigo/8">
        <span className="flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
          {posts.reduce((acc, p) => acc + (p.viewCount || 0), 0)} total views
        </span>
        <span className="text-accent-indigo/20">|</span>
        <span className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" strokeWidth={1.5} />
          {posts.length} trending posts
        </span>
      </div>
    </div>
  );
}