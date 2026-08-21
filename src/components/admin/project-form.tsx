"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

export function ProjectForm({
  project,
  action,
}: {
  project?: Project;
  action: (formData: FormData) => Promise<void>;
}) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      action={async (formData) => {
        setSubmitting(true);
        await action(formData);
      }}
      className="max-w-3xl space-y-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input name="title" defaultValue={project?.title} required className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Slug (leave blank to auto-generate)</label>
          <Input name="slug" defaultValue={project?.slug} className="mt-1.5" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Summary (short, used on cards)</label>
        <Textarea name="summary" defaultValue={project?.summary} rows={2} required className="mt-1.5" />
      </div>

      <div>
        <label className="text-sm font-medium">Description (full overview)</label>
        <Textarea name="description" defaultValue={project?.description} rows={4} required className="mt-1.5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Cover image path</label>
          <Input name="coverImage" defaultValue={project?.coverImage} placeholder="/images/projects/..." className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Display order</label>
          <Input name="order" type="number" defaultValue={project?.order ?? 0} className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Tech stack (comma-separated)</label>
          <Input name="techStack" defaultValue={project?.techStack.join(", ")} placeholder="Next.js, React, TypeScript" className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Categories (comma-separated)</label>
          <Input name="categories" defaultValue={project?.categories.join(", ")} placeholder="AI, Full Stack" className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">Live URL</label>
          <Input name="liveUrl" type="url" defaultValue={project?.liveUrl ?? ""} placeholder="https://..." className="mt-1.5" />
        </div>
        <div>
          <label className="text-sm font-medium">GitHub URL</label>
          <Input name="githubUrl" type="url" defaultValue={project?.githubUrl ?? ""} placeholder="https://github.com/..." className="mt-1.5" />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={project?.featured} className="h-4 w-4" />
          Featured on homepage/projects page
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="visible" defaultChecked={project?.visible ?? true} className="h-4 w-4" />
          Visible publicly (uncheck to save as draft)
        </label>
      </div>

      <fieldset className="space-y-4 rounded-md border border-border p-4">
        <legend className="px-1 text-sm font-medium text-text-secondary">Case study (optional — leave blank to show the honest empty state)</legend>
        <div>
          <label className="text-xs uppercase text-text-muted">Problem</label>
          <Textarea name="caseStudyProblem" defaultValue={project?.caseStudyProblem ?? ""} rows={2} className="mt-1" />
        </div>
        <div>
          <label className="text-xs uppercase text-text-muted">Solution</label>
          <Textarea name="caseStudySolution" defaultValue={project?.caseStudySolution ?? ""} rows={2} className="mt-1" />
        </div>
        <div>
          <label className="text-xs uppercase text-text-muted">Challenges</label>
          <Textarea name="caseStudyChallenges" defaultValue={project?.caseStudyChallenges ?? ""} rows={2} className="mt-1" />
        </div>
        <div>
          <label className="text-xs uppercase text-text-muted">Lessons learned</label>
          <Textarea name="caseStudyLessons" defaultValue={project?.caseStudyLessons ?? ""} rows={2} className="mt-1" />
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-md border border-border p-4">
        <legend className="px-1 text-sm font-medium text-text-secondary">SEO (leave blank to auto-generate from title/summary)</legend>
        <Input name="seoTitle" defaultValue={project?.seoTitle ?? ""} placeholder="Custom SEO title" />
        <Textarea name="seoDescription" defaultValue={project?.seoDescription ?? ""} rows={2} placeholder="Custom meta description" />
      </fieldset>

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Saving..." : project ? "Save changes" : "Create project"}
      </Button>
    </form>
  );
}
