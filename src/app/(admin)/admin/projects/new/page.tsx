import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectForm } from "@/components/admin/project-form";
import { createProject } from "@/app/(admin)/admin/projects/actions";

export const metadata = { title: "New Project" };

export default function NewProjectPage() {
  return (
    <div>
      <Link href="/admin/projects" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">New Project</h1>
      <div className="mt-8">
        <ProjectForm action={createProject} />
      </div>
    </div>
  );
}
