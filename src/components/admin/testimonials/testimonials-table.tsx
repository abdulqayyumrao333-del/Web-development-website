"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, Plus, Star, Quote, User } from "lucide-react";
import type { Testimonial } from "@prisma/client";
import { toast } from "sonner";
import { deleteTestimonial } from "@/app/(admin)/admin/testimonials/actions";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import Image from "next/image";

interface TestimonialsTableProps {
  testimonials: Testimonial[];
}

export function TestimonialsTable({ testimonials: initialTestimonials }: TestimonialsTableProps) {
  const router = useRouter();
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id?: string }>({
    open: false,
  });

  async function handleDelete(id: string) {
    const result = await deleteTestimonial(id);
    if (result.success) {
      toast.success("Testimonial deleted successfully.");
      setTestimonials(testimonials.filter((t) => t.id !== id));
      router.refresh();
    } else {
      toast.error(result.error);
    }
    setDeleteDialog({ open: false });
  }

  // ── Render Stars ──
  function renderStars(rating: number) {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/20"
        }`}
        strokeWidth={1.5}
      />
    ));
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {testimonials.length} testimonial{testimonials.length !== 1 ? "s" : ""}
        </p>
        <Link href="/admin/testimonials/new">
          <button className="inline-flex items-center gap-2 rounded-xl bg-accent-indigo px-4 py-2 text-sm text-white hover:bg-accent-indigo/90 transition-all duration-300">
            <Plus className="h-4 w-4" />
            Add Testimonial
          </button>
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 border rounded-xl">
          <Quote className="h-12 w-12 text-muted-foreground/30 mb-4" strokeWidth={1.5} />
          <p className="text-muted-foreground">No testimonials yet.</p>
          <p className="text-sm text-muted-foreground/60">Add client reviews and feedback.</p>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-left max-w-[300px]">Quote</th>
                <th className="px-4 py-3 text-left">Order</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="border-t hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {testimonial.avatar ? (
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-accent-indigo/10">
                          <Image
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-indigo/5 border border-accent-indigo/10">
                          <User className="h-5 w-5 text-accent-indigo/40" strokeWidth={1.75} />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{testimonial.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                          {testimonial.company && ` · ${testimonial.company}`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-0.5">
                      {renderStars(testimonial.rating)}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-[300px]">
                    <p className="line-clamp-2 text-muted-foreground">
                      "{testimonial.quote}"
                    </p>
                  </td>
                  <td className="px-4 py-3">{testimonial.order}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/testimonials/${testimonial.id}`}>
                        <button className="inline-flex items-center gap-1 rounded-lg border border-accent-indigo/10 bg-bg-surface-1/50 px-2.5 py-1 text-xs text-text-secondary hover:text-accent-indigo hover:border-accent-indigo/30 transition-all duration-300">
                          <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => setDeleteDialog({ open: true, id: testimonial.id })}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-500/10 bg-rose-500/5 px-2.5 py-1 text-xs text-rose-500 hover:bg-rose-500/10 transition-all duration-300"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDeleteDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open })}
        onConfirm={() => deleteDialog.id && handleDelete(deleteDialog.id)}
        title="Delete Testimonial"
        description="Are you sure you want to delete this testimonial? This action cannot be undone."
      />
    </>
  );
}