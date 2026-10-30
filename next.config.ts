import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // React strict mode — catches side-effect bugs early
  reactStrictMode: true,

  // Self-contained server bundle for the VM / Docker deployment. Vercel
  // builds its own output, so it's skipped there (VERCEL=1 is set on Vercel).
  output: process.env.VERCEL ? undefined : "standalone",

  // Keep Next's file tracing scoped to this repository. Without this, a
  // package-lock.json in a parent directory can make VM/CI builds trace from
  // the wrong workspace root.
  outputFileTracingRoot: path.resolve(__dirname),

  // Image optimization — prefer modern formats
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Security headers applied to every route
  async headers() {
    return [
      {
        // Pre-built knowledge-base data for the SasyaSampada explorer.
        source: "/data/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "X-Frame-Options",          value: "DENY" },
          { key: "X-XSS-Protection",         value: "1; mode=block" },
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
