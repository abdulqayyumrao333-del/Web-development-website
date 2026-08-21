"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Education } from "@prisma/client";
import { createEducation, updateEducation } from "@/app/(admin)/admin/education/actions";
import { z } from "zod";

// ── Validation Schema ──
const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

type EducationFormValues = z.infer<typeof educationSchema>;

interface EducationFormProps {
  initialData?: Education;
  isEditing?: boolean;
}

export function EducationForm({ initialData, isEditing = false }: EducationFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: initialData?.degree || "",
      institution: initialData?.institution || "",
      startDate: initialData?.startDate ? new Date(initialData.startDate).toISOString().split("T")[0] : "",
      endDate: initialData?.endDate ? new Date(initialData.endDate).toISOString().split("T")[0] : "",
      description: initialData?.description || "",
      order: initialData?.order || 0,
    },
  });

  async function onSubmit(data: EducationFormValues) {
    setIsPending(true);

    const result = isEditing
      ? await updateEducation(initialData!.id, data)
      : await createEducation(data);

    setIsPending(false);

    if (result.success) {
      toast.success(isEditing ? "Education updated successfully." : "Education created successfully.");
      router.push("/admin/education");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* ── Degree ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Degree *</label>
        <input
          {...register("degree")}
          placeholder="e.g., Bachelor of Science in Computer Science"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.degree && <p className="mt-1 text-sm text-rose-500">{errors.degree.message}</p>}
      </div>

      {/* ── Institution ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Institution *</label>
        <input
          {...register("institution")}
          placeholder="e.g., University of Education"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.institution && <p className="mt-1 text-sm text-rose-500">{errors.institution.message}</p>}
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
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
          />
        </div>
      </div>

      {/* ── Description ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Description (optional)</label>
        <textarea
          {...register("description")}
          rows={3}
          placeholder="Describe your studies, achievements, or focus areas..."
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
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
            <>{isEditing ? "Update Education" : "Create Education"}</>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/education")}
          className="rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 px-6 py-2.5 text-sm hover:bg-accent-indigo/[0.03] transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}