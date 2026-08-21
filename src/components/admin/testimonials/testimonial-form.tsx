"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X, User, Star } from "lucide-react";
import { toast } from "sonner";
import type { Testimonial } from "@prisma/client";
import { createTestimonial, updateTestimonial } from "@/app/(admin)/admin/testimonials/actions";
import { z } from "zod";
import Image from "next/image";

// ── Validation Schema ──
const testimonialSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  company: z.string().optional().nullable(),
  avatar: z.string().optional().nullable(),
  quote: z.string().min(10, "Quote must be at least 10 characters"),
  rating: z.number().int().min(1).max(5).default(5),
  order: z.number().int().default(0),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

interface TestimonialFormProps {
  initialData?: Testimonial;
  isEditing?: boolean;
}

export function TestimonialForm({ initialData, isEditing = false }: TestimonialFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(initialData?.avatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: initialData?.name || "",
      role: initialData?.role || "",
      company: initialData?.company || "",
      avatar: initialData?.avatar || "",
      quote: initialData?.quote || "",
      rating: initialData?.rating || 5,
      order: initialData?.order || 0,
    },
  });

  const rating = watch("rating");

  // ── Handle Avatar Upload ──
  async function handleAvatarUpload(file: File) {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      
      if (data.success) {
        setAvatarPreview(data.url);
        setValue("avatar", data.url);
        toast.success("Avatar uploaded successfully!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload avatar");
    } finally {
      setIsUploading(false);
    }
  }

  // ── Remove Avatar ──
  function removeAvatar() {
    setAvatarPreview(null);
    setValue("avatar", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function onSubmit(data: TestimonialFormValues) {
    setIsPending(true);

    const result = isEditing
      ? await updateTestimonial(initialData!.id, data)
      : await createTestimonial(data);

    setIsPending(false);

    if (result.success) {
      toast.success(isEditing ? "Testimonial updated successfully." : "Testimonial created successfully.");
      router.push("/admin/testimonials");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  // ── Render Stars for Rating ──
  function renderStars(currentRating: number, hoverRating: number | null) {
    const displayRating = hoverRating !== null ? hoverRating : currentRating;
    return Array.from({ length: 5 }).map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setValue("rating", i + 1)}
        onMouseEnter={() => setHoverRating(i + 1)}
        onMouseLeave={() => setHoverRating(null)}
        className="transition-all duration-200 hover:scale-110"
      >
        <Star
          className={`h-8 w-8 ${
            i < displayRating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/20"
          } transition-colors duration-200`}
          strokeWidth={1.5}
        />
      </button>
    ));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* ── Name ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Client Name *</label>
        <input
          {...register("name")}
          placeholder="e.g., John Doe"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.name && <p className="mt-1 text-sm text-rose-500">{errors.name.message}</p>}
      </div>

      {/* ── Role ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Role *</label>
        <input
          {...register("role")}
          placeholder="e.g., CEO, Founder, Marketing Manager"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.role && <p className="mt-1 text-sm text-rose-500">{errors.role.message}</p>}
      </div>

      {/* ── Company ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Company (optional)</label>
        <input
          {...register("company")}
          placeholder="e.g., Tech Corp"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
      </div>

      {/* ── Avatar Upload ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Client Avatar</label>
        
        {avatarPreview ? (
          <div className="relative rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-accent-indigo/10">
                <Image
                  src={avatarPreview}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Client Avatar</p>
                <p className="text-xs text-muted-foreground">Click the button to change</p>
              </div>
              <button
                type="button"
                onClick={removeAvatar}
                className="text-muted-foreground/40 hover:text-rose-500 transition-colors"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-accent-indigo/10 bg-accent-indigo/[0.02] px-4 py-6 cursor-pointer hover:border-accent-indigo/25 hover:bg-accent-indigo/[0.04] transition-all duration-300"
          >
            <Upload className="h-8 w-8 text-accent-indigo/30" strokeWidth={1.5} />
            <p className="text-sm text-text-secondary">Click to upload client avatar</p>
            <p className="text-[10px] text-text-muted/30">PNG, JPG, WebP (max 5MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleAvatarUpload(file);
                }
              }}
            />
          </div>
        )}
        {isUploading && (
          <div className="mt-2 flex items-center gap-2 text-sm text-text-muted/60">
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading...
          </div>
        )}
      </div>

      {/* ── Quote ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Testimonial Quote *</label>
        <textarea
          {...register("quote")}
          rows={4}
          placeholder="Write what the client said about your work..."
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.quote && <p className="mt-1 text-sm text-rose-500">{errors.quote.message}</p>}
      </div>

      {/* ── Rating ── */}
      <div>
        <label className="text-sm font-medium block mb-2">Rating</label>
        <div className="flex gap-1">
          {renderStars(rating, hoverRating)}
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Click on a star to set rating (1-5)
        </p>
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
          disabled={isPending || isUploading}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm px-6 py-2.5 shadow-md shadow-accent-indigo/20 hover:shadow-lg hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEditing ? "Update Testimonial" : "Create Testimonial"}</>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/testimonials")}
          className="rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 px-6 py-2.5 text-sm hover:bg-accent-indigo/[0.03] transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}