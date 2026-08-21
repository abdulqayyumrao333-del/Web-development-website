"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmDeleteDialog({
  label,
  onConfirm,
  trigger,
}: {
  label: string;
  onConfirm: () => Promise<void>;
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      try {
        await onConfirm();
        toast.success(`${label} deleted.`);
        setOpen(false);
      } catch {
        toast.error(`Couldn't delete ${label.toLowerCase()}. Try again.`);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {open && (
        <DialogContent title={`Delete ${label}?`}>
          <p className="text-sm text-text-secondary">
            This can&apos;t be undone. &quot;{label}&quot; will be permanently removed.
          </p>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isPending}
              className="bg-danger hover:shadow-none"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
