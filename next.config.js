/** @type {import('next').NextConfig} */
const nextConfig = {
  // Consistent URL handling - no trailing slashes
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'rm.rmgastro.com',
      },
      {
        protocol: 'https',
        hostname: 'redfox.rmgastro.com',
      },
      {
        protocol: 'https',
        hostname: 'b2b.rmgastro.com',
      },
    ],
    // Optimize images
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Enable experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Compression
  compress: true,
  // Power by header removal (security)
  poweredByHeader: false,
  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // Cache static assets
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|webp|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  // Redirects for SEO (www to non-www handled by Vercel)
  async redirects() {
    return [
      // Redirect common misspellings
      {
        source: '/echipamente-horeca',
        destination: '/catalog',
        permanent: true,
      },
      // Note: /cuptoare-profesionale, /frigidere-industriale, /masini-spalat-vase-profesionale
      // now have dedicated landing pages - no redirects needed
      {
        source: '/frigidere-profesionale',
        destination: '/frigidere-industriale',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
