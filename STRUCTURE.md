# XEH.ro - Structura Proiectului

## Prezentare Generala

**XEH.ro** (eXpert Echipamente Horeca) este un site de prezentare pentru echipamente profesionale HoReCa, construit cu:
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Vitest** (pentru teste)

---

## Structura Directoarelor

```
HEXro/
├── public/                    # Fișiere statice (imagini, favicon, etc.)
│   └── images/                # Imagini pentru categorii, produse, og-image
│
├── src/                       # Codul sursă principal
│   ├── app/                   # App Router (Next.js 14) - pagini și rute
│   ├── components/            # Componente React reutilizabile
│   ├── data/                  # Date statice (categorii, produse)
│   ├── lib/                   # Utilități și funcții helper (gol momentan)
│   └── types/                 # Definiții TypeScript
│
├── .claude/                   # Configurații Claude Code
├── tailwind.config.ts         # Configurare Tailwind CSS + culori
├── tsconfig.json              # Configurare TypeScript
├── package.json               # Dependențe și scripturi NPM
├── postcss.config.js          # Configurare PostCSS
├── vitest.config.ts           # Configurare Vitest (teste)
└── .eslintrc.json             # Configurare ESLint
```

---

## Detalii pe Module

### `/src/app/` - Pagini și Rute (App Router)

Acest director folosește **Next.js App Router**. Fiecare folder reprezintă o rută.

| Fișier/Director | Scop |
|-----------------|------|
| `layout.tsx` | Layout-ul principal (Header, Footer, WhatsApp button, metadata globală, JSON-LD Organization) |
| `page.tsx` | **Pagina principală (Home)** - Hero, Features, Categorii, Produse recomandate, CTA |
| `globals.css` | Stiluri globale CSS + clase Tailwind personalizate (btn-primary, btn-accent, gradiente) |
| `not-found.tsx` | Pagina 404 personalizată |
| `robots.ts` | Generare automată robots.txt pentru SEO |
| `sitemap.ts` | Generare automată sitemap.xml pentru SEO |

#### `/src/app/categorii/`
| Fișier | Scop |
|--------|------|
| `page.tsx` | Lista tuturor categoriilor de echipamente |
| `[slug]/page.tsx` | Pagina dinamică pentru o categorie specifică (SSG cu `generateStaticParams`) |

#### `/src/app/produse/`
| Fișier | Scop |
|--------|------|
| `[slug]/page.tsx` | Pagina dinamică pentru un produs specific (SSG, include JSON-LD Product) |

#### `/src/app/cerere-oferta/`
| Fișier | Scop |
|--------|------|
| `page.tsx` | Pagina pentru solicitare ofertă - include beneficii, sidebar, testimonial |
| `QuoteForm.tsx` | Componentă client pentru formularul de cerere ofertă (cu pre-populare din URL params) |

#### `/src/app/contact/`
| Fișier | Scop |
|--------|------|
| `page.tsx` | Pagina de contact - carduri contact, hartă, program lucru |
| `ContactForm.tsx` | Componentă client pentru formularul de contact |

#### `/src/app/despre-noi/`
| Fișier | Scop |
|--------|------|
| `page.tsx` | Pagina "Despre Noi" - statistici, valori, servicii, story |

---

### `/src/components/` - Componente Reutilizabile

| Componentă | Scop | Utilizare |
|------------|------|-----------|
| `Header.tsx` | Navigare principală, logo, meniu mobil, CTA button | Layout global |
| `Footer.tsx` | Footer cu linkuri, categorii, contact, social media | Layout global |
| `WhatsAppButton.tsx` | Buton flotant WhatsApp (colț dreapta-jos) | Layout global |
| `Breadcrumbs.tsx` | Navigare breadcrumb cu JSON-LD | Toate paginile interioare |

---

### `/src/data/` - Date Statice

| Fișier | Scop | Funcții Exportate |
|--------|------|-------------------|
| `categories.ts` | Lista categoriilor de echipamente (12 categorii) | `categories`, `getCategoryBySlug()`, `getAllCategories()` |
| `products.ts` | Lista produselor (8 produse exemplu) | `products`, `getProductBySlug()`, `getProductsByCategory()`, `getAllProducts()`, `getFeaturedProducts()` |

#### `/src/data/__tests__/`
| Fișier | Scop |
|--------|------|
| `data-helpers.test.ts` | Teste unitare pentru funcțiile helper din data |

---

### `/src/types/` - Definiții TypeScript

| Fișier | Tipuri Definite |
|--------|-----------------|
| `index.ts` | `Category`, `Product`, `ProductSpecification`, `ContactFormData`, `QuoteRequestFormData`, `BreadcrumbItem` |

