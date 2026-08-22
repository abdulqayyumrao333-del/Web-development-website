"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X, Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import type { Experience } from "@prisma/client";
import { createExperience, updateExperience } from "@/app/(admin)/admin/experience/actions";

// ── Validation Schema ──
// Defined locally (not imported from actions.tsx) because "use server"
// files can only export async functions, not schema objects.
const experienceSchema = z.object({
  role: z.string().min(1, "Role is required"),
  company: z.string().min(1, "Company is required"),
  companyUrl: z.string().url("Invalid URL").optional().nullable(),
  location: z.string().optional().nullable(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  isCurrent: z.boolean().default(false),
  description: z.string().min(1, "Description is required"),
  techStack: z.array(z.string()).default([]),
  order: z.number().int().default(0),
});

type ExperienceFormValues = z.infer<typeof experienceSchema>;

interface ExperienceFormProps {
  initialData?: Experience;
  isEditing?: boolean;
}

const TECH_STACK_OPTIONS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Python", "Express.js", "PostgreSQL", "MongoDB", "Redis",
  "Docker", "AWS", "Vercel", "Tailwind CSS", "Prisma",
  "OpenAI", "LangChain", "NLP", "Machine Learning", "AI",
];

export function ExperienceForm({ initialData, isEditing = false }: ExperienceFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [techInput, setTechInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      role: initialData?.role || "",
      company: initialData?.company || "",
      companyUrl: initialData?.companyUrl || "",
      location: initialData?.location || "",
      startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : "",
      endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : "",
      isCurrent: initialData?.isCurrent || false,
      description: initialData?.description || "",
      techStack: initialData?.techStack || [],
      order: initialData?.order || 0,
    },
  });

  const techStack = watch("techStack");
  const isCurrent = watch("isCurrent");

  async function onSubmit(data: ExperienceFormValues) {
    setIsPending(true);

    const result = isEditing
      ? await updateExperience(initialData!.id, data)
      : await createExperience(data);

    setIsPending(false);

    if (result.success) {
      toast.success(isEditing ? "Experience updated successfully." : "Experience created successfully.");
      router.push("/admin/experience");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  function addTech() {
    const tech = techInput.trim();
    if (tech && !techStack.includes(tech)) {
      setValue("techStack", [...techStack, tech]);
      setTechInput("");
    }
  }

  function removeTech(tech: string) {
    setValue("techStack", techStack.filter((t) => t !== tech));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ── Role ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Role *</label>
        <input
          {...register("role")}
          placeholder="e.g., Senior Full Stack Developer"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.role && <p className="mt-1 text-sm text-rose-500">{errors.role.message}</p>}
      </div>

      {/* ── Company ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Company *</label>
        <input
          {...register("company")}
          placeholder="e.g., Google"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.company && <p className="mt-1 text-sm text-rose-500">{errors.company.message}</p>}
      </div>

      {/* ── Company URL ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Company URL (optional)</label>
        <input
          {...register("companyUrl")}
          placeholder="https://..."
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.companyUrl && <p className="mt-1 text-sm text-rose-500">{errors.companyUrl.message}</p>}
      </div>

      {/* ── Location ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Location (optional)</label>
        <input
          {...register("location")}
          placeholder="e.g., Remote, Pakistan, USA"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
      </div>

      {/* ── Dates ── */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium block mb-1.5">Start Date *</label>
          <input
            {...register("startDate")}
            type="date"
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
          />
          {errors.startDate && <p className="mt-1 text-sm text-rose-500">{errors.startDate.message}</p>}
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">End Date</label>
          <input
            {...register("endDate")}
            type="date"
            disabled={isCurrent}
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300 disabled:opacity-50"
          />
        </div>
      </div>

      {/* ── Current Position ── */}
      <div className="flex items-center gap-2">
        <input
          {...register("isCurrent")}
          type="checkbox"
          className="h-4 w-4 rounded border-accent-indigo/20 text-accent-indigo focus:ring-accent-indigo"
        />
        <label className="text-sm font-medium">I currently work here</label>
      </div>

      {/* ── Description ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Description *</label>
        <textarea
          {...register("description")}
          rows={4}
          placeholder="Describe your role, responsibilities, and achievements..."
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.description && <p className="mt-1 text-sm text-rose-500">{errors.description.message}</p>}
      </div>

      {/* ── Tech Stack ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Tech Stack</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
            placeholder="Add technology..."
            className="flex-1 rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
          />
          <button
            type="button"
            onClick={addTech}
            className="rounded-xl bg-accent-indigo px-4 py-2.5 text-white hover:bg-accent-indigo/90 transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 rounded-full border border-accent-indigo/15 bg-accent-indigo/[0.04] px-3 py-1 text-sm"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTech(tech)}
                className="text-text-muted/40 hover:text-rose-500 transition-colors"
              >
                <X className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* ── Order ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Order</label>
        <input
          {...register("order", { valueAsNumber: true })}
          type="number"
          placeholder="0"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
      </div>

      {/* ── Submit ── */}
      <div className="flex gap-3 pt-4 border-t border-accent-indigo/8">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm px-6 py-2.5 shadow-md shadow-accent-indigo/20 hover:shadow-lg hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEditing ? "Update Experience" : "Create Experience"}</>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/experience")}
          className="rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 px-6 py-2.5 text-sm hover:bg-accent-indigo/[0.03] transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}