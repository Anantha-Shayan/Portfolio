import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // React strict mode — catches side-effect bugs early
  reactStrictMode: true,

  // Build a self-contained production server bundle for low-memory VMs.
  output: "standalone",

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
