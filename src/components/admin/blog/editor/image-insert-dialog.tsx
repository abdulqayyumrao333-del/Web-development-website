"use client";

import { useEffect, useState } from "react";
import { ImageOff, LibraryBig } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MediaPicker } from "@/components/admin/media/media-picker";

export function ImageInsertDialog({
  open,
  onOpenChange,
  initialUrl = "",
  initialAlt = "",
  isReplacing,
  onInsert,
  onRemove,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialUrl?: string;
  initialAlt?: string;
  isReplacing: boolean;
  onInsert: (url: string, alt: string, caption?: string) => void;
  onRemove: () => void;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [alt, setAlt] = useState(initialAlt);
  const [caption, setCaption] = useState("");
  const [broken, setBroken] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setUrl(initialUrl);
      setAlt(initialAlt);
      setCaption("");
      setBroken(false);
    }
  }, [open, initialUrl, initialAlt]);

  function handleInsert() {
    if (!url.trim()) return;
    onInsert(url.trim(), alt.trim(), caption.trim() || undefined);
    onOpenChange(false);
  }

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={isReplacing ? "Replace Image" : "Insert Image"}>
        <div className="space-y-3">
          <div>
            <label htmlFor="image-url" className="text-xs font-medium text-text-secondary">
              Image URL
            </label>
            <div className="mt-1.5 flex gap-2">
              <Input
                id="image-url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setBroken(false);
                }}
                placeholder="https://..."
                autoFocus
              />
              <Button type="button" variant="secondary" onClick={() => setPickerOpen(true)}>
                <LibraryBig className="mr-2 h-4 w-4" /> Library
              </Button>
            </div>
          </div>
          <div>
            <label htmlFor="image-alt" className="text-xs font-medium text-text-secondary">
              Alt text
            </label>
            <Input
              id="image-alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Describes the image for screen readers and SEO"
              className="mt-1.5"
            />
          </div>
          <div>
            <label htmlFor="image-caption" className="text-xs font-medium text-text-secondary">
              Caption (optional)
            </label>
            <Input
              id="image-caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Shown italicized below the image"
              className="mt-1.5"
            />
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-md border border-border bg-bg-surface-2">
            {url && !broken ? (
              // eslint-disable-next-line @next/next/no-img-element -- may be an arbitrary external URL, outside next/image's configured remotePatterns
              <img
                src={url}
                alt=""
                className="h-full w-full object-cover"
                onError={() => setBroken(true)}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-text-muted">
                <ImageOff className="h-6 w-6" aria-hidden="true" />
                <span className="text-xs">{url ? "Couldn't load this image" : "No image yet"}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          {isReplacing && (
            <Button
              variant="ghost"
              className="mr-auto text-danger hover:underline"
              onClick={() => {
                onRemove();
                onOpenChange(false);
              }}
            >
              Remove Image
            </Button>
          )}
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleInsert} disabled={!url.trim()}>
            {isReplacing ? "Replace" : "Insert"}
          </Button>
        </div>

        <MediaPicker
          open={pickerOpen}
          onOpenChange={setPickerOpen}
          onSelect={(media) => {
            setUrl(media.url);
            setBroken(false);
            if (!alt && media.altText) setAlt(media.altText);
            if (!caption && media.caption) setCaption(media.caption);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
