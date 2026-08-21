import type { BreakdownEntry, ReferrerCategory } from "@/app/(admin)/admin/blogs/analytics-actions";
import { AnalyticsEmptyState } from "@/components/admin/blog/analytics/analytics-empty-state";

const LABELS: Record<ReferrerCategory, string> = {
  direct: "Direct",
  search: "Search",
  social: "Social",
  referral: "Referral",
  other: "Other",
};

export function TrafficSources({ data }: { data: BreakdownEntry<ReferrerCategory>[] }) {
  if (data.length === 0) {
    return <AnalyticsEmptyState message="Traffic source data will appear once visitors arrive." />;
  }

  const total = data.reduce((sum, d) => sum + d.count, 0);
  const sorted = [...data].sort((a, b) => b.count - a.count);

  return (
    <ul className="space-y-2">
      {sorted.map((entry) => {
        const pct = total > 0 ? Math.round((entry.count / total) * 100) : 0;
        return (
          <li key={entry.category}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">{LABELS[entry.category]}</span>
              <span className="text-text-muted">
                {entry.count.toLocaleString()} ({pct}%)
              </span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-bg-surface-2">
              <div className="h-full rounded-full bg-accent-indigo" style={{ width: `${pct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
