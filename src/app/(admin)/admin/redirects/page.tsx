import type { Metadata } from "next";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { getRedirects } from "./actions";
import { RedirectsTable } from "@/components/admin/redirects/redirects-table";

export const metadata: Metadata = {
  title: "Redirects | Admin",
  description: "Manage URL redirects",
};

export default async function RedirectsPage() {
  await requireAdmin();

  const result = await getRedirects();

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
        <h1 className="text-3xl font-bold">Redirects</h1>
        <p className="text-muted-foreground">Manage URL redirects for your website</p>
      </div>

      <RedirectsTable redirects={result.data || []} />
    </div>
  );
}