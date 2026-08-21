"use server";

import { revalidatePath } from "next/cache";
import type { Experience } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError } from "@/app/(admin)/admin/blogs/action-helpers";
import { z } from "zod";

// ── Validation Schema (NOT exported from "use server" file) ──
// ✅ Move schema to a separate file or keep it here but DON'T export it
const experienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  companyUrl: z.string().url("Invalid URL").optional().nullable(),
  location: z.string().optional().nullable(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
  techStack: z.array(z.string()).default([]),
  order: z.number().int().default(0),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

// ── Get All Experiences ──
export async function getExperiences(): Promise<BlogActionResult<Experience[]>> {
  try {
    await requireAdmin();
    const experiences = await db.experience.findMany({
      orderBy: [{ order: "asc" }, { startDate: "desc" }],
    });
    return { success: true, data: experiences };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Get Single Experience ──
export async function getExperience(id: string): Promise<BlogActionResult<Experience>> {
  try {
    await requireAdmin();
    const experience = await db.experience.findUnique({ where: { id } });
    if (!experience) {
      return { success: false, error: "Experience not found." };
    }
    return { success: true, data: experience };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Create Experience ──
export async function createExperience(data: ExperienceFormValues): Promise<BlogActionResult<Experience>> {
  try {
    await requireAdmin();

    const validated = experienceSchema.parse(data);

    const experience = await db.experience.create({
      data: {
        role: validated.role,
        company: validated.company,
        companyUrl: validated.companyUrl,
        location: validated.location,
        startDate: new Date(validated.startDate),
        endDate: validated.endDate ? new Date(validated.endDate) : null,
        isCurrent: validated.isCurrent,
        description: validated.description,
        techStack: validated.techStack,
        order: validated.order,
      },
    });

    revalidatePath("/admin/experience");
    return { success: true, data: experience };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Update Experience ──
export async function updateExperience(
  id: string,
  data: Partial<ExperienceFormValues>
): Promise<BlogActionResult<Experience>> {
  try {
    await requireAdmin();

    const existing = await db.experience.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Experience not found." };
    }

    const experience = await db.experience.update({
      where: { id },
      data: {
        role: data.role,
        company: data.company,
        companyUrl: data.companyUrl,
        location: data.location,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : data.endDate === null ? null : undefined,
        isCurrent: data.isCurrent,
        description: data.description,
        techStack: data.techStack,
        order: data.order,
      },
    });

    revalidatePath("/admin/experience");
    return { success: true, data: experience };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Delete Experience ──
export async function deleteExperience(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const existing = await db.experience.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Experience not found." };
    }

    await db.experience.delete({ where: { id } });

    revalidatePath("/admin/experience");
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Reorder Experiences ──
export async function reorderExperiences(orderedIds: string[]): Promise<BlogActionResult<void>> {
  try {
    await requireAdmin();

    await Promise.all(
      orderedIds.map((id, index) =>
        db.experience.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    revalidatePath("/admin/experience");
    return { success: true };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}