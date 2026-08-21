"use client";

import { useEffect, useState } from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { Loader2, AlertTriangle } from "lucide-react";
import { mdxComponents } from "@/lib/mdx-components";
import { serializeMdxPreview } from "@/app/(admin)/admin/blogs/preview-actions";

const DEBOUNCE_MS = 500;

export function MdxPreview({ content }: { content: string }) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);

  useEffect(() => {
    if (!content.trim()) {
      setMdxSource(null);
      setError(null);
      setIsCompiling(false);
      return;
    }

    let cancelled = false;
    setIsCompiling(true);

    const handle = setTimeout(async () => {
      const result = await serializeMdxPreview(content);
      if (cancelled) return;
      if (result.success) {
        setMdxSource(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
      setIsCompiling(false);
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [content]);

  if (error) {
    return (
      <div className="flex items-start gap-2 rounded-md border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {isCompiling && (
        <span className="absolute right-0 top-0 flex items-center gap-1 text-xs text-text-muted">
          <Loader2 className="h-3 w-3 animate-spin" /> Updating preview...
        </span>
      )}
      {mdxSource ? (
        <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:text-accent-indigo prose-img:rounded-md prose-img:border prose-img:border-border">
          <MDXRemote {...mdxSource} components={mdxComponents} />
        </article>
      ) : (
        <p className="text-sm text-text-muted">Start writing to see a preview.</p>
      )}
    </div>
  );
}
