"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RotateCcw, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionConfirmDialog } from "@/components/admin/blog/action-confirm-dialog";

export function TrashBulkActionsBar({
  count,
  onClear,
  onRestoreAll,
  onDeleteAll,
}: {
  count: number;
  onClear: () => void;
  onRestoreAll: () => Promise<{ success: boolean; error?: string }[]>;
  onDeleteAll: () => Promise<{ success: boolean; error?: string }[]>;
}) {
  const router = useRouter();
  const [isRestoring, startRestoring] = useTransition();
  if (count === 0) return null;

  function summarize(results: { success: boolean; error?: string }[], verb: string) {
    const failed = results.filter((r) => !r.success).length;
    const succeeded = results.length - failed;
    if (failed === 0) {
      toast.success(`${succeeded} post${succeeded === 1 ? "" : "s"} ${verb}.`);
    } else if (succeeded === 0) {
      toast.error(`Couldn't ${verb.replace(/d$/, "")} any of the selected posts.`);
    } else {
      toast.warning(`${succeeded} ${verb}, ${failed} failed.`);
    }
  }

  function handleRestore() {
    startRestoring(async () => {
      const results = await onRestoreAll();
      summarize(results, "restored");
      onClear();
      router.refresh();
    });
  }

  return (
    <div className="mb-4 flex items-center justify-between rounded-md border border-accent-indigo/30 bg-accent-indigo/5 px-4 py-3">
      <p className="text-sm">{count} selected</p>
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={onClear}>
          <X className="mr-1.5 h-3.5 w-3.5" /> Clear
        </Button>
        <Button size="sm" variant="secondary" onClick={handleRestore} disabled={isRestoring}>
          <RotateCcw className="mr-1.5 h-3.5 w-3.5" /> {isRestoring ? "Restoring..." : "Restore selected"}
        </Button>
        <ActionConfirmDialog
          trigger={
            <Button size="sm" className="bg-danger hover:shadow-none">
              <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete selected
            </Button>
          }
          title="Permanently delete selected posts?"
          description={`${count} post${count === 1 ? "" : "s"} will be permanently deleted. This cannot be undone.`}
          confirmLabel="Delete permanently"
          confirmingLabel="Deleting..."
          icon={Trash2}
          destructive
          onConfirm={async () => {
            const results = await onDeleteAll();
            const failed = results.filter((r) => !r.success).length;
            const succeeded = results.length - failed;
            onClear();
            if (failed === 0) return { success: true };
            return { success: false, error: `${succeeded} deleted, ${failed} failed to delete.` };
          }}
          successMessage={`${count} post${count === 1 ? "" : "s"} permanently deleted.`}
        />
      </div>
    </div>
  );
}
