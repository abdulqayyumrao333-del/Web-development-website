"use client";

import { useState, useEffect } from "react";
import { ImageOff, LibraryBig } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MediaPicker } from "@/components/admin/media/media-picker";

export function CoverImageSection({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (url: string) => void;
  error?: string;
}) {
  const [broken, setBroken] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => setBroken(false), [value]);

  return (
    <Card className="p-5">
      <h2 className="text-sm font-semibold text-text-primary">Cover Image</h2>
      <p className="mt-1 text-xs text-text-muted">
        Choose from your Media Library or paste an image URL directly.
      </p>

      <div className="mt-3 flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          aria-label="Cover image URL"
          aria-invalid={Boolean(error)}
        />
        <Button type="button" variant="secondary" onClick={() => setPickerOpen(true)}>
          <LibraryBig className="mr-2 h-4 w-4" /> Library
        </Button>
      </div>
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}

      <div className="mt-3 aspect-video w-full overflow-hidden rounded-md border border-border bg-bg-surface-2">
        {value && !broken ? (
          // eslint-disable-next-line @next/next/no-img-element -- may be an arbitrary external URL, outside next/image's configured remotePatterns
          <img
            src={value}
            alt="Cover preview"
            className="h-full w-full object-cover"
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-text-muted">
            <ImageOff className="h-6 w-6" aria-hidden="true" />
            <span className="text-xs">{value ? "Couldn't load this image" : "No cover image yet"}</span>
          </div>
        )}
      </div>

      <MediaPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onSelect={(media) => onChange(media.url)}
      />
    </Card>
  );
}
