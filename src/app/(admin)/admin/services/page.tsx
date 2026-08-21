import type { Metadata } from "next";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { getServices } from "@/app/(admin)/admin/services/actions";
import { ServicesTable } from "@/components/admin/services/services-table";

export const metadata: Metadata = {
  title: "Services | Admin",
  description: "Manage your services",
};

export default async function ServicesPage() {
  await requireAdmin();

  const result = await getServices();

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
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="text-muted-foreground">Manage your services</p>
      </div>

      <ServicesTable services={result.data || []} />
    </div>
  );
}