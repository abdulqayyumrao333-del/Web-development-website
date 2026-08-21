"use server";

import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError } from "@/app/(admin)/admin/blogs/action-helpers";
import { getContentStats } from "@/lib/utils";
import type { ReferrerCategory, DeviceCategory } from "@/lib/analytics";

export type AnalyticsRangeKey = "today" | "7d" | "30d" | "90d" | "all" | "custom";

export type AnalyticsRange = { key: AnalyticsRangeKey; from?: string; to?: string };

function resolveRange(range: AnalyticsRange): { from: Date | null; to: Date } {
  const now = new Date();
  const to = range.key === "custom" && range.to ? new Date(range.to) : now;

  if (range.key === "custom" && range.from) {
    return { from: new Date(range.from), to };
  }
  if (range.key === "all") return { from: null, to };

  const from = new Date(now);
  if (range.key === "today") {
    from.setHours(0, 0, 0, 0);
  } else if (range.key === "7d") {
    from.setDate(from.getDate() - 7);
  } else if (range.key === "30d") {
    from.setDate(from.getDate() - 30);
  } else if (range.key === "90d") {
    from.setDate(from.getDate() - 90);
  }
  return { from, to };
}

export type AnalyticsOverview = {
  totalViews: number;
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  publishedArticles: number;
  totalArticles: number;
  averageViewsPerArticle: number;
};

