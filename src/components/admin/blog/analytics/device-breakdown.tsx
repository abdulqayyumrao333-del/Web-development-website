import type { BreakdownEntry, DeviceCategory } from "@/app/(admin)/admin/blogs/analytics-actions";
import { AnalyticsEmptyState } from "@/components/admin/blog/analytics/analytics-empty-state";

const LABELS: Record<DeviceCategory, string> = {
  desktop: "Desktop",
  mobile: "Mobile",
  tablet: "Tablet",
  unknown: "Unknown",
};

export function DeviceBreakdown({ data }: { data: BreakdownEntry<DeviceCategory>[] }) {
  if (data.length === 0) {
    return <AnalyticsEmptyState message="No device data available yet." />;
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
              <div className="h-full rounded-full bg-accent-violet" style={{ width: `${pct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
