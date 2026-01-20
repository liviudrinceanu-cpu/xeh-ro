/**
 * SEO descriptions for product categories
 * Mapped by category slug (path segment after brand)
 *
 * Format: slug -> { title, description, keywords }
 */

export interface CategorySeoData {
  title?: string
  description: string
  keywords?: string[]
}

// Map category slugs to SEO descriptions
// These slugs match the path segments (e.g., /rm/konvektomaty -> konvektomaty)
export const categoryDescriptions: Record<string, CategorySeoData> = {
  // ============================================================
  // CUPTOARE / CONVECTION OVENS
  // ============================================================
  'konvektomaty': {
    title: 'Cuptoare cu Convecție Profesionale',
    description: 'Cuptoare cu convecție profesionale pentru restaurante și bucătării comerciale. Distribuție uniformă a căldurii pentru rezultate perfecte în patiserie, panificație și gătit. Modele cu control digital, multiple niveluri și funcții avansate.',
    keywords: ['cuptor convectie', 'cuptor profesional', 'cuptor restaurant', 'cuptor patiserie'],
  },

  // ============================================================
  // REFRIGERARE / COOLING
  // ============================================================
  'chlazeni': {
    title: 'Echipamente de Refrigerare Profesională',
    description: 'Sisteme complete de refrigerare pentru bucătării profesionale. Frigidere și congelatoare industriale, vitrine frigorifice, mese refrigerate și blast chillere. Conformitate HACCP și eficiență energetică pentru HoReCa.',
    keywords: ['frigider industrial', 'congelator profesional', 'refrigerare horeca', 'blast chiller'],
  },

  'sokery': {
    title: 'Răcitoare Rapide - Blast Chiller',
    description: 'Răcitoare rapide (blast chiller) și congelatoare rapide (shock freezer) pentru răcirea alimentelor conform normelor HACCP. Răcire de la +90°C la +3°C în minute pentru siguranță alimentară maximă.',
    keywords: ['blast chiller', 'racitor rapid', 'shock freezer', 'racire rapida haccp'],
  },

  // ============================================================
  // SPĂLARE / WASHING
  // ============================================================
  'myti': {
    title: 'Mașini de Spălat Vase Profesionale',
    description: 'Mașini de spălat vase și pahare profesionale pentru restaurante. Modele front-loading, hood-type și tunnel pentru volume diferite. Cicluri scurte de 2-3 minute, temperatură de igienizare 82°C, consum redus.',
    keywords: ['masina spalat vase profesionala', 'dishwasher industrial', 'glasswasher', 'spalatorie horeca'],
  },

  // ============================================================
  // LINII DE GĂTIT / COOKING LINES
  // ============================================================
  'rm-700': {
    title: 'Linia RM 700 - Echipamente Modulare Premium',
    description: 'Seria RM 700 - echipamente modulare de gătit premium cu lățime 700mm. Plite, grătare, friteuze, marmite și cuptoare integrate pentru bucătării profesionale de înaltă capacitate.',
    keywords: ['rm 700', 'linie gatit modulara', 'echipamente bucatarie profesionala'],
  },

  'redfox-600': {
    title: 'Linia REDFOX 600 - Echipamente Modulare Economice',
    description: 'Seria REDFOX 600 - echipamente modulare economice cu lățime 600mm. Soluții complete de gătit pentru restaurante mici și mijlocii. Raport calitate-preț excelent.',
    keywords: ['redfox 600', 'linie gatit economica', 'echipamente restaurant'],
  },

  // ============================================================
  // PIZZA
  // ============================================================
  'pizza-program': {
    title: 'Program Pizza - Echipamente pentru Pizzerii',
    description: 'Echipamente complete pentru pizzerii profesionale: cuptoare pizza cu vatră din piatră, mese de preparare refrigerate, suporturi și accesorii. Temperaturi până la 500°C pentru pizza autentică.',
    keywords: ['cuptor pizza', 'echipamente pizzerie', 'masa preparare pizza', 'cuptor pizza profesional'],
  },

  // ============================================================
  // PREPARARE CARNE ȘI LEGUME
  // ============================================================
  'roboty,-priprava-masa-a-zeleniny': {
    title: 'Roboți și Echipamente Preparare',
    description: 'Roboți de bucătărie profesionali și echipamente pentru prepararea cărnii și legumelor. Tocătoare, feliatoare, mixere și procesoare alimentare industriale pentru volume mari.',
    keywords: ['robot bucatarie', 'tocator carne', 'feliator profesional', 'procesor alimente'],
  },

  'priprava-masa-a-zeleniny': {
    title: 'Echipamente Preparare Carne și Legume',
    description: 'Echipamente profesionale pentru prepararea cărnii și legumelor în bucătării comerciale. Tocătoare, feliatoare, mixere și roboți de bucătărie pentru productivitate maximă.',
    keywords: ['preparare carne', 'preparare legume', 'echipamente procesare alimente'],
  },

  // ============================================================
  // SALAMANDRE
  // ============================================================
  'salamandry': {
    title: 'Salamandre Profesionale',
    description: 'Salamandre profesionale pentru gratinare, menținere la cald și finishing rapid. Înălțime reglabilă, încălzire intensă și design compact pentru orice bucătărie profesională.',
    keywords: ['salamandru', 'gratinator', 'salamandra profesionala', 'finishing bucatarie'],
  },

  // ============================================================
  // BUFETE ȘI DISTRIBUȚIE
  // ============================================================
  'bufety,-drop-in,-vitriny,-vydejni-vany-a-vodni-lazne': {
    title: 'Bufete, Vitrine și Distribuție Mese',
    description: 'Echipamente pentru bufete și distribuția meselor: vitrine calde și reci, bain-marie, drop-in-uri și căzi de distribuire. Soluții pentru self-service, catering și hoteluri.',
    keywords: ['vitrina bufet', 'bain marie', 'drop in', 'distributie mese horeca'],
  },

  'distribuce-jidel,-gastronadoby': {
    title: 'Distribuție Mese și Gastronorm',
    description: 'Echipamente pentru distribuția meselor și accesorii gastronorm. Cărucioare de transport, tăvi GN, capace și sisteme de menținere la temperatură pentru catering și hoteluri.',
    keywords: ['gastronorm', 'distributie mese', 'catering equipment', 'tavi gn'],
  },

  // ============================================================
  // DROP-IN
  // ============================================================
  'drop-in---monoblok': {
    title: 'Drop-In Monobloc - Echipamente Integrate',
    description: 'Echipamente drop-in monobloc pentru integrare în linii de servire și bufete. Plite, bain-marie, vitrine și zone calde/reci gata de instalare în bancuri existente.',
    keywords: ['drop in', 'echipamente integrate', 'monobloc bucatarie', 'linie servire'],
  },

  // ============================================================
  // MODULE INDEPENDENTE
  // ============================================================
  'volne-stojici-moduly': {
    title: 'Module Independente de Gătit',
    description: 'Echipamente de gătit independente, fără necesitatea integrării în linii modulare. Plite, grătare și friteuze de sine stătătoare pentru flexibilitate maximă în amenajarea bucătăriei.',
    keywords: ['echipamente independente', 'plita independenta', 'gratar independent'],
  },

  // ============================================================
  // SISTEME DE RAFTURI
  // ============================================================
  'regalovy-system': {
    title: 'Sisteme de Raftare Profesionale',
    description: 'Sisteme de raftare și depozitare pentru bucătării profesionale. Rafturi inox, stative mobile și soluții de organizare pentru depozitare eficientă și conformitate cu normele sanitare.',
    keywords: ['rafturi bucatarie', 'rafturi inox', 'depozitare horeca', 'stative mobile'],
  },

  // ============================================================
  // BAR ȘI CAFEA
  // ============================================================
  'barove-zarizeni,-kavovary': {
    title: 'Echipamente de Bar și Mașini de Cafea',
    description: 'Echipamente complete pentru baruri și cafenele: mașini de cafea profesionale, blendere, mașini de gheață, frigidere pentru băuturi și accesorii bar.',
    keywords: ['echipamente bar', 'masina cafea profesionala', 'blender bar', 'masina gheata'],
  },

  // ============================================================
  // CUPTOARE RAPIDE
  // ============================================================
  'trouby-pro-rychlou-pripravu': {
    title: 'Cuptoare pentru Preparare Rapidă',
    description: 'Cuptoare high-speed pentru preparare ultrarapidă. Tehnologie combinată microunde, convecție și infraroșu pentru gătire în secunde. Ideale pentru fast-food și cafenele.',
    keywords: ['cuptor rapid', 'high speed oven', 'cuptor microunde profesional', 'cuptor fast food'],
  },
}

