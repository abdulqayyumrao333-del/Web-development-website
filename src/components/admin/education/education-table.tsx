"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, GraduationCap, Calendar } from "lucide-react";
import type { Education } from "@prisma/client";
import { toast } from "sonner";
import { deleteEducation } from "@/app/(admin)/admin/education/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";

interface EducationTableProps {
  educations: Education[];
}

export function EducationTable({ educations: initialEducations }: EducationTableProps) {
  const router = useRouter();
  const [educations, setEducations] = useState(initialEducations);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string }>({
    open: false,
  });

  async function handleDelete(id: string) {
    const result = await deleteEducation(id);
    if (result.success) {
      toast.success("Education deleted successfully.");
      setEducations(educations.filter((e) => e.id !== id));
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setDeleteDialog({ open: false });
  }

  // ── Format Date ──
  function formatDate(date: Date | null) {
    if (!date) return "Present";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {educations.length} education{educations.length !== 1 ? "s" : ""}
        </p>
        <Link href="/admin/education/new">
          <button className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-4 py-2 text-sm text-white hover:bg-accent-indigo/90 transition-all duration-300">
            <Plus className="h-4 w-4" />
            Add Education
          </button>
        </Link>
      </div>

      {educations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-xl">
          <GraduationCap className="h-12 w-12 text-muted-foreground/30 mb-4" strokeWidth={1.5} />
          <p className="text-muted-foreground">No education entries yet.</p>
          <p className="text-sm text-muted-foreground/60">Add your academic background.</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">Degree</th>
                <th className="px-4 py-3 text-left">Institution</th>
                <th className="px-4 py-3 text-left">Period</th>
                <th className="px-4 py-3 text-left">Order</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {educations.map((edu) => (
                <tr key={edu.id} className="border-t hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{edu.degree}</td>
                  <td className="px-4 py-3">{edu.institution}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                      <span>
                        {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">{edu.order}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/education/${edu.id}`}>
                        <button className="inline-flex items-center gap-1 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-2.5 py-1 text-xs text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => setDeleteDialog({ open: true, id: edu.id })}
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
        title="Delete Education"
        description="Are you sure you want to delete this education entry? This action cannot be undone."
      />
    </>
  );
}