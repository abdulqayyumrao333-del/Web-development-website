import type { Metadata } from "next";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { ServiceForm } from "@/components/admin/services/service-form";

export const metadata: Metadata = {
  title: "Create Service | Admin",
  description: "Create a new service",
};

export default async function NewServicePage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Service</h1>
        <p className="text-muted-foreground">Add a new service to your portfolio</p>
      </div>

      <ServiceForm />
    </div>
  );
}