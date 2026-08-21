"use server";

import { db } from "@/lib/db";
import { requireAdmin, type BlogActionResult } from "@/app/(admin)/admin/blogs/actions";
import { handleBlogActionError } from "@/app/(admin)/admin/blogs/action-helpers";

export async function getSubscribers(): Promise<BlogActionResult<any[]>> {
  try {
    await requireAdmin();
    const subscribers = await db.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: subscribers };
  } catch (err) {
    return { success: false, error: handleBlogActionError(err) };
  }
}

export async function exportSubscribers(): Promise<Blob> {
  await requireAdmin();
  const subscribers = await db.subscriber.findMany({
    select: { email: true, name: true, createdAt: true },
  });
  
  const csv = [
    ["Email", "Name", "Subscribed At"],
    ...subscribers.map(s => [s.email, s.name || "", s.createdAt.toISOString()])
  ].map(row => row.join(",")).join("\n");

  return new Blob([csv], { type: "text/csv" });
}