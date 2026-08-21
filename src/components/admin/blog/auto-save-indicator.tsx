"use client";

import { useEffect, useState } from "react";
import { Loader2, Circle, CheckCircle2 } from "lucide-react";

export type AutoSaveStatus = "idle" | "saving" | "saved";

/** Reflects genuine autosave state — "saving" while a background save is in
 * flight, then a relative "Saved just now" / "Last saved N min ago" label
 * that ticks forward on its own. "idle" with no lastSavedAt means there are
 * local edits that haven't been autosaved (or manually saved) yet. */
export function AutoSaveIndicator({
  status,
  lastSavedAt,
}: {
  status: AutoSaveStatus;
  lastSavedAt: Date | null;
}) {
  const [, tick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => tick((n) => n + 1), 15_000);
    return () => clearInterval(interval);
  }, []);

  if (status === "saving") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-text-muted" aria-live="polite">
        <Loader2 className="h-3 w-3 animate-spin" />
        Saving...
      </span>
    );
  }

  if (!lastSavedAt) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-warning" aria-live="polite">
        <Circle className="h-2.5 w-2.5 fill-current" />
        Unsaved changes
      </span>
    );
  }

  const seconds = Math.max(0, Math.floor((Date.now() - lastSavedAt.getTime()) / 1000));
  const label =
    seconds < 10
      ? "Saved just now"
      : seconds < 60
        ? `Saved ${seconds}s ago`
        : `Last saved ${Math.floor(seconds / 60)} min ago`;

  return (
    <span className="flex items-center gap-1.5 text-xs text-text-muted" aria-live="polite">
      <CheckCircle2 className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
