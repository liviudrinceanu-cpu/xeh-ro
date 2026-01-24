import { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl()

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          // Private sections
          '/api/',
          '/admin/',
          '/portal/',
          '/login',
          '/register',
          '/forgot-password',
          '/reset-password',
          // Block URL parameters to prevent duplicate content
          '/*?page=*',
          '/*?sort=*',
          '/*?stock=*',
          '/*?priceMin=*',
          '/*?priceMax=*',
          '/*?search=*',
          '/*?category=*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
