import Link from 'next/link'
import { ArrowRight, Linkedin, Mail, Phone } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { PersonJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { teamMembers } from '@/lib/data/team'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Echipa Noastră | Experți HoReCa | XEH.ro',
  description: 'Cunoaște echipa de experți XEH.ro. Specialiști cu experiență în echipamente profesionale HoReCa, gata să te ajute să alegi soluțiile potrivite pentru afacerea ta.',
  keywords: [
    'echipa xeh.ro',
    'experti horeca',
    'consultanti echipamente restaurant',
    'specialisti bucatarie profesionala',
  ],
  openGraph: {
    title: 'Echipa Noastră | Experți HoReCa | XEH.ro',
    description: 'Cunoaște echipa de experți XEH.ro. Specialiști în echipamente profesionale HoReCa.',
    url: 'https://www.xeh.ro/echipa',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Echipa XEH.ro&subtitle=Experți în echipamente profesionale HoReCa&type=page',
      width: 1200,
      height: 630,
      alt: 'Echipa XEH.ro - Experți HoReCa',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echipa Noastră | Experți HoReCa | XEH.ro',
    description: 'Cunoaște echipa de experți XEH.ro.',
    images: ['https://www.xeh.ro/api/og?title=Echipa XEH.ro&type=page'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/echipa',
  },
}

export default function EchipaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org for each team member */}
      {teamMembers.map((member) => (
        <PersonJsonLd
          key={member.slug}
          person={{
            name: member.name,
            slug: member.slug,
            jobTitle: member.role,
            description: member.bio,
            email: member.email,
            knowsAbout: member.knowsAbout,
            sameAs: member.linkedin ? [member.linkedin] : undefined,
            alumniOf: member.education,
          }}
        />
      ))}
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă', url: 'https://www.xeh.ro' },
          { name: 'Echipa' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Echipa' }]}
            className="mb-8 text-gray-300"
          />
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Echipa Noastră de Experți
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Cunoaște profesioniștii care stau în spatele XEH.ro. Cu experiență combinată
              de peste 40 de ani în industria HoReCa, suntem pregătiți să te ajutăm
              să găsești soluțiile potrivite pentru afacerea ta.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <article
                key={member.slug}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-crimson to-crimson-dark rounded-2xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-600">{member.name}</h2>
                    <p className="text-crimson font-semibold">{member.role}</p>
                    <p className="text-gray-500 text-sm">{member.title}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        {member.yearsExperience}+ ani experiență
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {member.articlesCount} articole publicate
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {member.bio}
                </p>

                {/* Expertise */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Arii de Expertiză:</h3>
                  <ul className="grid grid-cols-2 gap-2">
                    {member.expertise.map((skill) => (
                      <li key={skill} className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-crimson rounded-full" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Education */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <p className="text-xs text-gray-400">
                    <strong>Educație:</strong> {member.education}
                  </p>
                </div>

                {/* Contact Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-crimson transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  <Link
                    href={`/blog?author=${member.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-crimson hover:text-crimson-dark transition-colors ml-auto"
                  >
                    Vezi articole
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Team Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              De Ce Să Lucrezi Cu Echipa Noastră?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Nu suntem doar vânzători - suntem consultanți cu experiență reală în industria HoReCa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="font-bold text-gray-600 mb-2">Expertiză Dovedită</h3>
              <p className="text-gray-500 text-sm">
                Toți membrii echipei au experiență practică în industria HoReCa,
                nu doar cunoștințe teoretice despre produse.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="font-bold text-gray-600 mb-2">Consultanță Personalizată</h3>
              <p className="text-gray-500 text-sm">
                Analizăm nevoile specifice ale afacerii tale și recomandăm
                soluții optimizate pentru bugetul și volumul tău.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-crimson/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="font-bold text-gray-600 mb-2">Suport Continuu</h3>
              <p className="text-gray-500 text-sm">
                Relația noastră nu se termină la livrare. Oferim suport tehnic
                și consultanță pe toată durata de viață a echipamentelor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-crimson to-crimson-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Vrei să vorbești cu un expert?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Contactează-ne pentru consultanță gratuită. Te ajutăm să alegi echipamentele
            potrivite pentru afacerea ta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-crimson hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Contactează-ne
            </Link>
            <a
              href="tel:+40724256250"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <Phone className="w-4 h-4" />
              Sună: 0724 256 250
            </a>
          </div>
          {/* Last Updated - E-E-A-T signal for content freshness */}
          <p className="text-white/50 text-xs mt-8">
            Ultima actualizare echipă: Ianuarie 2026
          </p>
        </div>
      </section>
    </div>
  )
}
