import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Testimonials",
  description: "What clients and collaborators have said.",
  path: "/testimonials",
});

export default function TestimonialsGridPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Testimonials</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">
        What clients and collaborators have said.
      </p>

      {/* TODO: implement TestimonialsGrid section — this is an architecture stub. */}
      <div className="mt-12 rounded-md border border-dashed border-border p-8 text-sm text-text-muted">
        TestimonialsGrid content goes here.
      </div>
    </section>
  );
}
