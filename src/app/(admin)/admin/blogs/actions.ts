"use server";

import type { z } from "zod";
import { Prisma, type BlogPost } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { generateUniqueBlogSlug, calculateReadingTime, publishedPostWhere } from "@/lib/blog";
import { createBlogPostSchema } from "@/lib/validations";
import { createRevisionSnapshot, computeChangeSummary } from "@/lib/revisions";
import type { BlogSeoMeta } from "@/types";
import { handleBlogActionError, revalidateBlogPaths } from "@/app/(admin)/admin/blogs/action-helpers";

type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

/**
 * Typed result wrapper for every Blog CMS action — mutations and reads never
 * throw past this boundary; callers always get a discriminated result they
 * can branch on instead of needing a try/catch of their own.
 */
export type BlogActionResult<T> = { success: true; data: T } | { success: false; error: string };

function parseBlogForm(formData: FormData) {
  return {
    title: formData.get("title") as string,
    subtitle: (formData.get("subtitle") as string) || "",
    slug: (formData.get("slug") as string) || "",
    excerpt: formData.get("excerpt") as string,
    contentMdx: formData.get("contentMdx") as string,
    coverImage: formData.get("coverImage") as string,
    category: formData.get("category") as string,
    author: (formData.get("author") as string) || "",
    tags: ((formData.get("tags") as string) || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    technologies: ((formData.get("technologies") as string) || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    level: (formData.get("level") as string) || "",
    status: (formData.get("status") as string) || "DRAFT",
    scheduledAt: (formData.get("scheduledAt") as string) || "",
    seriesName: (formData.get("seriesName") as string) || "",
    seriesOrder: (formData.get("seriesOrder") as string) || "",
    featured: formData.get("featured") === "on",
    seoTitle: (formData.get("seoTitle") as string) || "",
    seoDescription: (formData.get("seoDescription") as string) || "",
    canonicalUrl: (formData.get("canonicalUrl") as string) || "",
    focusKeyword: (formData.get("focusKeyword") as string) || "",
    ogImage: (formData.get("ogImage") as string) || "",
    noIndex: formData.get("noIndex") === "on",
    noFollow: formData.get("noFollow") === "on",
    ogTitle: (formData.get("ogTitle") as string) || "",
    ogDescription: (formData.get("ogDescription") as string) || "",
    ogType: (formData.get("ogType") as string) || "",
    twitterCard: (formData.get("twitterCard") as string) || "summary_large_image",
    twitterTitle: (formData.get("twitterTitle") as string) || "",
    twitterDescription: (formData.get("twitterDescription") as string) || "",
    twitterImage: (formData.get("twitterImage") as string) || "",
  };
}

function toPrismaData(parsed: CreateBlogPostInput) {
  const seoMeta: BlogSeoMeta = {};
  if (parsed.noIndex) seoMeta.noIndex = true;
  if (parsed.noFollow) seoMeta.noFollow = true;
  if (parsed.ogTitle) seoMeta.ogTitle = parsed.ogTitle;
  if (parsed.ogDescription) seoMeta.ogDescription = parsed.ogDescription;
  if (parsed.ogType) seoMeta.ogType = parsed.ogType;
  if (parsed.twitterCard && parsed.twitterCard !== "summary_large_image") seoMeta.twitterCard = parsed.twitterCard;
  if (parsed.twitterTitle) seoMeta.twitterTitle = parsed.twitterTitle;
  if (parsed.twitterDescription) seoMeta.twitterDescription = parsed.twitterDescription;
  if (parsed.twitterImage) seoMeta.twitterImage = parsed.twitterImage;

  return {
    title: parsed.title,
    subtitle: parsed.subtitle || null,
    excerpt: parsed.excerpt,
    contentMdx: parsed.contentMdx,
    coverImage: parsed.coverImage,
    category: parsed.category,
    author: parsed.author || null,
    tags: parsed.tags,
    technologies: parsed.technologies,
    level: parsed.level ?? null,
    status: parsed.status,
    scheduledAt: parsed.scheduledAt ? new Date(parsed.scheduledAt) : null,
    seriesName: parsed.seriesName || null,
    seriesOrder: parsed.seriesOrder ?? null,
    featured: parsed.featured,
    seoTitle: parsed.seoTitle || null,
    seoDescription: parsed.seoDescription || null,
    canonicalUrl: parsed.canonicalUrl || null,
    focusKeyword: parsed.focusKeyword || null,
    ogImage: parsed.ogImage || null,
    seoMeta: Object.keys(seoMeta).length > 0 ? (seoMeta as Prisma.InputJsonValue) : Prisma.JsonNull,
  };
}

// --- Mutations --------------------------------------------------------

export async function createBlog(formData: FormData): Promise<BlogActionResult<{ id: string; slug: string }>> {
  try {
    await requireAdmin();
    const parsed = createBlogPostSchema.safeParse(parseBlogForm(formData));
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors.map((e) => e.message).join(", ") };
    }

    const slugSource = parsed.data.slug || parsed.data.title;
    const slug = await generateUniqueBlogSlug(slugSource);
    const readingTime = calculateReadingTime(parsed.data.contentMdx);

    const post = await db.blogPost.create({
      data: { ...toPrismaData(parsed.data), slug, readingTime },
    });

    revalidateBlogPaths(post.slug);
    return { success: true, data: { id: post.id, slug: post.slug } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function updateBlog(
  id: string,
  formData: FormData,
  options?: { skipRevision?: boolean; expectedUpdatedAt?: string },
): Promise<BlogActionResult<{ id: string; slug: string; updatedAt: string }>> {
  try {
    await requireAdmin();
    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Blog post not found." };

    // Optimistic concurrency: only checked for explicit manual saves (the
    // caller passes the updatedAt it last knew about). Autosave never passes
    // this — it's best-effort and shouldn't interrupt typing over a conflict.
    if (options?.expectedUpdatedAt) {
      const expected = new Date(options.expectedUpdatedAt).getTime();
      if (existing.updatedAt.getTime() !== expected) {
        return {
          success: false,
          error: "This post was changed elsewhere since you started editing. Refresh the page to see the latest version before saving.",
        };
      }
    }

    const parsed = createBlogPostSchema.safeParse(parseBlogForm(formData));
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors.map((e) => e.message).join(", ") };
    }

    const slugSource = parsed.data.slug || parsed.data.title;
    const slug =
      slugify(slugSource) === existing.slug ? existing.slug : await generateUniqueBlogSlug(slugSource, id);
    const readingTime = calculateReadingTime(parsed.data.contentMdx);
    const newData = { ...toPrismaData(parsed.data), slug, readingTime };

    const post = await db.$transaction(async (tx) => {
      if (!options?.skipRevision) {
        const changeSummary = computeChangeSummary(existing, newData);
        await createRevisionSnapshot(tx, existing, changeSummary);
      }
      return tx.blogPost.update({ where: { id }, data: newData });
    });

    revalidateBlogPaths(post.slug);
    if (existing.slug !== post.slug) revalidatePath(`/blog/${existing.slug}`);
    return { success: true, data: { id: post.id, slug: post.slug, updatedAt: post.updatedAt.toISOString() } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

/** Soft-deletes a post: moves it to Trash rather than removing it. The prior
 * status is captured so restoreBlog() can put it back where it was. Use
 * permanentlyDeleteBlog() for actual, irreversible removal (Trash view only). */
export async function deleteBlog(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const existing = await db.blogPost.findUnique({ where: { id }, select: { slug: true, status: true } });
    if (!existing) return { success: false, error: "Blog post not found." };

    await db.blogPost.update({
      where: { id },
      data: {
        status: "TRASHED",
        previousStatus: existing.status === "TRASHED" ? undefined : existing.status,
      },
    });

    revalidateBlogPaths(existing.slug);
    revalidatePath("/admin/blogs/trash");
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

/** Irreversibly removes a post. Only meant to be reachable from the Trash
 * view's "Permanent Delete" action — the main dashboard's "Delete" now goes
 * through deleteBlog() (soft-delete) instead. */
export async function permanentlyDeleteBlog(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const existing = await db.blogPost.findUnique({ where: { id }, select: { slug: true } });
    if (!existing) return { success: false, error: "Blog post not found." };

    await db.blogPost.delete({ where: { id } });

    revalidateBlogPaths(existing.slug);
    revalidatePath("/admin/blogs/trash");
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function archiveBlog(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Blog post not found." };

    await db.$transaction(async (tx) => {
      await createRevisionSnapshot(tx, existing, ["Status changed"]);
      await tx.blogPost.update({
        where: { id },
        data: {
          status: "ARCHIVED",
          previousStatus: existing.status === "ARCHIVED" ? undefined : existing.status,
        },
      });
    });

    revalidateBlogPaths(existing.slug);
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

/** Restores a post from Archived or Trashed back to whatever it was before —
 * read from previousStatus (captured by archiveBlog()/deleteBlog()). Falls
 * back to DRAFT for the rare case where previousStatus was never set. */
export async function restoreBlog(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const existing = await db.blogPost.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Blog post not found." };

    await db.$transaction(async (tx) => {
      await createRevisionSnapshot(tx, existing, ["Status changed"]);
      await tx.blogPost.update({
        where: { id },
        data: { status: existing.previousStatus ?? "DRAFT", previousStatus: null },
      });
    });

    revalidateBlogPaths(existing.slug);
    revalidatePath("/admin/blogs/trash");
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

/** Creates a draft copy of a post: title gets " (Copy)" appended, a fresh
 * unique slug is generated, and publishedAt/viewCount/status are reset. */
export async function duplicateBlog(id: string): Promise<BlogActionResult<{ id: string; slug: string }>> {
  try {
    await requireAdmin();
    const original = await db.blogPost.findUnique({ where: { id } });
    if (!original) return { success: false, error: "Blog post not found." };

    const title = `${original.title} (Copy)`;
    const slug = await generateUniqueBlogSlug(title);

    const copy = await db.blogPost.create({
      data: {
        title,
        subtitle: original.subtitle,
        slug,
        excerpt: original.excerpt,
        contentMdx: original.contentMdx,
        coverImage: original.coverImage,
        ogImage: original.ogImage,
        category: original.category,
        author: original.author,
        tags: original.tags,
        technologies: original.technologies,
        level: original.level,
        featured: original.featured,
        seoTitle: original.seoTitle,
        seoDescription: original.seoDescription,
        canonicalUrl: null, // a duplicate defaulting to the original's canonical would silently defer all SEO credit to it — safer to reset and let the user set this deliberately if intended
        focusKeyword: original.focusKeyword,
        seoMeta: original.seoMeta ?? Prisma.JsonNull,
        readingTime: original.readingTime,
        // Reset per spec: fresh publish date, zero views, always starts as Draft.
        status: "DRAFT",
        previousStatus: null,
        viewCount: 0,
        publishedAt: new Date(),
      },
    });

    revalidateBlogPaths(copy.slug);
    return { success: true, data: { id: copy.id, slug: copy.slug } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// --- Reads --------------------------------------------------------------

export async function checkSlugAvailability(
  slug: string,
  excludeId?: string,
): Promise<BlogActionResult<{ available: boolean }>> {
  try {
    await requireAdmin();
    const normalized = slugify(slug);
    if (!normalized) return { success: true, data: { available: true } };
    const existing = await db.blogPost.findUnique({ where: { slug: normalized }, select: { id: true } });
    return { success: true, data: { available: !existing || existing.id === excludeId } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function getBlog(id: string): Promise<BlogActionResult<BlogPost>> {
  try {
    await requireAdmin();
    const post = await db.blogPost.findUnique({ where: { id } });
    if (!post) return { success: false, error: "Blog post not found." };
    return { success: true, data: post };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

/** Excludes TRASHED posts — Trash has its own dedicated view/query
 * (getTrashedBlogs) since trashed items need different row actions
 * (Restore/Permanent Delete) than the main dashboard's (Edit/Duplicate/etc). */
export async function getBlogs(): Promise<BlogActionResult<BlogPost[]>> {
  try {
    await requireAdmin();
    const posts = await db.blogPost.findMany({
      where: { status: { not: "TRASHED" } },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: posts };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function getTrashedBlogs(): Promise<BlogActionResult<BlogPost[]>> {
  try {
    await requireAdmin();
    const posts = await db.blogPost.findMany({
      where: { status: "TRASHED" },
      orderBy: { updatedAt: "desc" },
    });
    return { success: true, data: posts };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function getPublishedBlogs(): Promise<BlogActionResult<BlogPost[]>> {
  try {
    const posts = await db.blogPost.findMany({ where: publishedPostWhere, orderBy: { publishedAt: "desc" } });
    return { success: true, data: posts };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function getFeaturedBlogs(): Promise<BlogActionResult<BlogPost[]>> {
  try {
    const posts = await db.blogPost.findMany({
      where: { AND: [publishedPostWhere, { featured: true }] },
      orderBy: { publishedAt: "desc" },
    });
    return { success: true, data: posts };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function searchBlogs(query: string): Promise<BlogActionResult<BlogPost[]>> {
  try {
    await requireAdmin();
    const trimmed = query.trim();
    if (!trimmed) return { success: true, data: [] };

    const posts = await db.blogPost.findMany({
      where: {
        status: { not: "TRASHED" },
        OR: [
          { title: { contains: trimmed, mode: "insensitive" } },
          { excerpt: { contains: trimmed, mode: "insensitive" } },
          { category: { contains: trimmed, mode: "insensitive" } },
          { tags: { has: trimmed } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: posts };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}
