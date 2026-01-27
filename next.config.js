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
          {
            // Content Security Policy - prevents XSS, injection attacks
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://analytics.ahrefs.com https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: blob: https://res.cloudinary.com https://rm.rmgastro.com https://redfox.rmgastro.com https://b2b.rmgastro.com https://www.xeh.ro",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://analytics.ahrefs.com wss://*.supabase.co https://vercel.live",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "upgrade-insecure-requests",
            ].join('; '),
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
