# ════════════════════════════════════════════════════════════════════════════════
# XEH.ro - DOCUMENT MASTER COMPLET
# Proiect: eXpert Echipamente Horeca
# Data: Ianuarie 2026
# ════════════════════════════════════════════════════════════════════════════════

## 📋 CUPRINS
1. Informații Proiect
2. Decizii de Business
3. Design & Branding
4. Arhitectură Tehnică
5. Structura Categoriilor
6. Structura Paginii de Produs
7. Sistem B2B Parteneri
8. Credențiale & Servicii
9. Fișiere Create
10. Status Actual
11. Pași Următori
12. Instrucțiuni pentru Conversație Nouă

---

# ════════════════════════════════════════════════════════════════════════════════
# 1. INFORMAȚII PROIECT
# ════════════════════════════════════════════════════════════════════════════════

## Identificare
- **Nume site:** XEH.ro
- **Denumire completă:** eXpert Echipamente Horeca
- **Domeniu:** xeh.ro (live pe Vercel)
- **GitHub:** liviudrinceanu-cpu/xeh-ro
- **Folder local Mac:** ~/HEXro

## Descriere
Platform B2B de e-commerce pentru echipamente HoReCa profesionale.
Distribuitor pentru brandurile RM Gastro (premium) și REDFOX (economic) în România.
Target: restaurante, hoteluri, cafenele care caută echipamente de bucătărie industrială.

## Branduri Distribuite
| Brand | Poziționare | Sursă | URL Sursă |
|-------|-------------|-------|-----------|
| **RM** | Premium - restaurante mari, hoteluri | RM Gastro | https://rm.rmgastro.com/Group/rm |
| **REDFOX** | Economic - bistro-uri, fast food | RM Gastro | https://redfox.rmgastro.com/Group/redfox |

---

# ════════════════════════════════════════════════════════════════════════════════
# 2. DECIZII DE BUSINESS (CONFIRMATE)
# ════════════════════════════════════════════════════════════════════════════════

## Limba Site
- **Principală:** Română (cu termeni uzuali din industria HoReCa)
- **Secundară:** Engleză (selectabil)
- Traduceri SEO-optimizate pentru piața românească

## Model de Business
- **Tip site:** Catalog cu cerere ofertă (NU magazin online cu coș)
- **Prețuri:** Afișate în EUR fără TVA unde există, "La Cerere" unde nu există
- **Stoc:** 
  - "Disponibil în stoc la depozitul central" 
  - "Pe drum" 
  - "La cerere"

## Funcționalități Principale
1. ✅ Catalog produse cu filtrare pe brand/categorie
2. ✅ Pagini produs detaliate (ca pe site-ul original)
3. ✅ Buton "Cere Ofertă" pe fiecare produs
4. ✅ Formular cerere ofertă
5. ✅ Link către producător pe pagina produsului
6. ⏳ Sistem B2B pentru parteneri cu discounturi unice
7. ⏳ Căutare rapidă (Meilisearch)

## Imagini și Documente
- **Imagini:** Descărcate și stocate pe Cloudinary (NU linkuite direct de pe site-ul sursă)
- **Documente PDF:** Link către site-ul original (manuale, fișe tehnice)
- **Motivație:** Profesionist, independent, fără risc de hotlinking blocat

---

# ════════════════════════════════════════════════════════════════════════════════
# 3. DESIGN & BRANDING (CONFIRMAT)
# ════════════════════════════════════════════════════════════════════════════════

## Stilul Ales: Apple + Crimson
Combinație între structura minimalistă Apple și accentele Crimson Elite.

## Paletă de Culori
```
PRINCIPAL (Fundal & Text)
- Background: #FAFAFA (gri foarte deschis)
- Surface/Cards: #FFFFFF (alb pur)
- Text principal: #1D1D1F (negru Apple)
- Text secundar: #86868B (gri Apple)

ACCENT (Crimson)
- Primary: #DC143C (Crimson)
- Primary Dark: #B01030 (hover)
- Primary Light: #E8354F
- Primary BG: #FEF2F4 (fundal badge-uri)

BRAND COLORS
- RM: #1D1D1F (negru)
- REDFOX: #DC143C (crimson)
```

## Tipografie
- **Font:** Inter (similar SF Pro)
- **Titluri:** Letter-spacing negativ, bold
- **Corp:** Regular, line-height 1.5

