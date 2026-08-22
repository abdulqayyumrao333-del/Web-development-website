"use server";

import { revalidatePath } from "next/cache";
import type { Certificate } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError } from "@/app/(admin)/admin/blogs/action-helpers";
import { z } from "zod";

// ── Validation Schema ──
const certificateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  credentialUrl: z.string().url("Invalid URL").optional().nullable(),
  image: z.string().min(1, "Image is required"),
  order: z.number().int().default(0),
});

type CertificateFormValues = z.infer<typeof certificateSchema>;

// ── Get All Certificates ──
export async function getCertificates(): Promise<BlogActionResult<Certificate[]>> {
  try {
    await requireAdmin();
    const certificates = await db.certificate.findMany({
      orderBy: [{ order: "asc" }, { issueDate: "desc" }],
    });
    return { success: true, data: certificates };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Get Single Certificate ──
export async function getCertificate(id: string): Promise<BlogActionResult<Certificate>> {
  try {
    await requireAdmin();
    const certificate = await db.certificate.findUnique({ where: { id } });
    if (!certificate) {
      return { success: false, error: "Certificate not found." };
    }
    return { success: true, data: certificate };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Create Certificate ──
export async function createCertificate(data: CertificateFormValues): Promise<BlogActionResult<Certificate>> {
  try {
    await requireAdmin();

    const validated = certificateSchema.parse(data);

    const certificate = await db.certificate.create({
      data: {
        title: validated.title,
        issuer: validated.issuer,
        issueDate: new Date(validated.issueDate),
        credentialUrl: validated.credentialUrl,
        image: validated.image,
        order: validated.order,
      },
    });

    revalidatePath("/admin/certificates");
    return { success: true, data: certificate };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Update Certificate ──
export async function updateCertificate(
  id: string,
  data: Partial<CertificateFormValues>
): Promise<BlogActionResult<Certificate>> {
  try {
    await requireAdmin();

    const existing = await db.certificate.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Certificate not found." };
    }

    const certificate = await db.certificate.update({
      where: { id },
      data: {
        title: data.title,
        issuer: data.issuer,
        issueDate: data.issueDate ? new Date(data.issueDate) : undefined,
        credentialUrl: data.credentialUrl,
        image: data.image,
        order: data.order,
      },
    });

    revalidatePath("/admin/certificates");
    return { success: true, data: certificate };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Delete Certificate ──
export async function deleteCertificate(id: string): Promise<BlogActionResult<{ id: string }>> {
  try {
    await requireAdmin();

    const existing = await db.certificate.findUnique({ where: { id } });
    if (!existing) {
      return { success: false, error: "Certificate not found." };
    }

    await db.certificate.delete({ where: { id } });

    revalidatePath("/admin/certificates");
    return { success: true, data: { id } };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

// ── Reorder Certificates ──
export async function reorderCertificates(orderedIds: string[]): Promise<BlogActionResult<void>> {
  try {
    await requireAdmin();

    await Promise.all(
      orderedIds.map((id, index) =>
        db.certificate.update({
          where: { id },
          data: { order: index },
        })
      )
    );

    revalidatePath("/admin/certificates");
    return { success: true, data: undefined };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}