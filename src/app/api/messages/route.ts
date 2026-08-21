import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const messages = await db.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(messages);
}
