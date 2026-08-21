import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SkillForm } from "@/components/admin/skill-form";
import { createSkill } from "@/app/(admin)/admin/skills/actions";

export const metadata = { title: "New Skill" };

export default function NewSkillPage() {
  return (
    <div>
      <Link href="/admin/skills" className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to skills
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">New Skill</h1>
      <div className="mt-8">
        <SkillForm action={createSkill} />
      </div>
    </div>
  );
}
