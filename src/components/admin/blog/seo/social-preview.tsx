"use client";

import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { siteConfig } from "@/config/site";

function PreviewImage({ src }: { src: string }) {
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [src]);

  if (!src || broken) {
    return (
      <div className="flex aspect-[1.91/1] w-full items-center justify-center bg-bg-surface-2 text-text-muted">
        <ImageOff className="h-5 w-5" aria-hidden="true" />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL
    <img src={src} alt="" className="aspect-[1.91/1] w-full object-cover" onError={() => setBroken(true)} />
  );
}

export function SocialPreview({
  platform,
  title,
  description,
  image,
}: {
  platform: "facebook" | "linkedin" | "x";
  title: string;
  description: string;
  image: string;
}) {
  const hostname = new URL(siteConfig.url).hostname;

  if (platform === "x") {
    return (
      <div className="max-w-sm overflow-hidden rounded-2xl border border-border">
        <PreviewImage src={image} />
        <div className="space-y-0.5 bg-bg-surface p-3">
          <p className="text-xs text-text-muted">{hostname}</p>
          <p className="truncate text-sm font-medium text-text-primary">{title || "Untitled post"}</p>
        </div>
      </div>
    );
  }

  // Facebook and LinkedIn share a very similar link-card layout in practice.
  return (
    <div className="max-w-sm overflow-hidden rounded-sm border border-border">
      <PreviewImage src={image} />
      <div className="space-y-1 bg-bg-surface-2 p-3">
        <p className="text-xs uppercase text-text-muted">{hostname}</p>
        <p className="line-clamp-2 text-sm font-semibold text-text-primary">{title || "Untitled post"}</p>
        {platform === "facebook" && (
          <p className="line-clamp-1 text-xs text-text-muted">{description || "No description set yet."}</p>
        )}
      </div>
    </div>
  );
}
