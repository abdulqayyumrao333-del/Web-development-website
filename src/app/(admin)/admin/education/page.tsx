import type { Metadata } from "next";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { getEducations } from "./actions";
import { EducationTable } from "@/components/admin/education/education-table";

export const metadata: Metadata = {
  title: "Education | Admin",
  description: "Manage education entries",
};

export default async function EducationPage() {
  await requireAdmin();

  const result = await getEducations();

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
        <h1 className="text-3xl font-bold">Education</h1>
        <p className="text-muted-foreground">Manage your academic background</p>
      </div>

      <EducationTable educations={result.data || []} />
    </div>
  );
}