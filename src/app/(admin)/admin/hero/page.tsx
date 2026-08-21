import type { Metadata } from "next";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { getHeroSettings } from "./actions";
import { HeroForm } from "@/components/admin/hero/hero-form";

export const metadata: Metadata = {
  title: "Hero Section | Admin",
  description: "Edit homepage hero section",
};

export default async function HeroPage() {
  await requireAdmin();

  const result = await getHeroSettings();

  if (!result.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-destructive">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <HeroForm initialData={result.data} />
    </div>
  );
}