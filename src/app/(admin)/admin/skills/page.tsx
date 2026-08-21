import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { SkillsTable } from "@/components/admin/skills-table";

export const metadata = { title: "Manage Skills" };

export default async function AdminSkillsPage() {
  let skills: Awaited<ReturnType<typeof db.skill.findMany>> = [];
  try {
    skills = await db.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });
  } catch {
    skills = [];
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Manage Skills</h1>
          <p className="mt-1 text-sm text-text-secondary">Add or reorder skills and proficiency levels.</p>
        </div>
        <Button asChild>
          <Link href="/admin/skills/new"><Plus className="mr-2 h-4 w-4" /> New Skill</Link>
        </Button>
      </div>

      <div className="mt-8">
        <SkillsTable skills={skills} />
      </div>
    </div>
  );
}
