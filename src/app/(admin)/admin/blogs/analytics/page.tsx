import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getAnalyticsOverview,
  getViewsTimeSeries,
  getTopArticles,
  getArticlesPublishedInRange,
  type AnalyticsRangeKey,
} from "@/app/(admin)/admin/blogs/analytics-actions";
import { Card } from "@/components/ui/card";
import { TimeRangeFilter } from "@/components/admin/blog/analytics/time-range-filter";
import { AnalyticsOverview } from "@/components/admin/blog/analytics/analytics-overview";
import { ViewsChart } from "@/components/admin/blog/analytics/views-chart";
import { TopArticles } from "@/components/admin/blog/analytics/top-articles";
import { ContentInsights } from "@/components/admin/blog/analytics/content-insights";
import { BlogErrorState } from "@/components/admin/blog/blog-error-state";

export const metadata = { title: "Blog Analytics" };

const VALID_RANGES: AnalyticsRangeKey[] = ["today", "7d", "30d", "90d", "all"];

type SearchParams = Promise<{ range?: string }>;

export default async function BlogAnalyticsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const rangeKey: AnalyticsRangeKey = VALID_RANGES.includes(params.range as AnalyticsRangeKey)
    ? (params.range as AnalyticsRangeKey)
    : "30d";
  const range = { key: rangeKey };

  const [overviewResult, timeSeriesResult, topArticlesResult, publishedResult] = await Promise.all([
    getAnalyticsOverview(),
    getViewsTimeSeries(range),
    getTopArticles(range, 10),
    getArticlesPublishedInRange(range),
  ]);

  if (!overviewResult.success) {
    return (
      <div>
        <PageHeader />
        <BlogErrorState message={overviewResult.error} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader />

      <div className="mt-8">
        <AnalyticsOverview data={overviewResult.data} />
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">Views Over Time</h2>
        <TimeRangeFilter />
      </div>

      <Card className="mt-3 p-5">
        {timeSeriesResult.success ? (
          <ViewsChart data={timeSeriesResult.data} />
        ) : (
          <BlogErrorState message={timeSeriesResult.error} />
        )}
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold text-text-primary">Top Performing Articles</h2>
          <div className="mt-3">
            {topArticlesResult.success ? (
              <TopArticles articles={topArticlesResult.data} />
            ) : (
              <BlogErrorState message={topArticlesResult.error} />
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-sm font-semibold text-text-primary">Insights</h2>
          <div className="mt-3">
            <ContentInsights
              topArticles={topArticlesResult.success ? topArticlesResult.data : []}
              timeSeries={timeSeriesResult.success ? timeSeriesResult.data : []}
              articlesPublished={publishedResult.success ? publishedResult.data : 0}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <div>
      <Link
        href="/admin/blogs"
        className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to all posts
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Blog Analytics</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Real, first-party page-view data — no fabricated numbers, ever.
      </p>
    </div>
  );
}
