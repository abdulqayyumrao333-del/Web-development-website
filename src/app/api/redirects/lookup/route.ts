import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");
  if (!path) return NextResponse.json({ redirect: null });

  try {
    const redirect = await db.redirect.findFirst({ where: { fromPath: path, enabled: true } });
    return NextResponse.json(
      { redirect: redirect ? { toPath: redirect.toPath, statusCode: redirect.statusCode } : null },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
    );
  } catch {
    return NextResponse.json({ redirect: null });
  }
}
