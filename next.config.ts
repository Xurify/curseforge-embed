import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "media.forgecdn.net",
      },
    ],
  },
};

export default nextConfig;
