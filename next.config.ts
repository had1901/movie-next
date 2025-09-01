import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  experimental: { 
    viewTransition: true 
  },
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
      {
        protocol: 'https',
        hostname: '**', // cho phép tất cả domain HTTPS
      },
      {
        protocol: 'http',
        hostname: '**', // nếu muốn cả http
      },
    ],
  },
}

export default nextConfig
