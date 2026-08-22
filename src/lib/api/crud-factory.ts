import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Delegate = {
  findMany: (args?: any) => Promise<any[]>;
  create: (args: { data: any }) => Promise<any>;
  update: (args: { where: { id: string }; data: any }) => Promise<any>;
  delete: (args: { where: { id: string } }) => Promise<any>;
};

/**
 * Builds GET (public, list) + POST (authed, create) handlers for a Prisma
 * model. Used by src/app/api/{resource}/route.ts files — each file just
 * calls this with its model name, rather than hand-rolling the same
 * auth-check + try/catch boilerplate every time.
 */
export function createCrudHandlers(getDelegate: () => Delegate, defaultOrderBy: object = { order: "asc" }) {
  async function GET() {
    try {
      const items = await getDelegate().findMany({ orderBy: defaultOrderBy });
      return NextResponse.json(items);
    } catch (error) {
      console.warn("[crud-factory] list failed:", error);
      return NextResponse.json([]);
    }
  }

  async function POST(request: Request) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const created = await getDelegate().create({ data: body });
    return NextResponse.json(created, { status: 201 });
  }

  return { GET, POST };
}

/** PATCH (update) + DELETE handlers for src/app/api/{resource}/[id]/route.ts files. */
export function createItemCrudHandlers(getDelegate: () => Delegate) {
  async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const body = await request.json();
    const updated = await getDelegate().update({ where: { id }, data: body });
    return NextResponse.json(updated);
  }

  async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    await getDelegate().delete({ where: { id } });
    return NextResponse.json({ success: true });
  }

  return { PATCH, DELETE };
}
