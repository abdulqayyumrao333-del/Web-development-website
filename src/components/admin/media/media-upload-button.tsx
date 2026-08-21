"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadMedia } from "@/app/(admin)/admin/media/actions";
import { ALLOWED_MIME_TYPES, MAX_UPLOAD_BYTES } from "@/lib/media-validation";
import type { Media } from "@prisma/client";

export function MediaUploadButton({ onUploaded }: { onUploaded: (media: Media) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    // Fast client-side feedback only — the real, trustworthy validation
    // (actual file signature, not just this reported type) happens
    // server-side in uploadMedia/validateUploadedImage.
    if (!ALLOWED_MIME_TYPES.includes(file.type as (typeof ALLOWED_MIME_TYPES)[number])) {
      toast.error("Only JPEG, PNG, WebP, and AVIF images are allowed.");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error(`File is too large — maximum size is ${MAX_UPLOAD_BYTES / (1024 * 1024)}MB.`);
      return;
    }

    setIsUploading(true);
    const fd = new FormData();
    fd.set("file", file);
    const result = await uploadMedia(fd);
    setIsUploading(false);

    if (result.success) {
      toast.success("Image uploaded.");
      onUploaded(result.data);
    } else {
      toast.error(result.error);
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_MIME_TYPES.join(",")}
        onChange={handleFileChange}
        className="sr-only"
        aria-label="Upload image"
      />
      <Button onClick={() => inputRef.current?.click()} disabled={isUploading}>
        {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
        {isUploading ? "Uploading..." : "Upload Image"}
      </Button>
    </>
  );
}
