import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://xeh.ro'),
  title: {
    default: 'XEH.ro - eXpert Echipamente Horeca | Echipamente Profesionale HoReCa',
    template: '%s | XEH.ro - eXpert Echipamente Horeca',
  },
  description: 'XEH.ro - eXpert Echipamente Horeca. Furnizor de echipamente profesionale pentru industria HoReCa: cuptoare, frigidere, mașini de spălat vase, mobilier inox și multe altele.',
  keywords: [
    'echipamente horeca',
    'echipamente profesionale',
    'cuptoare profesionale',
    'frigidere profesionale',
    'mașini spălat vase',
    'mobilier inox',
    'echipamente restaurant',
    'echipamente bucătărie profesională',
    'XEH',
    'expert echipamente horeca',
  ],
  authors: [{ name: 'XEH.ro' }],
  creator: 'XEH.ro',
  publisher: 'XEH.ro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://xeh.ro',
    siteName: 'XEH.ro - eXpert Echipamente Horeca',
    title: 'XEH.ro - eXpert Echipamente Horeca',
    description: 'Furnizor de echipamente profesionale pentru industria HoReCa din România.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'XEH.ro - eXpert Echipamente Horeca',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XEH.ro - eXpert Echipamente Horeca',
    description: 'Furnizor de echipamente profesionale pentru industria HoReCa din România.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'XEH.ro - eXpert Echipamente Horeca',
  alternateName: 'XEH',
  url: 'https://xeh.ro',
  logo: 'https://xeh.ro/images/logo.png',
  description: 'Furnizor de echipamente profesionale pentru industria HoReCa din România.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Strada Exemplu nr. 123',
    addressLocality: 'București',
    addressCountry: 'RO',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+40-123-456-789',
    contactType: 'customer service',
    availableLanguage: 'Romanian',
  },
  sameAs: [
    'https://www.facebook.com/xeh.ro',
    'https://www.linkedin.com/company/xeh-ro',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
