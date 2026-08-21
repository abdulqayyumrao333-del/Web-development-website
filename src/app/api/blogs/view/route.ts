import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { publishedPostWhere } from "@/lib/blog";
import { siteConfig } from "@/config/site";
import {
  categorizeReferrer,
  categorizeDevice,
  ANALYTICS_SESSION_COOKIE,
  DEDUP_WINDOW_MINUTES,
} from "@/lib/analytics";

export async function POST(request: Request) {
  const { slug } = (await request.json()) as { slug?: string };
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });

  // Rate-limited per visitor (slug + IP), not globally per-slug — otherwise
  // legitimate concurrent traffic on a popular article would stop
  // incrementing after the first few visitors each minute. IP is used here
  // only as an ephemeral Upstash rate-limit key — never stored in our DB.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const allowed = await checkRateLimit(`view-${slug}-${ip}`);
  if (!allowed) return NextResponse.json({ success: false }, { status: 429 });

  try {
    // Only published (or past-due scheduled) posts are ever counted — reuses
    // the exact same visibility rule as the public site itself, so a view
    // can never be recorded for a Draft/Archived/Trashed post even if this
    // endpoint were called directly with a guessed slug.
    const post = await db.blogPost.findFirst({ where: { slug, ...publishedPostWhere }, select: { id: true } });
    if (!post) return NextResponse.json({ success: false }, { status: 404 });

    // Anonymous session cookie for view deduplication — no personal info,
    // just a random identifier so a refresh/re-visit within the dedup
    // window doesn't count as a second view.
    let sessionId = request.headers
      .get("cookie")
      ?.split(";")
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${ANALYTICS_SESSION_COOKIE}=`))
      ?.split("=")[1];
    const isNewSession = !sessionId;
    if (!sessionId) sessionId = randomUUID();

    const dedupSince = new Date(Date.now() - DEDUP_WINDOW_MINUTES * 60_000);
    const recentEvent = await db.analyticsEvent.findFirst({
      where: { blogPostId: post.id, sessionId, createdAt: { gte: dedupSince } },
      select: { id: true },
    });

    const response = NextResponse.json({ success: true });
    if (isNewSession) {
      response.cookies.set(ANALYTICS_SESSION_COOKIE, sessionId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }

    if (recentEvent) {
      // Same session already viewed this post recently — don't double-count.
      return response;
    }

    const referrerHeader = request.headers.get("referer");
    const siteHostname = new URL(siteConfig.url).hostname;

    await db.$transaction([
      db.blogPost.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } }),
      db.analyticsEvent.create({
        data: {
          blogPostId: post.id,
          sessionId,
          referrer: categorizeReferrer(referrerHeader, siteHostname),
          device: categorizeDevice(request.headers.get("user-agent")),
        },
      }),
    ]);

    return response;
  } catch {
    // Analytics must never break the public page — the client-side tracker
    // already ignores fetch failures, but fail safely here too either way.
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
