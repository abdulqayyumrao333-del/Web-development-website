"use client";

import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import type { SeoPanelFields } from "@/components/admin/blog/seo/seo-panel";

const OG_TYPES = ["article", "website", "profile"];

export function OpenGraphTab({
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
  const effectiveImage = value.ogImage || fallbackImage;
  const [broken, setBroken] = useState(false);
  useEffect(() => setBroken(false), [effectiveImage]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="og-title" className="text-xs font-medium text-text-secondary">
          OG Title
        </label>
        <Input
          id="og-title"
          value={value.ogTitle}
          onChange={(e) => onChange({ ogTitle: e.target.value })}
          placeholder="Falls back to SEO Title, then the post title"
          className="mt-1.5"
        />
      </div>

      <div>
        <label htmlFor="og-description" className="text-xs font-medium text-text-secondary">
          OG Description
        </label>
        <Textarea
          id="og-description"
          value={value.ogDescription}
          onChange={(e) => onChange({ ogDescription: e.target.value })}
          rows={3}
          placeholder="Falls back to Meta Description, then the excerpt"
          className="mt-1.5"
        />
      </div>

      <div>
        <label htmlFor="og-image" className="text-xs font-medium text-text-secondary">
          OG Image URL
        </label>
        <Input
          id="og-image"
          value={value.ogImage}
          onChange={(e) => onChange({ ogImage: e.target.value })}
          placeholder="Falls back to the cover image if left blank"
          aria-invalid={Boolean(errors.ogImage)}
          className="mt-1.5"
        />
        {errors.ogImage && <p className="mt-1 text-xs text-danger">{errors.ogImage}</p>}

        <div className="mt-2 aspect-[1.91/1] w-full max-w-sm overflow-hidden rounded-md border border-border bg-bg-surface-2">
          {effectiveImage && !broken ? (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary external URL
            <img
              src={effectiveImage}
              alt="Open Graph preview"
              className="h-full w-full object-cover"
              onError={() => setBroken(true)}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-text-muted">
              <ImageOff className="h-6 w-6" aria-hidden="true" />
              <span className="text-xs">{effectiveImage ? "Couldn't load this image" : "No image set"}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="og-type" className="text-xs font-medium text-text-secondary">
            OG Type
          </label>
          <select
            id="og-type"
            value={value.ogType || "article"}
            onChange={(e) => onChange({ ogType: e.target.value as SeoPanelFields["ogType"] })}
            className="mt-1.5 h-10 w-full rounded-sm border border-border bg-bg-surface px-3 text-sm outline-none focus:border-accent-indigo"
          >
            {OG_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-xs font-medium text-text-secondary">OG Locale / Site Name</p>
          <p className="mt-1.5 rounded-sm border border-border bg-bg-surface-2 px-3 py-2 text-sm text-text-secondary">
            en_US · {siteConfig.name}
          </p>
          <p className="mt-1 text-xs text-text-muted">Site-wide values, not set per post.</p>
        </div>
      </div>
    </div>
  );
}
