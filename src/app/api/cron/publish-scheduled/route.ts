import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { performPublishTransition } from "@/app/(admin)/admin/blogs/publishing-actions";

export const dynamic = "force-dynamic";

/**
 * Publishes any SCHEDULED post whose scheduledAt has passed. Triggered by
 * Vercel Cron (see vercel.json) or any external scheduler hitting this URL
 * with the correct bearer token — see docs/SCHEDULED_PUBLISHING.md.
 *
 * Idempotent by construction: once a post is published its status is no
 * longer SCHEDULED, so it simply won't match the query on the next run.
 * Running this concurrently or repeatedly is always safe.
 *
 * Note: the public site does NOT depend on this route for correctness —
 * lib/blog.ts's publishedPostWhere already treats a due SCHEDULED post as
 * publicly visible at query time. This route exists so the admin dashboard's
 * status field reflects reality too, without requiring a visitor request.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET;

  if (!expected) {
    return NextResponse.json({ error: "CRON_SECRET is not configured on the server." }, { status: 500 });
  }
  if (authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const duePosts = await db.blogPost.findMany({
      where: { status: "SCHEDULED", scheduledAt: { lte: new Date() } },
    });

    const results = await Promise.allSettled(duePosts.map((post) => performPublishTransition(post)));
    const published = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.length - published;

    return NextResponse.json({ checked: duePosts.length, published, failed });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error while publishing scheduled posts.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
