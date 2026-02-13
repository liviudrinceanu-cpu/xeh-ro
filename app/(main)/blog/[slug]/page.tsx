import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'
import { FAQJsonLd, BreadcrumbJsonLd, ArticleJsonLd, HowToJsonLd } from '@/components/seo/JsonLd'
import { Fragment } from 'react'

// Safe markdown parser - converts content to React elements instead of using dangerouslySetInnerHTML
function SafeMarkdown({ content }: { content: string }) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let currentList: string[] = []

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="list-disc mb-4 ml-4 space-y-1">
          {currentList.map((item, i) => (
            <li key={i} className="text-gray-600">{parseInlineElements(item)}</li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  const parseInlineElements = (text: string): React.ReactNode => {
    // Parse bold, links
    const parts: React.ReactNode[] = []
    let remaining = text
    let partKey = 0

    while (remaining.length > 0) {
      // Check for links [text](url)
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/)
      // Check for bold **text**
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/)

      // Find the first match by comparing indices
      const linkIndex = linkMatch?.index ?? Infinity
      const boldIndex = boldMatch?.index ?? Infinity

      if (linkIndex === Infinity && boldIndex === Infinity) {
        // No more matches
        parts.push(<Fragment key={partKey++}>{remaining}</Fragment>)
        remaining = ''
        continue
      }

      if (linkIndex <= boldIndex && linkMatch) {
        // Link comes first
        if (linkIndex > 0) {
          parts.push(<Fragment key={partKey++}>{remaining.slice(0, linkIndex)}</Fragment>)
        }
        const [fullMatch, linkText, href] = linkMatch
        // Only allow internal links or safe external links
        const safeHref = href.startsWith('/') ? href : '#'
        parts.push(
          <Link key={partKey++} href={safeHref} className="text-crimson hover:underline">
            {linkText}
          </Link>
        )
        remaining = remaining.slice(linkIndex + fullMatch.length)
      } else if (boldMatch) {
        // Bold comes first
        if (boldIndex > 0) {
          parts.push(<Fragment key={partKey++}>{remaining.slice(0, boldIndex)}</Fragment>)
        }
        const [fullMatch, boldText] = boldMatch
        parts.push(<strong key={partKey++}>{boldText}</strong>)
        remaining = remaining.slice(boldIndex + fullMatch.length)
      }
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>
  }

  for (const line of lines) {
    const trimmedLine = line.trim()

    if (trimmedLine === '') {
      flushList()
      continue
    }

    // Headers
    if (trimmedLine.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={key++} className="text-2xl font-bold mt-8 mb-4 text-gray-600">
          {trimmedLine.slice(3)}
        </h2>
      )
    } else if (trimmedLine.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={key++} className="text-xl font-semibold mt-6 mb-3 text-gray-600">
          {trimmedLine.slice(4)}
        </h3>
      )
    }
    // List items
    else if (trimmedLine.startsWith('- ')) {
      currentList.push(trimmedLine.slice(2))
    }
    // Table (basic support)
    else if (trimmedLine.startsWith('|')) {
      flushList()
      // Skip tables for now - they're complex
      elements.push(
        <p key={key++} className="text-gray-600 mb-4 font-mono text-sm bg-gray-50 p-2 rounded">
          {trimmedLine}
        </p>
      )
    }
    // Regular paragraph
    else {
      flushList()
      elements.push(
        <p key={key++} className="text-gray-600 mb-4">
          {parseInlineElements(trimmedLine)}
        </p>
      )
    }
  }

  flushList()

  return <>{elements}</>
}

// Helper function to strip markdown for articleBody in Schema.org
function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s/g, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links but keep text
    .replace(/- /g, '') // Remove list markers
    .replace(/\n{2,}/g, ' ') // Replace multiple newlines with space
    .replace(/\n/g, ' ') // Replace single newlines with space
    .trim()
}

// Author data for E-E-A-T - linked to /echipa page
// NOTE: Using initials only for privacy (full names removed as per GDPR compliance)
const authors: Record<string, { name: string; slug: string; title: string }> = {
  'a-i': { name: 'A.I.', slug: 'a-i', title: 'Director General & Fondator' },
  'm-p': { name: 'M.P.', slug: 'm-p', title: 'Director Tehnic' },
  'a-d': { name: 'A.D.', slug: 'a-d', title: 'Consultant Vânzări' },
  'e-s': { name: 'E.S.', slug: 'e-s', title: 'Specialist Proiecte' },
}

