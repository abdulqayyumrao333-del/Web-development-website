import type { Metadata } from "next";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { getCertificates } from "./actions";
import { CertificatesTable } from "@/components/admin/certificates/certificates-table";

export const metadata: Metadata = {
  title: "Certificates | Admin",
  description: "Manage certificates and credentials",
};

export default async function CertificatesPage() {
  await requireAdmin();

  const result = await getCertificates();

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
        <h1 className="text-3xl font-bold">Certificates</h1>
        <p className="text-muted-foreground">Manage your professional certifications</p>
      </div>

      <CertificatesTable certificates={result.data || []} />
    </div>
  );
}