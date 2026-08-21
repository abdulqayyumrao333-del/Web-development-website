import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Education",
  description: "Academic background and continued learning.",
  path: "/education",
});

export default function EducationTimelinePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Education</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">
        Academic background and continued learning.
      </p>

      {/* TODO: implement EducationTimeline section — this is an architecture stub. */}
      <div className="mt-12 rounded-md border border-dashed border-border p-8 text-sm text-text-muted">
        EducationTimeline content goes here.
      </div>
    </section>
  );
}
