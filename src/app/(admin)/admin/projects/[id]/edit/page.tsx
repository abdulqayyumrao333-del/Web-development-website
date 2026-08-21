import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { ProjectForm } from "@/components/admin/project-form";
import { updateProject } from "@/app/(admin)/admin/projects/actions";

export const metadata = { title: "Edit Project" };

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await db.project.findUnique({ where: { id } });
  if (!project) notFound();

  const updateWithId = updateProject.bind(null, id);

  return (
    <div>
      <Link href="/admin/projects" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Edit: {project.title}</h1>
      <div className="mt-8">
        <ProjectForm project={project} action={updateWithId} />
      </div>
    </div>
  );
}
