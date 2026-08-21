"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import type { Media } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { getMediaLibrary, type MediaFilter } from "@/app/(admin)/admin/media/actions";
import { MediaCard } from "@/components/admin/media/media-card";
import { MediaUploadButton } from "@/components/admin/media/media-upload-button";
import { MediaEmptyState } from "@/components/admin/media/media-empty-state";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 24;

const FILTER_OPTIONS: { value: MediaFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "has-alt", label: "Has alt text" },
  { value: "missing-alt", label: "Missing alt text" },
  { value: "unused", label: "Unused" },
];

export function MediaGrid({
  onSelect,
  selectedId,
  onOpenDetails,
  refreshToken,
}: {
  /** Picker mode: provide this to make cards selectable instead of opening details. */
  onSelect?: (media: Media) => void;
  selectedId?: string;
  /** Library mode: opens the details dialog for a clicked item. */
  onOpenDetails?: (media: Media) => void;
  /** Bump this number from a parent to force a refetch (e.g. after delete/edit elsewhere). */
  refreshToken?: number;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<MediaFilter>("all");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Media[] | null>(null);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function load() {
    setIsLoading(true);
    const result = await getMediaLibrary({ query, filter, page, pageSize: PAGE_SIZE });
    setIsLoading(false);
    if (result.success) {
      setItems(result.data.items);
      setTotal(result.data.total);
      setError(null);
    } else {
      setError(result.error);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filter, page, refreshToken]);

  useEffect(() => {
    setPage(1);
  }, [query, filter]);

  function handleUploaded(media: Media) {
    setItems((prev) => (prev ? [media, ...prev] : [media]));
    setTotal((t) => t + 1);
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search filename, alt text, caption..."
            aria-label="Search media"
            className="w-64"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as MediaFilter)}
            aria-label="Filter media"
            className="h-10 rounded-sm border border-border bg-bg-surface px-3 text-sm outline-none focus:border-accent-indigo"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <MediaUploadButton onUploaded={handleUploaded} />
      </div>

      <div className="mt-4">
        {error && <MediaEmptyState message={error} />}

        {!error && isLoading && (
          <div className="flex items-center justify-center py-12 text-text-muted">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        )}

        {!error && !isLoading && items && items.length === 0 && query.trim() && (
          <MediaEmptyState message="No images match your search." />
        )}

        {!error && !isLoading && items && items.length === 0 && !query.trim() && filter === "unused" && (
          <MediaEmptyState message="No unused media found." />
        )}

        {!error && !isLoading && items && items.length === 0 && !query.trim() && filter !== "unused" && (
          <MediaEmptyState
            message="Your media library is empty."
            action={<MediaUploadButton onUploaded={handleUploaded} />}
          />
        )}

        {!error && !isLoading && items && items.length > 0 && (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {items.map((media) => (
                <MediaCard
                  key={media.id}
                  media={media}
                  selected={media.id === selectedId}
                  onClick={() => (onSelect ? onSelect(media) : onOpenDetails?.(media))}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
                <span>
                  Page {page} of {totalPages} ({total} images)
                </span>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
