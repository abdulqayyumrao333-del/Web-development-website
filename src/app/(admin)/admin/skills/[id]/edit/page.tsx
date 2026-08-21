import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { SkillForm } from "@/components/admin/skill-form";
import { updateSkill } from "@/app/(admin)/admin/skills/actions";

export const metadata = { title: "Edit Skill" };

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const skill = await db.skill.findUnique({ where: { id } });
  if (!skill) notFound();

  const updateWithId = updateSkill.bind(null, id);

  return (
    <div>
      <Link href="/admin/skills" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to skills
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Edit: {skill.name}</h1>
      <div className="mt-8">
        <SkillForm skill={skill} action={updateWithId} />
      </div>
    </div>
  );
}
