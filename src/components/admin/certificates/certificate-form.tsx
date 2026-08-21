"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import type { Certificate } from "@prisma/client";
import { createCertificate, updateCertificate } from "@/app/(admin)/admin/certificates/actions";
import { z } from "zod";
import Image from "next/image";

// ── Validation Schema ──
const certificateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  credentialUrl: z.string().url("Invalid URL").optional().nullable(),
  image: z.string().optional().nullable(),
  order: z.number().int().default(0),
});

type CertificateFormValues = z.infer<typeof certificateSchema>;

interface CertificateFormProps {
  initialData?: Certificate;
  isEditing?: boolean;
}

export function CertificateForm({ initialData, isEditing = false }: CertificateFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: initialData?.title || "",
      issuer: initialData?.issuer || "",
      issueDate: initialData?.issueDate ? new Date(initialData.issueDate).toISOString().split("T")[0] : "",
      credentialUrl: initialData?.credentialUrl || "",
      image: initialData?.image || "",
      order: initialData?.order || 0,
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

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      
      if (data.success) {
        setImagePreview(data.url);
        setValue("image", data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }

  // ── Remove Image ──
  function removeImage() {
    setImagePreview(null);
    setValue("image", "");
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function onSubmit(data: CertificateFormValues) {
    setIsPending(true);

    const result = isEditing
      ? await updateCertificate(initialData!.id, data)
      : await createCertificate(data);

    setIsPending(false);

    if (result.success) {
      toast.success(isEditing ? "Certificate updated successfully." : "Certificate created successfully.");
      router.push("/admin/certificates");
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* ── Title ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Certificate Title *</label>
        <input
          {...register("title")}
          placeholder="e.g., SEO Certified"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.title && <p className="mt-1 text-sm text-rose-500">{errors.title.message}</p>}
      </div>

      {/* ── Issuer ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Issuer *</label>
        <input
          {...register("issuer")}
          placeholder="e.g., Google, HubSpot, Semrush"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.issuer && <p className="mt-1 text-sm text-rose-500">{errors.issuer.message}</p>}
      </div>

      {/* ── Issue Date ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Issue Date *</label>
        <input
          {...register("issueDate")}
          type="date"
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.issueDate && <p className="mt-1 text-sm text-rose-500">{errors.issueDate.message}</p>}
      </div>

      {/* ── Credential URL ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Credential URL (optional)</label>
        <input
          {...register("credentialUrl")}
          type="url"
          placeholder="https://..."
          className="w-full rounded-xl border border-accent-indigo/10 bg-bg-surface-1/50 px-4 py-2.5 text-sm focus:border-accent-indigo/40 focus:outline-none focus:ring-2 focus:ring-accent-indigo/10 transition-all duration-300"
        />
        {errors.credentialUrl && <p className="mt-1 text-sm text-rose-500">{errors.credentialUrl.message}</p>}
      </div>

      {/* ── Image Upload ── */}
      <div>
        <label className="text-sm font-medium block mb-1.5">Certificate Image</label>
        
        {imagePreview ? (
          <div className="relative rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 p-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-accent-indigo/10">
                <Image
                  src={imagePreview}
                  alt="Certificate"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Certificate Image</p>
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
            <p className="text-sm text-text-secondary">Click to upload certificate image</p>
            <p className="text-[10px] text-text-muted/30">PNG, JPG, WebP (max 5MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  handleImageUpload(file);
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
            <>{isEditing ? "Update Certificate" : "Create Certificate"}</>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/certificates")}
          className="rounded-xl border border-accent-indigo/15 bg-bg-surface-1/50 px-6 py-2.5 text-sm hover:bg-accent-indigo/[0.03] transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}