---

### `/src/lib/` - Utilități (Reserved)

Director rezervat pentru viitoare funcții helper, API clients, etc. **Momentan gol.**

Sugestii pentru viitor:
- `api.ts` - Client API pentru backend
- `utils.ts` - Funcții utilitare generale
- `validation.ts` - Schema-uri de validare Zod

---

## Configurare Stiluri (Tailwind CSS)

### Culori Principale (Crimson Elite Theme)

Definite în `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#DC143C',  // Crimson principal
    light: '#E8354F',    // Hover/accent
    dark: '#B01030',     // Hover mai închis
    // + nuanțe 50-900
  },
  secondary: {
    DEFAULT: '#0D0D0D',  // Negru profund
    light: '#1A1A1A',    // Gri închis
  },
  background: '#FAFAFA',
  card: '#FFFFFF',
  text: {
    DEFAULT: '#0D0D0D',
    muted: '#666666',
  },
  'product-bg': '#1A1A1A',
}
```

### Clase CSS Personalizate

Definite în `globals.css`:

| Clasă | Scop |
|-------|------|
| `.gradient-primary` | Gradient crimson: `linear-gradient(135deg, #DC143C 0%, #8B0A1E 100%)` |
| `.gradient-header` | Gradient header negru: `linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)` |
| `.btn-primary` | Buton principal crimson cu shadow |
| `.btn-accent` | Alias pentru btn-primary (CTA) |
| `.btn-outline` | Buton cu border crimson |
| `.section-title` | Titlu secțiune (h2) |
| `.section-subtitle` | Subtitlu secțiune |
| `.card` | Card cu shadow și hover effect |
| `.input-field` | Input de formular stilizat |
| `.label` | Label pentru form fields |

---

## SEO & Metadata

### Implementări SEO:

1. **Metadata Globală** (`layout.tsx`)
   - Title template cu brand
   - Open Graph images
   - Twitter cards
   - Robots config
   - Google verification

2. **JSON-LD Structured Data**
   - `Organization` - în layout.tsx
   - `BreadcrumbList` - în Breadcrumbs.tsx
   - `CollectionPage` - în categorii/[slug]
   - `Product` - în produse/[slug]

3. **Sitemap & Robots**
   - Generare automată din `/src/app/sitemap.ts`
   - Configurare robots din `/src/app/robots.ts`

---

## Scripturi NPM

```bash
npm run dev      # Pornește server development
npm run build    # Build pentru producție
npm run start    # Pornește server producție
npm run lint     # Verificare ESLint
npm run test     # Rulează teste Vitest
```

---

## Fluxuri de Date

### Categorii → Produse
```
categories.ts          produse/[slug]/page.tsx
     ↓                        ↓
getAllCategories()     getProductsByCategory(slug)
     ↓                        ↓
categorii/page.tsx     Lista produse din categorie
```

### Formulare
```
QuoteForm.tsx / ContactForm.tsx
     ↓
State local (useState)
     ↓
handleSubmit() - simulat (fără backend)
     ↓
Success state → mesaj confirmare
```

---

## Ghid pentru Modificări Viitoare

### Adăugare Categorie Nouă
1. Editează `src/data/categories.ts`
2. Adaugă obiect nou în array-ul `categories`
3. Build-ul va genera automat pagina la `/categorii/[slug]`

### Adăugare Produs Nou
1. Editează `src/data/products.ts`
2. Adaugă obiect nou în array-ul `products`
3. Asigură-te că `categorySlug` corespunde unei categorii existente
4. Build-ul va genera automat pagina la `/produse/[slug]`

### Modificare Culori
1. Editează `tailwind.config.ts` pentru valorile hex
2. Editează `src/app/globals.css` pentru gradiente și clase custom

### Adăugare Pagină Nouă
1. Creează director în `src/app/` cu numele rutei
2. Adaugă `page.tsx` în director
3. Importă componente din `@/components/`
4. Folosește clasele din `globals.css`

### Adăugare Componentă Nouă
1. Creează fișier în `src/components/`
2. Dacă folosește state/hooks, adaugă `'use client'` la început
3. Exportă componenta default

### Conectare Backend (viitor)
1. Creează funcții API în `src/lib/api.ts`
2. Înlocuiește datele statice din `src/data/` cu fetch-uri
3. Actualizează formularele să trimită date către API

---

## Note Tehnice

- **Static Site Generation (SSG)**: Toate paginile de categorii și produse sunt pre-generate la build
- **Client Components**: Doar formularele și meniul mobil folosesc `'use client'`
- **Font**: Inter (Google Fonts) - încărcat în `globals.css`
- **Responsive**: Design mobile-first cu breakpoints Tailwind standard
