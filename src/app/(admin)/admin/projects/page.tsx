import Link from "next/link";
import { Plus, Star, Eye, EyeOff, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { DeleteProjectButton } from "@/components/admin/delete-project-button";

export const metadata = { title: "Manage Projects" };

export default async function AdminProjectsPage() {
  let projects: Awaited<ReturnType<typeof db.project.findMany>> = [];
  try {
    projects = await db.project.findMany({ orderBy: { order: "asc" } });
  } catch {
    projects = [];
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Manage Projects</h1>
          <p className="mt-1 text-sm text-text-secondary">Create, edit, reorder, and feature projects.</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new"><Plus className="mr-2 h-4 w-4" /> New Project</Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="mt-8 rounded-md border border-dashed border-border p-8 text-center text-sm text-text-muted">
          No projects yet — create the first one.
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-bg-surface-2 text-left text-xs uppercase text-text-muted">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Categories</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {project.featured && <Star className="h-3.5 w-3.5 shrink-0 text-warning" />}
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-xs text-text-muted">/{project.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{project.categories.join(", ") || "—"}</td>
                  <td className="px-4 py-3 font-mono text-text-secondary">{project.order}</td>
                  <td className="px-4 py-3">
                    <span className={`flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${
                      project.visible ? "border-success/30 text-success" : "border-text-muted/30 text-text-muted"
                    }`}>
                      {project.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      {project.visible ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <a
                        href={`/projects/${project.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-text-muted hover:text-text-primary"
                        aria-label="View live"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <Link href={`/admin/projects/${project.id}/edit`} className="text-accent-indigo hover:underline">
                        Edit
                      </Link>
                      <DeleteProjectButton id={project.id} title={project.title} />
                    </div>
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
