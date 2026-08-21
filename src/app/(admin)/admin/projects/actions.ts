"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function parseListField(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== "string") return [];
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function createProject(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);

  await db.project.create({
    data: {
      title,
      slug,
      summary: formData.get("summary") as string,
      description: formData.get("description") as string,
      coverImage: (formData.get("coverImage") as string) || "/images/projects/placeholder-cover.svg",
      techStack: parseListField(formData.get("techStack")),
      categories: parseListField(formData.get("categories")),
      liveUrl: (formData.get("liveUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      featured: formData.get("featured") === "on",
      visible: formData.get("visible") === "on",
      order: Number(formData.get("order")) || 0,
      caseStudyProblem: (formData.get("caseStudyProblem") as string) || null,
      caseStudySolution: (formData.get("caseStudySolution") as string) || null,
      caseStudyChallenges: (formData.get("caseStudyChallenges") as string) || null,
      caseStudyLessons: (formData.get("caseStudyLessons") as string) || null,
      seoTitle: (formData.get("seoTitle") as string) || null,
      seoDescription: (formData.get("seoDescription") as string) || null,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function updateProject(id: string, formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;

  await db.project.update({
    where: { id },
    data: {
      title,
      slug: (formData.get("slug") as string) || slugify(title),
      summary: formData.get("summary") as string,
      description: formData.get("description") as string,
      coverImage: (formData.get("coverImage") as string) || "/images/projects/placeholder-cover.svg",
      techStack: parseListField(formData.get("techStack")),
      categories: parseListField(formData.get("categories")),
      liveUrl: (formData.get("liveUrl") as string) || null,
      githubUrl: (formData.get("githubUrl") as string) || null,
      featured: formData.get("featured") === "on",
      visible: formData.get("visible") === "on",
      order: Number(formData.get("order")) || 0,
      caseStudyProblem: (formData.get("caseStudyProblem") as string) || null,
      caseStudySolution: (formData.get("caseStudySolution") as string) || null,
      caseStudyChallenges: (formData.get("caseStudyChallenges") as string) || null,
      caseStudyLessons: (formData.get("caseStudyLessons") as string) || null,
      seoTitle: (formData.get("seoTitle") as string) || null,
      seoDescription: (formData.get("seoDescription") as string) || null,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await db.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function toggleProjectVisibility(id: string, visible: boolean) {
  await requireAdmin();
  await db.project.update({ where: { id }, data: { visible } });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
