"use client";

import { cn } from "@/lib/utils";

type Status = "DRAFT" | "PUBLISHED" | "ARCHIVED";

const OPTIONS: { value: Status; label: string; className: string }[] = [
  { value: "DRAFT", label: "Draft", className: "border-warning/30 text-warning data-[active=true]:bg-warning/10" },
  {
    value: "PUBLISHED",
    label: "Published",
    className: "border-success/30 text-success data-[active=true]:bg-success/10",
  },
  {
    value: "ARCHIVED",
    label: "Archived",
    className: "border-danger/30 text-danger data-[active=true]:bg-danger/10",
  },
];

export function StatusSelector({ value, onChange }: { value: Status; onChange: (status: Status) => void }) {
  return (
    <div role="radiogroup" aria-label="Post status" className="flex flex-wrap gap-2">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          data-active={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm transition-colors",
            opt.className,
            value !== opt.value && "opacity-60 hover:opacity-100",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
