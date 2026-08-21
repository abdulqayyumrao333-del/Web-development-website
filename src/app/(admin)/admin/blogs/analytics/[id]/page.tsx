import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getArticleAnalytics } from "@/app/(admin)/admin/blogs/analytics-actions";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ViewsChart } from "@/components/admin/blog/analytics/views-chart";
import { TrafficSources } from "@/components/admin/blog/analytics/traffic-sources";
import { DeviceBreakdown } from "@/components/admin/blog/analytics/device-breakdown";
import { PerformanceBadge } from "@/components/admin/blog/analytics/performance-badge";
import { BlogErrorState } from "@/components/admin/blog/blog-error-state";

export const metadata = { title: "Article Analytics" };

type Params = Promise<{ id: string }>;

export default async function ArticleAnalyticsPage({ params }: { params: Params }) {
  const { id } = await params;
  const result = await getArticleAnalytics(id);

  if (!result.success) {
    return (
      <div>
        <PageHeader />
        <BlogErrorState message={result.error} />
      </div>
    );
  }

  const { post, totalViews, viewsToday, viewsThisWeek, viewsThisMonth, timeSeries, referrers, devices } = result.data;

  const stats = [
    { label: "Total Views", value: totalViews },
    { label: "Views Today", value: viewsToday },
    { label: "Views This Week", value: viewsThisWeek },
    { label: "Views This Month", value: viewsThisMonth },
  ];

  return (
    <div>
      <PageHeader />

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">{post.title}</h2>
          <p className="mt-1 text-sm text-text-muted">
            Published {formatDate(post.publishedAt)} · Last updated {formatDate(post.updatedAt)} ·{" "}
            {post.readingTime ? `${post.readingTime} min read` : "reading time unavailable"} ·{" "}
            {post.wordCount.toLocaleString()} words
          </p>
        </div>
        <PerformanceBadge totalViews={totalViews} viewsThisWeek={viewsThisWeek} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-md border border-border bg-bg-base p-4">
            <p className="font-mono text-2xl">{s.value.toLocaleString()}</p>
            <p className="mt-1 text-xs text-text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <Card className="mt-6 p-5">
        <h3 className="text-sm font-semibold text-text-primary">Views Over Time</h3>
        <div className="mt-3">
          <ViewsChart data={timeSeries} />
        </div>
      </Card>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary">Traffic Sources</h3>
          <div className="mt-3">
            <TrafficSources data={referrers} />
          </div>
        </Card>
        <Card className="p-5">
          <h3 className="text-sm font-semibold text-text-primary">Devices</h3>
          <div className="mt-3">
            <DeviceBreakdown data={devices} />
          </div>
        </Card>
      </div>
    </div>
  );
}

function PageHeader() {
  return (
    <Link href="/admin/blogs/analytics" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary">
      <ArrowLeft className="h-3.5 w-3.5" /> Back to Analytics
    </Link>
  );
}
