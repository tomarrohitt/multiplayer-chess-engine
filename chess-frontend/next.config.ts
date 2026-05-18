import type { NextConfig } from "next";

const API_URL = process.env.INTERNAL_API_URL;

if (!API_URL) {
  throw new Error("INTERNAL_API_URL is not defined");
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },

  reactCompiler: true,
};

export default nextConfig;