export async function getAnalyticsOverview(): Promise<BlogActionResult<AnalyticsOverview>> {
  try {
    await requireAdmin();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    const startOfMonth = new Date();
    startOfMonth.setDate(startOfMonth.getDate() - 30);

    const [viewSum, viewsToday, viewsThisWeek, viewsThisMonth, publishedArticles, totalArticles] = await Promise.all([
      db.blogPost.aggregate({ _sum: { viewCount: true }, where: { status: { not: "TRASHED" } } }),
      db.analyticsEvent.count({ where: { createdAt: { gte: startOfToday } } }),
      db.analyticsEvent.count({ where: { createdAt: { gte: startOfWeek } } }),
      db.analyticsEvent.count({ where: { createdAt: { gte: startOfMonth } } }),
      db.blogPost.count({ where: { status: "PUBLISHED" } }),
      db.blogPost.count({ where: { status: { not: "TRASHED" } } }),
    ]);

    const totalViews = viewSum._sum.viewCount ?? 0;

    return {
      success: true,
      data: {
        totalViews,
        viewsToday,
        viewsThisWeek,
        viewsThisMonth,
        publishedArticles,
        totalArticles,
        averageViewsPerArticle: publishedArticles > 0 ? Math.round(totalViews / publishedArticles) : 0,
      },
    };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export type ViewsTimeSeriesPoint = { date: string; views: number };

export async function getViewsTimeSeries(range: AnalyticsRange): Promise<BlogActionResult<ViewsTimeSeriesPoint[]>> {
  try {
    await requireAdmin();
    const { from, to } = resolveRange(range);

    // Date-truncated grouping isn't expressible via Prisma's groupBy on a
    // DateTime column, so this one query uses parameterized raw SQL —
    // still fully server-side aggregation, no events loaded into JS.
    const rows = from
      ? await db.$queryRaw<{ day: Date; views: bigint }[]>`
          SELECT date_trunc('day', "createdAt") AS day, COUNT(*) AS views
          FROM "AnalyticsEvent"
          WHERE "createdAt" >= ${from} AND "createdAt" <= ${to}
          GROUP BY day
          ORDER BY day ASC
        `
      : await db.$queryRaw<{ day: Date; views: bigint }[]>`
          SELECT date_trunc('day', "createdAt") AS day, COUNT(*) AS views
          FROM "AnalyticsEvent"
          WHERE "createdAt" <= ${to}
          GROUP BY day
          ORDER BY day ASC
        `;

    return {
      success: true,
      data: rows.map((r) => ({ date: r.day.toISOString().slice(0, 10), views: Number(r.views) })),
    };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export type TopArticle = {
  id: string;
  title: string;
  slug: string;
  status: string;
  publishedAt: Date;
  updatedAt: Date;
  views: number;
};

export async function getTopArticles(range: AnalyticsRange, limit: 5 | 10 = 5): Promise<BlogActionResult<TopArticle[]>> {
  try {
    await requireAdmin();
    const { from, to } = resolveRange(range);

    const grouped = await db.analyticsEvent.groupBy({
      by: ["blogPostId"],
      where: { createdAt: { gte: from ?? undefined, lte: to } },
      _count: { blogPostId: true },
      orderBy: { _count: { blogPostId: "desc" } },
      take: limit,
    });

    if (grouped.length === 0) return { success: true, data: [] };

    const posts = await db.blogPost.findMany({
      where: { id: { in: grouped.map((g) => g.blogPostId) } },
      select: { id: true, title: true, slug: true, status: true, publishedAt: true, updatedAt: true },
    });
    const postById = new Map(posts.map((p) => [p.id, p]));

    const results: TopArticle[] = grouped
      .map((g) => {
        const post = postById.get(g.blogPostId);
        if (!post) return null;
        return { ...post, views: g._count.blogPostId };
      })
      .filter((r): r is TopArticle => r !== null);

    return { success: true, data: results };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export type BreakdownEntry<T extends string> = { category: T; count: number };

export async function getReferrerBreakdown(
  range: AnalyticsRange,
  blogPostId?: string,
): Promise<BlogActionResult<BreakdownEntry<ReferrerCategory>[]>> {
  try {
    await requireAdmin();
    const { from, to } = resolveRange(range);

    const grouped = await db.analyticsEvent.groupBy({
      by: ["referrer"],
      where: { createdAt: { gte: from ?? undefined, lte: to }, blogPostId },
      _count: { referrer: true },
    });

    return {
      success: true,
      data: grouped
        .filter((g) => g.referrer !== null)
        .map((g) => ({ category: g.referrer as ReferrerCategory, count: g._count.referrer })),
    };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function getDeviceBreakdown(
  range: AnalyticsRange,
  blogPostId?: string,
): Promise<BlogActionResult<BreakdownEntry<DeviceCategory>[]>> {
  try {
    await requireAdmin();
    const { from, to } = resolveRange(range);

    const grouped = await db.analyticsEvent.groupBy({
      by: ["device"],
      where: { createdAt: { gte: from ?? undefined, lte: to }, blogPostId },
      _count: { device: true },
    });

    return {
      success: true,
      data: grouped
        .filter((g) => g.device !== null)
        .map((g) => ({ category: g.device as DeviceCategory, count: g._count.device })),
    };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export type ArticleAnalytics = {
  post: {
    id: string;
    title: string;
    slug: string;
    status: string;
    publishedAt: Date;
    updatedAt: Date;
    readingTime: number | null;
    wordCount: number;
  };
  totalViews: number;
  viewsToday: number;
  viewsThisWeek: number;
  viewsThisMonth: number;
  timeSeries: ViewsTimeSeriesPoint[];
  referrers: BreakdownEntry<ReferrerCategory>[];
  devices: BreakdownEntry<DeviceCategory>[];
};

export async function getArticleAnalytics(blogPostId: string): Promise<BlogActionResult<ArticleAnalytics>> {
  try {
    await requireAdmin();

    const post = await db.blogPost.findUnique({ where: { id: blogPostId } });
    if (!post) return { success: false, error: "Blog post not found." };

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    const startOfMonth = new Date();
    startOfMonth.setDate(startOfMonth.getDate() - 30);

    const [viewsToday, viewsThisWeek, viewsThisMonth, timeSeriesResult, referrersResult, devicesResult] =
      await Promise.all([
        db.analyticsEvent.count({ where: { blogPostId, createdAt: { gte: startOfToday } } }),
        db.analyticsEvent.count({ where: { blogPostId, createdAt: { gte: startOfWeek } } }),
        db.analyticsEvent.count({ where: { blogPostId, createdAt: { gte: startOfMonth } } }),
        getViewsTimeSeriesForPost(blogPostId),
        getReferrerBreakdown({ key: "all" }, blogPostId),
        getDeviceBreakdown({ key: "all" }, blogPostId),
      ]);

    return {
      success: true,
      data: {
        post: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          status: post.status,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          readingTime: post.readingTime,
          wordCount: getContentStats(post.contentMdx).words,
        },
        totalViews: post.viewCount,
        viewsToday,
        viewsThisWeek,
        viewsThisMonth,
        timeSeries: timeSeriesResult,
        referrers: referrersResult.success ? referrersResult.data : [],
        devices: devicesResult.success ? devicesResult.data : [],
      },
    };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function getArticlesPublishedInRange(range: AnalyticsRange): Promise<BlogActionResult<number>> {
  try {
    await requireAdmin();
    const { from, to } = resolveRange(range);
    const count = await db.blogPost.count({
      where: { status: "PUBLISHED", publishedAt: { gte: from ?? undefined, lte: to } },
    });
    return { success: true, data: count };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

async function getViewsTimeSeriesForPost(blogPostId: string): Promise<ViewsTimeSeriesPoint[]> {
  const rows = await db.$queryRaw<{ day: Date; views: bigint }[]>`
    SELECT date_trunc('day', "createdAt") AS day, COUNT(*) AS views
    FROM "AnalyticsEvent"
    WHERE "blogPostId" = ${blogPostId}
    GROUP BY day
    ORDER BY day ASC
  `;
  return rows.map((r) => ({ date: r.day.toISOString().slice(0, 10), views: Number(r.views) }));
}
