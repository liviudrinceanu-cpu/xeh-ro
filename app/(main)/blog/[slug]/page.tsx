import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'
import { FAQJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'

// Article content database
const articlesContent: Record<string, {
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  readTime: string
  keywords: string[]
  faqs?: Array<{ question: string; answer: string }>
}> = {
  'top-10-cuptoare-profesionale-restaurante-2026': {
    title: 'Top 10 Cuptoare Profesionale pentru Restaurante în 2026',
    excerpt: 'Ghid complet pentru alegerea celui mai bun cuptor profesional. Comparăm cuptoare cu convecție, combi steamere și cuptoare pentru pizza.',
    category: 'Ghiduri',
    author: 'Echipa XEH',
    date: '2026-01-15',
    readTime: '8 min',
    keywords: ['cuptoare profesionale', 'cuptor restaurant', 'cuptor convecție', 'combi steamer', 'cuptor pizza'],
    content: `
## De ce este important să alegi cuptorul potrivit?

Cuptorul profesional este inima oricărei bucătării de restaurant. Alegerea corectă poate face diferența între o bucătărie eficientă și una care se luptă să țină pasul cu comenzile.

## Tipuri de cuptoare profesionale

### 1. Cuptoare cu Convecție
Cuptoarele cu convecție folosesc ventilatoare pentru a circula aerul cald uniform în jurul alimentelor. Sunt ideale pentru:
- Produse de patiserie
- Coacerea pâinii
- Gratinare

**Recomandare:** [RM Gastro Convection Ovens](/rm/konvektomaty) - gama completă de cuptoare cu convecție.

### 2. Combi Steamere
Combi steamerele combină gătirea cu aburi și cu aer cald. Avantaje:
- Versatilitate maximă
- Economie de energie
- Rezultate consistente

### 3. Cuptoare pentru Pizza
Esențiale pentru pizzerii, oferă:
- Temperaturi înalte (până la 500°C)
- Vatră din piatră sau ceramică
- Coacere uniformă

## Top 10 Cuptoare Recomandate

1. **RM Gastro SCC 101** - Combi steamer premium
2. **REDFOX PE-4** - Cuptor patiserie economic
3. **RM Gastro CPE 110** - Cuptor pizza profesional
4. **REDFOX KE-423** - Cuptor convecție compact
5. **RM Gastro SCC 61** - Combi steamer 6 tăvi
6. **REDFOX BETA 2** - Cuptor pizza dublu
7. **RM Gastro ME 110** - Cuptor electric multifuncțional
8. **REDFOX KE-411** - Cuptor convecție mic
9. **RM Gastro CGE 611** - Cuptor gaz convecție
10. **REDFOX PE-6** - Cuptor patiserie 6 tăvi

## Cum alegi cuptorul potrivit?

### Criterii de selecție:
- **Capacitate**: Câte porții/zi produci?
- **Spațiu disponibil**: Măsoară exact locul
- **Buget**: Premium vs Economic
- **Tip de preparate**: Pizza, patiserie, general

## Concluzie

Alegerea cuptorului profesional depinde de nevoile specifice ale restaurantului tău. La XEH.ro găsești atât gama premium RM Gastro, cât și varianta economică REDFOX.

[Cere o ofertă personalizată](/cerere-oferta) și te ajutăm să alegi!
    `,
    faqs: [
      {
        question: 'Care este cel mai bun cuptor pentru un restaurant mic?',
        answer: 'Pentru restaurante mici, recomandăm cuptoare cu convecție compacte precum REDFOX KE-411 sau RM Gastro ME 110. Oferă versatilitate și ocupă puțin spațiu.',
      },
      {
        question: 'Cât costă un cuptor profesional de restaurant?',
        answer: 'Prețurile variază între 500 EUR pentru cuptoare compacte și peste 15.000 EUR pentru combi steamere premium. La XEH.ro găsești opțiuni pentru orice buget.',
      },
      {
        question: 'Ce diferență este între cuptor cu convecție și combi steamer?',
        answer: 'Cuptorul cu convecție folosește doar aer cald, în timp ce combi steamerul poate combina aerul cald cu aburi. Combi steamerul oferă mai multe opțiuni de gătit dar este mai scump.',
      },
    ],
  },
  'ghid-complet-echipamente-horeca-restaurant': {
    title: 'Ghid Complet: Cum Alegi Echipamentele HoReCa pentru Restaurant',
    excerpt: 'Tot ce trebuie să știi înainte de a echipa bucătăria profesională.',
    category: 'Ghiduri',
    author: 'Echipa XEH',
    date: '2026-01-12',
    readTime: '12 min',
    keywords: ['echipamente horeca', 'bucătărie profesională', 'echipamente restaurant', 'utilaje horeca'],
    content: `
## Introducere

Deschiderea unui restaurant necesită o investiție semnificativă în echipamente profesionale. Acest ghid te va ajuta să faci alegeri informate.

## Categorii Principale de Echipamente

### 1. Echipamente de Gătit
- Cuptoare profesionale
- Plite și aragazuri
- Friteuze
- Grătare

### 2. Echipamente de Refrigerare
- Frigidere profesionale
- Congelatoare
- Răcitoare blast chiller
- Vitrine frigorifice

### 3. Echipamente de Spălare
- Mașini de spălat vase
- Mașini de spălat pahare
- Chiuvete inox

### 4. Mobilier Inox
- Mese de lucru
- Rafturi
- Hote

## Bugetare și Planificare

### Regula 40-30-20-10:
- 40% - Echipamente gătit
- 30% - Refrigerare
- 20% - Spălare și preparare
- 10% - Mobilier și accesorii

## Branduri Recomandate

### RM Gastro (Premium)
Ideal pentru restaurante upscale cu pretenții ridicate de calitate și performanță.

### REDFOX (Economic)
Perfect pentru fast-food, bistrouri și afaceri care caută raport calitate-preț excelent.

## Pași pentru Achiziție

1. **Planifică meniul** - Ce preparate vei servi?
2. **Măsoară spațiul** - Dimensiunile exacte ale bucătăriei
3. **Stabilește bugetul** - Cu 10-20% rezervă
4. **Consultă experți** - [Contactează-ne](/contact)
5. **Solicită oferte** - Compară prețuri

## Concluzii

Investiția în echipamente de calitate se amortizează rapid prin eficiență și durabilitate. XEH.ro oferă consultanță gratuită pentru echiparea restaurantului tău.
    `,
    faqs: [
      {
        question: 'Cât costă să echipezi o bucătărie de restaurant?',
        answer: 'Costul variază între 15.000-100.000 EUR în funcție de mărime și nivel de dotare. Un restaurant mic poate fi echipat cu 20.000-30.000 EUR.',
      },
      {
        question: 'Ce echipamente sunt obligatorii pentru un restaurant?',
        answer: 'Minim: cuptor/aragaz, frigider, congelator, mașină spălat vase, chiuvetă, masă de lucru inox și hotă de evacuare.',
      },
    ],
  },
  'cuptor-convectie-vs-cuptor-clasic-diferente': {
    title: 'Cuptor cu Convecție vs Cuptor Clasic: Care Este Mai Bun?',
    excerpt: 'Analizăm diferențele dintre cuptoarele cu convecție și cele clasice.',
    category: 'Comparații',
    author: 'Echipa XEH',
    date: '2026-01-10',
    readTime: '6 min',
    keywords: ['cuptor convecție', 'cuptor clasic', 'comparație cuptoare', 'cuptor profesional'],
    content: `
## Cuptor cu Convecție vs Clasic

### Ce este un cuptor cu convecție?
Cuptorul cu convecție are un ventilator care circulă aerul cald uniform, rezultând:
- Gătire mai rapidă (20-25%)
- Rezultate uniforme
- Economie de energie

### Ce este un cuptor clasic?
Cuptorul clasic (static) încălzește prin radiație directă de la rezistențe. Potrivit pentru:
- Preparate delicate
- Sufleuri
- Prăjituri care trebuie să crească uniform

## Tabel Comparativ

| Caracteristică | Convecție | Clasic |
|---------------|-----------|--------|
| Viteză gătire | Rapidă | Normală |
| Uniformitate | Excelentă | Bună |
| Preț | Mai mare | Mai mic |
| Consum | Mai mic | Mai mare |
| Versatilitate | Mare | Medie |

## Când alegi convecție?
- Restaurant cu volum mare
- Patiserie și panificație
- Când ai nevoie de consistență

## Când alegi clasic?
- Buget limitat
- Preparate specifice
- Volum mic de producție

## Recomandările XEH.ro

Pentru majoritatea restaurantelor, **cuptorul cu convecție** este alegerea potrivită datorită versatilității și eficienței.

Explorează [gama noastră de cuptoare cu convecție](/rm/konvektomaty).
    `,
    faqs: [
      {
        question: 'Merită investiția într-un cuptor cu convecție?',
        answer: 'Da, pentru restaurante cu volum mediu-mare. Economia de timp și energie amortizează diferența de preț în 6-12 luni.',
      },
    ],
  },
  'masini-spalat-vase-industriale-ghid-alegere': {
    title: 'Mașini de Spălat Vase Industriale: Ghid Complet de Alegere',
    excerpt: 'Cum alegi mașina de spălat vase potrivită pentru restaurantul tău?',
    category: 'Ghiduri',
    author: 'Echipa XEH',
    date: '2026-01-08',
    readTime: '7 min',
    keywords: ['mașină spălat vase', 'mașină spălat vase industrială', 'mașină spălat vase restaurant'],
    content: `
## De ce ai nevoie de o mașină profesională?

Mașinile de spălat vase industriale oferă:
- Cicluri scurte (2-3 minute)
- Igienizare la temperaturi înalte
- Capacitate mare
- Durabilitate

## Tipuri de Mașini

### 1. Mașini cu Capotă (Hood Type)
- Capacitate: 40-80 coșuri/oră
- Ideale pentru restaurante medii-mari

### 2. Mașini Frontale (Undercounter)
- Capacitate: 20-40 coșuri/oră
- Pentru restaurante mici și baruri

### 3. Mașini cu Bandă (Conveyor)
- Capacitate: 100+ coșuri/oră
- Pentru hoteluri și cantină

## Criterii de Alegere

1. **Volum zilnic** - Câte farfurii/zi?
2. **Spațiu disponibil**
3. **Alimentare cu apă** - Dedurizator necesar?
4. **Buget**

## Recomandări

Vezi [programul nostru de spălare](/rm/myci-program) pentru opțiuni complete.
    `,
    faqs: [
      {
        question: 'Cât durează un ciclu de spălare profesional?',
        answer: 'Între 60 secunde și 3 minute, în funcție de programul ales și tipul mașinii.',
      },
    ],
  },
  'echipamente-refrigerare-profesionala-tipuri': {
    title: 'Echipamente de Refrigerare Profesională: Tipuri și Utilizări',
    excerpt: 'De la frigidere verticale la răcitoare rapide blast chiller.',
    category: 'Ghiduri',
    author: 'Echipa XEH',
    date: '2026-01-05',
    readTime: '9 min',
    keywords: ['refrigerare profesională', 'frigider industrial', 'blast chiller', 'răcitor rapid'],
    content: `
## Importanța Refrigerării Profesionale

Lanțul de frig este esențial pentru:
- Siguranța alimentară
- Păstrarea calității
- Conformitate HACCP

## Tipuri de Echipamente

### Frigidere Profesionale
- Verticale cu 1-3 uși
- Orizontale (mese frigorifice)
- Vitrine expunere

### Congelatoare
- Verticale
- Lăzi
- Rapide (blast freezer)

### Răcitoare Rapide (Blast Chiller)
Esențiale pentru:
- Răcire rapidă de la +90°C la +3°C
- Prevenirea dezvoltării bacteriilor
- Cook & Chill

Explorează [gama de răcitoare rapide](/rm/sokery).

### Vitrine Frigorifice
- Pentru expunere deserturi
- Vitrine refrigerate
- Bufet rece

## Alegerea Potrivită

Vezi [sistemele noastre de răcire](/rm/chlazeni) pentru soluții complete.
    `,
    faqs: [
      {
        question: 'Ce este un blast chiller și am nevoie de unul?',
        answer: 'Blast chiller-ul răcește rapid alimentele gătite, prevenind contaminarea. Este obligatoriu pentru cook & chill și recomandat pentru restaurante cu volum mare.',
      },
    ],
  },
  'rm-gastro-vs-redfox-comparatie-branduri': {
    title: 'RM Gastro vs REDFOX: Comparație Completă între Branduri',
    excerpt: 'Care brand este potrivit pentru tine?',
    category: 'Comparații',
    author: 'Echipa XEH',
    date: '2026-01-03',
    readTime: '5 min',
    keywords: ['RM Gastro', 'REDFOX', 'echipamente horeca', 'comparație branduri'],
    content: `
## Despre Branduri

### RM Gastro
- Brand premium ceh
- Peste 30 ani experiență
- Focus pe performanță maximă

### REDFOX
- Linie economică a RM Gastro
- Raport calitate-preț excelent
- Design modern

## Comparație Detaliată

| Aspect | RM Gastro | REDFOX |
|--------|-----------|--------|
| Segment | Premium | Economic |
| Preț | Mai mare | Mai accesibil |
| Garanție | Extinsă | Standard |
| Design | Clasic premium | Modern |
| Durabilitate | Excelentă | Foarte bună |

## Când alegi RM Gastro?
- Restaurant fine dining
- Hotel de lux
- Buget generos
- Cerințe speciale

## Când alegi REDFOX?
- Fast food
- Bistro
- Buget optimizat
- Startup

## Explorează Gamele

- [RM Gastro - Linia Premium](/rm)
- [REDFOX - Linia Economică](/redfox)

Ambele branduri sunt disponibile la XEH.ro cu garanție și suport tehnic.
    `,
    faqs: [
      {
        question: 'Sunt echipamentele REDFOX de calitate inferioară?',
        answer: 'Nu, REDFOX oferă calitate foarte bună la preț accesibil. Diferența față de RM Gastro este în finish-uri premium și funcții avansate, nu în fiabilitate.',
      },
    ],
  },
}

interface BlogArticlePageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const article = articlesContent[slug]

  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.keywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
    alternates: {
      canonical: `https://xeh.ro/blog/${slug}`,
    },
  }
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params
  const article = articlesContent[slug]

  if (!article) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: article.title },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org */}
      {article.faqs && <FAQJsonLd faqs={article.faqs} />}
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((item) => ({
          name: item.label,
          url: item.href ? `https://xeh.ro${item.href}` : undefined,
        }))}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mt-6">
            <span className="text-crimson text-sm font-semibold">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-600 mt-2">
              {article.title}
            </h1>
            <p className="text-gray-500 mt-4 text-lg">
              {article.excerpt}
            </p>

            <div className="flex items-center gap-6 mt-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString('ro-RO', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} citire
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-600 prose-a:text-crimson prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{
              __html: article.content
                .replace(/^## /gm, '<h2 class="text-2xl font-bold mt-8 mb-4">')
                .replace(/^### /gm, '<h3 class="text-xl font-semibold mt-6 mb-3">')
                .replace(/\n\n/g, '</p><p class="mb-4">')
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-crimson hover:underline">$1</a>')
                .replace(/^- /gm, '<li class="ml-4">')
                .replace(/<li/g, '</ul><ul class="list-disc mb-4"><li')
                .replace(/<\/li>\n(?!<li)/g, '</li></ul>')
            }}
          />
        </article>

        {/* FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="mt-12 bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-600 mb-6">
              Întrebări Frecvente
            </h2>
            <div className="space-y-4">
              {article.faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-gray-50 rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-600 hover:text-crimson transition-colors">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-crimson group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-500">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-crimson rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ai nevoie de echipamente profesionale?
          </h2>
          <p className="text-white/80 mb-6">
            Explorează catalogul nostru sau solicită o ofertă personalizată.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 bg-white text-crimson px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Vezi Catalogul
            </Link>
            <Link
              href="/cerere-oferta"
              className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors"
            >
              Cere Ofertă
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-crimson transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
