"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { checkSlugAvailability } from "@/app/(admin)/admin/blogs/actions";
import type { SeoPanelContext } from "@/components/admin/blog/seo/seo-panel";

const DEBOUNCE_MS = 500;

export function AdvancedSeoTab({ context }: { context: SeoPanelContext }) {
  const [status, setStatus] = useState<"checking" | "available" | "taken" | "idle">("idle");

  useEffect(() => {
    if (!context.slug.trim()) {
      setStatus("idle");
      return;
    }
    setStatus("checking");
    const handle = setTimeout(async () => {
      const result = await checkSlugAvailability(context.slug, context.postId ?? undefined);
      if (result.success) {
        setStatus(result.data.available ? "available" : "taken");
      } else {
        setStatus("idle");
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [context.slug, context.postId]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-medium text-text-secondary">Slug Validation</p>
        <div className="mt-1.5 flex items-center gap-2 rounded-sm border border-border bg-bg-surface-2 px-3 py-2 text-xs">
          {status === "checking" && (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-text-muted" />
              <span className="text-text-muted">Checking availability...</span>
            </>
          )}
          {status === "available" && (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              <span className="text-success">This slug is available.</span>
            </>
          )}
          {status === "taken" && (
            <>
              <AlertTriangle className="h-3.5 w-3.5 text-warning" />
              <span className="text-warning">
                Already in use — a unique suffix (-1, -2...) will be added automatically when you save.
              </span>
            </>
          )}
          {status === "idle" && <span className="text-text-muted">Enter a slug in Basic Information to check.</span>}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-text-secondary">Canonical URL</p>
        <p className="mt-1.5 text-xs text-text-muted">
          Set in the General tab. Leave it blank to automatically use this post&apos;s own URL — override it only if
          this content is republished from, or duplicated across, another location.
        </p>
      </div>
    </div>
  );
}
