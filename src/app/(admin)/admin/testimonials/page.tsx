import type { Metadata } from "next";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { getTestimonials } from "./actions";
import { TestimonialsTable } from "@/components/admin/testimonials/testimonials-table";

export const metadata: Metadata = {
  title: "Testimonials | Admin",
  description: "Manage client testimonials and reviews",
};

export default async function TestimonialsPage() {
  await requireAdmin();

  const result = await getTestimonials();

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
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <p className="text-muted-foreground">Manage client feedback and reviews</p>
      </div>

      <TestimonialsTable testimonials={result.data || []} />
    </div>
  );
}