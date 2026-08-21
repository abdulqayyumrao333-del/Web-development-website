"use server";

import { revalidatePath } from "next/cache";
import type { Service } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError } from "@/app/(admin)/admin/blogs/action-helpers";
import { serviceSchema, type ServiceFormValues } from "@/lib/validations/service";

// ── Get All Services ──
export async function getServices(): Promise<BlogActionResult<Service[]>> {
  try {
    await requireAdmin();
    const services = await db.service.findMany({
      orderBy: { order: "asc" },
    });
    return { success: true, data: services };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Get Single Service ──
export async function getService(id: string): Promise<BlogActionResult<Service>> {
  try {
    await requireAdmin();
    const service = await db.service.findUnique({ where: { id } });
    if (!service) {
      return { success: false, error: "Service not found." };
    }
    return { success: true, data: service };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Create Service ──
export async function createService(data: ServiceFormValues): Promise<BlogActionResult<Service>> {
  try {
    await requireAdmin();

    // Validate data
    const validated = serviceSchema.parse(data);

    // Check if slug already exists
    const existing = await db.service.findUnique({
      where: { slug: validated.slug },
    });
    if (existing) {
      return { success: false, error: "A service with this slug already exists." };
    }

    const service = await db.service.create({
      data: {
        title: validated.title,
        slug: validated.slug,
        shortDescription: validated.shortDescription,
        overview: validated.overview,
        category: validated.category,
        whoItsFor: validated.whoItsFor,
        deliverables: validated.deliverables,
        techStack: validated.techStack,
        typicalTimeline: validated.typicalTimeline,
        problemsSolved: validated.problemsSolved,
        order: validated.order,
        visible: validated.visible,
      },
    });

    revalidatePath("/admin/services");
    return { success: true, data: service };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Update Service ──
export async function updateService(
  id: string,
  data: Partial<ServiceFormValues>
): Promise<BlogActionResult<Service>> {
  try {
    await requireAdmin();

    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Service not found." };
    }

    // If slug is being changed, check for duplicates
    if (data.slug && data.slug !== existing.slug) {
      const duplicate = await db.service.findUnique({
        where: { slug: data.slug },
      });
      if (duplicate) {
        return { success: false, error: "A service with this slug already exists." };
      }
    }

    const service = await db.service.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        shortDescription: data.shortDescription,
        overview: data.overview,
        category: data.category,
        whoItsFor: data.whoItsFor,
        deliverables: data.deliverables,
        techStack: data.techStack,
        typicalTimeline: data.typicalTimeline,
        problemsSolved: data.problemsSolved,
        order: data.order,
        visible: data.visible,
      },
    });

    revalidatePath("/admin/services");
    return { success: true, data: service };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Delete Service ──
export async function deleteService(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const existing = await db.service.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Service not found." };
    }

    await db.service.delete({ where: { id } });

    revalidatePath("/admin/services");
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Update Service Order ──
export async function reorderServices(orderedIds: string[]): Promise<BlogActionResult<void>> {
  try {
    await requireAdmin();

    await Promise.all(
      orderedIds.map((id, index) =>
        db.service.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    revalidatePath("/admin/services");
    return { success: true };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}