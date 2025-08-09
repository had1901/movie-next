import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  experimental: { viewTransition: true },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.ophim.live',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
