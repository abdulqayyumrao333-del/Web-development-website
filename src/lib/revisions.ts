import type { Prisma } from "@prisma/client";

type ComparableFields = {
  title: string;
  slug: string;
  excerpt: string;
  contentMdx: string;
  category: string;
  tags: string[];
  status: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

/** Deterministically compares the previous saved state to the incoming one
 * and produces a short list of human-readable change labels — no AI, per
 * Sprint 7's explicit instruction. Used to label each revision. */
export function computeChangeSummary(previous: ComparableFields, next: ComparableFields): string[] {
  const changes: string[] = [];

  if (previous.title !== next.title) changes.push("Title changed");
  if (previous.slug !== next.slug) changes.push("Slug changed");
  if (previous.excerpt !== next.excerpt) changes.push("Excerpt updated");
  if (previous.contentMdx !== next.contentMdx) changes.push("Content updated");
  if (previous.category !== next.category) changes.push("Category changed");
  if (previous.tags.join(",") !== next.tags.join(",")) changes.push("Tags updated");
  if (previous.status !== next.status) changes.push("Status changed");
  if ((previous.seoTitle ?? "") !== (next.seoTitle ?? "") || (previous.seoDescription ?? "") !== (next.seoDescription ?? "")) {
    changes.push("SEO metadata updated");
  }

  return changes.length > 0 ? changes : ["Minor update"];
}

const MAX_REVISIONS_PER_POST = 50;

/** Snapshots a post's current (about-to-be-replaced) state as a new
 * revision, inside the caller's transaction. Keeps the most recent 50
 * revisions per post — simple retention per Sprint 7 §15, not aggressive
 * pruning, appropriate for this project's scale. */
export async function createRevisionSnapshot(
  tx: Prisma.TransactionClient,
  post: ComparableFields & { id: string },
  changeSummary: string[],
): Promise<void> {
  const count = await tx.blogPostRevision.count({ where: { blogPostId: post.id } });

  await tx.blogPostRevision.create({
    data: {
      blogPostId: post.id,
      versionNumber: count + 1,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      contentMdx: post.contentMdx,
      category: post.category,
      tags: post.tags,
      status: post.status as Prisma.BlogPostRevisionCreateInput["status"],
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      changeSummary,
    },
  });

  const total = count + 1;
  if (total > MAX_REVISIONS_PER_POST) {
    const excess = await tx.blogPostRevision.findMany({
      where: { blogPostId: post.id },
      orderBy: { versionNumber: "asc" },
      take: total - MAX_REVISIONS_PER_POST,
      select: { id: true },
    });
    await tx.blogPostRevision.deleteMany({ where: { id: { in: excess.map((r) => r.id) } } });
  }
}
