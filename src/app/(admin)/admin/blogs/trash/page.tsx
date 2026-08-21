import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTrashedBlogs } from "@/app/(admin)/admin/blogs/actions";
import { BlogSearch } from "@/components/admin/blog/blog-search";
import { BlogPagination } from "@/components/admin/blog/blog-pagination";
import { PAGE_SIZE_OPTIONS } from "@/lib/blog-constants";
import { TrashTable } from "@/components/admin/blog/trash-table";
import { BlogErrorState } from "@/components/admin/blog/blog-error-state";

export const metadata = { title: "Trash — Blog Posts" };

const DEFAULT_PAGE_SIZE = 10;

type SearchParams = Promise<{ q?: string; page?: string; pageSize?: string }>;

export default async function TrashPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const result = await getTrashedBlogs();

  if (!result.success) {
    return (
      <div>
        <PageHeader />
        <BlogErrorState message={result.error} />
      </div>
    );
  }

  const allTrashed = result.data;

  if (allTrashed.length === 0) {
    return (
      <div>
        <PageHeader />
        <div className="mt-8 flex flex-col items-center rounded-md border border-dashed border-border p-12 text-center">
          <p className="text-sm font-medium text-text-primary">Trash is empty.</p>
          <p className="mt-1 text-sm text-text-muted">Posts you delete show up here before being removed for good.</p>
        </div>
      </div>
    );
  }

  let filtered = allTrashed;
  const q = params.q?.trim().toLowerCase();
  if (q) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }

  const pageSize = PAGE_SIZE_OPTIONS.includes(Number(params.pageSize)) ? Number(params.pageSize) : DEFAULT_PAGE_SIZE;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(Math.max(1, Number(params.page) || 1), totalPages);
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <PageHeader />

      <div className="mt-8">
        <BlogSearch />
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-md border border-dashed border-border p-8 text-center text-sm text-text-muted">
          No trashed posts match your search.
        </div>
      ) : (
        <div className="mt-4">
          <TrashTable posts={pageRows} />
          <BlogPagination page={page} pageSize={pageSize} totalItems={filtered.length} />
        </div>
      )}
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
      <h1 className="mt-4 text-2xl font-semibold">Trash</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Deleted posts are kept here until you restore or permanently delete them.
      </p>
    </div>
  );
}
