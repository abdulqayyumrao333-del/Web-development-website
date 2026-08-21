"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import type { Redirect } from "@prisma/client";
import { createRedirect, updateRedirect } from "@/app/(admin)/admin/redirects/actions";
import { z } from "zod";

// ── Validation Schema ──
const redirectSchema = z.object({
  fromPath: z.string().min(1, "From path is required")
    .regex(/^\/[a-z0-9/_-]*$/, "Path must start with / and contain only letters, numbers, /, _, -"),
  toPath: z.string().min(1, "To path is required")
    .regex(/^\/[a-z0-9/_-]*$/, "Path must start with / and contain only letters, numbers, /, _, -"),
  statusCode: z.number().int().default(308),
  enabled: z.boolean().default(true),
});

type RedirectFormValues = z.infer<typeof redirectSchema>;

interface RedirectFormProps {
  initialData?: Redirect;
  isEditing?: boolean;
}

export function RedirectForm({ initialData, isEditing = false }: RedirectFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RedirectFormValues>({
    resolver: zodResolver(redirectSchema),
    defaultValues: {
      fromPath: initialData?.fromPath || "",
      toPath: initialData?.toPath || "",
      statusCode: initialData?.statusCode || 308,
      enabled: initialData?.enabled ?? true,
    },
  });

  const fromPath = watch("fromPath");
  const toPath = watch("toPath");

  async function onSubmit(data: RedirectFormValues) {
    setIsPending(true);

    const result = isEditing
      ? await updateRedirect(initialData!.id, data)
      : await createRedirect(data);

    setIsPending(false);

    if (result.success) {
      toast.success(isEditing ? "Redirect updated successfully." : "Redirect created successfully.");
      router.push("/admin/redirects");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* ── From Path ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">From Path *</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-sm">
            {process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com"}
          </span>
          <input
            {...register("fromPath")}
            placeholder="/old-page"
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 pl-[calc(100%-14rem)] pr-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
          />
        </div>
        {errors.fromPath && <p className="mt-1 text-sm text-rose-500">{errors.fromPath.message}</p>}
        {fromPath && (
          <p className="mt-1.5 text-xs text-muted-foreground/60">
            Preview: {process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com"}{fromPath}
          </p>
        )}
      </div>

      {/* ── To Path ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">To Path *</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 text-sm">
            {process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com"}
          </span>
          <input
            {...register("toPath")}
            placeholder="/new-page"
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 pl-[calc(100%-14rem)] pr-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
          />
        </div>
        {errors.toPath && <p className="mt-1 text-sm text-rose-500">{errors.toPath.message}</p>}
        {toPath && (
          <p className="mt-1.5 text-xs text-muted-foreground/60">
            Preview: {process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com"}{toPath}
          </p>
        )}
      </div>

      {/* ── Preview Arrow ── */}
      {fromPath && toPath && (
        <div className="flex items-center gap-2 rounded-xl bg-accent-indigo/[0.03] border border-accent-indigo/10 px-4 py-3 text-sm">
          <span className="font-mono text-muted-foreground/60">{fromPath}</span>
          <ArrowRight className="h-4 w-4 text-accent-indigo/30" strokeWidth={1.75} />
          <span className="font-mono text-accent-indigo">{toPath}</span>
          <span className="ml-auto text-xs text-muted-foreground/40">
            {watch("statusCode") === 308 ? "Permanent (308)" : "Temporary (307)"}
          </span>
        </div>
      )}

      {/* ── Status Code ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Redirect Type</label>
        <select
          {...register("statusCode", { valueAsNumber: true })}
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        >
          <option value={308}>Permanent (308) - Recommended for SEO</option>
          <option value={307}>Temporary (307)</option>
        </select>
        <p className="mt-1.5 text-xs text-muted-foreground/60">
          <span className="font-medium">Permanent (308):</span> Page permanently moved. Best for SEO.
          <br />
          <span className="font-medium">Temporary (307):</span> Page temporarily moved.
        </p>
      </div>

      {/* ── Enabled ── */}
      <div className="flex items-center gap-2">
        <input
          {...register("enabled")}
          type="checkbox"
          className="h-4 w-4 rounded border-accent-indigo/20 text-accent-indigo focus:ring-accent-indigo"
        />
        <label className="text-sm font-medium">Enable redirect</label>
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
            <>{isEditing ? "Update Redirect" : "Create Redirect"}</>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/redirects")}
          className="rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 px-6 py-2.5 text-sm hover:bg-accent-indigo/[0.03] transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}