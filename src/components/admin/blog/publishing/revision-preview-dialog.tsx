"use client";

import type { BlogPostRevision } from "@prisma/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export function RevisionPreviewDialog({
  open,
  onOpenChange,
  revision,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  revision: BlogPostRevision | null;
}) {
  if (!open || !revision) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={`Version ${revision.versionNumber} (read-only)`}>
        <p className="text-xs text-text-muted">
          Saved {formatDate(revision.createdAt)} · {revision.changeSummary.join(", ")}
        </p>

        <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto">
          <div>
            <p className="text-xs font-medium text-text-secondary">Title</p>
            <p className="mt-1 text-sm text-text-primary">{revision.title}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary">Slug</p>
            <p className="mt-1 font-mono text-xs text-text-secondary">/blog/{revision.slug}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary">Excerpt</p>
            <p className="mt-1 text-sm text-text-secondary">{revision.excerpt}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary">Category</p>
            <p className="mt-1 text-sm text-text-secondary">{revision.category}</p>
          </div>
          {revision.tags.length > 0 && (
            <div>
              <p className="text-xs font-medium text-text-secondary">Tags</p>
              <p className="mt-1 text-sm text-text-secondary">{revision.tags.join(", ")}</p>
            </div>
          )}
          <div>
            <p className="text-xs font-medium text-text-secondary">Content</p>
            <pre className="mt-1 max-h-64 overflow-auto whitespace-pre-wrap rounded-sm border border-border bg-bg-surface-2 p-3 font-mono text-xs text-text-secondary">
              {revision.contentMdx}
            </pre>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
