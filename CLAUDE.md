# XEH.ro - Context Proiect

> **IMPORTANT:** Acest fișier este citit automat de Claude Code. Actualizează-l după fiecare decizie majoră.
> **Ultima actualizare:** 2026-01-20 (dimineața)

---

## 🚨 CONTINUARE SESIUNE - CITEȘTE ASTA ÎNTÂI!

### STATUS ACTUAL (2026-01-20)
**Traducerile sunt COMPLETE în baza de date, dar NU sunt DEPLOY-ate pe site!**

#### CE S-A FĂCUT:
1. ✅ **Traduse 2,597 produse** - `title_ro` populat cu Claude API
2. ✅ **Traduse 386 categorii** - `name_ro` populat în DB (41 identice cu EN, 0 lipsă)
3. ✅ **Coloană `name_ro` adăugată** în tabelul `categories` (SQL rulat în Supabase)
4. ✅ **Cod actualizat** pentru afișarea traducerilor:
   - `types/database.ts` - adăugat `name_ro: string | null` în type Category
   - `lib/utils/index.ts` - adăugat funcția `getCategoryName(name, nameRo)`
   - `components/category/CategoryCard.tsx` - folosește `getCategoryName`
   - `app/(main)/[brand]/[...slug]/page.tsx` - breadcrumb și pageTitle în română
   - `app/(main)/catalog/page.tsx` - categorii în română (necesită verificare)
   - `components/layout/Header.tsx` - search results în română
   - `app/api/search/route.ts` - include `name_ro` în response

#### ⚠️ PROBLEMA ACTUALĂ:
Fișierele noi NU erau tracked de git! Am făcut `git add` dar NU am făcut commit și deploy.

### 🎯 PAȘI DE URMAT LA REVENIRE:

```bash
# 1. Verifică statusul git
git status

# 2. Adaugă toate fișierele necesare (dacă nu sunt deja staged)
git add components/category/ lib/utils/ types/database.ts app/api/search/route.ts

# 3. Commit
git commit -m "Add Romanian translations for categories - display name_ro"

# 4. Deploy pe Vercel
vercel --prod --yes

# 5. Verifică pe site că categoriile apar în română
# Mergi la https://xeh.ro/rm și verifică că:
# - "Blast chillers" → "Răcitoare rapide"
# - "Convection ovens" → "Cuptoare cu convecție"
# - Produsele deja afișează română (funcționează)
```

### FIȘIERE MODIFICATE CARE TREBUIE COMMITTED:

```
A  app/api/search/route.ts          # Include name_ro în search
A  components/category/CategoryCard.tsx  # Afișează name_ro
A  lib/utils/index.ts               # getCategoryName helper
A  types/database.ts                # Category type cu name_ro
M  app/(main)/[brand]/[...slug]/page.tsx  # Breadcrumb în română
M  components/layout/Header.tsx     # Search în română
```

### SCRIPTURI TRADUCERE CREATE:

```
scripts/translate-products-claude.ts     # Traduce produse cu Claude API
scripts/translate-categories-claude.ts   # Traduce categorii cu Claude API
scripts/check-translations.ts            # Verifică starea traducerilor produse
scripts/check-category-translations.ts   # Verifică starea traducerilor categorii
```

### API KEYS NECESARE:
- `ANTHROPIC_API_KEY` - în `.env.local` (pentru traduceri viitoare)

---

## 1. IDENTITATE PROIECT

- **Nume:** XEH.ro (eXpert Echipamente Horeca)
- **Tip:** Platformă B2B e-commerce echipamente profesionale HORECA
- **Domeniu live:** https://xeh.ro
- **GitHub:** github.com/liviudrinceanu-cpu/xeh-ro.git
- **Vercel:** xeh-ro (team: xpertlivius-projects, user: liviudrinceanu-3033)
- **Telefon contact:** 0724256250

---

## 2. TECH STACK

| Tehnologie | Rol | Status |
|------------|-----|--------|
| Next.js 14 | Frontend (App Router) | ✅ Activ |
| TypeScript | Type safety | ✅ Activ |
| Tailwind CSS | Styling (Apple + Crimson) | ✅ Activ |
| Supabase | Database + Auth | ✅ Configurat |
| Cloudinary | CDN imagini | ✅ Activ |
| Resend | Email notifications | ✅ Configurat |
| Vercel | Hosting | ✅ Deployed |
| Zod | Form validation | ✅ Activ |
| React Hook Form | Forms | ✅ Activ |
| Anthropic Claude API | Traduceri AI | ✅ Configurat |

---

## 3. BRANDURI DISTRIBUITE

1. **RM Gastro** - Linie premium pentru restaurante/hoteluri upscale (~1,228 produse)
2. **REDFOX** - Linie economică pentru fast-food, bistrouri (~1,372 produse)

**Total produse:** ~2,600
**Model vânzări:** Catalog cu Quote Cart → "Cere Ofertă" → Quote manual

