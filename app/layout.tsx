import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
  metadataBase: new URL('https://xeh.ro'),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://xeh.ro',
    siteName: 'XEH.ro',
    title: 'XEH.ro - eXpert Echipamente Horeca',
    description: 'Distribuitor autorizat de echipamente profesionale HoReCa. Branduri premium RM Gastro și REDFOX.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XEH.ro - eXpert Echipamente Horeca',
    description: 'Distribuitor autorizat de echipamente profesionale HoReCa.',
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
        {/* Ahrefs Analytics */}
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="tmC7XUKsny09MLNS7hdRcQ" async></script>
      </head>
      <body className="font-sans antialiased bg-background min-h-screen">
        <OrganizationJsonLd />
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <AuthProvider>
          <QuoteCartProvider>
            {children}
          </QuoteCartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
