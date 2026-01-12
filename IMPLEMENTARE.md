# 🚀 Instrucțiuni Implementare XEH.ro - Dual Brand System

## Fișiere Incluse

```
xeh-ro-update/
└── src/
    ├── types/
    │   └── index.ts          ← Tipuri TypeScript noi (Brand, Product, Category)
    └── data/
        ├── brands.ts         ← Definiții branduri RM și REDFOX
        ├── categories.ts     ← Categorii complete cu denumiri RO (SEO)
        └── products.ts       ← 5 produse de test cu prețuri EUR
```

## Cum să Implementezi

### Pasul 1: Actualizează proiectul local

```bash
cd ~/HEXro

# Asigură-te că ai ultima versiune
git pull

# Înlocuiește fișierele
cp -r [cale-la-fisiere]/xeh-ro-update/src/types/index.ts src/types/
cp -r [cale-la-fisiere]/xeh-ro-update/src/data/*.ts src/data/
```

### Pasul 2: Creează paginile noi cu Claude Code

Deschide Warp Terminal și dă comanda:

```bash
cd ~/HEXro
claude
```

Apoi dă-i instrucțiunile:

```
Actualizează site-ul XEH.ro să suporte cele 2 branduri folosind noile fișiere din src/types și src/data.

Creează următoarele pagini:

1. app/branduri/page.tsx - pagină cu carduri pentru cele 2 branduri (RM și REDFOX)

2. app/branduri/[slug]/page.tsx - pagină individuală brand cu:
   - Logo și descriere brand
   - Grid categorii principale ale brandului
   - Culoare accent diferită per brand

3. app/branduri/[slug]/[category]/page.tsx - pagină categorie cu:
   - Breadcrumbs
   - Lista produse din categorie
   - Filtrare pe linie (600/700/900) unde e cazul

4. app/produse/[slug]/page.tsx - actualizează pagina produs să afișeze:
   - Badge brand (RM/REDFOX)
   - Preț în format "X.XX EUR (fără TVA)"
   - Specificații tehnice în tabel
   - Buton "Cere Ofertă"

5. Actualizează components/Header.tsx:
   - Adaugă dropdown "Branduri" cu RM și REDFOX

6. Actualizează app/page.tsx (homepage):
   - Secțiune "Alege Brandul" cu 2 carduri mari
   - Produse noi (isNew: true)
   - Categorii populare

Păstrează schema de culori Crimson Elite existentă.
RM folosește #1a1a1a (negru), REDFOX folosește #DC143C (crimson).
```

### Pasul 3: Testează local

```bash
npm run dev
```

Verifică:
- http://localhost:3000 - Homepage
- http://localhost:3000/branduri - Pagina branduri
- http://localhost:3000/branduri/redfox - Pagina REDFOX
- http://localhost:3000/produse/plita-electrica-2-zone-redfox-sp-30-el - Produs test

### Pasul 4: Publică

```bash
git add .
git commit -m "Add dual brand system RM + REDFOX with test products"
git push
```

Vercel va face deploy automat.

---

## 📋 Rezumat Produse de Test

| # | Brand | Model | Denumire | Preț EUR |
|---|-------|-------|----------|----------|
| 1 | REDFOX | SP 30 EL | Plită Electrică 2 Zone | 480.00 |
| 2 | REDFOX | K FE A | Coș Friteuză 8L | 50.00 |
| 3 | REDFOX | PD 2020 R | Grătar Contact Panini | 320.00 |
| 4 | RM | FE 74 E | Friteuză Electrică 15L | 1,250.00 |
| 5 | RM | MPD 0511 ER | Cuptor Convecție 5xGN 1/1 | 4,850.00 |

---

## 📁 Categorii Principale per Brand

### RM (Premium)
1. Linia RM 700
2. Roboți și Preparare
3. Program Pizza
4. Cuptoare Convecție
5. Abatitoare
6. Refrigerare
7. Spălare
8. Distribuție și Bufete

### REDFOX (Economic)
1. Linia REDFOX 600
2. Linia REDFOX 700
3. Linia REDFOX 900
4. Echipamente de Masă
5. Program Pizza
6. Cuptoare Convecție
7. Refrigerare
8. Spălare
9. Mobilier Inox
10. Bar și Cafenea
11. Distribuție
12. Preparare

---

## ⚠️ Note Importante

1. **Prețuri**: Sunt în EUR fără TVA (format catalog B2B)
2. **Imagini**: Momentan sunt placeholder - ulterior le vom descărca de pe site
3. **SKU-uri**: Sunt cele reale de la RM Gastro
4. **Descrieri**: Traduse și optimizate pentru SEO în română

---

## 🔜 Pași Următori

1. **Scraping complet** - Script pentru extragerea tuturor produselor
2. **Descărcare imagini** - Script pentru imaginile produselor
3. **Traducere automată** - Batch traducere descrieri
4. **Import în bază de date** - Migrare de la fișiere statice