// Article content database
const articlesContent: Record<string, {
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  authorSlug: string
  date: string
  dateModified?: string
  readTime: string
  keywords: string[]
  faqs?: Array<{ question: string; answer: string }>
  howToSteps?: Array<{ name: string; text: string }>
}> = {
  'top-10-cuptoare-profesionale-restaurante-2026': {
    title: 'Top 10 Cuptoare Profesionale pentru Restaurante în 2026',
    excerpt: 'Ghid complet pentru alegerea celui mai bun cuptor profesional. Comparăm cuptoare cu convecție, combi steamere și cuptoare pentru pizza.',
    category: 'Ghiduri',
    author: 'M.P.',
    authorSlug: 'm-p',
    date: '2026-01-15',
    dateModified: '2026-01-27',
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

**Recomandare:** [RM Gastro Convection Ovens](/rm/cuptoare-cu-convectie) - gama completă de cuptoare cu convecție.

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
    author: 'A.I.',
    authorSlug: 'a-i',
    date: '2026-01-12',
    dateModified: '2026-01-27',
    readTime: '12 min',
    keywords: ['echipamente horeca', 'bucătărie profesională', 'echipamente restaurant', 'utilaje horeca'],
    howToSteps: [
      { name: 'Planifică meniul', text: 'Decide ce preparate vei servi pentru a determina echipamentele necesare.' },
      { name: 'Măsoară spațiul', text: 'Obține dimensiunile exacte ale bucătăriei profesionale.' },
      { name: 'Stabilește bugetul', text: 'Alocă bugetul urmând regula 40-30-20-10: gătit, refrigerare, spălare, mobilier.' },
      { name: 'Consultă experți', text: 'Contactează specialiștii XEH.ro pentru recomandări personalizate gratuite.' },
      { name: 'Solicită oferte', text: 'Compară prețuri și solicită ofertă personalizată pentru echipamentele alese.' },
    ],
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
    author: 'M.P.',
    authorSlug: 'm-p',
    date: '2026-01-10',
    dateModified: '2026-01-27',
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

Explorează [gama noastră de cuptoare cu convecție](/rm/cuptoare-cu-convectie).
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
    author: 'E.S.',
    authorSlug: 'e-s',
    date: '2026-01-08',
    dateModified: '2026-01-27',
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

Vezi [programul nostru de spălare](/rm/masini-de-spalat-vase) pentru opțiuni complete.
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
    author: 'A.D.',
    authorSlug: 'a-d',
    date: '2026-01-05',
    dateModified: '2026-01-27',
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

Explorează [gama de răcitoare rapide](/rm/racitoare-rapide).

### Vitrine Frigorifice
- Pentru expunere deserturi
- Vitrine refrigerate
- Bufet rece

## Alegerea Potrivită

Vezi [sistemele noastre de răcire](/rm/sistem-de-racire) pentru soluții complete.
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
    author: 'A.I.',
    authorSlug: 'a-i',
    date: '2026-01-03',
    dateModified: '2026-01-27',
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
  'ghid-deschidere-restaurant-2026': {
    title: 'Ghid Complet: Cum să Deschizi un Restaurant în 2026',
    excerpt: 'Pași esențiali, costuri, echipamente obligatorii și sfaturi practice pentru a deschide un restaurant de succes în România.',
    category: 'Ghiduri',
    author: 'A.I.',
    authorSlug: 'a-i',
    date: '2026-01-22',
    dateModified: '2026-01-27',
    readTime: '15 min',
    keywords: ['deschidere restaurant', 'cum deschid restaurant', 'echipare bucatarie restaurant', 'costuri restaurant', 'autorizatii restaurant'],
    howToSteps: [
      { name: 'Definește conceptul și planul de afaceri', text: 'Stabilește tipul de restaurant, target-ul de clienți și creează un plan financiar pe 3-5 ani.' },
      { name: 'Obține autorizațiile necesare', text: 'Aplică pentru CUI, autorizație ISU, DSP, DSVSA și autorizație de funcționare.' },
      { name: 'Amenajează spațiul conform normelor', text: 'Asigură-te că bucătăria este 30-40% din suprafață și respectă normele sanitare.' },
      { name: 'Echipează bucătăria profesională', text: 'Achiziționează cuptoare, frigidere, mașini de spălat vase și mobilier inox.' },
      { name: 'Instruiește personalul și testează', text: 'Angajează și instruiește echipa, testează toate echipamentele înainte de deschidere.' },
      { name: 'Lansează restaurantul', text: 'Organizează soft opening pentru testare și apoi deschidere oficială cu marketing.' },
    ],
    content: `
## De ce 2026 este anul potrivit să deschizi un restaurant?

Industria HoReCa din România este în plină expansiune. Cu fonduri europene disponibile și o cerere crescândă pentru experiențe culinare de calitate, acesta poate fi momentul perfect pentru visul tău antreprenorial.

## Pașii Esențiali pentru Deschiderea unui Restaurant

### 1. Planificarea și Conceptul
Înainte de orice, definește:
- **Conceptul** - Fine dining, casual, fast-food, etnic?
- **Target-ul** - Cine sunt clienții tăi ideali?
- **Locația** - Zona cu trafic potrivit pentru concept
- **Meniul** - Ce vei servi și la ce prețuri?

### 2. Plan de Afaceri
Un plan solid include:
- Analiză de piață și concurență
- Proiecții financiare pe 3-5 ani
- Strategia de marketing
- Structura echipei

### 3. Aspecte Legale și Autorizații
**Autorizații obligatorii:**
- Certificat de înregistrare fiscală (CUI)
- Autorizație ISU (pompieri)
- Autorizație sanitară (DSP)
- Autorizație de mediu (dacă e cazul)
- Aviz sanitar-veterinar (DSVSA)
- Autorizație de funcționare

### 4. Spațiul și Amenajarea
**Reguli de bază:**
- Minim 1.4 mp/loc pentru zona de servire
- Bucătăria = 30-40% din suprafața totală
- Depozit separat pentru alimente
- Grupuri sanitare separate personal/clienți

## Echipamente Obligatorii pentru Bucătărie

### Echipamente de Gătit
- [Cuptoare profesionale](/cuptoare-profesionale) - convecție sau combi steamer
- Plite și aragazuri industriale
- Friteuze profesionale
- Grătare și plăci grill

### Echipamente de Refrigerare
- [Frigidere profesionale](/rm/sistem-de-racire) - verticale și mese refrigerate
- Congelatoare
- Blast chiller (recomandat pentru HACCP)

### Echipamente de Spălare
- [Mașină spălat vase](/masini-spalat-vase-profesionale) - obligatorie
- Chiuvete inox (minim 2)

### Mobilier Inox
- Mese de lucru
- Rafturi depozitare
- Hota de evacuare

## Costurile Estimate pentru Deschiderea unui Restaurant

### Restaurant Mic (30-50 locuri)

| Categorie | Cost Estimat |
|-----------|-------------|
| Amenajare spațiu | 15.000-30.000 EUR |
| Echipamente bucătărie | 20.000-40.000 EUR |
| Mobilier sală | 10.000-20.000 EUR |
| Autorizații | 2.000-5.000 EUR |
| Stoc inițial | 3.000-5.000 EUR |
| Marketing lansare | 2.000-5.000 EUR |
| **TOTAL** | **50.000-100.000 EUR** |

### Restaurant Mediu (50-100 locuri)

| Categorie | Cost Estimat |
|-----------|-------------|
| Amenajare spațiu | 30.000-60.000 EUR |
| Echipamente bucătărie | 40.000-80.000 EUR |
| Mobilier sală | 20.000-40.000 EUR |
| Autorizații | 3.000-7.000 EUR |
| Stoc inițial | 5.000-10.000 EUR |
| Marketing lansare | 5.000-10.000 EUR |
| **TOTAL** | **100.000-200.000 EUR** |

## Cum să Economisești la Echipamente

### Strategii inteligente:
- **Leasing echipamente** - plătești în rate, nu blochezi capitalul
- **Echipamente REDFOX** - alternativă economică la brandurile premium
- **Cere ofertă pachet** - discounturi pentru comenzi complete
- **Prioritizează esențialul** - începe cu minimul necesar

[Cere ofertă personalizată](/cerere-oferta) pentru echiparea restaurantului tău.

## Greșeli Comune de Evitat

1. **Subdimensionarea bucătăriei** - vei avea blocaje în orele de vârf
2. **Economisirea la echipamente critice** - cuptorul și frigiderul trebuie să fie fiabile
3. **Lipsa planului HACCP** - risc de amendă și închidere
4. **Ignorarea ventilației** - hota subdimensionată = probleme
5. **Neglijarea ergonomiei** - personalul obosit = serviciu slab

## Checklist Final Pre-Deschidere

- Toate autorizațiile obținute
- Echipamentele instalate și testate
- Planul HACCP implementat
- Personal instruit
- Stocul inițial aprovizionat
- Marketing și prezență online gata
- Soft facturare și POS funcțional
- Asigurări încheiate

## Concluzie

Deschiderea unui restaurant este o provocare, dar cu planificare atentă și echipamente de calitate, poate fi una dintre cele mai satisfăcătoare afaceri.

La XEH.ro te ajutăm cu echiparea completă a bucătăriei - de la cuptor la ultima lingură.
    `,
    faqs: [
      {
        question: 'Cât costă să deschid un restaurant mic în România?',
        answer: 'Un restaurant mic (30-50 locuri) necesită o investiție de 50.000-100.000 EUR, incluzând amenajare, echipamente, mobilier, autorizații și stoc inițial. Costurile variază în funcție de locație și concept.',
      },
      {
        question: 'Ce autorizații îmi trebuie pentru un restaurant?',
        answer: 'Autorizații obligatorii: CUI (înregistrare fiscală), autorizație ISU (pompieri), autorizație sanitară DSP, aviz DSVSA (sanitar-veterinar), și autorizație de funcționare de la primărie.',
      },
      {
        question: 'Cât durează să obțin toate autorizațiile pentru restaurant?',
        answer: 'În medie, 2-4 luni dacă documentația este completă. Recomandăm să începi procesul de autorizare cu minim 3 luni înainte de data planificată de deschidere.',
      },
      {
        question: 'Pot accesa fonduri europene pentru deschiderea unui restaurant?',
        answer: 'Da, prin programele PNRR și Start-Up Nation. Finanțările pot acoperi 50-90% din investiție. Verifică eligibilitatea pe fonduri-structurale.ro sau consultă un specialist în accesare fonduri.',
      },
    ],
  },
  'fonduri-europene-horeca-2026': {
    title: 'Fonduri Europene HoReCa 2026: Ghid Complet de Accesare',
    excerpt: 'Tot ce trebuie să știi despre finanțările disponibile pentru industria HoReCa în 2026: PNRR, Start-Up Nation, POC și alte programe.',
    category: 'Finanțare',
    author: 'A.I.',
    authorSlug: 'a-i',
    date: '2026-01-20',
    dateModified: '2026-01-27',
    readTime: '12 min',
    keywords: ['fonduri europene horeca', 'finantare restaurant', 'PNRR horeca', 'Start-Up Nation', 'fonduri nerambursabile restaurant'],
    content: `
## Ce Fonduri Europene Sunt Disponibile pentru HoReCa în 2026?

Anul 2026 aduce oportunități semnificative de finanțare pentru industria HoReCa. Programele active oferă finanțări de la 10.000 EUR până la 500.000 EUR pentru echipamente, digitalizare și dezvoltare.

## Programe Active în 2026

### 1. PNRR - Componenta C10 (Turism și Cultură)

**Buget total:** 500 milioane EUR
**Finanțare maximă:** Până la 200.000 EUR/proiect
**Intensitate ajutor:** 50-90% (în funcție de regiune)

**Cheltuieli eligibile:**
- Echipamente profesionale pentru bucătării
- Sisteme de refrigerare
- Echipamente pentru eficiență energetică
- Digitalizare (POS, software management)
- Renovări și modernizări

**Criterii de eligibilitate:**
- Minim 1 an vechime (sau proiect nou cu garanții)
- Sediu în România
- Nu ai datorii la stat
- Plan de afaceri viabil

### 2. Start-Up Nation 2026

**Finanțare:** Până la 50.000 EUR (200.000 RON)
**Tip:** 100% grant nerambursabil
**Termen:** Sesiuni în martie și septembrie 2026

**Potrivit pentru:**
- Restaurante noi
- Cafenele și baruri
- Dark kitchens
- Food trucks

**Cheltuieli eligibile pentru HoReCa:**
- Echipamente bucătărie (cuptoare, frigidere, mașini spălat vase)
- Mobilier și amenajări
- Software și licențe
- Consultanță și marketing

### 3. POC - Digitalizare IMM

**Finanțare:** 15.000-50.000 EUR
**Intensitate:** 90% grant
**Focus:** Digitalizare și automatizare

**Aplicabil pentru:**
- Sisteme POS și management restaurant
- Software rezervări online
- Automatizare bucătărie
- E-commerce și delivery

### 4. Schema de Minimis Regională

**Finanțare:** Până la 200.000 EUR pe 3 ani
**Disponibilitate:** Prin ADR-uri regionale

**Cheltuieli acceptate:**
- Echipamente HoReCa
- Construcții și renovări
- Training personal

## Cum să Aplici pentru Fonduri Europene

### Pasul 1: Pregătirea Documentelor

**Documente necesare:**
- Certificat de înregistrare (CUI)
- Situații financiare (ultimii 2-3 ani)
- Plan de afaceri detaliat
- Proiecții financiare
- Oferte de preț pentru echipamente
- Documente proprietate/închiriere spațiu

### Pasul 2: Elaborarea Planului de Afaceri

Un plan câștigător include:
- Rezumat executiv
- Analiza pieței și competiției
- Strategia de marketing
- Planul operațional
- Echipa de management
- Proiecții financiare pe 5 ani
- Analiza riscurilor

### Pasul 3: Depunerea și Evaluarea

- Depunere online pe platforma MySMIS sau portaluri dedicate
- Evaluare tehnică și financiară (30-60 zile)
- Clarificări (dacă e cazul)
- Decizie de finanțare
- Contractare

## Cum XEH.ro Te Poate Ajuta

### Oferte pentru Fonduri Europene

Pregătim documentația de achiziție echipamente:
- Oferte detaliate cu specificații tehnice
- Conformitate cu cerințele de eligibilitate
- 3 oferte comparative (dacă e necesar)
- Livrare și instalare incluse

[Solicită ofertă pentru fonduri europene](/cerere-oferta)

### Pachete Echipare Restaurant

**Pachet Restaurant Mic (50.000 EUR):**
- Cuptor convecție 10 tăvi
- Frigider vertical 700L
- Congelator 500L
- Mașină spălat vase cu capotă
- Masă frigorifică preparare
- Mobilier inox complet

**Pachet Restaurant Mediu (100.000 EUR):**
- Combi steamer 10 GN
- 2x Frigidere verticale
- Blast chiller 5 tăvi
- Mașină spălat vase tunel
- Linie preparare completă
- Mobilier și rafturi inox

## Timeline Aplicare 2026

| Lună | Program | Deadline |
|------|---------|----------|
| Februarie | Start-Up Nation | Înregistrare |
| Martie | Start-Up Nation | Depunere proiecte |
| Aprilie | PNRR Turism | Sesiune nouă |
| Mai-Iunie | Evaluări | - |
| Iulie-August | Contractări | - |
| Septembrie | Start-Up Nation | Sesiunea 2 |
| Octombrie | POC Digital | Sesiune nouă |

## Greșeli de Evitat la Aplicare

1. **Plan de afaceri slab** - fii specific și realist
2. **Buget necorelat** - verifică eligibilitatea fiecărei cheltuieli
3. **Lipsa cofinanțării** - asigură-te că ai banii pentru partea ta
4. **Documentație incompletă** - verifică de 3 ori înainte de depunere
5. **Deadline ratat** - monitorizează constant portalurile

## Resurse Utile

- fonduri-structurale.ro - Portalul oficial
- adrcentru.ro, adrnordest.ro, etc. - ADR-uri regionale
- imm.gov.ro - Start-Up Nation
- mfinante.gov.ro - Informații fiscale

## Concluzie

2026 oferă oportunități excelente de finanțare pentru HoReCa. Cu pregătire atentă și documentație corectă, poți obține până la 90% din investiția în echipamente.

La XEH.ro te ajutăm cu ofertele și documentația necesară pentru aplicare.
    `,
    faqs: [
      {
        question: 'Pot aplica pentru fonduri europene dacă nu am încă firma?',
        answer: 'Pentru Start-Up Nation, da - poți înființa firma după ce ești selectat. Pentru celelalte programe, de obicei ai nevoie de minim 1 an vechime. Verifică cerințele specifice ale fiecărui program.',
      },
      {
        question: 'Ce procent din investiție primesc ca grant?',
        answer: 'Depinde de program și regiune: Start-Up Nation oferă 100%, PNRR oferă 50-90%, POC Digital oferă 90%. Regiunile mai puțin dezvoltate primesc intensități mai mari.',
      },
      {
        question: 'Cât durează să primesc banii efectiv?',
        answer: 'De la aplicare până la primirea fondurilor: 6-12 luni. După contractare, rambursările vin în 30-60 zile de la depunerea cererii de plată. Unele programe oferă avans 30-40%.',
      },
      {
        question: 'Pot cumpăra echipamente second-hand cu fonduri europene?',
        answer: 'Nu, echipamentele trebuie să fie noi și nefolosite. Furnizorii trebuie să emită facturi cu TVA și să ofere garanție standard.',
      },
    ],
  },
  'checklist-haccp-echipamente-obligatorii': {
    title: 'Checklist HACCP: Echipamente Obligatorii pentru Siguranța Alimentară',
    excerpt: 'Ce echipamente sunt obligatorii pentru conformitate HACCP în bucătăria ta profesională. Ghid complet cu cerințe legale și recomandări.',
    category: 'Ghiduri',
    author: 'M.P.',
    authorSlug: 'm-p',
    date: '2026-01-18',
    dateModified: '2026-01-27',
    readTime: '10 min',
    keywords: ['HACCP', 'siguranta alimentara', 'echipamente HACCP', 'norme HACCP restaurant', 'echipamente obligatorii bucatarie'],
    content: `
## Ce Este HACCP și De Ce Este Obligatoriu?

**HACCP** (Hazard Analysis and Critical Control Points) este un sistem de management al siguranței alimentare obligatoriu pentru toate unitățile care manipulează alimente.

**Cine trebuie să respecte HACCP:**
- Restaurante și fast-food-uri
- Hoteluri cu servicii de alimentație
- Cafenele și cofetării
- Catering
- Producători de alimente
- Magazine alimentare cu preparare

**Sancțiuni pentru neconformitate:** Amenzi între 2.000-20.000 RON și posibilă suspendare a activității.

## Principiile HACCP

1. **Analiza pericolelor** - identifică riscurile
2. **Puncte critice de control (CCP)** - stabilește unde monitorizezi
3. **Limite critice** - definește parametrii acceptabili
4. **Monitorizare** - măsoară și înregistrează
5. **Acțiuni corective** - ce faci când e ceva greșit
6. **Verificare** - confirmi că sistemul funcționează
7. **Documentare** - păstrezi evidențe

## Echipamente Obligatorii pentru Conformitate HACCP

### 1. Echipamente de Monitorizare Temperatură

**Termometre profesionale:**
- Termometre sondă pentru alimente (obligatoriu)
- Termometre infraroșu pentru verificări rapide
- Înregistratoare de temperatură (data loggers) pentru depozite

**Cerințe:**
- Precizie ±1°C
- Calibrare anuală documentată
- Fișe de înregistrare zilnică

### 2. Echipamente de Refrigerare cu Monitorizare

**[Frigidere profesionale](/rm/sistem-de-racire) trebuie să:**
- Mențină 0-4°C pentru produse refrigerate
- Aibă termometru vizibil
- Permită înregistrarea temperaturii
- Aibă alarme pentru variații

**[Congelatoare](/rm/sistem-de-racire) trebuie să:**
- Mențină minim -18°C
- Aibă indicator temperatură
- Funcționeze constant

### 3. Blast Chiller (Răcitor Rapid)

**De ce este recomandat:**
- Răcire rapidă de la +90°C la +3°C în sub 90 minute
- Previne zona de pericol (5-60°C) pentru bacterii
- Obligatoriu pentru cook & chill
- Extinde termenul de valabilitate

**Specificații minime:**
- Capacitate potrivită volumului
- Mod răcire + congelare rapidă
- Sondă internă pentru alimente

[Vezi răcitoare rapide](/rm/racitoare-rapide)

### 4. Echipamente de Gătit cu Control Temperatură

**[Cuptoare profesionale](/cuptoare-profesionale):**
- Afișaj digital temperatură
- Sonde interne pentru miezul alimentelor
- Timer și alerte

**Combi steamere:**
- Control precis temperatură și umiditate
- Programe HACCP predefinite
- Înregistrare automată parametri

### 5. Echipamente de Spălare și Igienizare

**[Mașini de spălat vase](/masini-spalat-vase-profesionale) profesionale:**
- Temperatură clătire minim 82°C (igienizare termică)
- Sau sistem de igienizare chimică
- Dozatoare automate detergent

**Chiuvete igienizare:**
- Chiuvetă separată pentru spălarea mâinilor
- Apă caldă disponibilă constant
- Săpun și dezinfectant

### 6. Mobilier HACCP Conform

**Mese de lucru inox:**
- Suprafață netedă, neporoasă
- Marginile rotunjite (ușor de curățat)
- Înălțime ergonomică
- Separare: crud vs. gătit

**Rafturi depozitare:**
- Minim 15 cm de la sol
- Permite circulația aerului
- Material rezistent la coroziune

## Checklist Echipamente HACCP

### Zona Recepție
- Termometru verificare marfă
- Cântar calibrat
- Zonă de inspecție

### Zona Depozitare
- Frigidere cu termometru
- Congelatoare cu termometru
- Rafturi corespunzătoare
- Etichetare și FIFO

### Zona Preparare
- Mese inox separate (crud/gătit)
- Tocătoare codificate color
- Cuțite separate pe categorii
- Chiuvetă mâini apropiată

### Zona Gătit
- Cuptoare cu sonde
- Termometre pentru verificare
- Blast chiller (recomandat)

### Zona Spălare
- Mașină spălat vase 82°C
- Chiuvete separate (vase/mâini)
- Dozatoare detergent/dezinfectant

### Zona Servire
- Bain marie cu control temperatură (>65°C)
- Vitrine refrigerate (<5°C)
- Termometre verificare

## Documentație HACCP Necesară

**Înregistrări obligatorii:**
- Fișe temperatură refrigerare (zilnic)
- Fișe temperatură la recepție marfă
- Înregistrări temperatură gătit
- Evidență igienizare echipamente
- Plan de curățenie și dezinfecție
- Instruire personal

## Echipamente Recomandate de la XEH.ro

### Pachet HACCP Esențial

| Echipament | Funcție HACCP |
|------------|---------------|
| Frigider cu display digital | Monitorizare temperatură |
| Termometru sondă profesional | Verificare alimente |
| Mașină spălat vase 82°C | Igienizare termică |
| Mese inox | Suprafețe conforme |

### Pachet HACCP Avansat

| Echipament | Funcție HACCP |
|------------|---------------|
| Blast chiller | Răcire rapidă |
| Data logger temperatură | Înregistrare automată |
| Combi steamer cu sondă | Gătit controlat |
| Sistem monitorizare WiFi | Alerte în timp real |

## Concluzie

Conformitatea HACCP nu este opțională - este obligatorie și esențială pentru siguranța clienților. Investiția în echipamente corespunzătoare previne:
- Amenzi și sancțiuni
- Incidente de siguranță alimentară
- Pierderea reputației
- Închiderea afacerii

La XEH.ro găsești toate echipamentele necesare pentru conformitate HACCP completă.

[Solicită consultanță HACCP echipamente](/contact)
    `,
    faqs: [
      {
        question: 'Este blast chiller-ul obligatoriu pentru HACCP?',
        answer: 'Nu este obligatoriu pentru toate unitățile, dar este recomandat și adesea necesar pentru restaurante care fac cook & chill sau pregătesc alimente în avans. Verifică cu inspectorul DSP local cerințele specifice.',
      },
      {
        question: 'La ce temperatură trebuie să funcționeze mașina de spălat vase?',
        answer: 'Temperatura de clătire trebuie să fie minim 82°C pentru igienizare termică. Alternativ, se poate folosi igienizare chimică cu produse avizate, dar igienizarea termică este preferată.',
      },
      {
        question: 'Cât de des trebuie să înregistrez temperaturile?',
        answer: 'Minim de 2 ori pe zi (dimineața și seara) pentru frigidere și congelatoare. La recepția mărfii - fiecare livrare. La gătit - pentru fiecare lot de produse.',
      },
      {
        question: 'Ce fac dacă temperatura din frigider depășește 5°C?',
        answer: 'Este o abatere HACCP. Acțiunea corectivă: verifică cauza, ajustează termostatul, și dacă alimentele au stat peste 2 ore la temperatură neconformă, evaluează siguranța lor sau elimină-le. Documentează incidentul.',
      },
    ],
  },
  'top-15-frigidere-industriale-2026': {
    title: 'Top 15 Frigidere Industriale pentru Restaurante în 2026',
    excerpt: 'Ghid complet pentru alegerea frigiderului industrial potrivit. Comparăm cele mai bune modele pentru HoReCa după capacitate, eficiență și preț.',
    category: 'Ghiduri',
    author: 'M.P.',
    authorSlug: 'm-p',
    date: '2026-01-27',
    dateModified: '2026-01-27',
    readTime: '12 min',
    keywords: ['frigidere industriale', 'frigider profesional', 'frigider restaurant', 'refrigerare horeca', 'frigider vertical'],
    content: `
## De Ce Este Important Frigiderul Industrial?

Frigiderul profesional este coloana vertebrală a oricărei bucătării comerciale. O alegere greșită poate duce la risipă alimentară, facturi mari la energie și chiar probleme de siguranță alimentară.

## Criterii de Alegere a Frigiderului Industrial

### 1. Capacitate (Litri)
- **Restaurant mic (30-50 locuri):** 400-700L
- **Restaurant mediu (50-100 locuri):** 700-1200L
- **Restaurant mare (100+ locuri):** 1200L+ sau multiple unități

### 2. Tipuri de Frigidere Industriale

#### Frigidere Verticale
Cele mai populare pentru bucătării profesionale:
- Acces ușor la produse
- Organizare pe rafturi
- Vizibilitate bună
- Capacitate: 350-1400L

#### Mese Frigorifice (Refrigerate)
Combină depozitarea cu zona de lucru:
- Suprafață de lucru inox
- Sertare sau uși de acces
- Ideale pentru linia de preparare

#### Frigidere cu Uși de Sticlă
Pentru expunere sau acces rapid:
- Vizibilitate produse
- Ideal pentru baruri și bufete
- Consum energetic mai mare

### 3. Clasa Energetică
- **Clasa A+++/A++** - recomandată pentru operațiuni continue
- Economie de 30-50% la factura de curent vs clase inferioare
- Investiția se amortizează în 2-3 ani

## Top 15 Frigidere Industriale Recomandate

### Segment Premium (RM Gastro)
1. **RM Gastro CR 700** - Frigider vertical 700L, ideal pentru restaurante medii
2. **RM Gastro CR 1400** - Capacitate mare, 2 uși, pentru hoteluri
3. **RM Gastro CRX 400** - Compact dar performant, pentru spații mici
4. **RM Gastro CRFN 500** - Frigider-congelator combinat
5. **RM Gastro TS 700** - Masă frigorifică premium

### Segment Economic (REDFOX)
6. **REDFOX RCN 400** - Raport excelent calitate-preț
7. **REDFOX RCN 700** - Popular în industrie pentru fiabilitate
8. **REDFOX RCN 350** - Compact, perfect pentru bar
9. **REDFOX TZ 400** - Masă frigorifică accesibilă
10. **REDFOX RGS 500** - Cu uși de sticlă pentru expunere

### Soluții Specializate
11. **Frigider pass-through** - Acces din ambele părți
12. **Frigider cu rotire** - Pentru panificație
13. **Frigider pentru pește** - Temperatură aproape de 0°C
14. **Frigider pentru carne** - Control umiditate
15. **Frigider pentru legume** - Umiditate crescută

## Cum Să Calculezi Capacitatea Necesară

### Formula Simplă:
**Litri necesari = Număr porții/zi × 0.5L + 30% rezervă**

### Exemplu:
- Restaurant cu 100 porții/zi
- 100 × 0.5 = 50L minimum
- +30% rezervă = 65L produse proaspete
- Adaugă spațiu pentru băuturi, deserturi = ~300-400L total

## Întreținerea Frigiderului Industrial

### Zilnic:
- Verifică temperatura (ar trebui să fie 0-4°C)
- Curăță scurgeri
- Organizează produse (FIFO)

### Săptămânal:
- Curăță interior cu soluție dezinfectantă
- Verifică garniturile ușii
- Curăță grila condensatorului

### Lunar:
- Verifică funcționarea termostatului
- Curăță serpentina
- Verifică nivelul de refrigerant (dacă e cazul)

## Concluzie

Alegerea frigiderului industrial potrivit este o investiție pe termen lung. Recomandăm să alegi în funcție de:
1. Capacitatea reală necesară (nu supradimensiona)
2. Clasa energetică (economie pe termen lung)
3. Brandul (RM Gastro pentru premium, REDFOX pentru buget)

[Vezi gama completă de frigidere profesionale](/frigidere-industriale)
    `,
    faqs: [
      {
        question: 'Cât consumă un frigider industrial pe lună?',
        answer: 'Un frigider industrial de 700L consumă între 2-4 kWh/zi (60-120 kWh/lună). La un preț mediu de 1 RON/kWh, costul este de 60-120 RON/lună. Modelele din clasa A++ pot reduce acest consum cu 30-40%.',
      },
      {
        question: 'Care este temperatura optimă pentru frigiderul de restaurant?',
        answer: 'Temperatura optimă este între 0°C și 4°C pentru produse refrigerate. Pentru peșter se recomandă 0-2°C, pentru carne 0-3°C, pentru legume și fructe 4-8°C.',
      },
      {
        question: 'Frigider cu o ușă sau cu două uși?',
        answer: 'Depinde de volum și acces. O ușă (400-700L) e suficientă pentru restaurante mici-medii. Două uși (1000-1400L) permit acces simultan pentru mai mulți bucătari și organizare separată a produselor.',
      },
    ],
  },
  'cum-alegi-cuptor-profesional-perfect': {
    title: 'Cum Alegi Cuptorul Profesional Perfect pentru Restaurantul Tău',
    excerpt: 'Ghid pas cu pas pentru alegerea cuptorului potrivit. Convecție, combi steamer sau pizza - află care este alegerea corectă pentru bucătăria ta.',
    category: 'Ghiduri',
    author: 'A.I.',
    authorSlug: 'a-i',
    date: '2026-01-26',
    dateModified: '2026-01-27',
    readTime: '10 min',
    keywords: ['cuptor profesional', 'cum aleg cuptor restaurant', 'cuptor convectie', 'combi steamer', 'cuptor pizza profesional'],
    content: `
## Introducere: Cuptorul - Inima Bucătăriei

Știi ce au în comun cele mai bune restaurante din România? Un cuptor profesional potrivit pentru meniul lor. Nu cel mai scump, nu cel mai mare - ci cel potrivit.

Am ajutat peste 200 de restaurante să aleagă cuptorul perfect. În acest ghid îți împărtășesc exact ce trebuie să știi.

## Pasul 1: Definește Ce Vei Găti

### Întrebările Cheie:
- **Ce reprezintă 70% din meniu?** Dacă e pizza, ai nevoie de cuptor pizza. Dacă e patiserie, cuptor convecție. Dacă totul - combi steamer.
- **Câte porții pe zi?** 50 porții = cuptor mic. 200+ = capacitate mare sau multiple cuptoare.
- **Ai nevoie de versatilitate?** Combi steamerul face totul, dar costă mai mult.

## Pasul 2: Înțelege Tipurile de Cuptoare

### Cuptor cu Convecție
**Ideal pentru:** Patiserie, panificație, gratinare, coacere
**Preț:** 2.000 - 8.000 EUR
**Avantaje:**
- Rezultate uniforme datorită circulației aerului
- Mai rapid decât cuptorul clasic
- Consumă mai puțină energie

**Dezavantaje:**
- Nu gătește la abur
- Nu e ideal pentru preparate umede

### Combi Steamer
**Ideal pentru:** Restaurante versatile, hoteluri, catering
**Preț:** 8.000 - 35.000 EUR
**Avantaje:**
- Combină convecție + abur + combinat
- Un echipament înlocuiește 3-4
- Programe automate
- Self-cleaning

**Dezavantaje:**
- Investiție mare
- Necesită întreținere
- Consum de apă

### Cuptor Pizza
**Ideal pentru:** Pizzerii, restaurante italiene
**Preț:** 2.500 - 15.000 EUR
**Avantaje:**
- Temperaturi înalte (450-500°C)
- Pizza autentică în 2-3 minute
- Vatră din piatră/ceramică

**Dezavantaje:**
- Utilizare limitată (doar pizza)
- Consum mare de energie

### Cuptor Salamandru
**Ideal pentru:** Finishing, gratinare rapidă
**Preț:** 800 - 3.000 EUR
**Avantaje:**
- Rapid pentru finishing
- Compact
- Economic

## Pasul 3: Calculează Capacitatea

### Formula:
**Tăvi necesare = Porții pe oră de vârf ÷ Porții per tavă**

### Exemplu Restaurant 80 locuri:
- Vârf: 40 porții/oră
- Porții per tavă: 6
- Tăvi necesare: 7 (alege cuptor 10 tăvi pentru rezervă)

### Ghid Rapid Capacitate:
- **4-6 tăvi:** Restaurant mic, cafenea, bistro
- **6-10 tăvi:** Restaurant mediu, hotel mic
- **10-20 tăvi:** Restaurant mare, hotel, catering

## Pasul 4: Stabilește Bugetul Realist

### Recomandarea XEH:
**Alocă 15-25% din bugetul total de echipamente pentru cuptor.**

### Opțiuni pe Bugete:
- **Sub 3.000 EUR:** Cuptor convecție REDFOX 4-6 tăvi
- **3.000-8.000 EUR:** Cuptor convecție RM Gastro sau REDFOX mare
- **8.000-15.000 EUR:** Combi steamer mic-mediu
- **15.000+ EUR:** Combi steamer mare sau cuptor pizza profesional

## Pasul 5: Verifică Utilitățile

### Electric vs Gaz:
- **Electric:** Mai simplu de instalat, control mai precis
- **Gaz:** Cost de operare mai mic, necesită hota specială

### Alimentare Electrică:
- Cuptoare mici: 230V monofazic
- Cuptoare medii-mari: 380V trifazic
- Verifică puterea disponibilă!

### Apă (pentru Combi Steamer):
- Dedurizator obligatoriu
- Scurgere în podea
- Presiune minimă 2 bar

## Pasul 6: Alege Brandul Potrivit

### RM Gastro (Premium)
- Pentru: Fine dining, hoteluri, restaurante cu pretenții
- Avantaje: Durabilitate, performanță, service excelent

### REDFOX (Economic)
- Pentru: Fast-food, bistrouri, startup-uri
- Avantaje: Raport calitate-preț, fiabilitate

## Checklist Final

- [ ] Am definit ce voi găti în principal
- [ ] Am calculat capacitatea necesară
- [ ] Am verificat utilitățile disponibile
- [ ] Am stabilit bugetul realist
- [ ] Am comparat minim 3 opțiuni
- [ ] Am verificat garanția și service-ul

## Concluzie

Nu există "cel mai bun cuptor" - există cuptorul potrivit pentru TINExperții XEH te pot ajuta să faci alegerea corectă.

[Cere consultanță gratuită](/consultanta-echipamente-horeca)
    `,
    faqs: [
      {
        question: 'Merită să investesc într-un combi steamer pentru un restaurant mic?',
        answer: 'Depinde de meniu. Dacă ai un meniu variat și vrei consistență, da. Un combi steamer de 6 tăvi (8.000-12.000 EUR) poate înlocui cuptor convecție + steamer + aparat sous-vide. Dacă faci doar pizza sau patiserie, un cuptor specializat e mai eficient.',
      },
      {
        question: 'Cuptor electric sau pe gaz?',
        answer: 'Electric pentru: control precis, instalare simplă, spații fără gaz. Gaz pentru: costuri operaționale mai mici (30-40%), putere mare, tradiție culinară. Recomandare: electric pentru combi steamer și convecție, gaz pentru cuptoare pizza tradiționale.',
      },
      {
        question: 'Cât de des trebuie făcut service la cuptor?',
        answer: 'Service preventiv recomandat la 6-12 luni. Combi steamerele necesită decalcifiere lunară sau la indicator. Curățarea zilnică (sau self-cleaning) extinde durata de viață semnificativ.',
      },
    ],
  },
  'cost-echipare-restaurant-complet-2026': {
    title: 'Costul Total pentru Echiparea unui Restaurant în 2026',
    excerpt: 'Bugetare realistă pentru echipamente HoReCa. Analiză detaliată a costurilor pentru restaurante mici, medii și mari cu exemple concrete.',
    category: 'Finanțare',
    author: 'A.I.',
    authorSlug: 'a-i',
    date: '2026-01-25',
    dateModified: '2026-01-27',
    readTime: '14 min',
    keywords: ['cost echipamente restaurant', 'buget restaurant', 'pret echipamente horeca', 'cat costa sa deschid restaurant', 'investitie restaurant'],
    content: `
## Introducere: Realitatea Costurilor în 2026

Sincer vorbind, echiparea unui restaurant nu e ieftină. Dar cu planificare inteligentă, poți obține echipamente de calitate fără să arunci banii pe fereastră.

În acest ghid îți dau cifre reale, nu estimări optimiste. Datele sunt bazate pe proiectele pe care le-am echipat în ultimii 2 ani.

## Factori Care Influențează Costul

### 1. Mărimea Restaurantului
- Restaurant mic: 30-50 locuri
- Restaurant mediu: 50-100 locuri
- Restaurant mare: 100-200 locuri

### 2. Tipul de Bucătărie
- Fast-food: echipamente specializate, volum mare
- Casual dining: versatilitate medie
- Fine dining: echipamente premium, varietate

### 3. Nivelul de Calitate
- Entry-level: funcțional, durabilitate medie
- Mid-range: echilibru calitate-preț (REDFOX)
- Premium: durabilitate maximă, funcții avansate (RM Gastro)

## Costul Echipării: Restaurant Mic (30-50 locuri)

### Echipamente Gătit: 8.000 - 15.000 EUR
- Cuptor convecție 6 tăvi: 2.500 - 5.000 EUR
- Plită/aragaz profesional: 1.500 - 3.000 EUR
- Friteuză: 500 - 1.500 EUR
- Grătar/grill: 800 - 2.000 EUR
- Hotă: 1.500 - 3.000 EUR

### Echipamente Refrigerare: 5.000 - 10.000 EUR
- Frigider vertical 700L: 2.000 - 4.000 EUR
- Congelator 500L: 1.500 - 3.000 EUR
- Masă frigorifică preparare: 1.500 - 3.000 EUR

### Spălare: 3.000 - 6.000 EUR
- Mașină spălat vase frontală: 2.500 - 5.000 EUR
- Chiuvetă dublă inox: 500 - 1.000 EUR

### Mobilier Inox: 3.000 - 6.000 EUR
- Mese de lucru (3-4 buc): 1.500 - 3.000 EUR
- Rafturi: 500 - 1.000 EUR
- Cărucior: 300 - 600 EUR
- Accesorii: 500 - 1.000 EUR

### TOTAL Restaurant Mic: 19.000 - 37.000 EUR

**Recomandare:** Cu 25.000 EUR poți echipa o bucătărie funcțională cu echipamente REDFOX de calitate.

## Costul Echipării: Restaurant Mediu (50-100 locuri)

### Echipamente Gătit: 15.000 - 30.000 EUR
- Combi steamer 6-10 tăvi: 8.000 - 15.000 EUR
- Cuptor convecție: 3.000 - 6.000 EUR
- Aragaz cu 6 ochiuri: 2.500 - 4.500 EUR
- Friteuză dublă: 1.000 - 2.500 EUR
- Grătar profesional: 1.500 - 3.000 EUR

### Echipamente Refrigerare: 10.000 - 20.000 EUR
- 2x Frigidere verticale: 4.000 - 8.000 EUR
- Congelator mare: 2.000 - 4.000 EUR
- Blast chiller 5 tăvi: 4.000 - 8.000 EUR

### Spălare: 5.000 - 10.000 EUR
- Mașină spălat vase cu capotă: 4.000 - 8.000 EUR
- Chiuvete + robineți: 1.000 - 2.000 EUR

### Mobilier Inox: 5.000 - 12.000 EUR
- Mese de lucru cu spate: 3.000 - 6.000 EUR
- Rafturi verticale: 1.000 - 2.500 EUR
- Cărucior GN: 500 - 1.000 EUR
- Accesorii diverse: 500 - 2.500 EUR

### TOTAL Restaurant Mediu: 35.000 - 72.000 EUR

**Recomandare:** Cu 50.000 EUR obții o bucătărie profesională completă. Combină RM Gastro pentru echipamentele critice (combi steamer, refrigerare) cu REDFOX pentru rest.

## Costul Echipării: Restaurant Mare (100-200 locuri)

### Echipamente Gătit: 30.000 - 60.000 EUR
- Combi steamer 10-20 tăvi: 15.000 - 30.000 EUR
- 2x Cuptoare convecție: 6.000 - 12.000 EUR
- Linie gătit completă: 8.000 - 15.000 EUR
- Echipamente specializate: 5.000 - 10.000 EUR

### Echipamente Refrigerare: 20.000 - 40.000 EUR
- Camera frigorifică sau multiple frigidere: 10.000 - 20.000 EUR
- Congelatoare: 4.000 - 8.000 EUR
- Blast chiller mare: 6.000 - 12.000 EUR

### Spălare: 10.000 - 20.000 EUR
- Mașină tunel sau cu capotă mare: 8.000 - 15.000 EUR
- Mașină pahare: 2.000 - 5.000 EUR

### Mobilier Inox: 10.000 - 25.000 EUR
- Linii complete preparare: 6.000 - 15.000 EUR
- Rafturi, cărucioare, accesorii: 4.000 - 10.000 EUR

### TOTAL Restaurant Mare: 70.000 - 145.000 EUR

## Strategii de Economisire

### 1. Prioritizează Inteligent
Investește mai mult în: cuptor principal, refrigerare, mașină spălat vase
Economisește la: accesorii, mobilier simplu, echipamente secundare

### 2. Mix de Branduri
- Echipamente critice: RM Gastro (durabilitate)
- Echipamente secundare: REDFOX (economie)
- Economie: 15-25% din buget

### 3. Cere Pachet Complet
- Discounturi de volum: 5-15%
- Livrare gratuită
- Instalare inclusă

### 4. Fonduri Europene
- Start-Up Nation: până la 200.000 RON
- PNRR: 50-90% finanțare
- Leasing: efort financiar distribuit

[Ghid complet fonduri europene HoReCa](/blog/fonduri-europene-horeca-2026)

## Costuri Ascunse de Luat în Calcul

### Instalare și Racorduri
- Electric (tablou, cabluri): 500 - 2.000 EUR
- Gaz (instalație): 1.000 - 3.000 EUR
- Apă (pentru combi steamer): 300 - 800 EUR

### Ventilație
- Hotă + tuburi + motor: 2.000 - 8.000 EUR

### Transport
- Gratuit pentru comenzi mari
- 200-500 EUR pentru comenzi mici

## Concluzie: Cifre Realiste

| Tip Restaurant | Buget Minim | Buget Recomandat | Buget Confort |
|----------------|-------------|------------------|---------------|
| Mic (30-50 loc) | 19.000 EUR | 25.000 EUR | 35.000 EUR |
| Mediu (50-100 loc) | 35.000 EUR | 50.000 EUR | 70.000 EUR |
| Mare (100+ loc) | 70.000 EUR | 100.000 EUR | 140.000 EUR |

[Solicită ofertă personalizată pentru proiectul tău](/cerere-oferta)
    `,
    faqs: [
      {
        question: 'Care este bugetul minim pentru a echipa un restaurant mic?',
        answer: 'Bugetul minim realist este de 19.000-22.000 EUR pentru echipamente entry-level funcționale. Pentru echipamente de calitate medie (REDFOX) care durează, alocă minimum 25.000 EUR. Sub această sumă vei face compromisuri care te vor costa mai mult pe termen lung.',
      },
      {
        question: 'Merită să cumpăr echipamente second-hand?',
        answer: 'Pentru echipamente simple (mese inox, rafturi) - da, poți economisi 40-60%. Pentru echipamente critice (cuptor, frigidere, mașină spălat vase) - nu recomandăm. Lipsa garanției, consumul energetic crescut și costurile de reparații anulează economia inițială.',
      },
      {
        question: 'Cum pot plăti echipamentele în rate?',
        answer: 'Opțiuni disponibile: leasing operațional (rate lunare, echipamentul rămâne al firmei de leasing), leasing financiar (rate lunare, la final devine al tău), credit bancar pentru investiții, sau fonduri europene (recuperezi 50-90% după implementare).',
      },
    ],
  },
  'blast-chiller-vs-congelator-diferente': {
    title: 'Blast Chiller vs Congelator: Care Este Diferența și Ce Ai Nevoie?',
    excerpt: 'Înțelege diferențele esențiale între blast chiller și congelator. Ghid complet pentru alegerea echipamentului de răcire potrivit.',
    category: 'Comparații',
    author: 'M.P.',
    authorSlug: 'm-p',
    date: '2026-01-24',
    dateModified: '2026-01-27',
    readTime: '8 min',
    keywords: ['blast chiller', 'blast chiller vs congelator', 'racire rapida', 'blast freezer', 'echipamente racire profesionala'],
    content: `
## Ce Este un Blast Chiller?

Blast chiller-ul (sau răcitorul rapid) este un echipament care răcește alimentele extrem de rapid - de la +90°C la +3°C în mai puțin de 90 de minute.

## Ce Este un Congelator?

Congelatorul este un echipament care menține alimentele la temperaturi sub -18°C pentru depozitare pe termen lung.

## Diferența Fundamentală

**Blast Chiller = Răcire RAPIDĂ**
**Congelator = Depozitare la TEMPERATURĂ JOASĂ**

## Tabel Comparativ

| Caracteristică | Blast Chiller | Congelator |
|----------------|---------------|------------|
| Scop | Răcire rapidă | Depozitare |
| Temperatură țintă | +3°C sau -18°C rapid | -18°C constant |
| Timp răcire | 90 minute (de la +90°C) | 12-24 ore |
| Cristale gheață | Micro (calitate păstrată) | Macro (textura afectată) |
| Utilizare | Procesare | Stocare |
| Preț | 4.000-15.000 EUR | 1.500-5.000 EUR |

## De Ce Este Importantă Răcirea Rapidă?

### Zona de Pericol: 5°C - 60°C
Bacteriile se înmulțesc cel mai rapid între 5°C și 60°C. Cu cât alimentele stau mai mult în această zonă, cu atât riscul de contaminare crește.

### Răcire Rapidă (Blast Chiller):
- De la +90°C la +3°C în < 90 minute
- Traversează zona de pericol în minute
- Cristale de gheață micro = textura păstrată

### Răcire Lentă (Congelator clasic):
- De la +90°C la -18°C în 12-24 ore
- Ore întregi în zona de pericol
- Cristale mari = textura deteriorată

## Când Ai Nevoie de Blast Chiller?

### Obligatoriu pentru:
- **Cook & Chill:** Preparare în avans pentru catering
- **Conformitate HACCP strictă:** Hoteluri, spitale, școli
- **Volume mari:** Restaurante care pregătesc pentru a doua zi
- **Patiserie profesională:** Înghețată, mousse, deserturi

### Recomandat pentru:
- Restaurante cu meniu complex
- Catering și events
- Dark kitchens
- Restaurante cu mai multe locații

### Nu este necesar pentru:
- Restaurante mici cu preparare fresh
- Fast-food cu flux continuu
- Baruri și cafenele

## Când Este Suficient Congelatorul?

- Depozitare pe termen lung (săptămâni-luni)
- Produse deja congelate de la furnizor
- Backup pentru surplus de marfă
- Înghețată și deserturi gata făcute

## Investiție și ROI

### Blast Chiller:
- **Preț:** 4.000 - 15.000 EUR
- **Economii:** Reduce risipa cu 15-30%
- **ROI:** 12-24 luni pentru restaurante medii-mari

### Congelator:
- **Preț:** 1.500 - 5.000 EUR
- **Economii:** Depozitare pe termen lung
- **ROI:** Imediat prin evitarea pierderilor

## Opțiuni Combo: Blast Chiller/Freezer

Multe echipamente moderne oferă ambele funcții:
- **Mod Chill:** Răcire rapidă la +3°C
- **Mod Freeze:** Congelare rapidă la -18°C sau mai jos

Avantaje:
- Un singur echipament
- Flexibilitate maximă
- Economie de spațiu

Preț: 5.000 - 20.000 EUR

## Ce Să Alegi?

### Alege BLAST CHILLER dacă:
- Faci cook & chill (preparare în avans)
- Ai cerințe HACCP stricte
- Vrei să reduci risipa alimentară
- Pregătești volume mari

### Alege CONGELATOR dacă:
- Ai nevoie doar de depozitare
- Buget limitat
- Volum mic de producție
- Cumperi produse deja congelate

### Alege AMBELE dacă:
- Restaurant mediu-mare
- Operațiuni complexe
- Catering + restaurant

## Modele Recomandate

### Blast Chillere RM Gastro:
- **SBC 051** - 5 tăvi, ideal pentru restaurante mici
- **SBC 101** - 10 tăvi, pentru restaurante medii-mari
- **SBC 201** - 20 tăvi, pentru hoteluri și catering

### Congelatoare RM Gastro:
- **CF 500** - 500L, pentru restaurante mici
- **CF 700** - 700L, standard industrie
- **CF 1400** - 1400L, pentru volume mari

[Vezi gama completă de răcitoare rapide](/rm/racitoare-rapide)

## Concluzie

Blast chiller-ul și congelatorul au scopuri diferite:
- **Blast chiller** = siguranță alimentară + calitate păstrată
- **Congelator** = depozitare economică pe termen lung

Pentru majoritatea restaurantelor profesionale, recomandăm să ai ambele.
    `,
    faqs: [
      {
        question: 'Pot folosi congelatorul în loc de blast chiller?',
        answer: 'Tehnic da, dar cu compromisuri majore: răcirea lentă (12-24 ore) înseamnă ore în zona de pericol bacterian și cristale mari de gheață care deteriorează textura. Pentru conformitate HACCP și calitate, blast chiller-ul este necesar.',
      },
      {
        question: 'Cât consumă un blast chiller?',
        answer: 'Un blast chiller de 5 tăvi consumă 1-2 kW pe ciclu de răcire (90 minute). Dacă faci 3-4 cicluri pe zi, costul zilnic este de 3-8 RON. Consumul este doar în timpul ciclurilor active, nu continuu ca la congelator.',
      },
      {
        question: 'Am nevoie de dedurizator pentru blast chiller?',
        answer: 'Nu, blast chiller-ul nu folosește apă în proces (spre deosebire de combi steamer). Funcționează prin circulație de aer rece de mare viteză. Întreținerea constă în curățarea periodică a ventilatorului și serpentinei.',
      },
    ],
  },
  'echipamente-pizzerie-completa-ghid': {
    title: 'Echipamente pentru Pizzerie Completă: Ghid de la A la Z',
    excerpt: 'Tot ce ai nevoie pentru a deschide o pizzerie de succes. De la cuptor pizza la preparare aluat - lista completă de echipamente.',
    category: 'Ghiduri',
    author: 'A.D.',
    authorSlug: 'a-d',
    date: '2026-01-23',
    dateModified: '2026-01-27',
    readTime: '11 min',
    keywords: ['echipamente pizzerie', 'cuptor pizza profesional', 'cum deschid pizzerie', 'echipamente pizza', 'malaxor aluat pizza'],
    content: `
## Introducere: Visul unei Pizzerii

Pizza este unul dintre cele mai profitabile segmente din HoReCa. Dar succesul depinde de echipamentele potrivite.

În acest ghid îți prezint lista completă de echipamente pentru o pizzerie funcțională, de la cuptor până la ultima lingură.

## Echipamentul #1: Cuptorul de Pizza

### Tipuri de Cuptoare Pizza

#### Cuptor Electric cu Vatră
- **Temperatură:** 350-450°C
- **Timp coacere:** 4-6 minute
- **Capacitate:** 4-12 pizza/nivel
- **Preț:** 2.500 - 8.000 EUR

**Ideal pentru:** Pizzerii medii, restaurante cu meniu variat

#### Cuptor pe Gaz cu Vatră
- **Temperatură:** 400-500°C
- **Timp coacere:** 3-5 minute
- **Costuri operaționale:** Mai mici decât electric
- **Preț:** 3.000 - 10.000 EUR

**Ideal pentru:** Pizzerii cu volum mare, stil tradițional

#### Cuptor cu Lemne
- **Temperatură:** 400-480°C
- **Gust:** Autentic, afumat
- **Timp coacere:** 90 secunde - 3 minute
- **Preț:** 5.000 - 25.000 EUR

**Ideal pentru:** Fine dining, concept artizanal

#### Cuptor Rotativ (Conveyor)
- **Temperatură:** 250-350°C
- **Timp coacere:** Fix, controlat
- **Capacitate:** 20-50 pizza/oră
- **Preț:** 8.000 - 20.000 EUR

**Ideal pentru:** Fast-food, delivery, volum mare consistent

### Alegerea Capacității

| Pizza/oră | Cuptor Recomandat |
|-----------|-------------------|
| 20-40 | 1 nivel, 4-6 pizza |
| 40-80 | 2 nivele, 4-6 pizza/nivel |
| 80-150 | Conveyor sau multiple cuptoare |

## Echipamente Preparare Aluat

### Malaxor Spirală
**Esențial pentru aluat pizza.**

- **Capacitate mică:** 20-30L (15-20 kg aluat) - 1.500-2.500 EUR
- **Capacitate medie:** 40-60L (30-40 kg aluat) - 2.500-4.000 EUR
- **Capacitate mare:** 80-120L (60-90 kg aluat) - 4.000-7.000 EUR

**Calcul:** 1 pizza = 250g aluat → 30L malaxor = ~80 pizza/șarjă

### Mașină Porționat Aluat (Opțional)
- Porții perfecte, consistente
- Preț: 1.000-3.000 EUR

### Presă Aluat / Rounder (Opțional)
- Formează bilele de aluat uniform
- Preț: 800-2.500 EUR

## Echipamente Refrigerare

### Dulap Fermentare (Fermentatoare)
**Esențial pentru aluat de calitate.**
- Controlează temperatura și umiditatea
- Fermentare lentă = gust superior
- Preț: 2.500-6.000 EUR

### Masă Frigorifică Pizza (cu granit)
**Stația de lucru perfectă:**
- Suprafață granit sau marmură (răcită)
- Sertare refrigerate pentru ingrediente
- Preț: 2.000-5.000 EUR

### Frigider Ingrediente
- Vertical sau tip vitrină
- Preț: 1.500-3.500 EUR

### Vitrină Ingrediente (Prep Counter)
- Afișează ingredientele fresh
- Preț: 1.000-3.000 EUR

## Echipamente Preparare

### Feliator Profesional
- Pentru șuncă, salam, legume
- Lamă 300-350mm pentru volume mari
- Preț: 800-2.500 EUR

### Cutter/Blender
- Pentru sosuri, paste
- Preț: 500-2.000 EUR

### Râșniță Brânză
- Pentru mozzarella proaspătă
- Preț: 300-1.000 EUR

## Mobilier Inox

### Masă de Lucru Central
- Minimum 2m lungime
- Cu spate și raft inferior
- Preț: 600-1.500 EUR

### Rafturi Ingrediente
- Deasupra mesei de lucru
- Preț: 300-800 EUR

### Suport Cutii Pizza
- Organizare eficientă
- Preț: 200-500 EUR

## Echipamente Auxiliare

### Hotă de Evacuare
**Obligatorie deasupra cuptorului.**
- Dimensiune = lățime cuptor + 20cm pe fiecare parte
- Preț: 1.500-4.000 EUR

### Mașină Spălat Vase
- Minimum tip frontală
- Preț: 2.500-5.000 EUR

### Chiuvete Inox
- Minim 2 (preparare + spălare mâini)
- Preț: 400-1.000 EUR

## Calculul Investiției Complete

### Pizzerie Mică (30-50 pizza/zi)

| Echipament | Preț |
|------------|------|
| Cuptor electric 1 nivel | 3.000 EUR |
| Malaxor 30L | 1.800 EUR |
| Masă frigorifică pizza | 2.500 EUR |
| Frigider vertical | 2.000 EUR |
| Feliator | 1.000 EUR |
| Mobilier inox | 1.500 EUR |
| Hotă | 2.000 EUR |
| Mașină spălat vase | 3.000 EUR |
| Accesorii diverse | 1.200 EUR |
| **TOTAL** | **~18.000 EUR** |

### Pizzerie Medie (80-120 pizza/zi)

| Echipament | Preț |
|------------|------|
| Cuptor electric 2 nivele | 5.500 EUR |
| Malaxor 60L | 3.500 EUR |
| Dulap fermentare | 3.500 EUR |
| Masă frigorifică pizza | 3.000 EUR |
| Frigidere (2) | 4.000 EUR |
| Feliator profesional | 1.500 EUR |
| Mobilier inox complet | 3.000 EUR |
| Hotă profesională | 3.000 EUR |
| Mașină spălat vase capotă | 5.000 EUR |
| Accesorii diverse | 2.000 EUR |
| **TOTAL** | **~34.000 EUR** |

## Sfaturi Finale

1. **Nu economisi la cuptor** - este inima pizzeriei
2. **Investește în fermentare** - diferența e în gust
3. **Alege masă cu granit** - menține aluatul rece
4. **Calculează volumul real** - nu supradimensiona
5. **Consultă un expert** - evită greșelile costisitoare

[Solicită consultanță gratuită pentru pizzeria ta](/consultanta-echipamente-horeca)
    `,
    faqs: [
      {
        question: 'Ce cuptor de pizza este cel mai bun pentru început?',
        answer: 'Pentru o pizzerie nouă, recomandăm cuptor electric cu vatră, 1-2 nivele. Oferă control precis al temperaturii, instalare simplă și costuri predictibile. Cuptorul pe lemne sau gaz poate veni ulterior, când ai experiență și volum.',
      },
      {
        question: 'Cât spațiu am nevoie pentru o pizzerie?',
        answer: 'Minimum 25-30 mp pentru zona de producție: 8-10 mp pentru cuptor și preparare, 6-8 mp pentru depozitare/refrigerare, 4-6 mp pentru spălare, rest pentru circulație. Pentru delivery-only (dark kitchen), 15-20 mp pot fi suficienți.',
      },
      {
        question: 'Pot folosi un cuptor de convecție pentru pizza?',
        answer: 'Tehnic da, dar rezultatul nu va fi autentic. Cuptoarele de convecție ajung la max 300°C și nu au vatră. Pizza va fi bună, dar nu va avea crusta caracteristică. Pentru pizza autentică, investește într-un cuptor dedicat.',
      },
    ],
  },
  'mobilier-inox-ghid-complet': {
    title: 'Mobilier Inox pentru Bucătărie Profesională: Tot Ce Trebuie Să Știi',
    excerpt: 'Ghid complet despre mesele, rafturile și echipamentele inox. Cum alegi, ce grosime, standarde HACCP și întreținere.',
    category: 'Ghiduri',
    author: 'E.S.',
    authorSlug: 'e-s',
    date: '2026-01-22',
    dateModified: '2026-01-27',
    readTime: '9 min',
    keywords: ['mobilier inox', 'mese inox profesionale', 'rafturi inox bucatarie', 'mobilier bucatarie profesionala', 'inox AISI 304'],
    content: `
## De Ce Inox în Bucătăria Profesională?

Oțelul inoxidabil este standardul în bucătăriile comerciale din motive întemeiate:
- **Igienă:** Suprafață neporoasă, ușor de curățat
- **Durabilitate:** Rezistent la coroziune, lovituri, temperaturi
- **Conformitate:** Acceptat universal pentru HACCP și DSP

## Tipuri de Inox: AISI 304 vs AISI 430

### AISI 304 (18/10)
**Standardul premium pentru bucătării profesionale.**
- Conține 18% crom + 10% nichel
- Rezistență superioară la coroziune
- Obligatoriu pentru contact direct cu alimente
- Preț mai mare (+20-30% față de 430)

### AISI 430
**Opțiune economică pentru zone fără contact alimentar.**
- Conține 17% crom, fără nichel
- Rezistență bună, dar mai slabă la acizi
- Potrivit pentru: picioare, cadre, zone non-alimentare
- Preț mai mic

### Ce Să Alegi?
- **AISI 304:** Suprafețe de lucru, chiuvete, cuve
- **AISI 430:** Picioare, cadre, rafturi non-alimentare

## Grosimea Tablei Inox

### Pentru Suprafețe de Lucru:
- **0.8 mm:** Entry-level, uzură rapidă (nu recomandăm)
- **1.0 mm:** Standard economic, acceptabil
- **1.2 mm:** Standard profesional (recomandat)
- **1.5 mm:** Premium, durabilitate maximă

### Pentru Picioare și Cadre:
- **1.0-1.2 mm:** Standard pentru încărcări normale
- **1.5-2.0 mm:** Pentru încărcări grele

## Tipuri de Mobilier Inox

### Mese de Lucru

#### Masă Simplă
- Suprafață de lucru + picioare
- Preț: 300-600 EUR (1500x700mm)

#### Masă cu Spate
- Protecție perete, mai igienică
- Preț: 400-800 EUR

#### Masă cu Spate și Raft Inferior
- Depozitare suplimentară
- Cea mai populară în industrie
- Preț: 500-1.000 EUR

#### Masă cu Dulap
- Depozitare închisă sub blat
- Preț: 700-1.500 EUR

### Mese Speciale

#### Masă Frigorifică
- Suprafață de lucru + refrigerare sub blat
- Preț: 2.000-5.000 EUR

#### Masă cu Chiuvetă Integrată
- Tot-în-unu pentru spații mici
- Preț: 600-1.200 EUR

#### Masă cu Granit
- Pentru patiserie și pizza
- Preț: 1.000-2.500 EUR

### Rafturi și Depozitare

#### Raft Perete
- Deasupra mesei de lucru
- Adâncime: 30-40cm
- Preț: 100-300 EUR/metru

#### Raft Grilaj (Slatted)
- Permite circulația aerului
- Ideal pentru depozit
- Preț: 150-400 EUR

#### Raft cu Rafturi Ajustabile
- Flexibilitate maximă
- Preț: 200-500 EUR

### Cărucioare și Tăvi

#### Cărucior GN
- Pentru tăvi GN standard
- Capacitate: 10-20 tăvi
- Preț: 300-800 EUR

#### Cărucior Cuptor
- Se integrează cu cuptoarele
- Preț: 400-1.000 EUR

## Dimensiuni Standard

### Mese de Lucru:
- **Lățime:** 600mm (compact) sau 700mm (standard)
- **Lungime:** 1000, 1200, 1500, 1800, 2000mm
- **Înălțime:** 850-900mm (standard ergonomic)

### Rafturi:
- **Adâncime:** 300, 400mm (perete) sau 600mm (insule)
- **Distanță între rafturi:** Min. 30cm pentru vase mari

## Standarde HACCP pentru Mobilier

### Obligatoriu:
1. **Suprafețe netede** - fără fisuri sau îmbinări vizibile
2. **Colțuri rotunjite** - raza min. 3mm
3. **Distanță de la sol** - min. 15cm pentru curățare
4. **Rezistent la dezinfectanți** - AISI 304 preferabil

### Recomandări:
- Suduri TIG netede, fără asperități
- Fără șuruburi aparente pe suprafețe de lucru
- Drenaj pentru lichide unde e cazul

## Întreținerea Mobilierului Inox

### Zilnic:
- Șterge cu apă caldă și detergent neutru
- Clătește și usucă (evită petele de apă)
- Dezinfectează suprafețele de contact alimentar

### Săptămânal:
- Curățare în profunzime cu produs specific inox
- Verifică și curăță zona sub echipamente
- Verifică integritatea sudurilor

### Nu Folosi:
- Bureți abrazivi (zgârie suprafața)
- Clor concentrat (corodează)
- Acizi puternici fără clătire

## Calculul Necesarului

### Formula Simplă:
**Metri liniari mese = Număr bucătari × 1.5m + 30% rezervă**

### Exemplu Restaurant 60 locuri:
- 3 bucătari × 1.5m = 4.5m
- +30% = 6m mese de lucru
- +2m rafturi superioare
- +1 cărucior GN

## Preturi Orientative

| Produs | Preț Orientativ |
|--------|-----------------|
| Masă simplă 1500x700 | 350-600 EUR |
| Masă cu spate și raft 1500x700 | 500-900 EUR |
| Raft perete (per metru) | 100-250 EUR |
| Cărucior GN 16 tăvi | 350-700 EUR |
| Chiuvetă dublă | 400-800 EUR |

## Unde Să Cumperi?

Sfatul nostru: cumpără de la furnizori specializați HoReCa, nu de la producători generaliști.

Avantaje:
- Inox certificat pentru uz alimentar
- Dimensiuni adaptate echipamentelor standard
- Garanție și înlocuire facilă

[Vezi gama de mobilier inox](/rm/mobilier-neutru)

## Concluzie

Mobilierul inox este o investiție pe termen lung. Merită să alegi:
- **AISI 304** pentru suprafețe de contact
- **Grosime 1.2mm** minimum pentru durabilitate
- **Producător specializat HoReCa** pentru conformitate

Nu economisi la mobilier - este fundația bucătăriei tale.
    `,
    faqs: [
      {
        question: 'Cum știu dacă inoxul este AISI 304 sau 430?',
        answer: 'Testul magnetului: AISI 430 este magnetic, AISI 304 este slab magnetic sau non-magnetic. Dar cel mai sigur este să ceri certificat de la furnizor. Evită furnizori care nu pot dovedi tipul de inox.',
      },
      {
        question: 'Cât durează mobilierul inox de calitate?',
        answer: 'Mobilierul inox AISI 304 de calitate durează 15-25 de ani cu întreținere normală. AISI 430 durează 8-15 ani. Factorul principal de degradare este coroziunea din curățare necorespunzătoare, nu uzura fizică.',
      },
      {
        question: 'Pot comanda mobilier inox la dimensiuni speciale?',
        answer: 'Da, majoritatea producătorilor fac mobilier la comandă. Prețul crește cu 20-40% față de dimensiunile standard, iar timpul de livrare e de 2-4 săptămâni. Pentru spații atipice, merită investiția în dimensiuni custom.',
      },
    ],
  },
}

// Function to get related articles based on category and keywords
function getRelatedArticles(currentSlug: string, currentArticle: typeof articlesContent[string]) {
  const allSlugs = Object.keys(articlesContent).filter(slug => slug !== currentSlug)

  // Score articles by relevance
  const scoredArticles = allSlugs.map(slug => {
    const article = articlesContent[slug]
    let score = 0

    // Same category = high score
    if (article.category === currentArticle.category) score += 3

    // Matching keywords
    const matchingKeywords = article.keywords.filter(kw =>
      currentArticle.keywords.some(ckw =>
        kw.toLowerCase().includes(ckw.toLowerCase()) ||
        ckw.toLowerCase().includes(kw.toLowerCase())
      )
    )
    score += matchingKeywords.length

    return { slug, score }
  })

  // Sort by score and take top 3
  return scoredArticles
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => ({
      slug: item.slug,
      ...articlesContent[item.slug]
    }))
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
      modifiedTime: article.dateModified || article.date,
      authors: [article.author],
      tags: article.keywords,
      images: [{
        url: `https://www.xeh.ro/api/og?title=${encodeURIComponent(article.title)}&subtitle=${encodeURIComponent(article.excerpt.slice(0, 100))}&type=blog`,
        width: 1200,
        height: 630,
        alt: article.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [`https://www.xeh.ro/api/og?title=${encodeURIComponent(article.title)}&type=blog`],
    },
    alternates: {
      canonical: `https://www.xeh.ro/blog/${slug}`,
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

  // Prepare articleBody for Schema.org (strip markdown, truncate to 500 chars)
  const articleBody = stripMarkdown(article.content).slice(0, 500)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org */}
      <ArticleJsonLd
        article={{
          title: article.title,
          description: article.excerpt,
          url: `https://www.xeh.ro/blog/${slug}`,
          datePublished: article.date,
          dateModified: article.dateModified,
          author: article.author,
          authorSlug: article.authorSlug,
          keywords: article.keywords,
          articleBody,
        }}
      />
      {article.faqs && <FAQJsonLd faqs={article.faqs} />}
      {article.howToSteps && (
        <HowToJsonLd
          howTo={{
            name: article.title,
            description: article.excerpt,
            steps: article.howToSteps,
          }}
        />
      )}
      <BreadcrumbJsonLd
        items={breadcrumbItems.map((item) => ({
          name: item.label,
          url: item.href ? `https://www.xeh.ro${item.href}` : undefined,
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

            <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6 text-sm text-gray-400">
              <Link
                href={`/echipa#${article.authorSlug}`}
                className="flex items-center gap-2 hover:text-crimson transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-crimson to-crimson-dark rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="font-medium text-gray-600">{article.author}</span>
                  {authors[article.authorSlug] && (
                    <span className="block text-xs">{authors[article.authorSlug].title}</span>
                  )}
                </div>
              </Link>
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
          {/* Answer-first summary for AI search */}
          <div className="article-summary bg-gray-50 border-l-4 border-crimson p-4 rounded-r-lg mb-8">
            <p className="text-gray-700 font-medium">{article.excerpt}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <SafeMarkdown content={article.content} />
          </div>
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

        {/* Related Articles Section */}
        {(() => {
          const relatedArticles = getRelatedArticles(slug, article)
          if (relatedArticles.length === 0) return null

          return (
            <div className="mt-12 bg-white rounded-3xl p-8 md:p-12 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-600 mb-6">
                Articole Similare
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block"
                  >
                    <div className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors h-full">
                      <span className="text-xs font-semibold text-crimson uppercase tracking-wide">
                        {related.category}
                      </span>
                      <h3 className="font-bold text-gray-600 mt-2 group-hover:text-crimson transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {related.readTime} citire
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })()}

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
