import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@takumi-rs/image-response", "@takumi-rs/core"],
  images: {
    remotePatterns: [
      {
        hostname: "media.forgecdn.net",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/:id(\\d+).png",
        destination: "/api/badge/:id",
      },
    ];
  },
};

export default nextConfig;
