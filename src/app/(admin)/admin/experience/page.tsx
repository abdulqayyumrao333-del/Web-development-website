import type { Metadata } from "next";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { getExperiences } from "./actions";
import { ExperienceTable } from "@/components/admin/experience/experience-table";

export const metadata: Metadata = {
  title: "Experience | Admin",
  description: "Manage work experience entries",
};

export default async function ExperiencePage() {
  await requireAdmin();

  const result = await getExperiences();

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-destructive">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Experience</h1>
        <p className="text-muted-foreground">Manage your work history</p>
      </div>

      <ExperienceTable experiences={result.data || []} />
    </div>
  );
}