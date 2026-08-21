"use client";

import type { Media } from "@prisma/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MediaGrid } from "@/components/admin/media/media-grid";

export function MediaPicker({
  open,
  onOpenChange,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (media: Media) => void;
}) {
  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title="Choose from Media Library" className="max-w-3xl">
        <MediaGrid
          onSelect={(media) => {
            onSelect(media);
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
