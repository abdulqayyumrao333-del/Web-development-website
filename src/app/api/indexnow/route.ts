import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

// Notifies Bing/Yandex IndexNow of a URL change. Call this after publishing
// a new project or blog post from the admin dashboard.
export async function POST(request: Request) {
  const { url } = await request.json();
  const key = process.env.INDEXNOW_KEY;

  if (!key) return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 });

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: new URL(siteConfig.url).host,
      key,
      urlList: [url],
    }),
  });

  return NextResponse.json({ success: res.ok });
}
