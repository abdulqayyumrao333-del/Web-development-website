"use server";

import { revalidatePath } from "next/cache";
import type { Education } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError } from "@/app/(admin)/admin/blogs/action-helpers";
import { z } from "zod";

// ── Validation Schema ──
const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

type EducationFormValues = z.infer<typeof educationSchema>;

// ── Get All Educations ──
export async function getEducations(): Promise<BlogActionResult<Education[]>> {
  try {
    await requireAdmin();
    const educations = await db.education.findMany({
      orderBy: [{ order: "asc" }, { startDate: "desc" }],
    });
    return { success: true, data: educations };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Get Single Education ──
export async function getEducation(id: string): Promise<BlogActionResult<Education>> {
  try {
    await requireAdmin();
    const education = await db.education.findUnique({ where: { id } });
    if (!education) {
      return { success: false, error: "Education not found." };
    }
    return { success: true, data: education };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Create Education ──
export async function createEducation(data: EducationFormValues): Promise<BlogActionResult<Education>> {
  try {
    await requireAdmin();

    const validated = educationSchema.parse(data);

    const education = await db.education.create({
      data: {
        degree: validated.degree,
        institution: validated.institution,
        startDate: new Date(validated.startDate),
        endDate: validated.endDate ? new Date(validated.endDate) : null,
        description: validated.description,
        order: validated.order,
      },
    });

    revalidatePath("/admin/education");
    return { success: true, data: education };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Update Education ──
export async function updateEducation(
  id: string,
  data: Partial<EducationFormValues>
): Promise<BlogActionResult<Education>> {
  try {
    await requireAdmin();

    const existing = await db.education.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Education not found." };
    }

    const education = await db.education.update({
      where: { id },
      data: {
        degree: data.degree,
        institution: data.institution,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : data.endDate === null ? null : undefined,
        description: data.description,
        order: data.order,
      },
    });

    revalidatePath("/admin/education");
    return { success: true, data: education };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Delete Education ──
export async function deleteEducation(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const existing = await db.education.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Education not found." };
    }

    await db.education.delete({ where: { id } });

    revalidatePath("/admin/education");
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Reorder Educations ──
export async function reorderEducations(orderedIds: string[]): Promise<BlogActionResult<void>> {
  try {
    await requireAdmin();

    await Promise.all(
      orderedIds.map((id, index) =>
        db.education.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    revalidatePath("/admin/education");
    return { success: true, data: undefined };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}