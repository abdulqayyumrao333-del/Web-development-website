/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ── ESLint ──
  // Lint checks are skipped during `next build` (production deploys).
  // TypeScript type-checking still runs and will catch real bugs.
  // Run `npm run lint` locally/in CI to see and fix lint warnings separately.
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ── Server Actions Body Size Limit ──
  // ✅ CORRECT: Under experimental for Next.js 15
  experimental: {
    mdxRs: true,
    serverActions: {
      bodySizeLimit: "10mb", // Increased from 1MB to 10MB
    },
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;