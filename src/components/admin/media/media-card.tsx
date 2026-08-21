"use client";

import { AlertTriangle } from "lucide-react";
import type { Media } from "@prisma/client";
import { formatBytes, cn } from "@/lib/utils";

export function MediaCard({ media, onClick, selected }: { media: Media; onClick: () => void; selected?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${media.filename}${media.altText ? "" : " — missing alt text"}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-md border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-indigo",
        selected ? "border-accent-indigo" : "border-border hover:border-border-hover",
      )}
    >
      <div className="aspect-square w-full bg-bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element -- thumbnail grid, next/image adds little here since Cloudinary already serves optimized images */}
        <img src={media.url} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="space-y-1 p-2">
        <p className="truncate text-xs font-medium text-text-primary" title={media.filename}>
          {media.filename}
        </p>
        <div className="flex items-center justify-between text-[11px] text-text-muted">
          <span>
            {media.width && media.height ? `${media.width}×${media.height}` : "—"} · {formatBytes(media.size)}
          </span>
          {!media.altText && (
            <span className="flex items-center gap-0.5 text-warning" title="Missing alt text">
              <AlertTriangle className="h-3 w-3" />
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
