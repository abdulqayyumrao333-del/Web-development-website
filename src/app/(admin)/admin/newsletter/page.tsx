import type { Metadata } from "next";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { getSubscribers, exportSubscribers } from "./actions";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Newsletter | Admin",
  description: "Manage newsletter subscribers",
};

export default async function NewsletterAdminPage() {
  await requireAdmin();
  const result = await getSubscribers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Newsletter</h1>
          <p className="text-muted-foreground">Manage your subscribers</p>
        </div>
        <Button variant="secondary" asChild>
          <a href="/api/newsletter/export" download>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </a>
        </Button>
      </div>

      {result.success && result.data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center border rounded-lg">
          <p className="text-muted-foreground">No subscribers yet.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {result.data?.map((sub) => (
                <tr key={sub.id} className="border-t">
                  <td className="px-4 py-3">{sub.email}</td>
                  <td className="px-4 py-3">{sub.name || "—"}</td>
                  <td className="px-4 py-3">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}