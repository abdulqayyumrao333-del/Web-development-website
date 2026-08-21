import type { BlogPost } from "@/types";
import { siteConfig } from "@/config/site";
import { getBlogs, getTrashedBlogs } from "@/app/(admin)/admin/blogs/actions";
import { BlogStats } from "@/components/admin/blog/blog-stats";
import { BlogSearch } from "@/components/admin/blog/blog-search";
import { BlogFilters } from "@/components/admin/blog/blog-filters";
import { BlogTable } from "@/components/admin/blog/blog-table";
import { BlogPagination } from "@/components/admin/blog/blog-pagination";
import { PAGE_SIZE_OPTIONS } from "@/lib/blog-constants";
import { BlogEmptyState } from "@/components/admin/blog/blog-empty-state";
import { BlogErrorState } from "@/components/admin/blog/blog-error-state";
import { BlogHeaderActions } from "@/components/admin/blog/blog-header-actions";
import { AnalyticsSummaryWidget } from "@/components/admin/blog/analytics/analytics-summary-widget";

export const metadata = { title: "Manage Blog Posts" };

const DEFAULT_PAGE_SIZE = 10;

type SearchParams = Promise<{
  q?: string;
  status?: string;
  category?: string;
  featured?: string;
  sort?: string;
  page?: string;
  pageSize?: string;
}>;

function matchesSearch(post: BlogPost, query: string): boolean {
  const q = query.toLowerCase();
  return (
    post.title.toLowerCase().includes(q) ||
    post.slug.toLowerCase().includes(q) ||
    post.category.toLowerCase().includes(q) ||
    post.tags.some((tag) => tag.toLowerCase().includes(q)) ||
    (post.author || siteConfig.name).toLowerCase().includes(q)
  );
}

export default async function BlogsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const result = await getBlogs();
  const trashedResult = await getTrashedBlogs();
  const trashedCount = trashedResult.success ? trashedResult.data.length : 0;

  if (!result.success) {
    return (
      <div>
        <PageHeader trashedCount={trashedCount} />
        <BlogErrorState message={result.error} />
      </div>
    );
  }

  const allPosts = result.data;

  // Global stats always reflect the whole collection, independent of the
  // current search/filter — they're KPIs, not a count of the visible page.
  const stats = {
    total: allPosts.length,
    published: allPosts.filter((p) => p.status === "PUBLISHED").length,
    drafts: allPosts.filter((p) => p.status === "DRAFT").length,
    archived: allPosts.filter((p) => p.status === "ARCHIVED").length,
    featured: allPosts.filter((p) => p.featured).length,
  };

  const categories = Array.from(new Set(allPosts.map((p) => p.category))).sort();

  if (allPosts.length === 0) {
    return (
      <div>
        <PageHeader trashedCount={trashedCount} />
        <div className="mt-8">
          <BlogStats {...stats} />
        </div>
        <BlogEmptyState />
      </div>
    );
  }

  // --- Filtering, sorting, and pagination all happen here in-memory rather
  // than as new Prisma queries — Sprint 1's getBlogs() is the only database
  // call this page makes, per the "no duplicate database logic" instruction.
  let filtered = allPosts;

  if (params.q?.trim()) {
    filtered = filtered.filter((p) => matchesSearch(p, params.q!.trim()));
  }
  if (params.status && params.status !== "ALL") {
    filtered = filtered.filter((p) => p.status === params.status);
  }
  if (params.category && params.category !== "ALL") {
    filtered = filtered.filter((p) => p.category === params.category);
  }
  if (params.featured === "true") {
    filtered = filtered.filter((p) => p.featured);
  }

  const sort = params.sort ?? "newest";
  const sorted = [...filtered].sort((a, b) => {
    if (sort === "oldest") return a.publishedAt.getTime() - b.publishedAt.getTime();
    if (sort === "updated") return b.updatedAt.getTime() - a.updatedAt.getTime();
    return b.publishedAt.getTime() - a.publishedAt.getTime(); // newest (default)
  });

  const pageSize = PAGE_SIZE_OPTIONS.includes(Number(params.pageSize)) ? Number(params.pageSize) : DEFAULT_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const page = Math.min(Math.max(1, Number(params.page) || 1), totalPages);
  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <PageHeader trashedCount={trashedCount} />

      <div className="mt-8">
        <BlogStats {...stats} />
      </div>

      <div className="mt-4">
        <AnalyticsSummaryWidget />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <BlogSearch />
        <BlogFilters categories={categories} />
      </div>

      {sorted.length === 0 ? (
        <div className="mt-6 rounded-md border border-dashed border-border p-8 text-center text-sm text-text-muted">
          No results match your search or filters.
        </div>
      ) : (
        <>
          <BlogTable posts={pageRows} />
          <BlogPagination page={page} pageSize={pageSize} totalItems={sorted.length} />
        </>
      )}
    </div>
  );
}

function PageHeader({ trashedCount }: { trashedCount: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Manage Blog Posts</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Create, organize, publish, and manage your technical articles.
        </p>
      </div>
      <BlogHeaderActions trashedCount={trashedCount} />
    </div>
  );
}
