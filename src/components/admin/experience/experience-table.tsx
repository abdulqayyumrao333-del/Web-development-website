"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Briefcase, Calendar } from "lucide-react";
import type { Experience } from "@prisma/client";
import { toast } from "sonner";
import { deleteExperience } from "@/app/(admin)/admin/experience/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";

interface ExperienceTableProps {
  experiences: Experience[];
}

export function ExperienceTable({ experiences: initialExperiences }: ExperienceTableProps) {
  const router = useRouter();
  const [experiences, setExperiences] = useState(initialExperiences);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string }>({
    open: false,
  });

  async function handleDelete(id: string) {
    const result = await deleteExperience(id);
    if (result.success) {
      toast.success("Experience deleted successfully.");
      setExperiences(experiences.filter((e) => e.id !== id));
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
          {experiences.length} experience{experiences.length !== 1 ? "s" : ""}
        </p>
        <Link href="/admin/experience/new">
          <button className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-4 py-2 text-sm text-white hover:bg-accent-indigo/90 transition-all duration-300">
            <Plus className="h-4 w-4" />
            Add Experience
          </button>
        </Link>
      </div>

      {experiences.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-xl">
          <Briefcase className="h-12 w-12 text-muted-foreground/30 mb-4" strokeWidth={1.5} />
          <p className="text-muted-foreground">No experience entries yet.</p>
          <p className="text-sm text-muted-foreground/60">Add your work history to showcase your experience.</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Period</th>
                <th className="px-4 py-3 text-left">Tech Stack</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((exp) => (
                <tr key={exp.id} className="border-t hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{exp.role}</td>
                  <td className="px-4 py-3">
                    {exp.companyUrl ? (
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-indigo hover:underline"
                      >
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                    {exp.location && (
                      <span className="block text-xs text-muted-foreground">{exp.location}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                      <span>
                        {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                      </span>
                      {exp.isCurrent && (
                        <span className="ml-1.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {exp.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.techStack.length > 3 && (
                        <span className="text-[10px] text-muted-foreground">
                          +{exp.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/experience/${exp.id}`}>
                        <button className="inline-flex items-center gap-1 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-2.5 py-1 text-xs text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => setDeleteDialog({ open: true, id: exp.id })}
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
        title="Delete Experience"
        description="Are you sure you want to delete this experience entry? This action cannot be undone."
      />
    </>
  );
}