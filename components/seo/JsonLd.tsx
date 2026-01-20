'use client'

interface ProductJsonLdProps {
  product: {
    name: string
    description?: string
    sku: string
    model: string
    brand: string
    price?: number | null
    currency?: string
    image?: string | null
    url: string
    availability: 'InStock' | 'OutOfStock' | 'PreOrder'
  }
}

export function ProductJsonLd({ product }: ProductJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || `${product.name} - echipament profesional HoReCa de la ${product.brand}`,
    sku: product.sku,
    mpn: product.model,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    ...(product.image && { image: product.image }),
    offers: {
      '@type': 'Offer',
      url: product.url,
      priceCurrency: product.currency || 'EUR',
      ...(product.price && { price: product.price }),
      availability: `https://schema.org/${product.availability}`,
      seller: {
        '@type': 'Organization',
        name: 'XEH.ro',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string
    url?: string
  }>
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'XEH.ro - eXpert Echipamente Horeca',
    url: 'https://xeh.ro',
    logo: 'https://xeh.ro/logo.png',
    description: 'Distribuitor autorizat de echipamente profesionale HoReCa. Branduri premium RM Gastro și REDFOX pentru restaurante, hoteluri și cafenele.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+40724256250',
      contactType: 'sales',
      areaServed: 'RO',
      availableLanguage: ['Romanian', 'English'],
    },
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface CategoryJsonLdProps {
  category: {
    name: string
    description?: string
    url: string
    productCount: number
  }
}

export function CategoryJsonLd({ category }: CategoryJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    description: category.description || `${category.name} - echipamente profesionale HoReCa`,
    url: category.url,
    numberOfItems: category.productCount,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
