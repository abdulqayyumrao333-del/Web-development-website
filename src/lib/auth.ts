import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { checkRateLimit } from "@/lib/rate-limit";

// Single hardcoded admin identity, sourced from env vars — no database user
// table involved. ADMIN_PASSWORD_HASH is a bcrypt hash, never the plain
// password (generate it with `npm run hash-password -- "your-password"`).
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" }, // required — Credentials provider is not compatible with database sessions
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        const username = credentials?.username as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!username || !password) return null;

        // Rate-limited per IP — 5 attempts/minute, same mechanism used
        // elsewhere in the app. Prevents brute-forcing the single admin account.
        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
        const allowed = await checkRateLimit(`login-${ip}`);
        if (!allowed) return null;

        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedHash = process.env.ADMIN_PASSWORD_HASH;
        if (!expectedUsername || !expectedHash) {
          console.warn("[auth] ADMIN_USERNAME or ADMIN_PASSWORD_HASH not set — login disabled.");
          return null;
        }

        if (username !== expectedUsername) return null;
        const passwordMatches = await bcrypt.compare(password, expectedHash);
        if (!passwordMatches) return null;

        return { id: "admin", name: expectedUsername };
      },
    }),
  ],
  pages: { signIn: "/login" },
});
