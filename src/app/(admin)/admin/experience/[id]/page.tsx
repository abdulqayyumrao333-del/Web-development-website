import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { getExperience } from "../actions";
import { ExperienceForm } from "@/components/admin/experience/experience-form";

interface EditExperiencePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
  await requireAdmin();

  const { id } = await params;
  const result = await getExperience(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/experience">
          <button className="inline-flex items-center gap-2 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-2 text-sm text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Edit Experience</h1>
          <p className="text-sm text-muted-foreground">Update work experience entry</p>
        </div>
      </div>

      <ExperienceForm initialData={result.data} isEditing />
    </div>
  );
}