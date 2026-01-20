import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { QuoteCartProvider } from '@/components/providers/QuoteCartProvider'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
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
      <body className="font-sans antialiased bg-background min-h-screen">
        <OrganizationJsonLd />
        <AuthProvider>
          <QuoteCartProvider>
            {children}
          </QuoteCartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
