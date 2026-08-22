"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError } from "@/app/(admin)/admin/blogs/action-helpers";
import { z } from "zod";

// ── Validation Schema ──
const heroSettingsSchema = z.object({
  headline: z.string().min(1, "Headline is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  feature1: z.string().optional(),
  feature2: z.string().optional(),
  feature3: z.string().optional(),
  stat1Label: z.string().optional(),
  stat1Value: z.string().optional(),
  stat2Label: z.string().optional(),
  stat2Value: z.string().optional(),
  stat3Label: z.string().optional(),
  stat3Value: z.string().optional(),
  technologies: z.string().optional(),
  ctaPrimaryText: z.string().optional(),
  ctaPrimaryLink: z.string().optional(),
  ctaSecondaryText: z.string().optional(),
  ctaSecondaryLink: z.string().optional(),
  githubUrl: z.string().url("Invalid GitHub URL").optional(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional(),
  emailAddress: z.string().email("Invalid email").optional(),
  availabilityText: z.string().optional(),
  availabilityStatus: z.string().optional(),
  profileImage: z.string().optional(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
});

type HeroSettingsFormValues = z.infer<typeof heroSettingsSchema>;

// ── Get Hero Settings ──
export async function getHeroSettings(): Promise<BlogActionResult<any>> {
  try {
    await requireAdmin();
    
    let settings = await db.heroSettings.findUnique({
      where: { id: "singleton" },
    });

    // If no settings exist, create default ones
    if (!settings) {
      settings = await db.heroSettings.create({
        data: {
          id: "singleton",
        },
      });
    }

    return { success: true, data: settings };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Update Hero Settings ──
export async function updateHeroSettings(
  data: HeroSettingsFormValues
): Promise<BlogActionResult<any>> {
  try {
    await requireAdmin();

    const validated = heroSettingsSchema.parse(data);

    const settings = await db.heroSettings.upsert({
      where: { id: "singleton" },
      update: {
        headline: validated.headline,
        subtitle: validated.subtitle,
        feature1: validated.feature1,
        feature2: validated.feature2,
        feature3: validated.feature3,
        stat1Label: validated.stat1Label,
        stat1Value: validated.stat1Value,
        stat2Label: validated.stat2Label,
        stat2Value: validated.stat2Value,
        stat3Label: validated.stat3Label,
        stat3Value: validated.stat3Value,
        technologies: validated.technologies,
        ctaPrimaryText: validated.ctaPrimaryText,
        ctaPrimaryLink: validated.ctaPrimaryLink,
        ctaSecondaryText: validated.ctaSecondaryText,
        ctaSecondaryLink: validated.ctaSecondaryLink,
        githubUrl: validated.githubUrl,
        linkedinUrl: validated.linkedinUrl,
        emailAddress: validated.emailAddress,
        availabilityText: validated.availabilityText,
        availabilityStatus: validated.availabilityStatus,
        profileImage: validated.profileImage,
        seoTitle: validated.seoTitle,
        seoDescription: validated.seoDescription,
      },
      create: {
        id: "singleton",
        ...validated,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true, data: settings };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Reset Hero Settings to Default ──
export async function resetHeroSettings(): Promise<BlogActionResult<any>> {
  try {
    await requireAdmin();

    const settings = await db.heroSettings.upsert({
      where: { id: "singleton" },
      update: {},
      create: {
        id: "singleton",
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/hero");
    return { success: true, data: settings };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}