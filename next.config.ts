import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  allowedDevOrigins: ["http://127.0.0.1", "http://localhost"],
};

export default nextConfig;
