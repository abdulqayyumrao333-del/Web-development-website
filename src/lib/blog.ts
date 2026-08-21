import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

// A post is publicly visible if it's explicitly PUBLISHED, or SCHEDULED with
// a scheduledAt time that has already passed. There's no background job to
// flip SCHEDULED -> PUBLISHED, so this is evaluated at query time instead.
export const publishedPostWhere: Prisma.BlogPostWhereInput = {
  OR: [{ status: "PUBLISHED" }, { status: "SCHEDULED", scheduledAt: { lte: new Date() } }],
};

/**
 * Generates a unique, SEO-friendly slug from a title (or an already-slugified
 * candidate). Appends -1, -2, ... on collision. `excludeId` lets an update
 * keep its own current slug without colliding with itself.
 */
export async function generateUniqueBlogSlug(source: string, excludeId?: string): Promise<string> {
  const base = slugify(source);
  let candidate = base;
  let suffix = 0;

  // Personal-blog volume means this resolves in one or two lookups in
  // practice; a bounded loop avoids the (very unlikely) infinite case.
  for (let attempt = 0; attempt < 1000; attempt += 1) {
    const existing = await db.blogPost.findUnique({ where: { slug: candidate }, select: { id: true } });
    if (!existing || existing.id === excludeId) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }

  throw new Error("Could not generate a unique slug after 1000 attempts.");
}

/** Re-exported from lib/utils.ts (client-safe — no Prisma import) so existing
 * `import { calculateReadingTime } from "@/lib/blog"` call sites keep working
 * unchanged. See lib/utils.ts for the implementation. */
export { calculateReadingTime } from "@/lib/utils";
