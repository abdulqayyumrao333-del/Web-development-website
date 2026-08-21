"use client";

import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import type { SeoPanelFields } from "@/components/admin/blog/seo/seo-panel";

export function TwitterTab({
  value,
  onChange,
  errors,
  fallbackImage,
}: {
  value: SeoPanelFields;
  onChange: (fields: Partial<SeoPanelFields>) => void;
  errors: Record<string, string>;
  fallbackImage: string;
}) {
  const effectiveTitle = value.twitterTitle || value.ogTitle || value.seoTitle || "Untitled post";
  const effectiveDescription = value.twitterDescription || value.ogDescription || value.seoDescription || "";
  const effectiveImage = value.twitterImage || value.ogImage || fallbackImage;
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [effectiveImage]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="twitter-card" className="text-xs font-medium text-text-secondary">
          Twitter Card Type
        </label>
        <select
          id="twitter-card"
          value={value.twitterCard}
          onChange={(e) => onChange({ twitterCard: e.target.value as SeoPanelFields["twitterCard"] })}
          className="mt-1.5 h-10 w-full rounded-sm border border-border bg-bg-surface px-3 text-sm outline-none focus:border-accent-indigo"
        >
          <option value="summary_large_image">Summary with large image</option>
          <option value="summary">Summary</option>
        </select>
      </div>

      <div>
        <label htmlFor="twitter-title" className="text-xs font-medium text-text-secondary">
          Twitter Title
        </label>
        <Input
          id="twitter-title"
          value={value.twitterTitle}
          onChange={(e) => onChange({ twitterTitle: e.target.value })}
          placeholder="Falls back to OG Title, then SEO Title"
          className="mt-1.5"
        />
      </div>

      <div>
        <label htmlFor="twitter-description" className="text-xs font-medium text-text-secondary">
          Twitter Description
        </label>
        <Textarea
          id="twitter-description"
          value={value.twitterDescription}
          onChange={(e) => onChange({ twitterDescription: e.target.value })}
          rows={3}
          placeholder="Falls back to OG Description, then Meta Description"
          className="mt-1.5"
        />
      </div>

      <div>
        <label htmlFor="twitter-image" className="text-xs font-medium text-text-secondary">
          Twitter Image
        </label>
        <Input
          id="twitter-image"
          value={value.twitterImage}
          onChange={(e) => onChange({ twitterImage: e.target.value })}
          placeholder="Falls back to the OG image, then the cover image"
          aria-invalid={Boolean(errors.twitterImage)}
          className="mt-1.5"
        />
        {errors.twitterImage && <p className="mt-1 text-xs text-danger">{errors.twitterImage}</p>}
      </div>

      <div>
        <p className="text-xs font-medium text-text-secondary">Live Preview</p>
        <div className="mt-1.5 max-w-sm overflow-hidden rounded-xl border border-border">
          <div className="aspect-[1.91/1] w-full bg-bg-surface-2">
            {effectiveImage && !broken ? (
              // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL
              <img
                src={effectiveImage}
                alt=""
                className="h-full w-full object-cover"
                onError={() => setBroken(true)}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-text-muted">
                <ImageOff className="h-6 w-6" aria-hidden="true" />
                <span className="text-xs">No image set</span>
              </div>
            )}
          </div>
          <div className="space-y-1 bg-bg-surface p-3">
            <p className="truncate text-sm font-medium text-text-primary">{effectiveTitle}</p>
            <p className="line-clamp-2 text-xs text-text-secondary">{effectiveDescription}</p>
            <p className="text-xs text-text-muted">
              {new URL(siteConfig.url).hostname}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