---

## 4. DESIGN SYSTEM

- **Stil:** Apple minimalism + accent Crimson
- **Background:** #FAFAFA
- **Primary text:** #1D1D1F
- **Accent:** #DC143C (Crimson)
- **RM Brand:** #1D1D1F (negru)
- **REDFOX Brand:** #DC143C (roșu)
- **Mod:** Light only (fără dark mode)
- **Border-radius:** 16-24px
- **Font:** Inter

---

## 5. STRUCTURA PROIECT

```
/app
  ├── (main)/              → Layout principal (site public)
  │   ├── page.tsx         → Homepage
  │   ├── [brand]/         → Pagini brand (RM/REDFOX)
  │   │   └── [...slug]/   → Categorii + Produse (cu paginare)
  │   ├── catalog/         → Catalog complet (cu filtre și paginare)
  │   ├── cerere-oferta/   → Formular ofertă (cu Quote Cart)
  │   └── contact/         → Contact
  ├── (auth)/              → Layout auth (fără header/footer)
  │   ├── login/           → Login page
  │   ├── register/        → Register multi-step
  │   ├── forgot-password/ → Forgot password
  │   └── reset-password/  → Reset password
  ├── (portal)/            → Layout portal parteneri
  │   └── portal/
  │       ├── dashboard/   → Dashboard partener
  │       ├── quotes/      → Cotațiile mele
  │       ├── favorites/   → Produse favorite
  │       ├── price-list/  → Lista prețuri cu discount
  │       ├── profile/     → Profil partener
  │       └── pending/     → Cont în așteptare
  ├── (admin)/             → Layout admin (sidebar dark)
  │   └── admin/
  │       ├── page.tsx     → Dashboard admin
  │       ├── partners/    → Gestiune parteneri
  │       ├── quotes/      → Gestiune cotații
  │       └── discounts/   → Vizualizare discount-uri
  └── api/
      ├── auth/register/   → API înregistrare
      ├── admin/partners/  → API aprobare parteneri
      ├── contact/         → API contact
      ├── quote/           → API cotații (suportă multiple produse)
      └── search/          → API search (include name_ro)

/components
  ├── layout/              → Header, Footer, FloatingCTA
  ├── product/             → ProductCard, ProductGrid, Gallery, Specs, AddToCartButton
  ├── cart/                → CartButton, CartDrawer, CartItem
  ├── category/            → CategoryCard (cu name_ro)
  ├── forms/               → QuoteForm (cu tabel produse), ContactForm
  ├── ui/                  → Button, Badge, Breadcrumb, Skeleton
  ├── auth/                → LoginForm, RegisterForm, etc.
  ├── portal/              → PortalSidebar, PortalHeader
  └── providers/           → AuthProvider, QuoteCartProvider

/lib
  ├── queries/             → Supabase queries
  ├── supabase/            → client.ts, server.ts, auth.ts
  ├── email.ts             → Resend email functions (cu tabel produse)
  └── utils/               → Helpers (inclusiv getCategoryName)

/scripts
  ├── translate-products-claude.ts   → Script traducere produse
  ├── translate-categories-claude.ts → Script traducere categorii
  ├── check-translations.ts          → Verificare produse
  └── check-category-translations.ts → Verificare categorii

/middleware.ts             → Protecție rute /portal și /admin
/types                     → TypeScript definitions (inclusiv database.ts cu name_ro)
```

---

## 6. BAZA DE DATE (SUPABASE)

**Tabele existente și active:**
- `brands` - RM, REDFOX
- `categories` - Ierarhie categorii (6 nivele) **+ name_ro**
- `products` - Toate produsele (~2,600) **+ title_ro POPULAT**
- `product_images` - Imagini Cloudinary
- `product_documents` - PDFs tehnice
- `product_specifications` - Specs (key-value)
- `product_features` - Features principale
- `product_categories` - Junction table
- `quote_requests` - Cereri ofertă (cu quote_number unic)
- `quote_items` - Produse în cereri (multiple per quote)
- `user_profiles` - Profile utilizatori (role: admin/partner/customer)
- `partners` - Conturi B2B parteneri (is_approved, company info)
- `partner_discount_rules` - Reguli discount (all/brand/category/product)

**Câmpuri importante în `products`:**
- `title_en` - Titlu în engleză
- `title_ro` - Titlu în română ✅ **POPULAT (2,597/2,600)**
- `sap_code` - Cod unic produs
- `model` - Model produs
- `price_amount` / `price_currency` - Preț catalog
- `stock_status` - in_stock / out_of_stock / on_request

**Câmpuri importante în `categories`:**
- `name` - Nume în engleză
- `name_ro` - Nume în română ✅ **POPULAT (386 traduse, 41 identice)**

---

## 7. STATUS FEATURES

### ✅ TRADUCERI - STATUS

