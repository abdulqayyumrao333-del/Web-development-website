"use server";

import { revalidatePath } from "next/cache";
import type { Testimonial } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError } from "@/app/(admin)/admin/blogs/action-helpers";
import { z } from "zod";

// ── Validation Schema ──
const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  quote: z.string().min(10, "Quote must be at least 10 characters"),
  rating: z.number().int().min(1).max(5).default(5),
  order: z.number().int().default(0),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

// ── Get All Testimonials ──
export async function getTestimonials(): Promise<BlogActionResult<Testimonial[]>> {
  try {
    await requireAdmin();
    const testimonials = await db.testimonial.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return { success: true, data: testimonials };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Get Single Testimonial ──
export async function getTestimonial(id: string): Promise<BlogActionResult<Testimonial>> {
  try {
    await requireAdmin();
    const testimonial = await db.testimonial.findUnique({ where: { id } });
    if (!testimonial) {
      return { success: false, error: "Testimonial not found." };
    }
    return { success: true, data: testimonial };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Create Testimonial ──
export async function createTestimonial(data: TestimonialFormValues): Promise<BlogActionResult<Testimonial>> {
  try {
    await requireAdmin();

    const validated = testimonialSchema.parse(data);

    const testimonial = await db.testimonial.create({
      data: {
        name: validated.name,
        role: validated.role,
        company: validated.company,
        avatar: validated.avatar,
        quote: validated.quote,
        rating: validated.rating,
        order: validated.order,
      },
    });

    revalidatePath("/admin/testimonials");
    return { success: true, data: testimonial };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Update Testimonial ──
export async function updateTestimonial(
  id: string,
  data: Partial<TestimonialFormValues>
): Promise<BlogActionResult<Testimonial>> {
  try {
    await requireAdmin();

    const existing = await db.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Testimonial not found." };
    }

    const testimonial = await db.testimonial.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        company: data.company,
        avatar: data.avatar,
        quote: data.quote,
        rating: data.rating,
        order: data.order,
      },
    });

    revalidatePath("/admin/testimonials");
    return { success: true, data: testimonial };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Delete Testimonial ──
export async function deleteTestimonial(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const existing = await db.testimonial.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Testimonial not found." };
    }

    await db.testimonial.delete({ where: { id } });

    revalidatePath("/admin/testimonials");
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Reorder Testimonials ──
export async function reorderTestimonials(orderedIds: string[]): Promise<BlogActionResult<void>> {
  try {
    await requireAdmin();

    await Promise.all(
      orderedIds.map((id, index) =>
        db.testimonial.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    revalidatePath("/admin/testimonials");
    return { success: true, data: undefined };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}