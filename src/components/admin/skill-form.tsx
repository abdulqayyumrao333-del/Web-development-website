"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Skill } from "@/types";

const LEVEL_OPTIONS = ["", "LEARNING", "BEGINNER", "INTERMEDIATE", "ADVANCED"] as const;

export function SkillForm({
  skill,
  action,
}: {
  skill?: Skill;
  action: (formData: FormData) => Promise<void>;
}) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      action={async (formData) => {
        setSubmitting(true);
        await action(formData);
      }}
      className="max-w-2xl space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Name</label>
          <Input name="name" defaultValue={skill?.name} required className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Category</label>
          <Input
            name="category"
            defaultValue={skill?.category}
            placeholder="Frontend, Backend, AI & Automation, Databases, Tools..."
            required
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Description (optional)</label>
        <Textarea name="description" defaultValue={skill?.description ?? ""} rows={2} className="mt-1.5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Self-assessed level (optional — never guess this for someone else)</label>
          <select
            name="level"
            defaultValue={skill?.level ?? ""}
            className="mt-1.5 h-10 w-full rounded-sm border border-border bg-bg-surface px-3 text-sm outline-none focus:border-accent-indigo"
          >
            {LEVEL_OPTIONS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl === "" ? "Not yet rated" : lvl.charAt(0) + lvl.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Learned date (optional — for the Technology Timeline)</label>
          <Input
            name="learnedAt"
            type="date"
            defaultValue={skill?.learnedAt ? new Date(skill.learnedAt).toISOString().slice(0, 10) : ""}
            className="mt-1.5"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Icon (optional, icon name or URL)</label>
          <Input name="icon" defaultValue={skill?.icon ?? ""} className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Display order</label>
          <Input name="order" type="number" defaultValue={skill?.order ?? 0} className="mt-1.5" />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="visible" defaultChecked={skill?.visible ?? true} className="h-4 w-4" />
        Visible publicly
      </label>

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Saving..." : skill ? "Save changes" : "Create skill"}
      </Button>
    </form>
  );
}
