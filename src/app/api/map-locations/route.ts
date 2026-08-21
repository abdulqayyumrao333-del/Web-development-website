import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";

// ── GET: Fetch all locations ──
export async function GET() {
  try {
    const locations = await db.mapLocation.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching map locations:", error);
    return NextResponse.json([], { status: 500 });
  }
}

// ── POST: Create new location ──
export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const { label, type, latitude, longitude, description, linkUrl, order } = body;

    if (!label || !latitude || !longitude) {
      return NextResponse.json(
        { error: "Label, latitude, and longitude are required" },
        { status: 400 }
      );
    }

    const location = await db.mapLocation.create({
      data: {
        label,
        type: type || "MILESTONE",
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        description: description || null,
        linkUrl: linkUrl || null,
        order: order || 0,
      },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error) {
    console.error("Error creating map location:", error);
    return NextResponse.json(
      { error: "Failed to create location" },
      { status: 500 }
    );
  }
}