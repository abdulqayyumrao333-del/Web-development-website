import { Eye, CalendarDays, CalendarRange, Calendar, FileText, TrendingUp } from "lucide-react";
import type { AnalyticsOverview as AnalyticsOverviewData } from "@/app/(admin)/admin/blogs/analytics-actions";

export function AnalyticsOverview({ data }: { data: AnalyticsOverviewData }) {
  const stats = [
    { icon: Eye, label: "Total Views", value: data.totalViews },
    { icon: Calendar, label: "Views Today", value: data.viewsToday },
    { icon: CalendarDays, label: "Views This Week", value: data.viewsThisWeek },
    { icon: CalendarRange, label: "Views This Month", value: data.viewsThisMonth },
    { icon: FileText, label: "Published Articles", value: data.publishedArticles },
    { icon: TrendingUp, label: "Avg Views / Article", value: data.averageViewsPerArticle },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="rounded-md border border-border bg-bg-base p-4">
          <Icon className="h-4 w-4 text-accent-indigo" aria-hidden="true" />
          <p className="mt-2 font-mono text-2xl">{value.toLocaleString()}</p>
          <p className="mt-1 text-xs text-text-muted">{label}</p>
        </div>
      ))}
    </div>
  );
}
