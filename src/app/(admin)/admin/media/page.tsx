"use client";

import { useState } from "react";
import type { Media } from "@prisma/client";
import { MediaGrid } from "@/components/admin/media/media-grid";
import { MediaDetailsDialog } from "@/components/admin/media/media-details-dialog";

export default function MediaLibraryPage() {
  const [selected, setSelected] = useState<Media | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Media Library</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Upload, organize, and manage images used across your blog.
        </p>
      </div>

      <div className="mt-8">
        <MediaGrid onOpenDetails={setSelected} refreshToken={refreshToken} />
      </div>

      <MediaDetailsDialog
        media={selected}
        onOpenChange={(open) => !open && setSelected(null)}
        onUpdated={(media) => {
          setSelected(media);
          setRefreshToken((t) => t + 1);
        }}
        onDeleted={() => {
          setSelected(null);
          setRefreshToken((t) => t + 1);
        }}
      />
    </div>
  );
}
