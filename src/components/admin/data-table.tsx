"use client";

import { useMemo, useState } from "react";
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export type Column<T> = {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
};

const PAGE_SIZE = 10;

export function DataTable<T extends { id: string }>({
  rows,
  columns,
  searchFields,
  emptyMessage,
  selectedIds,
  onSelectionChange,
  rowActions,
}: {
  rows: T[];
  columns: Column<T>[];
  searchFields: (row: T) => string[];
  emptyMessage: string;
  selectedIds?: Set<string>;
  onSelectionChange?: (ids: Set<string>) => void;
  rowActions?: (row: T) => React.ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  // ── Safe data check ──
  const safeRows = Array.isArray(rows) ? rows : [];

  // ── Filter ──
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return safeRows;
    return safeRows.filter((row) => searchFields(row).some((f) => f.toLowerCase().includes(q)));
  }, [safeRows, query, searchFields]);

  // ── Sort ──
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortValue) return filtered;
    return [...filtered].sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir, columns]);

  // ── Pagination ──
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pageRows = sorted.slice(start, end);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function toggleRow(id: string) {
    if (!onSelectionChange || !selectedIds) return;
    const next = new Set(selectedIds);
    next.has(id) ? next.delete(id) : next.add(id);
    onSelectionChange(next);
  }

  function toggleAllOnPage() {
    if (!onSelectionChange || !selectedIds) return;
    const pageIds = pageRows.map((r) => r.id);
    const allSelected = pageIds.every((id) => selectedIds.has(id));
    const next = new Set(selectedIds);
    pageIds.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
    onSelectionChange(next);
  }

  // ── Empty State ──
  if (safeRows.length === 0) {
    return (
      <div className="mt-6 rounded-md border border-dashed border-border p-8 text-center text-sm text-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div>
      {/* ── Search ── */}
      <div className="relative w-full max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Search..."
          className="pl-9"
        />
      </div>

      {/* ── No Results ── */}
      {sorted.length === 0 ? (
        <div className="mt-6 rounded-md border border-dashed border-border p-8 text-center text-sm text-text-muted">
          No results match your search.
        </div>
      ) : (
        <>
          {/* ── Table ── */}
          <div className="mt-4 overflow-x-auto rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-bg-surface-2 text-left text-xs uppercase text-text-muted">
                <tr>
                  {onSelectionChange && (
                    <th className="w-10 px-4 py-3">
                      <input
                        type="checkbox"
                        aria-label="Select all on page"
                        checked={pageRows.length > 0 && pageRows.every((r) => selectedIds?.has(r.id))}
                        onChange={toggleAllOnPage}
                      />
                    </th>
                  )}
                  {columns.map((col) => (
                    <th key={col.key} className="px-4 py-3">
                      {col.sortValue ? (
                        <button
                          onClick={() => toggleSort(col.key)}
                          className="flex items-center gap-1 hover:text-text-primary"
                        >
                          {col.label}
                          {sortKey === col.key &&
                            (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
                        </button>
                      ) : (
                        col.label
                      )}
                    </th>
                  ))}
                  {rowActions && <th className="px-4 py-3 text-right">Actions</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {pageRows.map((row) => (
                  <tr key={row.id}>
                    {onSelectionChange && (
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          aria-label="Select row"
                          checked={selectedIds?.has(row.id) ?? false}
                          onChange={() => toggleRow(row.id)}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3">
                        {col.render(row)}
                      </td>
                    ))}
                    {rowActions && <td className="px-4 py-3 text-right">{rowActions(row)}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
              <span>
                Page {page} of {totalPages} ({sorted.length} total)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="rounded-sm border border-border p-1.5 disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                  className="rounded-sm border border-border p-1.5 disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}