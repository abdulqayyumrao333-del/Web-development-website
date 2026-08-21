import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TopArticle } from "@/app/(admin)/admin/blogs/analytics-actions";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatDate } from "@/lib/utils";
import { AnalyticsEmptyState } from "@/components/admin/blog/analytics/analytics-empty-state";

const STATUS_TO_BADGE = {
  DRAFT: "draft",
  PUBLISHED: "published",
  SCHEDULED: "scheduled",
  ARCHIVED: "archived",
  TRASHED: "trashed",
} as const;

export function TopArticles({ articles }: { articles: TopArticle[] }) {
  if (articles.length === 0) {
    return <AnalyticsEmptyState message="No article views recorded in this range yet." />;
  }

  return (
    <ol className="space-y-2">
      {articles.map((article, i) => (
        <li key={article.id}>
          <Link
            href={`/admin/blogs/analytics/${article.id}`}
            className="flex items-center justify-between gap-3 rounded-md border border-border p-3 transition-colors hover:border-border-hover"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="w-5 shrink-0 text-center text-xs font-mono text-text-muted">{i + 1}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">{article.title}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <StatusBadge status={STATUS_TO_BADGE[article.status as keyof typeof STATUS_TO_BADGE] ?? "draft"} />
                  <span className="text-xs text-text-muted">Published {formatDate(article.publishedAt)}</span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="font-mono text-sm text-text-primary">{article.views.toLocaleString()}</span>
              <ArrowRight className="h-3.5 w-3.5 text-text-muted" aria-hidden="true" />
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
