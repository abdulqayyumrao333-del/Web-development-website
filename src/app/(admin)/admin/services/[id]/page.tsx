import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { getService } from "@/app/(admin)/admin/services/actions";
import { ServiceForm } from "@/components/admin/services/service-form";

export const metadata: Metadata = {
  title: "Edit Service | Admin",
  description: "Edit a service",
};

interface EditServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  await requireAdmin();

  const { id } = await params;
  const result = await getService(id);

  if (!result.success || !result.data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Service</h1>
        <p className="text-muted-foreground">Update your service details</p>
      </div>

      <ServiceForm initialData={result.data} isEditing />
    </div>
  );
}