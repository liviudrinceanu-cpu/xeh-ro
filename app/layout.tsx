import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { QuoteCartProvider } from '@/components/providers/QuoteCartProvider'
import { OrganizationJsonLd, LocalBusinessJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'XEH.ro - eXpert Echipamente Horeca',
    template: '%s | XEH.ro',
  },
  description: 'Distribuitor autorizat de echipamente profesionale HoReCa. Branduri premium RM Gastro și REDFOX pentru restaurante, hoteluri și cafenele.',
  keywords: ['echipamente horeca', 'bucatarie profesionala', 'RM Gastro', 'REDFOX', 'echipamente restaurant', 'cuptor pizza', 'friteuza profesionala'],
  authors: [{ name: 'XEH.ro' }],
  creator: 'XEH.ro',
  publisher: 'XEH.ro',
  metadataBase: new URL('https://www.xeh.ro'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://www.xeh.ro',
    siteName: 'XEH.ro',
    title: 'XEH.ro - eXpert Echipamente Horeca',
    description: 'Distribuitor autorizat de echipamente profesionale HoReCa. Branduri premium RM Gastro și REDFOX.',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=XEH.ro - eXpert Echipamente Horeca&subtitle=Distribuitor autorizat echipamente profesionale HoReCa',
      width: 1200,
      height: 630,
      alt: 'XEH.ro - eXpert Echipamente Horeca',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XEH.ro - eXpert Echipamente Horeca',
    description: 'Distribuitor autorizat de echipamente profesionale HoReCa.',
    images: ['https://www.xeh.ro/api/og?title=XEH.ro - eXpert Echipamente Horeca'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" className={inter.variable}>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://fllfgcuwjpnnrcijqzul.supabase.co" />
        <link rel="dns-prefetch" href="https://fllfgcuwjpnnrcijqzul.supabase.co" />
      </head>
      <body className="font-sans antialiased bg-background min-h-screen">
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-crimson focus:text-white focus:rounded-lg focus:outline-none"
        >
          Salt la conținut
        </a>
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <AuthProvider>
          <QuoteCartProvider>
            {children}
          </QuoteCartProvider>
        </AuthProvider>
        {/* Ahrefs Analytics - loaded after page becomes interactive for better performance */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="tmC7XUKsny09MLNS7hdRcQ"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
