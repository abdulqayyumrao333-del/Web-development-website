"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type UncontrolledProps = {
  /** Self-contained mode: dialog manages its own open state, opened via `trigger`. */
  label: string;
  onConfirm: () => Promise<void>;
  trigger: React.ReactNode;
};

type ControlledProps = {
  /** Controlled mode: parent owns open state and supplies its own copy. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => unknown;
  title: string;
  description: string;
};

export function ConfirmDeleteDialog(props: UncontrolledProps | ControlledProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const open = "open" in props ? props.open : internalOpen;
  const setOpen = "open" in props ? props.onOpenChange : setInternalOpen;
  const dialogTitle = "open" in props ? props.title : `Delete ${props.label}?`;
  const dialogDescription = "open" in props
    ? props.description
    : `This can't be undone. "${props.label}" will be permanently removed.`;

  function handleConfirm() {
    startTransition(async () => {
      try {
        await props.onConfirm();
        if (!("open" in props)) toast.success(`${props.label} deleted.`);
        setOpen(false);
      } catch {
        if (!("open" in props)) toast.error(`Couldn't delete ${props.label.toLowerCase()}. Try again.`);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!("open" in props) && <DialogTrigger asChild>{props.trigger}</DialogTrigger>}
      {open && (
        <DialogContent title={dialogTitle}>
          <p className="text-sm text-text-secondary">{dialogDescription}</p>
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