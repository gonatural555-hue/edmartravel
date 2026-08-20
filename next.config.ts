import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lenis",
      "embla-carousel-react",
      "@paypal/react-paypal-js",
    ],
  },
};

export default nextConfig;
