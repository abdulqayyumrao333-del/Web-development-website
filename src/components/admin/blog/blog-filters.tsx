"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
  { value: "ALL", label: "All" },
  { value: "PUBLISHED", label: "Published" },
  { value: "DRAFT", label: "Draft" },
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "ARCHIVED", label: "Archived" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "updated", label: "Recently Updated" },
];

const selectClassName = cn(
  "h-10 rounded-sm border border-border bg-bg-surface px-3 text-sm outline-none focus:border-accent-indigo",
);

export function BlogFilters({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set("page", "1"); // any filter change resets pagination
    router.replace(`${pathname}?${params.toString()}`);
  }

  const status = searchParams.get("status") ?? "ALL";
  const category = searchParams.get("category") ?? "ALL";
  const sort = searchParams.get("sort") ?? "newest";
  const featuredOnly = searchParams.get("featured") === "true";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={status}
        onChange={(e) => setParam("status", e.target.value)}
        aria-label="Filter by status"
        className={selectClassName}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={category}
        onChange={(e) => setParam("category", e.target.value)}
        aria-label="Filter by category"
        className={selectClassName}
      >
        <option value="ALL">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setParam("sort", e.target.value)}
        aria-label="Sort posts"
        className={selectClassName}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <label className="flex h-10 items-center gap-2 rounded-sm border border-border bg-bg-surface px-3 text-sm">
        <input
          type="checkbox"
          checked={featuredOnly}
          onChange={(e) => setParam("featured", e.target.checked ? "true" : "")}
          aria-label="Show featured posts only"
        />
        Featured only
      </label>
    </div>
  );
}
