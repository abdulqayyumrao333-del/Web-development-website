"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

const skillSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  category: z.string().min(1, "Category is required").max(50),
  description: z.string().max(500).optional().or(z.literal("")),
  icon: z.string().max(200).optional().or(z.literal("")),
  level: z.enum(["LEARNING", "BEGINNER", "INTERMEDIATE", "ADVANCED", ""]).optional(),
  learnedAt: z.string().optional().or(z.literal("")),
  order: z.coerce.number().int().default(0),
  visible: z.boolean().default(true),
});

function parseSkillForm(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    category: formData.get("category") as string,
    description: (formData.get("description") as string) || "",
    icon: (formData.get("icon") as string) || "",
    level: (formData.get("level") as string) || "",
    learnedAt: (formData.get("learnedAt") as string) || "",
    order: formData.get("order") as string,
    visible: formData.get("visible") === "on",
  };
  const parsed = skillSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.errors.map((e) => e.message).join(", "));
  }
  return {
    name: parsed.data.name,
    category: parsed.data.category,
    description: parsed.data.description || null,
    icon: parsed.data.icon || null,
    level: parsed.data.level || null,
    learnedAt: parsed.data.learnedAt ? new Date(parsed.data.learnedAt) : null,
    order: parsed.data.order,
    visible: parsed.data.visible,
  };
}

export async function createSkill(formData: FormData) {
  await requireAdmin();
  const data = parseSkillForm(formData);
  await db.skill.create({ data: data as Parameters<typeof db.skill.create>[0]["data"] });
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function updateSkill(id: string, formData: FormData) {
  await requireAdmin();
  const data = parseSkillForm(formData);
  await db.skill.update({ where: { id }, data: data as Parameters<typeof db.skill.update>[0]["data"] });
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string) {
  await requireAdmin();
  await db.skill.delete({ where: { id } });
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
}

export async function bulkDeleteSkills(ids: string[]) {
  await requireAdmin();
  await db.skill.deleteMany({ where: { id: { in: ids } } });
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
}

export async function toggleSkillVisibility(id: string, visible: boolean) {
  await requireAdmin();
  await db.skill.update({ where: { id }, data: { visible } });
  revalidatePath("/admin/skills");
  revalidatePath("/skills");
}
