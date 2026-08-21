import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Certificates",
  description: "Certifications and completed courses.",
  path: "/certificates",
});

export default function CertificatesGridPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Certificates</h1>
      <p className="mt-4 max-w-2xl text-text-secondary">
        Certifications and completed courses.
      </p>

      {/* TODO: implement CertificatesGrid section — this is an architecture stub. */}
      <div className="mt-12 rounded-md border border-dashed border-border p-8 text-sm text-text-muted">
        CertificatesGrid content goes here.
      </div>
    </section>
  );
}
