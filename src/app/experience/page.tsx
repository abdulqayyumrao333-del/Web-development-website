import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import { WorldMap } from "@/components/features/world-map";

export const metadata: Metadata = generatePageMetadata({
  title: "Experience",
  description: "Professional experience and freelance engagements over the years.",
  path: "/experience",
});

export default function ExperienceTimelinePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Experience</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">
        Professional experience and freelance engagements over the years.
      </p>

      <div className="mt-12">
        <WorldMap />
      </div>

      {/* TODO: implement ExperienceTimeline section — this is an architecture stub. */}
      <div className="mt-12 rounded-md border border-dashed border-border p-8 text-sm text-text-muted">
        ExperienceTimeline content goes here.
      </div>
    </section>
  );
}
