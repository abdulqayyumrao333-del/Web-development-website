import Link from "next/link";
import { ArrowRight, Eye, TrendingUp } from "lucide-react";
import { getAnalyticsOverview, getTopArticles } from "@/app/(admin)/admin/blogs/analytics-actions";

export async function AnalyticsSummaryWidget() {
  const [overviewResult, topResult] = await Promise.all([
    getAnalyticsOverview(),
    getTopArticles({ key: "30d" }, 5),
  ]);

  if (!overviewResult.success) return null; // non-critical widget — fail silently rather than breaking the dashboard

  const topArticle = topResult.success && topResult.data.length > 0 ? topResult.data[0] : null;

  return (
    <Link
      href="/admin/blogs/analytics"
      className="flex flex-wrap items-center justify-between gap-4 rounded-md border border-border bg-bg-base p-4 transition-colors hover:border-border-hover"
    >
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-accent-indigo" aria-hidden="true" />
          <span className="text-sm text-text-secondary">
            <span className="font-mono font-medium text-text-primary">
              {overviewResult.data.totalViews.toLocaleString()}
            </span>{" "}
            total views
          </span>
        </div>
        {topArticle && (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-accent-indigo" aria-hidden="true" />
            <span className="truncate text-sm text-text-secondary">
              Top article (30d): <span className="text-text-primary">{topArticle.title}</span>
            </span>
          </div>
        )}
      </div>
      <span className="flex items-center gap-1 text-sm text-accent-indigo">
        View full analytics <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
