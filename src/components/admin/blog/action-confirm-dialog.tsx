"use client";

import { useState, useTransition, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ActionConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel,
  confirmingLabel,
  icon: Icon,
  destructive = false,
  onConfirm,
  successMessage,
}: {
  trigger: React.ReactNode;
  title: string;
  description: string;
  confirmLabel: string;
  confirmingLabel: string;
  icon: ComponentType<{ className?: string }>;
  destructive?: boolean;
  onConfirm: () => Promise<{ success: boolean; error?: string }>;
  successMessage: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleConfirm() {
    startTransition(async () => {
      const result = await onConfirm();
      if (result.success) {
        toast.success(successMessage);
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result.error ?? "Something went wrong. Try again.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      {open && (
        <DialogContent title={title}>
          <p className="text-sm text-text-secondary">{description}</p>
          <div className="mt-5 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setOpen(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isPending}
              className={cn(destructive && "bg-danger hover:shadow-none")}
            >
              <Icon className="mr-2 h-4 w-4" />
              {isPending ? confirmingLabel : confirmLabel}
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
