"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DraftRecoveryDialog({
  open,
  savedAt,
  onRestore,
  onDiscard,
  onContinueEditing,
}: {
  open: boolean;
  savedAt: Date | null;
  onRestore: () => void;
  onDiscard: () => void;
  onContinueEditing: () => void;
}) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onContinueEditing()}>
      <DialogContent title="Restore your last draft?">
        <p className="text-sm text-text-secondary">
          {savedAt
            ? `We found unsaved changes from ${savedAt.toLocaleString()} that weren't saved to the server.`
            : "We found unsaved changes from your last visit to this page."}
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <Button variant="ghost" onClick={onDiscard}>
            Discard
          </Button>
          <Button variant="secondary" onClick={onContinueEditing}>
            Continue Editing
          </Button>
          <Button onClick={onRestore}>Restore</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
