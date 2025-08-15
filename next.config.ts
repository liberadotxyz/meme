import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
    domains: [
      "logos.covalenthq.com",
      "logo.moralis.io",
      "www.datocms-assets.com",
      "cdn.moralis.io",
      "logo.moralis.io",
      "img.reservoir.tools",
      "raw.githubusercontent.com",
      "ipfs.io",
      "pbs.twimg.com",
      "lh3.googleusercontent.com"
    ],
  },
};

export default nextConfig;