| Element | Status | Detalii |
|---------|--------|---------|
| Produse title_ro | ✅ DB COMPLET | 2,597 traduse, 3 identice |
| Categorii name_ro | ✅ DB COMPLET | 386 traduse, 41 identice |
| Afișare produse | ✅ FUNCȚIONAL | extractProductTitle folosește title_ro |
| Afișare categorii | ⚠️ TREBUIE DEPLOY | Cod gata, trebuie commit + deploy |

### ✅ FUNCȚIONALITĂȚI COMPLETE

#### Site Public (https://xeh.ro)
| Feature | Status | Detalii |
|---------|--------|---------|
| Homepage | ✅ Live | Hero, branduri, categorii populare, produse recomandate |
| Navigare Categorii | ✅ Live | Până la 6 nivele, subcategorii cu count produse |
| Pagini Produs | ✅ Live | Galerie, specs, docs, preț, status stoc |
| Catalog Complet | ✅ Live | Filtrare, sortare, search, paginare |
| Paginare Categorii | ✅ Live | 24 produse/pagină pe toate categoriile |
| Search | ✅ Live | Full-text search Supabase |
| Quote Cart | ✅ Live | Adăugare produse, drawer lateral, subtotal |
| Formular Ofertă | ✅ Live | Tabel produse cu prețuri, cantități |
| Email Notificări | ✅ Live | Tabel produse în email admin și client |
| Formular Contact | ✅ Live | Cu validare și email |
| Design Responsive | ✅ Live | Mobile-first |
| **Titluri produse RO** | ✅ Live | Afișate în română |
| **Titluri categorii RO** | ⚠️ Deploy | Trebuie commit + deploy |

---

## 8. COMENZI UTILE

```bash
# Development
npm run dev

# Build local
npm run build

# Deploy Vercel Production
vercel --prod --yes

# Traducere produse (dacă trebuie reluată)
npm run translate:products:claude

# Traducere categorii
npm run translate:categories

# Verificare traduceri
npx tsx scripts/check-translations.ts
npx tsx scripts/check-category-translations.ts
```

---

## 9. DECIZII ARHITECTURALE

| Data | Decizie | Motiv |
|------|---------|-------|
| 2026-01-15 | Light mode only | Targetăm B2B profesional, simplitate |
| 2026-01-15 | Cloudinary pentru imagini | CDN optimizat, transformări on-the-fly |
| 2026-01-15 | Supabase | Auth + DB + RLS într-un singur loc |
| 2026-01-16 | Supabase Search | Deja configurat, fără costuri extra |
| 2026-01-16 | Email cu Resend | Notificări email la cereri ofertă |
| 2026-01-19 | Quote Cart System | Permite selectare multiple produse |
| 2026-01-19 | localStorage pentru cart | Persistență între pagini |
| 2026-01-20 | Claude API pentru traduceri | OpenAI avea quota depășită |
| 2026-01-20 | getCategoryName helper | Fallback elegant EN→RO |

---

## 10. CREDENȚIALE ȘI ACCES

| Serviciu | Status |
|----------|--------|
| Git remote | ✅ Configurat |
| Vercel CLI | ✅ Autentificat |
| Supabase | ✅ Configurat |
| Resend | ✅ Configurat |
| Anthropic API | ✅ Configurat (ANTHROPIC_API_KEY) |
| Google Search Console | ⏳ De configurat |

**Variabile env:** Vezi `.env.local` și Vercel Dashboard

---

## 11. INSTRUCȚIUNI PENTRU CLAUDE

### La Început de Sesiune Nouă (OBLIGATORIU)
Când utilizatorul deschide o fereastră nouă, Claude TREBUIE să răspundă cu:

```
✅ CLAUDE.md încărcat | Ultima actualizare: 2026-01-20

📊 STARE PROIECT XEH.ro:
- Status: LIVE și funcțional
- Traduceri: ✅ Complete în DB, ⚠️ Categorii trebuie deploy
- Site: https://xeh.ro

🎯 TASK IMEDIAT:
1. git commit -m "Add Romanian category translations"
2. vercel --prod --yes
3. Verifică https://xeh.ro/rm - categoriile trebuie să fie în română

Confirm să continui cu deploy-ul?
```

---

## 12. ROADMAP

1. ~~Phase 1 - Scraping Test~~ ✅
2. ~~Phase 2 - Validare date~~ ✅
3. ~~Phase 3 - Full Scraping~~ ✅
4. ~~Phase 4 - Frontend~~ ✅
5. ~~Phase 5 - B2B Portal~~ ✅
6. ~~Phase 6 - Quote Cart~~ ✅
7. **Phase 7 - Traducere** ✅ DB complet, ⚠️ deploy pending
8. **Phase 8 - SEO** ⏳ următorul pas
9. **Phase 9 - Google Indexing** ⏳
10. Phase 10 - Marketing & Launch

---

*Ultima actualizare: 2026-01-20 dimineața | Deploy: https://xeh.ro | TRADUCERI ÎN DB, DEPLOY PENDING*
