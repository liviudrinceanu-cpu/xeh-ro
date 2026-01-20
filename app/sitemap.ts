import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'
import { getBaseUrl } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()
  const supabase = await createClient()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rm`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/redfox`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cerere-oferta`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // SEO Landing Pages
    {
      url: `${baseUrl}/cuptoare-profesionale`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/frigidere-industriale`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/masini-spalat-vase-profesionale`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Blog
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Blog Articles
    {
      url: `${baseUrl}/blog/top-10-cuptoare-profesionale-restaurante-2026`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/ghid-complet-echipamente-horeca-restaurant`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/cuptor-convectie-vs-cuptor-clasic-diferente`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/masini-spalat-vase-industriale-ghid-alegere`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/echipamente-refrigerare-profesionala-tipuri`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/rm-gastro-vs-redfox-comparatie-branduri`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Fetch all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('path, path_ro, updated_at, brand:brands(slug)')
    .order('depth')

  const categoryPages: MetadataRoute.Sitemap = (categories || []).map((cat) => {
    const brand = cat.brand as unknown as { slug: string } | null
    const brandSlug = brand?.slug || 'rm'
    // Use path_ro (Romanian SEO-friendly path) if available, otherwise fallback to original path
    const pathToUse = cat.path_ro || cat.path
    const categoryPath = pathToUse.replace(`/Group/${brandSlug}`, '')
    return {
      url: `${baseUrl}/${brandSlug}${categoryPath}`,
      lastModified: cat.updated_at ? new Date(cat.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  })

  // Fetch all products (paginated to handle large datasets)
  const productPages: MetadataRoute.Sitemap = []
  const pageSize = 1000
  let page = 0
  let hasMore = true

  while (hasMore) {
    const { data: products } = await supabase
      .from('products')
      .select('sap_code, slug_ro, updated_at, brand:brands(slug)')
      .range(page * pageSize, (page + 1) * pageSize - 1)
      .order('created_at', { ascending: false })

    if (products && products.length > 0) {
      for (const product of products) {
        const brand = product.brand as unknown as { slug: string } | null
        const brandSlug = brand?.slug || 'rm'
        // Use slug_ro (SEO-friendly Romanian slug) if available, otherwise fallback to sap_code
        const productSlug = product.slug_ro || product.sap_code
        productPages.push({
          url: `${baseUrl}/${brandSlug}/produs/${productSlug}`,
          lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        })
      }
      page++
      hasMore = products.length === pageSize
    } else {
      hasMore = false
    }
  }

  return [...staticPages, ...categoryPages, ...productPages]
}
