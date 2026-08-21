import { getBlogs } from "@/app/(admin)/admin/blogs/actions";
import { BlogForm } from "@/components/admin/blog/blog-form";

export const metadata = { title: "Create New Blog Post" };

export default async function NewBlogPage() {
  // Category dropdown is a UI convenience — if this fails, the form still
  // works fine with an empty list (the "+ Add new category" path covers it).
  const result = await getBlogs();
  const categories = result.success ? Array.from(new Set(result.data.map((p) => p.category))).sort() : [];

  return <BlogForm categories={categories} />;
}
