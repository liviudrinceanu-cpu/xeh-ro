/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
  // Enable experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
