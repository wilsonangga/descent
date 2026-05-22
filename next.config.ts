import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'strapi.monis.rent',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.monis.rent',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
