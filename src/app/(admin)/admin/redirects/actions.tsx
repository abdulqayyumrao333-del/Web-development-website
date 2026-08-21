"use server";

import { revalidatePath } from "next/cache";
import type { Redirect } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError } from "@/app/(admin)/admin/blogs/action-helpers";
import { z } from "zod";

// ── Validation Schema ──
const redirectSchema = z.object({
  fromPath: z.string().min(1, "From path is required")
    .regex(/^\/[a-z0-9/_-]*$/, "Path must start with / and contain only letters, numbers, /, _, -"),
  toPath: z.string().min(1, "To path is required")
    .regex(/^\/[a-z0-9/_-]*$/, "Path must start with / and contain only letters, numbers, /, _, -"),
  statusCode: z.number().int().default(308),
  enabled: z.boolean().default(true),
});

type RedirectFormValues = z.infer<typeof redirectSchema>;

// ── Get All Redirects ──
export async function getRedirects(): Promise<BlogActionResult<Redirect[]>> {
  try {
    await requireAdmin();
    const redirects = await db.redirect.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: redirects };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Get Single Redirect ──
export async function getRedirect(id: string): Promise<BlogActionResult<Redirect>> {
  try {
    await requireAdmin();
    const redirect = await db.redirect.findUnique({ where: { id } });
    if (!redirect) {
      return { success: false, error: "Redirect not found." };
    }
    return { success: true, data: redirect };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Create Redirect ──
export async function createRedirect(data: RedirectFormValues): Promise<BlogActionResult<Redirect>> {
  try {
    await requireAdmin();

    const validated = redirectSchema.parse(data);

    // Check if fromPath already exists
    const existing = await db.redirect.findUnique({
      where: { fromPath: validated.fromPath },
    });
    if (existing) {
      return { success: false, error: "A redirect with this 'from' path already exists." };
    }

    const redirect = await db.redirect.create({
      data: {
        fromPath: validated.fromPath,
        toPath: validated.toPath,
        statusCode: validated.statusCode,
        enabled: validated.enabled,
      },
    });

    revalidatePath("/admin/redirects");
    return { success: true, data: redirect };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Update Redirect ──
export async function updateRedirect(
  id: string,
  data: Partial<RedirectFormValues>
): Promise<BlogActionResult<Redirect>> {
  try {
    await requireAdmin();

    const existing = await db.redirect.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Redirect not found." };
    }

    // If fromPath is changing, check for duplicates
    if (data.fromPath && data.fromPath !== existing.fromPath) {
      const duplicate = await db.redirect.findUnique({
        where: { fromPath: data.fromPath },
      });
      if (duplicate) {
        return { success: false, error: "A redirect with this 'from' path already exists." };
      }
    }

    const redirect = await db.redirect.update({
      where: { id },
      data: {
        fromPath: data.fromPath,
        toPath: data.toPath,
        statusCode: data.statusCode,
        enabled: data.enabled,
      },
    });

    revalidatePath("/admin/redirects");
    return { success: true, data: redirect };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Delete Redirect ──
export async function deleteRedirect(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const existing = await db.redirect.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Redirect not found." };
    }

    await db.redirect.delete({ where: { id } });

    revalidatePath("/admin/redirects");
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Toggle Redirect Status ──
export async function toggleRedirectStatus(id: string): Promise<BlogActionResult<Redirect>> {
  try {
    await requireAdmin();

    const existing = await db.redirect.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Redirect not found." };
    }

    const redirect = await db.redirect.update({
      where: { id },
      data: { enabled: !existing.enabled },
    });

    revalidatePath("/admin/redirects");
    return { success: true, data: redirect };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Test Redirect ──
export async function testRedirect(fromPath: string): Promise<BlogActionResult<{ toPath: string; statusCode: number }>> {
  try {
    await requireAdmin();

    const redirect = await db.redirect.findUnique({
      where: { fromPath },
    });

    if (!redirect) {
      return { success: false, error: "Redirect not found." };
    }

    if (!redirect.enabled) {
      return { success: false, error: "Redirect is disabled." };
    }

    return {
      success: true,
      data: {
        toPath: redirect.toPath,
        statusCode: redirect.statusCode,
      },
    };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}