"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/types";
import { siteConfig } from "@/config/site";
import { analyzeSeo } from "@/lib/seo-analyzer";

export function PublishConfirmDialog({
  open,
  onOpenChange,
  post,
  onPublish,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: BlogPost;
  onPublish: () => Promise<{ success: boolean; error?: string }>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (!open) return null;

  const canonical = post.canonicalUrl || `${siteConfig.url}/blog/${post.slug}`;
  const analysis = analyzeSeo({
    seoTitle: post.seoTitle ?? "",
    title: post.title,
    seoDescription: post.seoDescription ?? "",
    excerpt: post.excerpt,
    focusKeyword: post.focusKeyword ?? "",
    slug: post.slug,
    contentMdx: post.contentMdx,
    canonicalUrl: post.canonicalUrl ?? "",
    siteHostname: new URL(siteConfig.url).hostname,
  });

  function handleConfirm() {
    startTransition(async () => {
      const result = await onPublish();
      if (result.success) {
        toast.success("Post published.");
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error(result.error ?? "Couldn't publish this post.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Publish this post?">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-text-muted">Title</dt>
            <dd className="truncate text-right text-text-primary">{post.title}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-muted">Current status</dt>
            <dd className="text-text-primary">{post.status}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-muted">Canonical URL</dt>
            <dd className="truncate text-right font-mono text-xs text-text-secondary">{canonical}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-text-muted">Publication date</dt>
            <dd className="text-text-primary">Now</dd>
          </div>
        </dl>

        <div
          className={`mt-4 flex items-center gap-2 rounded-sm border p-3 text-sm ${
            analysis.score === "Excellent"
              ? "border-success/30 bg-success/5 text-success"
              : analysis.score === "Good"
                ? "border-accent-blue/30 bg-accent-blue/5 text-accent-blue"
                : "border-warning/30 bg-warning/5 text-warning"
          }`}
        >
          {analysis.score === "Needs Improvement" ? (
            <AlertTriangle className="h-4 w-4 shrink-0" />
          ) : (
            <CheckCircle2 className="h-4 w-4 shrink-0" />
          )}
          <span>
            {analysis.score === "Excellent"
              ? "Ready to publish."
              : analysis.score === "Good"
                ? `Good to publish — ${analysis.passedCount}/${analysis.totalCount} SEO checks passed.`
                : `SEO warnings detected (${analysis.passedCount}/${analysis.totalCount} checks passed) — you can still publish, but consider reviewing the SEO tab first.`}
          </span>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isPending}>
            {isPending ? "Publishing..." : "Publish Now"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
