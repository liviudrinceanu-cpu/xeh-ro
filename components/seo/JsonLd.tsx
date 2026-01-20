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
    sameAs: [
      'https://www.facebook.com/xeh.ro',
      'https://www.instagram.com/xeh.ro',
      'https://www.linkedin.com/company/xeh-ro',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://xeh.ro/#localbusiness',
    name: 'XEH.ro - eXpert Echipamente Horeca',
    image: 'https://xeh.ro/logo.png',
    url: 'https://xeh.ro',
    telephone: '+40724256250',
    email: 'contact@xeh.ro',
    description: 'Distribuitor autorizat de echipamente profesionale HoReCa în România. Cuptoare profesionale, frigidere industriale, mașini de spălat vase și echipamente complete pentru restaurante și hoteluri.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'București',
      addressRegion: 'București',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.4268,
      longitude: 26.1025,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '€€€',
    areaServed: {
      '@type': 'Country',
      name: 'România',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Echipamente HoReCa Profesionale',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Cuptoare Profesionale',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Echipamente Refrigerare',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Mașini de Spălat Vase',
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface FAQJsonLdProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface WebSiteJsonLdProps {
  searchUrl?: string
}

export function WebSiteJsonLd({ searchUrl = 'https://xeh.ro/catalog?search={search_term_string}' }: WebSiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'XEH.ro - eXpert Echipamente Horeca',
    url: 'https://xeh.ro',
    description: 'Distribuitor autorizat echipamente profesionale HoReCa în România',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    },
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

interface ArticleJsonLdProps {
  article: {
    title: string
    description: string
    url: string
    image?: string
    datePublished: string
    dateModified?: string
    author: string
    keywords?: string[]
  }
}

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image || 'https://xeh.ro/og-image.jpg',
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: 'https://xeh.ro',
    },
    publisher: {
      '@type': 'Organization',
      name: 'XEH.ro - eXpert Echipamente Horeca',
      url: 'https://xeh.ro',
      logo: {
        '@type': 'ImageObject',
        url: 'https://xeh.ro/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    ...(article.keywords && { keywords: article.keywords.join(', ') }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
