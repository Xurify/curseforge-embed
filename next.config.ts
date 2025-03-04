import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        source: '/:id.png',
        destination: '/api/badge/:id',
      },
    ];
  },
};

export default nextConfig;
