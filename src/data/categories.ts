import { Category } from '@/types'

export const categories: Category[] = [
  {
    id: '1',
    slug: 'linii-de-gatit',
    name: 'Linii de Gătit',
    description: 'Linii de gătit profesionale modulare pentru bucătării HoReCa. Configurații personalizabile pentru orice tip de bucătărie profesională.',
    image: '/images/categories/cooking-lines.jpg',
    productCount: 24,
  },
  {
    id: '2',
    slug: 'cuptoare-profesionale',
    name: 'Cuptoare Profesionale',
    description: 'Cuptoare convecție, cuptoare combi, cuptoare cu microunde profesionale. Tehnologie avansată pentru gătit uniform și eficient.',
    image: '/images/categories/ovens.jpg',
    productCount: 36,
  },
  {
    id: '3',
    slug: 'echipamente-gatit',
    name: 'Echipamente Gătit',
    description: 'Friteuze profesionale, grătare, plite electrice și pe gaz. Echipamente esențiale pentru prepararea alimentelor.',
    image: '/images/categories/cooking-equipment.jpg',
    productCount: 48,
  },
  {
    id: '4',
    slug: 'refrigerare',
    name: 'Refrigerare',
    description: 'Vitrine frigorifice, frigidere și congelatoare profesionale. Soluții complete de refrigerare pentru HoReCa.',
    image: '/images/categories/refrigeration.jpg',
    productCount: 52,
  },
  {
    id: '5',
    slug: 'spalare',
    name: 'Spălare',
    description: 'Mașini de spălat vase profesionale cu capace de spălare și sisteme de uscare. Eficiență maximă pentru restaurante.',
    image: '/images/categories/dishwashing.jpg',
    productCount: 18,
  },
  {
    id: '6',
    slug: 'mobilier-inox',
    name: 'Mobilier Inox',
    description: 'Mese de lucru, rafturi, dulapuri și cărucioare din oțel inoxidabil. Mobilier durabil și igenic pentru bucătării.',
    image: '/images/categories/stainless-steel.jpg',
    productCount: 64,
  },
  {
    id: '7',
    slug: 'preparare-alimente',
    name: 'Preparare Alimente',
    description: 'Mixere, blendere, roboți de bucătărie, feliatoare. Echipamente profesionale pentru prepararea alimentelor.',
    image: '/images/categories/food-preparation.jpg',
    productCount: 42,
  },
  {
    id: '8',
    slug: 'pizzerie',
    name: 'Pizzerie',
    description: 'Cuptoare pentru pizza, mese de lucru refrigerate, echipamente specializate pentru pizzerii profesionale.',
    image: '/images/categories/pizzeria.jpg',
    productCount: 22,
  },
  {
    id: '9',
    slug: 'bar-cafenea',
    name: 'Bar & Cafenea',
    description: 'Mașini de gheață, blendere, espressoare profesionale. Tot ce ai nevoie pentru bar și cafenea.',
    image: '/images/categories/bar-cafe.jpg',
    productCount: 38,
  },
  {
    id: '10',
    slug: 'distributie-alimente',
    name: 'Distribuție Alimente',
    description: 'Bain-marie, drop-in, linii self-service. Echipamente pentru servirea și distribuția alimentelor calde și reci.',
    image: '/images/categories/food-distribution.jpg',
    productCount: 28,
  },
  {
    id: '11',
    slug: 'patiserie-brutarie',
    name: 'Patiserie & Brutărie',
    description: 'Cuptoare de patiserie, dospitoare, mixere planetare. Echipamente profesionale pentru patiserii și brutării.',
    image: '/images/categories/bakery.jpg',
    productCount: 34,
  },
  {
    id: '12',
    slug: 'ventilatie',
    name: 'Ventilație',
    description: 'Hote profesionale, sisteme de ventilație și purificare aer. Soluții complete pentru aerisirea bucătăriilor.',
    image: '/images/categories/ventilation.jpg',
    productCount: 16,
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug)
}

export function getAllCategories(): Category[] {
  return categories
}

export function getRootCategories(): Category[] {
  return categories.filter((cat) => !cat.parentSlug)
}

export function getRootCategoriesByBrand(brandSlug: string): Category[] {
  // Returns root categories that have products from this brand
  // For now, return all root categories as both brands have products in all categories
  return categories.filter((cat) => !cat.parentSlug)
}
