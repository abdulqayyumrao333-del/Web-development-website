"use client";

import { useTransition } from "react";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function BulkActionsBar({
  count,
  onClear,
  onDelete,
}: {
  count: number;
  onClear: () => void;
  onDelete: () => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();
  if (count === 0) return null;

  function handleDelete() {
    startTransition(async () => {
      try {
        await onDelete();
        toast.success(`${count} item${count === 1 ? "" : "s"} deleted.`);
        onClear();
      } catch {
        toast.error("Bulk delete failed. Try again.");
      }
    });
  }

  return (
    <div className="mb-4 flex items-center justify-between rounded-md border border-accent-indigo/30 bg-accent-indigo/5 px-4 py-3">
      <p className="text-sm">{count} selected</p>
      <div className="flex gap-2">
        <Button size="sm" variant="ghost" onClick={onClear}>
          <X className="mr-1.5 h-3.5 w-3.5" /> Clear
        </Button>
        <Button size="sm" onClick={handleDelete} disabled={isPending} className="bg-danger hover:shadow-none">
          <Trash2 className="mr-1.5 h-3.5 w-3.5" /> {isPending ? "Deleting..." : "Delete selected"}
        </Button>
      </div>
    </div>
  );
}
