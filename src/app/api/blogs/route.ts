import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { publishedPostWhere } from "@/lib/blog";

export async function GET() {
  const items = await db.blogPost.findMany({ where: publishedPostWhere, orderBy: { publishedAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  // TODO: validate `body` with a zod schema before writing (see src/lib/validations.ts)
  const created = await db.blogPost.create({ data: body });
  return NextResponse.json(created, { status: 201 });
}
