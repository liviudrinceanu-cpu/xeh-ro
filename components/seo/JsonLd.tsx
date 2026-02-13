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
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
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
      ...(item.url && { item: { '@type': 'WebPage', '@id': item.url } }),
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
    '@id': 'https://www.xeh.ro/#organization',
    name: 'XEH.ro - eXpert Echipamente Horeca',
    legalName: 'Driatheli Group SRL',
    taxID: 'RO26209397',
    foundingDate: '2009',
    url: 'https://www.xeh.ro',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.xeh.ro/logo.png',
      width: 200,
      height: 60,
    },
    description: 'Distribuitor autorizat de echipamente profesionale HoReCa. Branduri premium RM Gastro și REDFOX pentru restaurante, hoteluri și cafenele.',
    knowsAbout: [
      'Professional HoReCa Equipment',
      'Commercial Kitchen Equipment',
      'Industrial Refrigeration',
      'Professional Ovens',
      'Restaurant Equipment',
      'Food Service Equipment',
    ],
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
    '@type': 'WholesaleStore',
    '@id': 'https://www.xeh.ro/#localbusiness',
    parentOrganization: {
      '@id': 'https://www.xeh.ro/#organization',
    },
    name: 'XEH.ro - eXpert Echipamente Horeca',
    image: 'https://www.xeh.ro/logo.png',
    url: 'https://www.xeh.ro',
    telephone: '+40724256250',
    email: 'secretariat@infinitrade-romania.ro',
    description: 'Distribuitor autorizat de echipamente profesionale HoReCa în România. Cuptoare profesionale, frigidere industriale, mașini de spălat vase și echipamente complete pentru restaurante și hoteluri.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calea Lugojului, nr.47/B, Hala nr. 3',
      addressLocality: 'Ghiroda',
      addressRegion: 'Timiș',
      postalCode: '307200',
      addressCountry: 'RO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.7833,
      longitude: 21.2833,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:30',
      },
    ],
    priceRange: '€€€',
    areaServed: {
      '@type': 'Country',
      name: 'România',
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

export function WebSiteJsonLd({ searchUrl = 'https://www.xeh.ro/catalog?search={search_term_string}' }: WebSiteJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://www.xeh.ro/#website',
    name: 'XEH.ro - eXpert Echipamente Horeca',
    url: 'https://www.xeh.ro',
    description: 'Distribuitor autorizat echipamente profesionale HoReCa în România',
    publisher: {
      '@id': 'https://www.xeh.ro/#organization',
    },
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
    isPartOf: {
      '@id': 'https://www.xeh.ro/#website',
    },
    about: {
      '@type': 'Thing',
      name: category.name,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: category.productCount,
    },
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
    authorSlug?: string
    authorTitle?: string
    keywords?: string[]
    articleBody?: string // First ~500 chars of article content for better SEO
    speakable?: string[] // CSS selectors for speakable content
  }
}

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const authorSchema = article.authorSlug ? {
    '@type': 'Person',
    '@id': `https://www.xeh.ro/echipa#${article.authorSlug}`,
    name: article.author,
    url: 'https://www.xeh.ro/echipa',
    jobTitle: article.authorTitle || 'Expert Echipamente HoReCa',
    worksFor: {
      '@id': 'https://www.xeh.ro/#organization',
    },
  } : {
    '@type': 'Organization',
    name: article.author,
    url: 'https://www.xeh.ro',
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    image: article.image || 'https://www.xeh.ro/og-image.jpg',
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: authorSchema,
    publisher: {
      '@id': 'https://www.xeh.ro/#organization',
    },
    isPartOf: {
      '@id': 'https://www.xeh.ro/#website',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    ...(article.keywords && { keywords: article.keywords.join(', ') }),
    ...(article.articleBody && { articleBody: article.articleBody }),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: article.speakable || ['h1', '.article-summary', 'h2'],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// Person schema for team members and authors - E-E-A-T critical
interface PersonJsonLdProps {
  person: {
    name: string
    slug: string
    jobTitle: string
    description: string
    image?: string
    email?: string
    telephone?: string
    knowsAbout: string[]
    sameAs?: string[]
    alumniOf?: string
  }
}

export function PersonJsonLd({ person }: PersonJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `https://www.xeh.ro/echipa#${person.slug}`,
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    url: 'https://www.xeh.ro/echipa',
    ...(person.image && { image: person.image }),
    ...(person.email && { email: person.email }),
    ...(person.telephone && { telephone: person.telephone }),
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://www.xeh.ro/#organization',
      name: 'XEH.ro',
    },
    knowsAbout: person.knowsAbout,
    ...(person.sameAs && person.sameAs.length > 0 && { sameAs: person.sameAs }),
    ...(person.alumniOf && {
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: person.alumniOf,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// Reviews/Testimonials schema for trust signals
interface ReviewJsonLdProps {
  reviews: Array<{
    author: string
    company?: string
    rating: number
    reviewBody: string
    datePublished: string
  }>
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

export function ReviewJsonLd({ reviews, aggregateRating }: ReviewJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://www.xeh.ro/#organization',
    name: 'XEH.ro - eXpert Echipamente Horeca',
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
      ...(review.company && {
        publisher: {
          '@type': 'Organization',
          name: review.company,
        },
      }),
    })),
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
        bestRating: 5,
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// HowTo schema for step-by-step guides
interface HowToJsonLdProps {
  howTo: {
    name: string
    description: string
    totalTime?: string // ISO 8601 duration, e.g., "PT30M"
    estimatedCost?: { currency: string; value: string }
    steps: Array<{
      name: string
      text: string
      url?: string
      image?: string
    }>
  }
}

export function HowToJsonLd({ howTo }: HowToJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    ...(howTo.totalTime && { totalTime: howTo.totalTime }),
    ...(howTo.estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: howTo.estimatedCost.currency,
        value: howTo.estimatedCost.value,
      },
    }),
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && { image: step.image }),
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

// AboutPage schema
export function AboutPageJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://www.xeh.ro/despre-noi#aboutpage',
    name: 'Despre XEH.ro - eXpert Echipamente Horeca',
    description: 'Aflați povestea XEH.ro, distribuitor autorizat de echipamente profesionale HoReCa în România din 2009.',
    url: 'https://www.xeh.ro/despre-noi',
    mainEntity: {
      '@id': 'https://www.xeh.ro/#organization',
    },
    isPartOf: {
      '@id': 'https://www.xeh.ro/#website',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
