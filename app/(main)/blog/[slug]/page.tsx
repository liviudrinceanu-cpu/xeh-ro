import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import type { Metadata } from 'next'
import { FAQJsonLd, BreadcrumbJsonLd, ArticleJsonLd } from '@/components/seo/JsonLd'
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

// Author data for E-E-A-T - linked to /echipa page
const authors: Record<string, { name: string; slug: string; title: string }> = {
  'alexandru-ionescu': { name: 'Alexandru Ionescu', slug: 'alexandru-ionescu', title: 'Director General & Fondator' },
  'maria-popescu': { name: 'Maria Popescu', slug: 'maria-popescu', title: 'Director Tehnic' },
  'andrei-dumitrescu': { name: 'Andrei Dumitrescu', slug: 'andrei-dumitrescu', title: 'Consultant Vânzări' },
  'elena-stanciu': { name: 'Elena Stanciu', slug: 'elena-stanciu', title: 'Specialist Proiecte' },
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
  readTime: string
  keywords: string[]
  faqs?: Array<{ question: string; answer: string }>
}> = {
  'top-10-cuptoare-profesionale-restaurante-2026': {
    title: 'Top 10 Cuptoare Profesionale pentru Restaurante în 2026',
    excerpt: 'Ghid complet pentru alegerea celui mai bun cuptor profesional. Comparăm cuptoare cu convecție, combi steamere și cuptoare pentru pizza.',
    category: 'Ghiduri',
    author: 'Maria Popescu',
    authorSlug: 'maria-popescu',
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
    author: 'Alexandru Ionescu',
    authorSlug: 'alexandru-ionescu',
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
    author: 'Maria Popescu',
    authorSlug: 'maria-popescu',
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
    author: 'Elena Stanciu',
    authorSlug: 'elena-stanciu',
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
    author: 'Andrei Dumitrescu',
    authorSlug: 'andrei-dumitrescu',
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
    author: 'Alexandru Ionescu',
    authorSlug: 'alexandru-ionescu',
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
  'ghid-deschidere-restaurant-2026': {
    title: 'Ghid Complet: Cum să Deschizi un Restaurant în 2026',
    excerpt: 'Pași esențiali, costuri, echipamente obligatorii și sfaturi practice pentru a deschide un restaurant de succes în România.',
    category: 'Ghiduri',
    author: 'Alexandru Ionescu',
    authorSlug: 'alexandru-ionescu',
    date: '2026-01-22',
    readTime: '15 min',
    keywords: ['deschidere restaurant', 'cum deschid restaurant', 'echipare bucatarie restaurant', 'costuri restaurant', 'autorizatii restaurant'],
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
    author: 'Alexandru Ionescu',
    authorSlug: 'alexandru-ionescu',
    date: '2026-01-20',
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
    author: 'Maria Popescu',
    authorSlug: 'maria-popescu',
    date: '2026-01-18',
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
      authors: [article.author],
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema.org */}
      <ArticleJsonLd
        article={{
          title: article.title,
          description: article.excerpt,
          url: `https://www.xeh.ro/blog/${slug}`,
          datePublished: article.date,
          author: article.author,
          authorSlug: article.authorSlug,
          keywords: article.keywords,
        }}
      />
      {article.faqs && <FAQJsonLd faqs={article.faqs} />}
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
