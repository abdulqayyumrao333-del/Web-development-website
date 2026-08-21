import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";
import { RedirectForm } from "@/components/admin/redirects/redirect-form";

export const metadata: Metadata = {
  title: "Add Redirect | Admin",
  description: "Add a new URL redirect",
};

export default async function NewRedirectPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/redirects">
          <button className="inline-flex items-center gap-2 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-3 py-2 text-sm text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
            Back
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Add Redirect</h1>
          <p className="text-sm text-muted-foreground">Add a new URL redirect rule</p>
        </div>
      </div>

      <RedirectForm />
    </div>
  );
}