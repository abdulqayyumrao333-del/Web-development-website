import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/app/(admin)/admin/blogs/actions";

// ── GET: Fetch single location ──
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const location = await db.mapLocation.findUnique({
      where: { id },
    });

    if (!location) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(location);
  } catch (error) {
    console.error("Error fetching location:", error);
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}

// ── PUT: Update location ──
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const body = await req.json();
    const { label, type, latitude, longitude, description, linkUrl, order } = body;

    const existing = await db.mapLocation.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    const location = await db.mapLocation.update({
      where: { id },
      data: {
        label: label || existing.label,
        type: type || existing.type,
        latitude: parseFloat(latitude) || existing.latitude,
        longitude: parseFloat(longitude) || existing.longitude,
        description: description !== undefined ? description : existing.description,
        linkUrl: linkUrl !== undefined ? linkUrl : existing.linkUrl,
        order: order !== undefined ? parseInt(order) : existing.order,
      },
    });

    return NextResponse.json(location);
  } catch (error) {
    console.error("Error updating location:", error);
    return NextResponse.json(
      { error: "Failed to update location" },
      { status: 500 }
    );
  }
}

// ── DELETE: Delete location ──
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    const existing = await db.mapLocation.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    await db.mapLocation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting location:", error);
    return NextResponse.json(
      { error: "Failed to delete location" },
      { status: 500 }
    );
  }
}