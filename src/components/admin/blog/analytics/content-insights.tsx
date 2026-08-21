import { Lightbulb } from "lucide-react";
import type { TopArticle, ViewsTimeSeriesPoint } from "@/app/(admin)/admin/blogs/analytics-actions";
import { AnalyticsEmptyState } from "@/components/admin/blog/analytics/analytics-empty-state";

export function ContentInsights({
  topArticles,
  timeSeries,
  articlesPublished,
}: {
  topArticles: TopArticle[];
  timeSeries: ViewsTimeSeriesPoint[];
  articlesPublished: number;
}) {
  const totalViews = timeSeries.reduce((sum, d) => sum + d.views, 0);
  const insights: string[] = [];

  if (topArticles.length > 0) {
    insights.push(`Your most viewed article is "${topArticles[0].title}" with ${topArticles[0].views.toLocaleString()} views.`);
  }
  if (totalViews > 0) {
    insights.push(`Your blog received ${totalViews.toLocaleString()} views in the selected period.`);
  }
  if (articlesPublished > 0) {
    insights.push(`${articlesPublished} article${articlesPublished === 1 ? " was" : "s were"} published during this period.`);
  }
  if (timeSeries.length > 0) {
    const peak = timeSeries.reduce((max, d) => (d.views > max.views ? d : max), timeSeries[0]);
    if (peak.views > 0) {
      insights.push(
        `Your highest traffic day was ${new Date(peak.date).toLocaleDateString(undefined, { month: "long", day: "numeric" })} with ${peak.views.toLocaleString()} views.`,
      );
    }
  }

  if (insights.length === 0) {
    return <AnalyticsEmptyState message="Insights will appear here once your blog has some traffic." />;
  }

  return (
    <ul className="space-y-2.5">
      {insights.map((insight, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-indigo" aria-hidden="true" />
          {insight}
        </li>
      ))}
    </ul>
  );
}
