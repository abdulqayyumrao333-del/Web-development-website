import { cn } from "@/lib/utils";

export type PerformanceTier = "High Traffic" | "Growing" | "Low Traffic" | "Insufficient Data";

/** Simple, transparent thresholds — shown alongside the label in the UI so
 * the classification is never a black box. */
export function classifyPerformance(totalViews: number, viewsThisWeek: number): PerformanceTier {
  if (totalViews < 5) return "Insufficient Data";
  if (totalViews >= 100) return "High Traffic";
  if (viewsThisWeek > 0) return "Growing";
  return "Low Traffic";
}

const STYLES: Record<PerformanceTier, string> = {
  "High Traffic": "border-success/30 bg-success/5 text-success",
  Growing: "border-accent-blue/30 bg-accent-blue/5 text-accent-blue",
  "Low Traffic": "border-warning/30 bg-warning/5 text-warning",
  "Insufficient Data": "border-text-muted/30 bg-bg-surface-2 text-text-muted",
};

export function PerformanceBadge({ totalViews, viewsThisWeek }: { totalViews: number; viewsThisWeek: number }) {
  const tier = classifyPerformance(totalViews, viewsThisWeek);
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs", STYLES[tier])}>
      {tier}
    </span>
  );
}
