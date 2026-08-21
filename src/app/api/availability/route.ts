import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const availability = await db.availabilityStatus.findUnique({ where: { id: "singleton" } });
    return NextResponse.json(availability);
  } catch {
    return NextResponse.json(null);
  }
}
