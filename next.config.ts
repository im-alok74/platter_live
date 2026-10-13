import type { NextConfig } from "next";

// Fully static site: no database, no server actions. Photos are served by Cloudinary through the custom loader.
const nextConfig: NextConfig = {
  images: { loader: "custom", loaderFile: "./src/lib/cloudinary-loader.ts" },
};

export default nextConfig;