/**
 * Get SEO data for a category based on its path
 * @param categoryPath Full category path (e.g., /Group/rm/konvektomaty)
 * @returns CategorySeoData or undefined if not found
 */
export function getCategorySeoData(categoryPath: string): CategorySeoData | undefined {
  // Extract the last segment of the path (the actual category slug)
  const segments = categoryPath.split('/').filter(Boolean)
  const slug = segments[segments.length - 1]

  return categoryDescriptions[slug]
}

/**
 * Get SEO description for a category, with fallback to generic description
 * @param categoryPath Full category path
 * @param categoryName Display name of the category
 * @param brandName Brand name
 * @returns SEO description string
 */
export function getCategoryDescription(
  categoryPath: string,
  categoryName: string,
  brandName: string
): string {
  const seoData = getCategorySeoData(categoryPath)

  if (seoData) {
    return seoData.description
  }

  // Fallback generic description
  return `${categoryName} - echipamente profesionale ${brandName} pentru restaurante și bucătării comerciale. Descoperă gama completă de produse HoReCa de la XEH.ro, distribuitor autorizat.`
}

/**
 * Get SEO keywords for a category
 * @param categoryPath Full category path
 * @param categoryName Display name of the category
 * @param brandName Brand name
 * @returns Array of keywords
 */
export function getCategoryKeywords(
  categoryPath: string,
  categoryName: string,
  brandName: string
): string[] {
  const seoData = getCategorySeoData(categoryPath)

  const baseKeywords = [categoryName, brandName, 'echipamente horeca', 'bucatarie profesionala']

  if (seoData?.keywords) {
    return [...seoData.keywords, ...baseKeywords]
  }

  return baseKeywords
}
