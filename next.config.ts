import type { NextConfig } from "next";

/**
 * Azure App Service with WEBSITE_RUN_FROM_PACKAGE=1 mounts wwwroot read-only.
 * Default next/image optimization writes under .next/cache and fails at runtime.
 * CI sets SURICAT_AZURE_STANDALONE_DEPLOY=true for deployable standalone builds.
 */
const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: process.env.SURICAT_AZURE_STANDALONE_DEPLOY === "true",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
