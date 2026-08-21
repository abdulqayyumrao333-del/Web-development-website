"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Award, Calendar, ExternalLink, Eye } from "lucide-react";
import type { Certificate } from "@prisma/client";
import { toast } from "sonner";
import { deleteCertificate } from "@/app/(admin)/admin/certificates/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import Image from "next/image";

interface CertificatesTableProps {
  certificates: Certificate[];
}

export function CertificatesTable({ certificates: initialCertificates }: CertificatesTableProps) {
  const router = useRouter();
  const [certificates, setCertificates] = useState(initialCertificates);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string }>({
    open: false,
  });

  async function handleDelete(id: string) {
    const result = await deleteCertificate(id);
    if (result.success) {
      toast.success("Certificate deleted successfully.");
      setCertificates(certificates.filter((c) => c.id !== id));
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setDeleteDialog({ open: false });
  }

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {certificates.length} certificate{certificates.length !== 1 ? "s" : ""}
        </p>
        <Link href="/admin/certificates/new">
          <button className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-4 py-2 text-sm text-white hover:bg-accent-indigo/90 transition-all duration-300">
            <Plus className="h-4 w-4" />
            Add Certificate
          </button>
        </Link>
      </div>

      {certificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-xl">
          <Award className="h-12 w-12 text-muted-foreground/30 mb-4" strokeWidth={1.5} />
          <p className="text-muted-foreground">No certificates yet.</p>
          <p className="text-sm text-muted-foreground/60">Add your professional certifications.</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">Certificate</th>
                <th className="px-4 py-3 text-left">Issuer</th>
                <th className="px-4 py-3 text-left">Issue Date</th>
                <th className="px-4 py-3 text-left">Verified</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id} className="border-t hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {cert.image ? (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-accent-indigo/10">
                          <Image
                            src={cert.image}
                            alt={cert.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-indigo/5 border border-accent-indigo/10">
                          <Award className="h-5 w-5 text-accent-indigo/40" strokeWidth={1.75} />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{cert.title}</p>
                        {cert.credentialUrl && (
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-accent-indigo hover:underline"
                          >
                            Verify <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{cert.issuer}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                      <span>{formatDate(cert.issueDate)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {cert.credentialUrl ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Verified
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/50">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/certificates/${cert.id}`}>
                        <button className="inline-flex items-center gap-1 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-2.5 py-1 text-xs text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => setDeleteDialog({ open: true, id: cert.id })}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-500/10 bg-rose-500/5 px-2.5 py-1 text-xs text-rose-500 hover:bg-rose-500/10 transition-all duration-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Delete
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
        title="Delete Certificate"
        description="Are you sure you want to delete this certificate? This action cannot be undone."
      />
    </>
  );
}