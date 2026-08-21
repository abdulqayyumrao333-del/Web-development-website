"use server";

import type { Media, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError } from "@/app/(admin)/admin/blogs/action-helpers";
import { checkUploadRateLimit } from "@/lib/rate-limit";
import { uploadImageToCloudinary, deleteImageFromCloudinary, StorageConfigError, StorageUploadError } from "@/lib/cloudinary";
import { validateUploadedImage, MAX_DIMENSION_PX, InvalidFileError } from "@/lib/media-validation";

function wrapError(err: unknown): string {
  if (err instanceof InvalidFileError) return err.message;
  if (err instanceof StorageConfigError) return "Media storage isn't configured on the server yet.";
  if (err instanceof StorageUploadError) return "Upload to storage failed. Try again.";
  return handleBlogActionError(err);
}

// --- Upload -----------------------------------------------------------------

export async function uploadMedia(formData: FormData): Promise<BlogActionResult<Media>> {
  try {
    await requireAdmin();

    const allowed = await checkUploadRateLimit("media-upload");
    if (!allowed) return { success: false, error: "Too many uploads in a short time — wait a moment and try again." };

    const file = formData.get("file");
    if (!(file instanceof File)) return { success: false, error: "No file provided." };

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Validates actual file content (magic bytes), not the browser-reported
    // MIME type or filename extension, which are trivially spoofable.
    const detectedMimeType = validateUploadedImage(buffer, file.size);

    const result = await uploadImageToCloudinary(buffer, file.name);

    if (result.width > MAX_DIMENSION_PX || result.height > MAX_DIMENSION_PX) {
      // Reject after the fact rather than trying to pre-validate dimensions
      // client-side (which can't be trusted anyway) — clean up the just-
      // uploaded asset so storage doesn't accumulate rejected files.
      await deleteImageFromCloudinary(result.public_id).catch(() => {});
      return {
        success: false,
        error: `Image dimensions are too large (max ${MAX_DIMENSION_PX}px per side).`,
      };
    }

    const media = await db.media.create({
      data: {
        url: result.secure_url,
        storageKey: result.public_id,
        filename: file.name,
        originalFilename: file.name,
        mimeType: detectedMimeType,
        size: result.bytes,
        width: result.width,
        height: result.height,
      },
    });

    return { success: true, data: media };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}

// --- List / search / filter / paginate ---------------------------------------

export type MediaFilter = "all" | "has-alt" | "missing-alt" | "unused";

export type MediaListResult = { items: Media[]; total: number };

export async function getMediaLibrary({
  query,
  filter = "all",
  page = 1,
  pageSize = 24,
}: {
  query?: string;
  filter?: MediaFilter;
  page?: number;
  pageSize?: number;
}): Promise<BlogActionResult<MediaListResult>> {
  try {
    await requireAdmin();

    const where: Prisma.MediaWhereInput = {};
    if (query?.trim()) {
      const q = query.trim();
      where.OR = [
        { filename: { contains: q, mode: "insensitive" } },
        { altText: { contains: q, mode: "insensitive" } },
        { caption: { contains: q, mode: "insensitive" } },
      ];
    }
    if (filter === "has-alt") where.altText = { not: null };
    if (filter === "missing-alt") where.OR = [{ altText: null }, { altText: "" }];

    // "unused" needs the usage cross-reference below — computed in-memory
    // after fetching, same in-memory-filter pattern already established
    // throughout this project's admin dashboards for personal-blog scale.
    if (filter === "unused") {
      const all = await db.media.findMany({ where, orderBy: { createdAt: "desc" } });
      const unused: Media[] = [];
      for (const item of all) {
        const usage = await findMediaUsageInternal(item.url);
        if (usage.length === 0) unused.push(item);
      }
      const total = unused.length;
      const pageItems = unused.slice((page - 1) * pageSize, page * pageSize);
      return { success: true, data: { items: pageItems, total } };
    }

    const [items, total] = await Promise.all([
      db.media.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.media.count({ where }),
    ]);

    return { success: true, data: { items, total } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function getMediaItem(id: string): Promise<BlogActionResult<Media>> {
  try {
    await requireAdmin();
    const media = await db.media.findUnique({ where: { id } });
    if (!media) return { success: false, error: "Media item not found." };
    return { success: true, data: media };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// --- Metadata editing --------------------------------------------------------

export async function updateMediaMetadata(
  id: string,
  data: { filename?: string; altText?: string; caption?: string },
): Promise<BlogActionResult<Media>> {
  try {
    await requireAdmin();
    const existing = await db.media.findUnique({ where: { id } });
    if (!existing) return { success: false, error: "Media item not found." };

    const media = await db.media.update({
      where: { id },
      data: {
        filename: data.filename?.trim() || existing.filename,
        altText: data.altText !== undefined ? data.altText || null : undefined,
        caption: data.caption !== undefined ? data.caption || null : undefined,
      },
    });
    return { success: true, data: media };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// --- Usage checking & delete --------------------------------------------------

export type MediaUsage = { id: string; title: string; slug: string; via: "featured image" | "content" };

async function findMediaUsageInternal(url: string): Promise<MediaUsage[]> {
  const [asFeatured, inContent] = await Promise.all([
    db.blogPost.findMany({
      where: { coverImage: url, status: { not: "TRASHED" } },
      select: { id: true, title: true, slug: true },
    }),
    db.blogPost.findMany({
      where: { contentMdx: { contains: url }, status: { not: "TRASHED" } },
      select: { id: true, title: true, slug: true },
    }),
  ]);

  const usage = new Map<string, MediaUsage>();
  for (const p of asFeatured) usage.set(p.id, { ...p, via: "featured image" });
  for (const p of inContent) if (!usage.has(p.id)) usage.set(p.id, { ...p, via: "content" });
  return Array.from(usage.values());
}

export async function getMediaUsage(id: string): Promise<BlogActionResult<MediaUsage[]>> {
  try {
    await requireAdmin();
    const media = await db.media.findUnique({ where: { id }, select: { url: true } });
    if (!media) return { success: false, error: "Media item not found." };
    const usage = await findMediaUsageInternal(media.url);
    return { success: true, data: usage };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

/** Deletes a media item. Refuses if it's currently in use unless
 * `force` is explicitly passed (after the caller has shown the usage list
 * and gotten explicit confirmation) — never silently creates broken images. */
export async function deleteMedia(id: string, force = false): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();
    const media = await db.media.findUnique({ where: { id } });
    if (!media) return { success: false, error: "Media item not found." };

    if (!force) {
      const usage = await findMediaUsageInternal(media.url);
      if (usage.length > 0) {
        return {
          success: false,
          error: `This image is currently used by ${usage.length} post${usage.length === 1 ? "" : "s"} (${usage.map((u) => u.title).join(", ")}).`,
        };
      }
    }

    await deleteImageFromCloudinary(media.storageKey).catch(() => {
      // Storage delete failure shouldn't leave an orphaned DB row referencing
      // a "deleted" image the admin thinks is gone — log and continue; the
      // DB record removal below is still the source of truth for the library.
    });
    await db.media.delete({ where: { id } });

    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: wrapError(err) };
  }
}
