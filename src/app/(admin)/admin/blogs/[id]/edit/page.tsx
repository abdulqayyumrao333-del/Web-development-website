import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getBlog, getBlogs } from "@/app/(admin)/admin/blogs/actions";
import { BlogForm } from "@/components/admin/blog/blog-form";

export const metadata = { title: "Edit Blog Post" };

type Params = Promise<{ id: string }>;

export default async function EditBlogPage({ params }: { params: Params }) {
  const { id } = await params;

  const result = await getBlog(id);
  if (!result.success) {
    return (
      <div>
        <Link
          href="/admin/blogs"
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to all posts
        </Link>
        <div className="mt-8 flex flex-col items-center rounded-md border border-dashed border-border p-12 text-center">
          <p className="text-sm font-medium text-text-primary">Couldn't find this post.</p>
          <p className="mt-1 text-sm text-text-muted">{result.error}</p>
        </div>
      </div>
    );
  }

  const post = result.data;

  // Trashed posts aren't editable in place — restore them first, from the
  // Trash view, so their prior status is preserved correctly on the way back.
  if (post.status === "TRASHED") {
    redirect("/admin/blogs/trash");
  }

  const categoriesResult = await getBlogs();
  const categories = categoriesResult.success
    ? Array.from(new Set(categoriesResult.data.map((p) => p.category))).sort()
    : [];

  return <BlogForm categories={categories} post={post} />;
}
