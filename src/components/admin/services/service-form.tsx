"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Service } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createService, updateService } from "@/app/(admin)/admin/services/actions";
import { serviceSchema, type ServiceFormValues } from "@/lib/validations/service";

interface ServiceFormProps {
  initialData?: Service;
  isEditing?: boolean;
}

const CATEGORIES = ["Full Stack", "AI", "Automation", "Websites", "API"];

export function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      shortDescription: initialData?.shortDescription || "",
      overview: initialData?.overview || "",
      category: initialData?.category || "",
      whoItsFor: initialData?.whoItsFor || [],
      deliverables: initialData?.deliverables || [],
      techStack: initialData?.techStack || [],
      typicalTimeline: initialData?.typicalTimeline || "",
      problemsSolved: initialData?.problemsSolved || "",
      order: initialData?.order || 0,
      visible: initialData?.visible ?? true,
    },
  });

  const whoItsFor = watch("whoItsFor");
  const deliverables = watch("deliverables");
  const techStack = watch("techStack");

  async function onSubmit(data: ServiceFormValues) {
    setIsPending(true);

    const result = isEditing
      ? await updateService(initialData!.id, data)
      : await createService(data);

    setIsPending(false);

    if (result.success) {
      toast.success(isEditing ? "Service updated successfully." : "Service created successfully.");
      router.push("/admin/services");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  // Helper to toggle array items
  function toggleArrayItem<T>(array: T[], value: T): T[] {
    if (array.includes(value)) {
      return array.filter((item) => item !== value);
    }
    return [...array, value];
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Title</label>
          <Input
            {...register("title")}
            placeholder="e.g., Full Stack Web Development"
          />
          {errors.title && (
            <p className="text-sm text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Slug</label>
          <Input
            {...register("slug")}
            placeholder="e.g., full-stack-web-development"
          />
          {errors.slug && (
            <p className="text-sm text-destructive">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Short Description</label>
        <Input
          {...register("shortDescription")}
          placeholder="Brief description (max 200 characters)"
        />
        {errors.shortDescription && (
          <p className="text-sm text-destructive">{errors.shortDescription.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Overview</label>
        <Textarea
          {...register("overview")}
          placeholder="Detailed overview of the service"
          rows={4}
        />
        {errors.overview && (
          <p className="text-sm text-destructive">{errors.overview.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Category</label>
        <select
          {...register("category")}
          className="w-full rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="">Select a category</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-sm text-destructive">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium">Who It's For</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Startups", "Small Businesses", "Agencies", "Entrepreneurs", "Students", "Personal Brands"].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={whoItsFor.includes(item)}
                onChange={() => setValue("whoItsFor", toggleArrayItem(whoItsFor, item))}
                className="rounded border-input"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Deliverables</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Website", "CMS", "Source Code", "Documentation", "Admin Dashboard", "API Integration"].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={deliverables.includes(item)}
                onChange={() => setValue("deliverables", toggleArrayItem(deliverables, item))}
                className="rounded border-input"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Tech Stack</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {["Next.js", "React", "TypeScript", "Node.js", "Python", "PostgreSQL", "OpenAI", "Tailwind CSS"].map((item) => (
            <label key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={techStack.includes(item)}
                onChange={() => setValue("techStack", toggleArrayItem(techStack, item))}
                className="rounded border-input"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Typical Timeline</label>
          <Input
            {...register("typicalTimeline")}
            placeholder="e.g., 2-4 weeks"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Order</label>
          <Input
            {...register("order", { valueAsNumber: true })}
            type="number"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium">Problems Solved</label>
        <Textarea
          {...register("problemsSolved")}
          placeholder="What problems does this service solve?"
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("visible")}
          className="rounded border-input"
        />
        <label className="text-sm font-medium">Visible on website</label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEditing ? "Update Service" : "Create Service"}</>
          )}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/services")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}