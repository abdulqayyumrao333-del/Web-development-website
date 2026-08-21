"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Copy, Trash2, Loader2, AlertTriangle, Link2 } from "lucide-react";
import type { Media } from "@prisma/client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatBytes, formatDate } from "@/lib/utils";
import { updateMediaMetadata, getMediaUsage, deleteMedia, type MediaUsage } from "@/app/(admin)/admin/media/actions";

export function MediaDetailsDialog({
  media,
  onOpenChange,
  onUpdated,
  onDeleted,
}: {
  media: Media | null;
  onOpenChange: (open: boolean) => void;
  onUpdated: (media: Media) => void;
  onDeleted: (id: string) => void;
}) {
  const [filename, setFilename] = useState(media?.filename ?? "");
  const [altText, setAltText] = useState(media?.altText ?? "");
  const [caption, setCaption] = useState(media?.caption ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [usage, setUsage] = useState<MediaUsage[] | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!media) return;
    setFilename(media.filename);
    setAltText(media.altText ?? "");
    setCaption(media.caption ?? "");
    setConfirmingDelete(false);
    setUsage(null);
    getMediaUsage(media.id).then((result) => {
      if (result.success) setUsage(result.data);
    });
  }, [media]);

  if (!media) return null;
  const isDirty = filename !== media.filename || altText !== (media.altText ?? "") || caption !== (media.caption ?? "");

  async function handleSave() {
    if (!media) return;
    setIsSaving(true);
    const result = await updateMediaMetadata(media.id, { filename, altText, caption });
    setIsSaving(false);
    if (result.success) {
      toast.success("Saved.");
      onUpdated(result.data);
    } else {
      toast.error(result.error);
    }
  }

  async function handleCopyUrl() {
    if (!media) return;
    try {
      await navigator.clipboard.writeText(media.url);
      toast.success("URL copied to clipboard.");
    } catch {
      toast.error("Couldn't copy — your browser blocked clipboard access.");
    }
  }

  async function handleDelete(force: boolean) {
    if (!media) return;
    setIsDeleting(true);
    const result = await deleteMedia(media.id, force);
    setIsDeleting(false);
    if (result.success) {
      toast.success("Image deleted.");
      onDeleted(media.id);
      onOpenChange(false);
    } else if (usage && usage.length > 0) {
      toast.error(result.error);
    } else {
      setConfirmingDelete(true);
      toast.error(result.error);
    }
  }

  return (
    <Dialog open={Boolean(media)} onOpenChange={onOpenChange}>
      <DialogContent title="Image Details" className="max-w-2xl">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <div className="aspect-square w-full overflow-hidden rounded-md border border-border bg-bg-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of a Cloudinary-hosted image, already optimized by the storage provider */}
              <img src={media.url} alt="" className="h-full w-full object-contain" />
            </div>
            <dl className="mt-3 space-y-1 text-xs text-text-muted">
              <div className="flex justify-between">
                <dt>Dimensions</dt>
                <dd>{media.width && media.height ? `${media.width} × ${media.height}px` : "Unknown"}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Size</dt>
                <dd>{formatBytes(media.size)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Format</dt>
                <dd>{media.mimeType}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Uploaded</dt>
                <dd>{formatDate(media.createdAt)}</dd>
              </div>
            </dl>

            <div className="mt-3">
              <p className="text-xs font-medium text-text-secondary">Usage</p>
              {usage === null ? (
                <p className="mt-1 text-xs text-text-muted">Checking...</p>
              ) : usage.length === 0 ? (
                <p className="mt-1 text-xs text-text-muted">Not currently used by any post.</p>
              ) : (
                <ul className="mt-1 space-y-1">
                  {usage.map((u) => (
                    <li key={u.id} className="flex items-center gap-1.5 text-xs text-text-secondary">
                      <Link2 className="h-3 w-3 text-text-muted" /> {u.title} ({u.via})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label htmlFor="media-filename" className="text-xs font-medium text-text-secondary">
                Filename
              </label>
              <Input id="media-filename" value={filename} onChange={(e) => setFilename(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <label htmlFor="media-alt" className="text-xs font-medium text-text-secondary">
                Alt Text
              </label>
              <Textarea
                id="media-alt"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                rows={2}
                placeholder="Describe the image for accessibility and SEO"
                className="mt-1.5"
              />
              {!altText.trim() && (
                <p className="mt-1 flex items-center gap-1 text-xs text-warning">
                  <AlertTriangle className="h-3 w-3" /> Missing alt text
                </p>
              )}
            </div>
            <div>
              <label htmlFor="media-caption" className="text-xs font-medium text-text-secondary">
                Caption
              </label>
              <Textarea
                id="media-caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={2}
                placeholder="Optional caption shown under the image"
                className="mt-1.5"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Button size="sm" onClick={handleSave} disabled={!isDirty || isSaving}>
                {isSaving ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : null}
                Save Changes
              </Button>
              <Button size="sm" variant="secondary" onClick={handleCopyUrl}>
                <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy URL
              </Button>
            </div>

            <div className="border-t border-border pt-3">
              {!confirmingDelete ? (
                <Button size="sm" variant="ghost" className="text-danger hover:bg-danger/10" onClick={() => handleDelete(false)} disabled={isDeleting}>
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete Image
                </Button>
              ) : (
                <div className="rounded-sm border border-danger/30 bg-danger/5 p-3">
                  <p className="flex items-center gap-1.5 text-xs text-danger">
                    <AlertTriangle className="h-3.5 w-3.5" /> This image is currently being used.
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Deleting it will leave a broken image in {usage?.length ?? 0} post{usage?.length === 1 ? "" : "s"}.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setConfirmingDelete(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" className="bg-danger hover:shadow-none" onClick={() => handleDelete(true)} disabled={isDeleting}>
                      {isDeleting ? "Deleting..." : "Delete Anyway"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
