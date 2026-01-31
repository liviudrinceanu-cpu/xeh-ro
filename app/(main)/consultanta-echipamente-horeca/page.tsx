import Link from 'next/link'
import { ArrowRight, CheckCircle2, Phone, Mail, MessageCircle, Users, FileText, Calculator, Clock, Award, Lightbulb, Clipboard } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Consultanță Gratuită Echipamente HoReCa | XEH.ro',
  description: 'Consultanță gratuită pentru echiparea bucătăriei profesionale. Experți în echipamente HoReCa te ajută să alegi cuptoare, frigidere și mașini spălat vase. Planificare, bugetare, finanțare.',
  keywords: [
    'consultanta echipamente horeca',
    'consultanta restaurant',
    'planificare bucatarie profesionala',
    'proiectare bucatarie restaurant',
    'echipare restaurant consultanta',
    'specialist echipamente horeca',
    'consultanta gratuita horeca',
  ],
  openGraph: {
    title: 'Consultanță Gratuită Echipamente HoReCa | XEH.ro',
    description: 'Experți în echipamente HoReCa te ajută să alegi și să planifici echiparea bucătăriei profesionale.',
    url: 'https://www.xeh.ro/consultanta-echipamente-horeca',
    images: [{
      url: 'https://www.xeh.ro/api/og?title=Consultanță Gratuită Echipamente HoReCa&subtitle=Experți pentru planificarea bucătăriei tale profesionale&type=category',
      width: 1200,
      height: 630,
      alt: 'Consultanță Echipamente HoReCa - XEH.ro',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consultanță Gratuită Echipamente HoReCa | XEH.ro',
    description: 'Experți în echipamente HoReCa te ajută să planifici echiparea bucătăriei profesionale.',
    images: ['https://www.xeh.ro/api/og?title=Consultanță Gratuită Echipamente HoReCa&type=category'],
  },
  alternates: {
    canonical: 'https://www.xeh.ro/consultanta-echipamente-horeca',
  },
}

const faqs = [
  {
    question: 'Consultanța pentru echipamente HoReCa este gratuită?',
    answer: 'Da, oferim consultanță gratuită pentru alegerea echipamentelor potrivite. Discutăm despre nevoile tale, buget și planificarea spațiului fără nicio obligație de cumpărare. Expertiza noastră vine din experiența de distribuitor autorizat RM Gastro.',
  },
  {
    question: 'Ce informații trebuie să pregătesc pentru consultanță?',
    answer: 'Pentru o consultanță eficientă, pregătește: planul/dimensiunile bucătăriei, tipul de afacere (restaurant, hotel, catering), capacitatea dorită (locuri/porții pe zi), meniul aproximativ, bugetul disponibil, și eventuala aplicare pentru fonduri europene.',
  },
  {
    question: 'Mă puteți ajuta cu aplicarea pentru fonduri europene?',
    answer: 'Da, oferim suport pentru pregătirea documentației: oferte detaliate conform cerințelor, specificații tehnice complete, 3 oferte comparative dacă este necesar, și consultanță pentru alegerea echipamentelor eligibile cu punctaj maxim.',
  },
  {
    question: 'Cât durează procesul de consultanță?',
    answer: 'O consultanță inițială durează 30-60 minute (telefon sau video). Pentru proiecte mari, facem și vizită la fața locului. După consultanță, primești oferta personalizată în 24-48 ore.',
  },
  {
    question: 'Oferiti și proiectarea layout-ului bucătăriei?',
    answer: 'Da, pentru proiecte complexe oferim recomandări de layout bazate pe fluxul de lucru optim, normele HACCP și eficiența spațiului. Colaborăm cu arhitecți specializați pentru proiecte de amploare.',
  },
]

const consultancyServices = [
  {
    title: 'Planificare Echipamente',
    description: 'Alegerea echipamentelor potrivite pentru meniul și volumul tău',
    icon: Clipboard,
    features: [
      'Analiza meniului și volumului de producție',
      'Recomandări bazate pe capacitate reală',
      'Prioritizare echipamente esențiale',
      'Alternative pentru diferite bugete',
    ],
  },
  {
    title: 'Bugetare Inteligentă',
    description: 'Optimizarea investiției pentru ROI maxim',
    icon: Calculator,
    features: [
      'Estimare costuri complete',
      'Strategii de economisire (REDFOX vs RM Gastro)',
      'Planificare achiziții pe etape',
      'Calcul cost total de operare',
    ],
  },
  {
    title: 'Consultanță Fonduri Europene',
    description: 'Suport pentru accesarea finanțărilor disponibile',
    icon: FileText,
    features: [
      'Verificare eligibilitate programe',
      'Pregătire oferte conforme',
      'Documentație tehnică completă',
      'Consultanță alegere echipamente eligibile',
    ],
  },
  {
    title: 'Layout și HACCP',
    description: 'Organizarea eficientă a spațiului de lucru',
    icon: Lightbulb,
    features: [
      'Recomandări flux de lucru',
      'Separare zone (crud/gătit/spălare)',
      'Conformitate norme HACCP',
      'Optimizare spațiu disponibil',
    ],
  },
]

const processSteps = [
  {
    step: 1,
    title: 'Contactează-ne',
    description: 'Telefon, email sau formular online',
    icon: Phone,
  },
  {
    step: 2,
    title: 'Discuție Inițială',
    description: 'Analizăm nevoile și bugetul tău',
    icon: MessageCircle,
  },
  {
    step: 3,
    title: 'Recomandări Personalizate',
    description: 'Primești lista de echipamente potrivite',
    icon: Clipboard,
  },
  {
    step: 4,
    title: 'Ofertă Detaliată',
    description: 'Ofertă cu specificații și prețuri',
    icon: FileText,
  },
]

const contactMethods = [
  {
    method: 'Telefon',
    value: '0371 232 404',
    href: 'tel:+40371232404',
    icon: Phone,
    description: 'Luni-Vineri: 9:00-18:00',
    cta: 'Sună Acum',
  },
  {
    method: 'Email',
    value: 'secretariat@infinitrade-romania.ro',
    href: 'mailto:secretariat@infinitrade-romania.ro',
    icon: Mail,
    description: 'Răspundem în max. 24 ore',
    cta: 'Trimite Email',
  },
  {
    method: 'Formular Online',
    value: 'Cerere Ofertă',
    href: '/cerere-oferta',
    icon: FileText,
    description: 'Completează detaliile proiectului',
    cta: 'Completează Formularul',
  },
]

const testimonials = [
  {
    text: 'Băieții de la XEH ne-au ajutat să alegem echipamentele potrivite pentru buget. Am economisit peste 3000 EUR fără să compromitem calitatea.',
    role: 'Proprietar',
    business: 'Restaurant 60 locuri',
    city: 'Cluj-Napoca',
  },
  {
    text: 'Consultanța pentru fonduri europene a fost extrem de valoroasă. Am primit finanțare 70% pentru echipamente.',
    role: 'Manager',
    business: 'Hotel 3 stele',
    city: 'Brașov',
  },
  {
    text: 'Recomandările de layout au făcut diferența. Bucătăria e mult mai eficientă decât ne imaginam.',
    role: 'Chef Executiv',
    business: 'Restaurant fine dining',
    city: 'București',
  },
]

export default function ConsultantaEchipamenteHorecaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Acasă', url: 'https://www.xeh.ro' },
          { name: 'Consultanță Echipamente HoReCa' },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-700 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Breadcrumb
            items={[{ label: 'Consultanță Echipamente HoReCa' }]}
            className="mb-8 text-teal-200"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Users className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">100% Gratuită • Fără Obligații</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Consultanță Gratuită pentru Echipamente HoReCa
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Experții noștri te ajută să alegi echipamentele potrivite pentru bucătăria ta profesională.
              Planificare, bugetare și suport pentru fonduri europene - totul gratuit.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+40371232404"
                className="inline-flex items-center gap-2 bg-white text-teal-800 hover:bg-teal-50 px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                <Phone className="w-5 h-5" />
                Sună: 0371 232 404
              </a>
              <Link
                href="/cerere-oferta"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Solicită Consultanță Online
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-teal-600">Gratuită</div>
              <div className="text-gray-500 text-sm">Consultanță Completă</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600">24-48h</div>
              <div className="text-gray-500 text-sm">Răspuns Garantat</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600">10+ ani</div>
              <div className="text-gray-500 text-sm">Experiență HoReCa</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-teal-600">500+</div>
              <div className="text-gray-500 text-sm">Proiecte Realizate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Cum Funcționează?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Proces simplu în 4 pași pentru consultanță profesională
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-teal-200" />
                )}
                <div className="bg-white rounded-2xl p-6 text-center relative z-10">
                  <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <step.icon className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-600 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Ce Include Consultanța?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Suport complet pentru toate aspectele echipării bucătăriei profesionale
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {consultancyServices.map((service) => (
              <div key={service.title} className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-600 mb-2">{service.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Ce Spun Clienții
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="text-sm">
                  <span className="font-semibold text-gray-600">{testimonial.role}</span>
                  <span className="text-gray-400"> • </span>
                  <span className="text-gray-500">{testimonial.business}</span>
                  <span className="text-gray-400"> • </span>
                  <span className="text-gray-500">{testimonial.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Contactează-ne
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Alege metoda preferată pentru a începe consultanța
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((contact) => (
              <a
                key={contact.method}
                href={contact.href}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all group text-center"
              >
                <div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-teal-600 transition-colors">
                  <contact.icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-600 mb-1">{contact.method}</h3>
                <p className="text-teal-600 font-semibold mb-2">{contact.value}</p>
                <p className="text-gray-500 text-sm mb-4">{contact.description}</p>
                <span className="inline-flex items-center gap-1 text-teal-600 font-semibold text-sm">
                  {contact.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
              Întrebări Frecvente
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-600 hover:text-teal-600 transition-colors">
                  {faq.question}
                  <span className="ml-4 flex-shrink-0 text-teal-600 group-open:rotate-180 transition-transform">
                    <ArrowRight className="w-5 h-5 rotate-90" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-500">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-teal-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 text-teal-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Gata să Începem?
          </h2>
          <p className="text-teal-100 text-lg mb-8">
            Consultanța este 100% gratuită și fără obligații. Hai să discutăm despre proiectul tău!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+40371232404"
              className="inline-flex items-center justify-center gap-2 bg-white text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-xl font-semibold transition-all text-lg"
            >
              <Phone className="w-5 h-5" />
              Sună Acum: 0371 232 404
            </a>
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors text-lg"
            >
              Completează Formularul Online
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
