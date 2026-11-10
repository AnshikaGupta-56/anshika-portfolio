import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: deploy the `out/` folder to Vercel, Netlify, GitHub Pages, S3, etc.
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
