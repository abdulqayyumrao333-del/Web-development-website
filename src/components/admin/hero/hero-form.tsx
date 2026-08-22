"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X, Image as ImageIcon, RefreshCw, Eye } from "lucide-react";
import { toast } from "sonner";
import { updateHeroSettings, resetHeroSettings } from "@/app/(admin)/admin/hero/actions";
import { z } from "zod";
import Image from "next/image";

// ── Schema ──
const heroSettingsSchema = z.object({
  headline: z.string().min(1, "Headline is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  feature1: z.string().optional(),
  feature2: z.string().optional(),
  feature3: z.string().optional(),
  stat1Label: z.string().optional(),
  stat1Value: z.string().optional(),
  stat2Label: z.string().optional(),
  stat2Value: z.string().optional(),
  stat3Label: z.string().optional(),
  stat3Value: z.string().optional(),
  technologies: z.string().optional(),
  ctaPrimaryText: z.string().optional(),
  ctaPrimaryLink: z.string().optional(),
  ctaSecondaryText: z.string().optional(),
  ctaSecondaryLink: z.string().optional(),
  githubUrl: z.string().url("Invalid GitHub URL").optional(),
  linkedinUrl: z.string().url("Invalid LinkedIn URL").optional(),
  emailAddress: z.string().email("Invalid email").optional(),
  availabilityText: z.string().optional(),
  availabilityStatus: z.string().optional(),
  profileImage: z.string().optional(),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
});

type HeroSettingsFormValues = z.infer<typeof heroSettingsSchema>;

interface HeroFormProps {
  initialData: any;
}

export function HeroForm({ initialData }: HeroFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.profileImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<HeroSettingsFormValues>({
    resolver: zodResolver(heroSettingsSchema),
    defaultValues: {
      headline: initialData?.headline || "I build Intelligent Digital Products.",
      subtitle: initialData?.subtitle || "",
      feature1: initialData?.feature1 || "Full Stack",
      feature2: initialData?.feature2 || "AI Systems",
      feature3: initialData?.feature3 || "B2b Lead Generation",
      stat1Label: initialData?.stat1Label || "Years",
      stat1Value: initialData?.stat1Value || "5+",
      stat2Label: initialData?.stat2Label || "Projects",
      stat2Value: initialData?.stat2Value || "50+",
      stat3Label: initialData?.stat3Label || "Clients",
      stat3Value: initialData?.stat3Value || "40+",
      technologies: initialData?.technologies || '["React","Next.js","TypeScript","Node.js","Python","AI / ML"]',
      ctaPrimaryText: initialData?.ctaPrimaryText || "View Projects",
      ctaPrimaryLink: initialData?.ctaPrimaryLink || "/projects",
      ctaSecondaryText: initialData?.ctaSecondaryText || "Let's Connect",
      ctaSecondaryLink: initialData?.ctaSecondaryLink || "/contact",
      githubUrl: initialData?.githubUrl || "https://github.com/yourusername",
      linkedinUrl: initialData?.linkedinUrl || "https://linkedin.com/in/yourusername",
      emailAddress: initialData?.emailAddress || "abdul@example.com",
      availabilityText: initialData?.availabilityText || "Available for work",
      availabilityStatus: initialData?.availabilityStatus || "Available",
      profileImage: initialData?.profileImage || "/images/profile.jpg",
      seoTitle: initialData?.seoTitle || "",
      seoDescription: initialData?.seoDescription || "",
    },
  });

  // ── Handle Image Upload ──
  async function handleImageUpload(file: File) {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      
      if (data.success) {
        setImagePreview(data.url);
        setValue("profileImage", data.url);
        toast.success("Profile image uploaded successfully!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }

  function removeImage() {
    setImagePreview(null);
    setValue("profileImage", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function onSubmit(data: HeroSettingsFormValues) {
    setIsPending(true);
    const result = await updateHeroSettings(data);
    setIsPending(false);

    if (result.success) {
      toast.success("Hero section updated successfully!");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  async function handleReset() {
    if (!confirm("Are you sure you want to reset hero settings to defaults?")) return;

    setIsResetting(true);
    const result = await resetHeroSettings();
    setIsResetting(false);

    if (result.success) {
      toast.success("Hero settings reset to defaults.");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  // ── Parse technologies for display ──
  const techValue = watch("technologies");
  let techArray: string[] = [];
  try {
    techArray = techValue ? JSON.parse(techValue) : [];
  } catch {
    techArray = [];
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hero Section</h1>
          <p className="text-sm text-muted-foreground">Edit homepage hero content</p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isResetting}
            className="inline-flex items-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-2 text-sm text-rose-500 hover:bg-rose-500/10 transition-all duration-300 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isResetting ? "animate-spin" : ""}`} />
            Reset to Defaults
          </button>
          <button
            type="submit"
            disabled={isPending || isUploading}
            className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-sm px-6 py-2.5 shadow-md shadow-accent-indigo/20 hover:shadow-lg hover:shadow-accent-indigo/30 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* ── Left Column ── */}

        {/* Headline */}
        <div>
          <label className="text-sm font-medium block mb-1.5">Headline *</label>
          <input
            {...register("headline")}
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
          />
          {errors.headline && <p className="mt-1 text-sm text-rose-500">{errors.headline.message}</p>}
        </div>

        {/* Subtitle */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium block mb-1.5">Subtitle</label>
          <textarea
            {...register("subtitle")}
            rows={3}
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
          />
          {errors.subtitle && <p className="mt-1 text-sm text-rose-500">{errors.subtitle.message}</p>}
        </div>

        {/* Feature Pills */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium block mb-1.5">Feature Pills (3)</label>
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              {...register("feature1")}
              placeholder="Feature 1"
              className="rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
            <input
              {...register("feature2")}
              placeholder="Feature 2"
              className="rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
            <input
              {...register("feature3")}
              placeholder="Feature 3"
              className="rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium block mb-1.5">Stats</label>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex gap-2">
              <input
                {...register("stat1Value")}
                placeholder="5+"
                className="w-1/2 rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
              />
              <input
                {...register("stat1Label")}
                placeholder="Years"
                className="w-1/2 rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
              />
            </div>
            <div className="flex gap-2">
              <input
                {...register("stat2Value")}
                placeholder="50+"
                className="w-1/2 rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
              />
              <input
                {...register("stat2Label")}
                placeholder="Projects"
                className="w-1/2 rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
              />
            </div>
            <div className="flex gap-2">
              <input
                {...register("stat3Value")}
                placeholder="40+"
                className="w-1/2 rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
              />
              <input
                {...register("stat3Label")}
                placeholder="Clients"
                className="w-1/2 rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
              />
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium block mb-1.5">Technologies (JSON array)</label>
          <input
            {...register("technologies")}
            placeholder='["React","Next.js","TypeScript"]'
            className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
          />
          {techArray.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {techArray.map((tech) => (
                <span key={tech} className="inline-flex items-center gap-1 rounded-full border border-accent-indigo/10 bg-accent-indigo/[0.03] px-2.5 py-0.5 text-xs">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ── Right Column ── */}

        {/* CTA Buttons */}
        <div className="md:col-span-2 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium block mb-1.5">Primary CTA Text</label>
            <input
              {...register("ctaPrimaryText")}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Primary CTA Link</label>
            <input
              {...register("ctaPrimaryLink")}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Secondary CTA Text</label>
            <input
              {...register("ctaSecondaryText")}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Secondary CTA Link</label>
            <input
              {...register("ctaSecondaryLink")}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="md:col-span-2 grid gap-3 sm:grid-cols-3">
          <div>
            <label className="text-sm font-medium block mb-1.5">GitHub URL</label>
            <input
              {...register("githubUrl")}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">LinkedIn URL</label>
            <input
              {...register("linkedinUrl")}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Email Address</label>
            <input
              {...register("emailAddress")}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
        </div>

        {/* Availability */}
        <div className="md:col-span-2 grid gap-3 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium block mb-1.5">Availability Text</label>
            <input
              {...register("availabilityText")}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Availability Status</label>
            <input
              {...register("availabilityStatus")}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium block mb-1.5">Profile Image</label>
          
          {imagePreview ? (
            <div className="relative rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 p-4">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-accent-indigo/10">
                  <Image src={imagePreview} alt="Profile" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Profile Image</p>
                  <p className="text-xs text-muted-foreground">Click the button to change</p>
                </div>
                <button
                  type="button"
                  onClick={removeImage}
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
              <p className="text-sm text-text-secondary">Click to upload profile image</p>
              <p className="text-[10px] text-text-muted/30">PNG, JPG, WebP (max 5MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
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

        {/* SEO */}
        <div className="md:col-span-2 grid gap-3">
          <div>
            <label className="text-sm font-medium block mb-1.5">SEO Title (optional)</label>
            <input
              {...register("seoTitle")}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">SEO Description (optional)</label>
            <textarea
              {...register("seoDescription")}
              rows={2}
              className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10"
            />
          </div>
        </div>
      </div>
    </form>
  );
}