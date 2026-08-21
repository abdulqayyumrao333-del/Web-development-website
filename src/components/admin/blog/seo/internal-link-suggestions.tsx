"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Link2, Plus } from "lucide-react";
import type { BlogPost } from "@/types";
import { getBlogs } from "@/app/(admin)/admin/blogs/actions";
import type { SeoPanelContext } from "@/components/admin/blog/seo/seo-panel";

export function InternalLinkSuggestions({
  context,
  onInsertLink,
}: {
  context: SeoPanelContext;
  onInsertLink: (markdown: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await getBlogs();
      if (cancelled || !result.success) return;

      const related = result.data
        .filter((p) => p.id !== context.postId)
        .filter((p) => p.category === context.category || p.tags.some((t) => context.tags.includes(t)))
        .filter((p) => !context.contentMdx.includes(`/blog/${p.slug}`)) // already linked
        .slice(0, 5);

      setSuggestions(related);
    })();
    return () => {
      cancelled = true;
    };
    // Re-fetch when the category/tags/post identity change, not on every keystroke in content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context.category, context.tags.join(","), context.postId]);

  function handleInsert(post: BlogPost) {
    onInsertLink(`[${post.title}](/blog/${post.slug})`);
    toast.success("Link added to the end of your content — move it wherever fits best.");
  }

  if (suggestions === null) {
    return <p className="text-xs text-text-muted">Looking for related posts...</p>;
  }

  if (suggestions.length === 0) {
    return (
      <p className="text-xs text-text-muted">
        No related posts found yet — suggestions appear once you have other posts sharing this category or tags.
      </p>
    );
  }

  return (
    <div>
      <p className="text-xs font-medium text-text-secondary">Suggested internal links</p>
      <ul className="mt-2 space-y-1.5">
        {suggestions.map((post) => (
          <li
            key={post.id}
            className="flex items-center justify-between gap-2 rounded-sm border border-border px-2.5 py-1.5"
          >
            <span className="flex min-w-0 items-center gap-1.5 text-xs text-text-secondary">
              <Link2 className="h-3 w-3 shrink-0 text-text-muted" />
              <span className="truncate">{post.title}</span>
            </span>
            <button
              type="button"
              onClick={() => handleInsert(post)}
              aria-label={`Insert link to ${post.title}`}
              title="Insert link"
              className="shrink-0 rounded-sm p-1 text-text-muted hover:bg-bg-surface-2 hover:text-text-primary"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
