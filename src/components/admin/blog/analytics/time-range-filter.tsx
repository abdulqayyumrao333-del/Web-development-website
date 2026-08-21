"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const RANGE_OPTIONS: { value: string; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "all", label: "All Time" },
];

export function TimeRangeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("range") ?? "30d";

  function setRange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", value);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div role="group" aria-label="Time range" className="flex flex-wrap gap-1 rounded-md border border-border p-1">
      {RANGE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setRange(opt.value)}
          aria-pressed={current === opt.value}
          className={cn(
            "rounded-sm px-3 py-1.5 text-sm transition-colors",
            current === opt.value
              ? "bg-accent-indigo/10 text-accent-indigo"
              : "text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
