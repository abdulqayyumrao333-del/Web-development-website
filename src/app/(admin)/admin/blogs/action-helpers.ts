import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";

/** Maps a caught error to a safe, user-facing message. Not itself a Server
 * Action — lives outside any "use server" file because those files require
 * every export to be an async function; this is a plain sync helper shared
 * across every admin/blogs Server Actions module. */
export function handleBlogActionError(err: unknown): string {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") return "A blog post with this slug already exists.";
    if (err.code === "P2025") return "Blog post not found.";
    return `Database error (${err.code}).`;
  }
  if (err instanceof Error) return err.message;
  return "Unexpected error while processing the blog post.";
}

export function revalidateBlogPaths(slug?: string) {
  revalidatePath("/admin/blogs");
  revalidatePath("/blog");
  if (slug) revalidatePath(`/blog/${slug}`);
}
