"use client";

import { useEffect, useState } from "react";
import { History, Eye, RotateCcw } from "lucide-react";
import type { BlogPostRevision } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { getBlogRevisions, restoreBlogRevision } from "@/app/(admin)/admin/blogs/publishing-actions";
import { RevisionPreviewDialog } from "@/components/admin/blog/publishing/revision-preview-dialog";
import { ActionConfirmDialog } from "@/components/admin/blog/action-confirm-dialog";

export function VersionHistoryCard({ postId }: { postId: string }) {
  const [revisions, setRevisions] = useState<BlogPostRevision[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewing, setPreviewing] = useState<BlogPostRevision | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const result = await getBlogRevisions(postId);
      if (cancelled) return;
      if (result.success) setRevisions(result.data);
      else setError(result.error);
    })();
    return () => {
      cancelled = true;
    };
  }, [postId]);

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <History className="h-4 w-4 text-text-muted" />
        <h2 className="text-sm font-semibold text-text-primary">Version History</h2>
      </div>

      {error && <p className="mt-3 text-xs text-danger">{error}</p>}

      {!error && revisions === null && <p className="mt-3 text-xs text-text-muted">Loading...</p>}

      {revisions !== null && revisions.length === 0 && (
        <p className="mt-3 text-xs text-text-muted">
          No previous versions yet — one is created the next time you save a change.
        </p>
      )}

      {revisions !== null && revisions.length > 0 && (
        <ul className="mt-3 max-h-80 space-y-2 overflow-y-auto">
          {revisions.map((rev) => (
            <li key={rev.id} className="rounded-sm border border-border p-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-xs font-medium text-text-primary">Version {rev.versionNumber}</p>
                  <p className="mt-0.5 text-xs text-text-muted">{formatDate(rev.createdAt)}</p>
                  <p className="mt-0.5 truncate text-xs text-text-secondary" title={rev.changeSummary.join(", ")}>
                    {rev.changeSummary.join(", ")}
                  </p>
                  <p className="mt-0.5 text-xs text-text-muted">By {siteConfig.name}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => setPreviewing(rev)}
                    aria-label={`View version ${rev.versionNumber}`}
                    title="View"
                    className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <ActionConfirmDialog
                    trigger={
                      <button
                        aria-label={`Restore version ${rev.versionNumber}`}
                        title="Restore"
                        className="rounded-sm p-1.5 text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </button>
                    }
                    title={`Restore Version ${rev.versionNumber}?`}
                    description="The current content will be replaced with this version. Today's version is saved to history first, so nothing is lost — you can always undo this too."
                    confirmLabel="Restore"
                    confirmingLabel="Restoring..."
                    icon={RotateCcw}
                    onConfirm={() => restoreBlogRevision(rev.id)}
                    successMessage={`Restored to version ${rev.versionNumber}.`}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <RevisionPreviewDialog open={Boolean(previewing)} onOpenChange={(open) => !open && setPreviewing(null)} revision={previewing} />
    </Card>
  );
}
