"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Pencil, Trash2, Plus, ArrowRight, 
  ToggleLeft, ToggleRight, Play, Link2 
} from "lucide-react";
import type { Redirect } from "@prisma/client";
import { toast } from "sonner";
import { deleteRedirect, toggleRedirectStatus, testRedirect } from "@/app/(admin)/admin/redirects/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";

interface RedirectsTableProps {
  redirects: Redirect[];
}

export function RedirectsTable({ redirects: initialRedirects }: RedirectsTableProps) {
  const router = useRouter();
  const [redirects, setRedirects] = useState(initialRedirects);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string }>({
    open: false,
  });
  const [testing, setTesting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    const result = await deleteRedirect(id);
    if (result.success) {
      toast.success("Redirect deleted successfully.");
      setRedirects(redirects.filter((r) => r.id !== id));
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setDeleteDialog({ open: false });
  }

  async function handleToggle(id: string) {
    const result = await toggleRedirectStatus(id);
    if (result.success) {
      toast.success(`Redirect ${result.data.enabled ? "enabled" : "disabled"} successfully.`);
      setRedirects(redirects.map((r) => 
        r.id === id ? { ...r, enabled: !r.enabled } : r
      ));
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  async function handleTest(id: string) {
    setTesting(id);
    const redirect = redirects.find((r) => r.id === id);
    if (!redirect) {
      toast.error("Redirect not found.");
      setTesting(null);
      return;
    }

    const result = await testRedirect(redirect.fromPath);
    setTesting(null);

    if (result.success && result.data) {
      toast.success(
        `${redirect.fromPath} → ${result.data.toPath} (${result.data.statusCode})`
      );
    } else {
      toast.error(result.error || "Test failed.");
    }
  }

  function getStatusCodeLabel(code: number) {
    return code === 308 ? "Permanent (308)" : "Temporary (307)";
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {redirects.length} redirect{redirects.length !== 1 ? "s" : ""}
        </p>
        <Link href="/admin/redirects/new">
          <button className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-4 py-2 text-sm text-white hover:bg-accent-indigo/90 transition-all duration-300">
            <Plus className="h-4 w-4" />
            Add Redirect
          </button>
        </Link>
      </div>

      {redirects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-xl">
          <Link2 className="h-12 w-12 text-muted-foreground/30 mb-4" strokeWidth={1.5} />
          <p className="text-muted-foreground">No redirects yet.</p>
          <p className="text-sm text-muted-foreground/60">Add redirects to manage URL changes.</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">From</th>
                <th className="px-4 py-3 text-left">To</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {redirects.map((redirect) => (
                <tr key={redirect.id} className="border-t hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm bg-muted/30 px-2 py-1 rounded">
                      {redirect.fromPath}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30" strokeWidth={1.5} />
                      <span className="font-mono text-sm bg-accent-indigo/5 px-2 py-1 rounded border border-accent-indigo/10">
                        {redirect.toPath}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                      redirect.statusCode === 308
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {getStatusCodeLabel(redirect.statusCode)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${
                      redirect.enabled
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-rose-500/10 text-rose-500"
                    }`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${
                        redirect.enabled ? "bg-emerald-400" : "bg-rose-400"
                      }`} />
                      {redirect.enabled ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => handleTest(redirect.id)}
                        disabled={testing === redirect.id}
                        className="inline-flex items-center gap-1 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-2.5 py-1 text-xs text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300 disabled:opacity-50"
                        title="Test redirect"
                      >
                        <Play className="h-3.5 w-3.5" strokeWidth={1.75} />
                        {testing === redirect.id ? "Testing..." : "Test"}
                      </button>
                      <button
                        onClick={() => handleToggle(redirect.id)}
                        className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs transition-all duration-300 ${
                          redirect.enabled
                            ? "border-emerald-500/10 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500/10"
                            : "border-rose-500/10 bg-rose-500/5 text-rose-500 hover:bg-rose-500/10"
                        }`}
                        title={redirect.enabled ? "Disable" : "Enable"}
                      >
                        {redirect.enabled ? (
                          <ToggleRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                        ) : (
                          <ToggleLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                        )}
                        {redirect.enabled ? "Disable" : "Enable"}
                      </button>
                      <Link href={`/admin/redirects/${redirect.id}`}>
                        <button className="inline-flex items-center gap-1 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-2.5 py-1 text-xs text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => setDeleteDialog({ open: true, id: redirect.id })}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-500/10 bg-rose-500/5 px-2.5 py-1 text-xs text-rose-500 hover:bg-rose-500/10 transition-all duration-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDeleteDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        onConfirm={() => deleteDialog.id && handleDelete(deleteDialog.id)}
        title="Delete Redirect"
        description="Are you sure you want to delete this redirect? This action cannot be undone."
      />
    </>
  );
}