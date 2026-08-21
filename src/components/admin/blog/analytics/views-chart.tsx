"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { ViewsTimeSeriesPoint } from "@/app/(admin)/admin/blogs/analytics-actions";
import { AnalyticsEmptyState } from "@/components/admin/blog/analytics/analytics-empty-state";

export function ViewsChart({ data }: { data: ViewsTimeSeriesPoint[] }) {
  if (data.length === 0) {
    return <AnalyticsEmptyState message="No analytics data yet." />;
  }

  const totalViews = data.reduce((sum, d) => sum + d.views, 0);
  const peak = data.reduce((max, d) => (d.views > max.views ? d : max), data[0]);

  return (
    <div>
      {/* Accessible text summary — the chart itself is decorative/supplementary for sighted users */}
      <p className="sr-only">
        {totalViews.toLocaleString()} total views across {data.length} day{data.length === 1 ? "" : "s"}. Highest day
        was {peak.date} with {peak.views.toLocaleString()} views.
      </p>

      <div className="h-64 w-full" aria-hidden="true">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              tickFormatter={(d: string) => new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              axisLine={{ stroke: "var(--border)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip
              contentStyle={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                fontSize: 12,
              }}
              labelFormatter={(d: string) => new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              formatter={(value: number) => [value, "Views"]}
            />
            <Line type="monotone" dataKey="views" stroke="var(--accent-indigo)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-2 text-xs text-text-muted">
        {totalViews.toLocaleString()} views · peak day {new Date(peak.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })} ({peak.views.toLocaleString()})
      </p>
    </div>
  );
}
