import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protects /admin routes, enforces CMS-managed redirects, and applies
// security headers. Rate limiting for public API routes lives in
// src/lib/rate-limit.ts and is called directly inside each route handler.

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const sessionCookie =
      request.cookies.get("authjs.session-token") ||
      request.cookies.get("__Secure-authjs.session-token");

    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // CMS-managed redirects — skip for api/admin/_next/static assets, since
  // those are never redirect targets and this would just add latency.
  if (!pathname.startsWith("/api") && !pathname.startsWith("/_next") && !pathname.includes(".")) {
    try {
      const lookupUrl = new URL(`/api/redirects/lookup?path=${encodeURIComponent(pathname)}`, request.url);
      const res = await fetch(lookupUrl, { next: { revalidate: 60 } });
      const { redirect } = (await res.json()) as { redirect: { toPath: string; statusCode: number } | null };
      if (redirect) {
        return NextResponse.redirect(new URL(redirect.toPath, request.url), redirect.statusCode);
      }
    } catch {
      // Redirect lookup failing should never break the site — fall through to normal routing.
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