## Caracteristici Design
- ✅ Light mode (nu dark)
- ✅ Border-radius generos (16-24px)
- ✅ Shadows subtile, stratificate
- ✅ Hover effects cu translateY
- ✅ Backdrop blur pe navbar
- ✅ Animații smooth (0.2-0.3s)
- ✅ Iconuri SVG minimalist (Lucide) pentru categorii
- ❌ NU emoji-uri pe site-ul real (doar în mockup)

## Logo XEH
- "XEH" pe fundal roșu (#DC143C), text alb, bold
- ".ro" pe fundal negru (#1D1D1F), text alb

---

# ════════════════════════════════════════════════════════════════════════════════
# 4. ARHITECTURĂ TEHNICĂ (CONFIRMAT)
# ════════════════════════════════════════════════════════════════════════════════

## Tech Stack
| Tehnologie | Rol | Status |
|------------|-----|--------|
| **Next.js 14** | Framework frontend (App Router) | ✅ Configurat |
| **TypeScript** | Type safety | ✅ Configurat |
| **Tailwind CSS** | Styling | ✅ Configurat |
| **Supabase** | Database + Auth | ✅ Configurat + Schema creată |
| **Cloudinary** | CDN imagini | ✅ Cont creat |
| **Meilisearch** | Search rapid | ✅ Cont creat (14 zile trial) |
| **Vercel** | Hosting | ✅ Deploiat pe xeh.ro |
| **GitHub** | Version control | ✅ Repo activ |

## Structura Bază de Date Supabase (15 tabele)
```
categories          - Categorii produse (ierarhie 6 nivele)
products            - Produse principale
product_images      - Imagini per produs
product_documents   - PDF-uri (manuale, fișe tehnice)
product_relations   - Accesorii, produse similare
user_profiles       - Profiluri utilizatori
partners            - Parteneri B2B
partner_discount_rules - Reguli discount per partener
quote_requests      - Cereri de ofertă
quote_items         - Produse în cereri ofertă
```

## Funcționalități Database
- ✅ UUID pentru toate ID-urile
- ✅ Enum types (brand, stock_status, power_type, etc.)
- ✅ Full-text search în română și engleză
- ✅ Row Level Security (RLS) policies
- ✅ Triggers auto-update timestamps
- ✅ Funcție generare număr ofertă (XEH-2026-00001)
- ✅ Trigger update contor produse per categorie

---

# ════════════════════════════════════════════════════════════════════════════════
# 5. STRUCTURA CATEGORIILOR
# ════════════════════════════════════════════════════════════════════════════════

## Categorii RM (11 principale)
1. RM 700 (linie premium)
2. Roboți și Preparare
3. Program Pizza
4. Cuptoare Convecție (Combi Steamere)
5. Abatitoare (Blast Chillers)
6. Refrigerare
7. Spălare
8. Salamandre
9. Sisteme de Rafturi
10. Drop-In Monoblock
11. Bufete, Vitrine, Bain-Marie

## Categorii REDFOX (17 principale)
1. REDFOX 600 (snack, fast-food)
2. REDFOX 700 (restaurante medii)
3. REDFOX 900 (heavy-duty)
4. Module Independente
5. Echipamente de Masă
6. Program Pizza
7. Cuptoare Convecție
8. Refrigerare
9. Spălare
10. Dedurizatoare
11. Mobilier Inox
12. Preparare Alimente
13. Bar și Cafenea
14. Distribuție Mese
15. Patiserie și Brutărie
16. Ventilație
17. Bucătărie Etnică

## Ierarhie
- Până la **6 niveluri** de adâncime
- Pattern URL: `/Group/rm/rm-700/sporaky/elektricke`
- Brand → Categorie → Subcategorie → Sub-subcategorie → Produs

## Dicționar Traduceri EN → RO (Exemple)
| Engleză | Română SEO |
|---------|------------|
| Blast chillers | Abatitoare |
| Fry Top Griddles | Plite Fry-Top |
| Convection ovens | Cuptoare cu Convecție |
| Dishwashers | Mașini de Spălat Vase |
| Ice makers | Mașini de Gheață |
| Tilting Bratt Pans | Tigăi Basculante |
| Vacuum packers | Mașini de Ambalat în Vid |

---

# ════════════════════════════════════════════════════════════════════════════════
# 6. STRUCTURA PAGINII DE PRODUS (CLONĂ FUNCȚIONALĂ)
# ════════════════════════════════════════════════════════════════════════════════

## Layout Pagină Produs
```
┌─────────────────────────────────────────────────────────────┐
│  BREADCRUMB: Acasă > Catalog > RM > Categorie > Subcategorie│
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  │ TITLU: Friteuză Electrică 13,5 kW          │
│  │          │  │ Model: FE 740/17 E | Cod: 00008526         │
│  │  GALERIE │  │ [Logo Brand] [Share] [Compară]             │
│  │  IMAGINI │  │                                            │
│  │          │  │ ● Disponibil în stoc la depozitul central  │
│  └──────────┘  │                                            │
│                │ CARACTERISTICI PRINCIPALE:                 │
│                │ • Volum bazin: 17 litri                    │
│                │ • Material: AISI 304                       │
│                │ • Număr coșuri: 1                          │
│                │                                            │
│                │ Preț catalog: 2.890,00 EUR (fără TVA)      │
│                │                                            │
│                │ [BUTON: Cere Ofertă]  [BUTON: Compară]     │
├─────────────────────────────────────────────────────────────┤
│ TAB-URI: [Detalii Tehnice] [Fotografii] [Documentație]      │
│          [Suport Tehnic] [FAQ]                              │
├─────────────────────────────────────────────────────────────┤
│ DETALII TEHNICE: Tabel key-value (25-40 câmpuri)            │
├─────────────────────────────────────────────────────────────┤
│ DOCUMENTAȚIE: Selector limbă → PDF-uri descărcabile         │
│ - Declarație conformitate                                   │
│ - Manual instrucțiuni                                       │
│ - Fișă tehnică                                              │
│ - Desen tehnic                                              │
├─────────────────────────────────────────────────────────────┤
│ ACCESORII RECOMANDATE: Carousel produse conexe              │
├─────────────────────────────────────────────────────────────┤
│ LINK PRODUCĂTOR: Vezi pe site-ul RM Gastro →                │
└─────────────────────────────────────────────────────────────┘
```

## Câmpuri Tehnice Standard (toate produsele)
- Cod SAP
- Dimensiuni nete/brute (L x l x h mm)
- Greutate netă/brută (kg)
- Tip dispozitiv (Electric / Gaz)
- Putere (kW)
- Alimentare (400V / 3N - 50Hz)
- Material (AISI 304)

## Câmpuri Variabile per Tip Produs
**Friteuză:** Volum bazin, Dimensiuni bazin, Nr. coșuri, Raport putere/volum
**Blast Chiller:** Refrigerant, Cicluri, Capacitate GN, HACCP, USB
**Cuptor Pizza:** Capacitate pizza, Grosime piatră, Nr. camere
**Mașină Gătit:** Nr. arzătoare, Putere arzător, Tip aprindere

---

# ════════════════════════════════════════════════════════════════════════════════
# 7. SISTEM B2B PARTENERI
# ════════════════════════════════════════════════════════════════════════════════

## Funcționalități B2B (planificate)
1. **Autentificare** - Login/Register pentru parteneri
2. **Dashboard partener** - Vedere prețuri cu discount
3. **Discounturi unice** - Per partener, per categorie, per brand
4. **Istoric cereri** - Toate ofertele solicitate
5. **Credit** - Limită credit și termeni plată (opțional)

## Tipuri Discount
- **Aplicabilitate:** All / Brand specific / Categorie / Produs individual
- **Tip:** Procent (%) sau Sumă fixă (EUR)
- **Condiții:** Cantitate minimă, Valoare minimă comandă
- **Valabilitate:** Date start/end

## Workflow Aprobare Partener
1. Partener se înregistrează
2. Admin primește notificare
3. Admin verifică și aprobă
4. Partener primește acces la prețuri speciale

---

# ════════════════════════════════════════════════════════════════════════════════
# 8. CREDENȚIALE & SERVICII
# ════════════════════════════════════════════════════════════════════════════════

## ⚠️ IMPORTANT: Păstrează aceste credențiale în siguranță!

### SUPABASE (Database + Auth)
```
NEXT_PUBLIC_SUPABASE_URL=https://flfgcuwjpnnrcijqzul.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_Kz8T7wSPb4DvwiXMizbjmw_RsYAe1df
```

### CLOUDINARY (Imagini)
```
CLOUDINARY_CLOUD_NAME=dnigtxeaz
CLOUDINARY_API_KEY=839643136492595
CLOUDINARY_API_SECRET=ArJweSyDV9UZW23Lm2ComnNIArU
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dnigtxeaz
```

### MEILISEARCH (Search) - Trial 14 zile
```
MEILISEARCH_HOST=https://ms-3640146ac207-38455.fra.meilisearch.io
MEILISEARCH_API_KEY=ebef31eb77d24db176c91d23f4836c9bec571930
```

### Notă Meilisearch
- Trial expiră în 14 zile
- Alternativă: Supabase full-text search (gratuit, deja configurat)
- Opțional: Self-host Meilisearch pe Railway/Render (gratuit)

---

# ════════════════════════════════════════════════════════════════════════════════
# 9. FIȘIERE CREATE
# ════════════════════════════════════════════════════════════════════════════════

## Schema TypeScript
- `types/index.ts` - Toate tipurile (Brand, Category, Product, User, Quote, etc.)
- `types/constants.ts` - Dicționar traduceri, iconuri, configurări

## Schema Database
- `database/schema.sql` - SQL complet pentru Supabase (15 tabele + RLS + triggers)

## Configurare
- `.env.local` - Toate credențialele grupate

## Mockup Design
- `xeh-apple-crimson-mockup.html` - Preview vizual al designului ales

---

# ════════════════════════════════════════════════════════════════════════════════
# 10. STATUS ACTUAL
# ════════════════════════════════════════════════════════════════════════════════

## Ce e GATA ✅
- [x] Design ales și confirmat (Apple + Crimson)
- [x] Tech stack confirmat
- [x] Cont Supabase creat
- [x] Schema SQL rulată în Supabase (tabele create)
- [x] Cont Cloudinary creat
- [x] Cont Meilisearch creat
- [x] Schema TypeScript completă
- [x] Credențiale salvate
- [x] Mockup design creat

## Ce urmează ⏳
- [ ] Script scraping pentru test (câteva produse)
- [ ] Validare scraping funcționează
- [ ] Scraping complet (toate produsele)
- [ ] Upload imagini în Cloudinary
- [ ] Import date în Supabase
- [ ] Componente frontend Next.js
- [ ] Sistem cerere ofertă
- [ ] Sistem B2B parteneri

---

# ════════════════════════════════════════════════════════════════════════════════
# 11. PAȘI URMĂTORI (ÎN ORDINE)
# ════════════════════════════════════════════════════════════════════════════════

## FAZA 1: Scraping Test (acum)
1. Creez script scraping pentru TEST
2. Testăm pe 1 categorie RM + 1 categorie REDFOX
3. ~5-10 produse per categorie
4. Verificăm: categorii, produse, prețuri, imagini, specificații

## FAZA 2: Validare și Ajustări
1. Verificăm datele extrase
2. Ajustăm scraper-ul dacă e nevoie
3. Testăm upload în Cloudinary
4. Testăm insert în Supabase

## FAZA 3: Scraping Complet
1. Rulăm scraper pe TOATE categoriile
2. ~1500-2000 produse estimate
3. Timp estimat: 30-60 minute

## FAZA 4: Frontend
1. Componente UI (Header, Footer, ProductCard, etc.)
2. Pagini (Homepage, Categorii, Produs, Contact)
3. Formular cerere ofertă
4. Search integrat

## FAZA 5: B2B (după lansare inițială)
1. Sistem autentificare parteneri
2. Dashboard partener
3. Sistem discounturi

---

# ════════════════════════════════════════════════════════════════════════════════
# 12. INSTRUCȚIUNI PENTRU CONVERSAȚIE NOUĂ
# ════════════════════════════════════════════════════════════════════════════════

## Când începi conversația nouă, dă-mi acest document și spune:

```
Continuăm proiectul XEH.ro. Ți-am atașat documentul master cu toate detaliile.

STATUS: Am terminat setup-ul (Supabase, Cloudinary, Meilisearch, schema TypeScript).

URMĂTORUL PAS: Creează scriptul de scraping pentru TEST pe câteva categorii/produse.

Strategia:
1. Test pe 1 categorie RM (ex: Friteuze) - 3 produse
2. Test pe 1 categorie REDFOX (ex: Pizza ovens) - 3 produse
3. Verificăm că totul merge: scraping → Cloudinary → Supabase
4. După validare, rulăm pe tot catalogul
```

## Ce voi face în conversația nouă:
1. Citesc documentul master
2. Creez script de scraping pentru test
3. Îți dau instrucțiuni pas cu pas pentru rulare
4. Validăm împreună rezultatele
5. Continuăm cu scraping complet

---

# ════════════════════════════════════════════════════════════════════════════════
# FINAL DOCUMENT
# ════════════════════════════════════════════════════════════════════════════════

Acest document conține TOATE informațiile necesare pentru a continua proiectul
fără a pierde context. Salvează-l și atașează-l în conversația nouă.

Liviu - XEH.ro - Ianuarie 2026
