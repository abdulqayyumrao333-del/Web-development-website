"use server";

import type { BlogPost, BlogPostRevision } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError, revalidateBlogPaths } from "@/app/(admin)/admin/blogs/action-helpers";
import { createRevisionSnapshot, computeChangeSummary } from "@/lib/revisions";

/** Shared by publishBlogPost() and the /api/cron/publish-scheduled route —
 * one publish-transition implementation, two triggers. Assumes the caller
 * has already verified the post should be published now. */
export async function performPublishTransition(post: BlogPost): Promise<BlogPost> {
  return db.$transaction(async (tx) => {
    await createRevisionSnapshot(tx, post, computeChangeSummary(post, { ...post, status: "PUBLISHED" }));
    return tx.blogPost.update({
      where: { id: post.id },
      data: {
        status: "PUBLISHED",
        previousStatus: null,
        // Only bump publishedAt the first time a post actually goes live —
        // re-publishing an already-published post (rare, defensive case)
        // shouldn't silently reset its original publish date.
        publishedAt: post.status === "PUBLISHED" ? post.publishedAt : new Date(),
      },
    });
  });
}

function validateForPublish(post: BlogPost): string | null {
  if (post.status === "TRASHED") return "This post is in Trash — restore it before publishing.";
  if (!post.title.trim()) return "Add a title before publishing.";
  if (!post.slug.trim()) return "This post needs a slug before publishing.";
  if (!post.contentMdx.trim()) return "Add some content before publishing.";
  if (!post.excerpt.trim()) return "Add an excerpt before publishing — it's used for SEO and blog listings.";
  if (!post.coverImage.trim()) return "Add a cover image before publishing.";
  return null;
}

export async function publishBlogPost(id: string): Promise<BlogActionResult<{ id: string; slug: string }>> {
  try {
    await requireAdmin();
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post) return { success: false, error: "Blog post not found." };

    const validationError = validateForPublish(post);
    if (validationError) return { success: false, error: validationError };

    const updated = await performPublishTransition(post);
    revalidateBlogPaths(updated.slug);
    return { success: true, data: { id: updated.id, slug: updated.slug } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function unpublishBlogPost(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post) return { success: false, error: "Blog post not found." };
    if (post.status !== "PUBLISHED") return { success: false, error: "This post isn't currently published." };

    await db.$transaction(async (tx) => {
      await createRevisionSnapshot(tx, post, ["Status changed"]);
      // publishedAt is deliberately left as-is — it records when this post
      // was last live, which is useful history, not something to erase.
      await tx.blogPost.update({ where: { id }, data: { status: "DRAFT", previousStatus: null } });
    });

    revalidateBlogPaths(post.slug);
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

function validateScheduleDate(scheduledAtIso: string): string | null {
  const date = new Date(scheduledAtIso);
  if (Number.isNaN(date.getTime())) return "Enter a valid date and time.";
  if (date.getTime() <= Date.now()) return "Scheduled time must be in the future.";
  return null;
}

export async function scheduleBlogPost(
  id: string,
  scheduledAtIso: string,
): Promise<BlogActionResult<{ id: string; scheduledAt: string }>> {
  try {
    await requireAdmin();
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post) return { success: false, error: "Blog post not found." };
    if (post.status === "TRASHED") return { success: false, error: "This post is in Trash — restore it first." };
    if (post.status === "PUBLISHED") return { success: false, error: "Unpublish this post before scheduling it." };

    const dateError = validateScheduleDate(scheduledAtIso);
    if (dateError) return { success: false, error: dateError };

    const validationError = validateForPublish({ ...post, status: "SCHEDULED" });
    if (validationError) return { success: false, error: validationError };

    const scheduledAt = new Date(scheduledAtIso);
    await db.$transaction(async (tx) => {
      await createRevisionSnapshot(tx, post, ["Status changed"]);
      await tx.blogPost.update({
        where: { id },
        data: { status: "SCHEDULED", scheduledAt, previousStatus: null },
      });
    });

    revalidateBlogPaths(post.slug);
    return { success: true, data: { id, scheduledAt: scheduledAt.toISOString() } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function rescheduleBlogPost(
  id: string,
  scheduledAtIso: string,
): Promise<BlogActionResult<{ id: string; scheduledAt: string }>> {
  try {
    await requireAdmin();
    const post = await db.blogPost.findUnique({ where: { id }, select: { id: true, slug: true, status: true } });
    if (!post) return { success: false, error: "Blog post not found." };
    if (post.status !== "SCHEDULED") return { success: false, error: "This post isn't currently scheduled." };

    const dateError = validateScheduleDate(scheduledAtIso);
    if (dateError) return { success: false, error: dateError };

    const scheduledAt = new Date(scheduledAtIso);
    await db.blogPost.update({ where: { id }, data: { scheduledAt } });

    revalidateBlogPaths(post.slug);
    return { success: true, data: { id, scheduledAt: scheduledAt.toISOString() } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function cancelScheduledBlogPost(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post) return { success: false, error: "Blog post not found." };
    if (post.status !== "SCHEDULED") return { success: false, error: "This post isn't currently scheduled." };

    await db.$transaction(async (tx) => {
      await createRevisionSnapshot(tx, post, ["Status changed"]);
      await tx.blogPost.update({
        where: { id },
        data: { status: "DRAFT", scheduledAt: null, previousStatus: null },
      });
    });

    revalidateBlogPaths(post.slug);
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// --- Revision history -----------------------------------------------------

export async function getBlogRevisions(blogPostId: string): Promise<BlogActionResult<BlogPostRevision[]>> {
  try {
    await requireAdmin();
    const revisions = await db.blogPostRevision.findMany({
      where: { blogPostId },
      orderBy: { versionNumber: "desc" },
    });
    return { success: true, data: revisions };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function getBlogRevision(revisionId: string): Promise<BlogActionResult<BlogPostRevision>> {
  try {
    await requireAdmin();
    const revision = await db.blogPostRevision.findUnique({ where: { id: revisionId } });
    if (!revision) return { success: false, error: "Revision not found." };
    return { success: true, data: revision };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

/** Restores a post's content from an old revision. Never destroys history —
 * the post's state right before restoring is itself snapshotted as a new
 * revision first, so the chain stays intact and reversible. */
export async function restoreBlogRevision(revisionId: string): Promise<BlogActionResult<{ id: string; slug: string }>> {
  try {
    await requireAdmin();
    const revision = await db.blogPostRevision.findUnique({ where: { id: revisionId } });
    if (!revision) return { success: false, error: "Revision not found." };

    const post = await db.blogPost.findUnique({ where: { id: revision.blogPostId } });
    if (!post) return { success: false, error: "Blog post not found." };

    const updated = await db.$transaction(async (tx) => {
      await createRevisionSnapshot(tx, post, [`Restored from version ${revision.versionNumber}`]);
      return tx.blogPost.update({
        where: { id: post.id },
        data: {
          title: revision.title,
          slug: revision.slug,
          excerpt: revision.excerpt,
          contentMdx: revision.contentMdx,
          category: revision.category,
          tags: revision.tags,
          seoTitle: revision.seoTitle,
          seoDescription: revision.seoDescription,
          // Status is deliberately NOT restored from the revision — reviving
          // old content shouldn't silently change today's publish state.
        },
      });
    });

    revalidateBlogPaths(updated.slug);
    if (post.slug !== updated.slug) revalidateBlogPaths(post.slug);
    return { success: true, data: { id: updated.id, slug: updated.slug } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}
