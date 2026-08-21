"use client";

import { Input } from "@/components/ui/input";

export function SlugInput({
  value,
  onChange,
  onManualEdit,
}: {
  value: string;
  onChange: (slug: string) => void;
  onManualEdit: () => void;
}) {
  return (
    <div>
      <div className="flex items-center gap-1 text-xs text-text-muted">
        <span>/blog/</span>
        <Input
          value={value}
          onChange={(e) => {
            onManualEdit();
            onChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"));
          }}
          aria-label="URL slug"
          placeholder="auto-generated-from-title"
          className="h-8 flex-1 font-mono text-xs"
        />
      </div>
      <p className="mt-1 text-xs text-text-muted">
        Auto-generated from the title. Edit it directly if you want a different URL — a matching
        suffix (-1, -2...) is added automatically if it's already taken.
      </p>
    </div>
  );
}
