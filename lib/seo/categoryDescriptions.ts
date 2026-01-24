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

  // ============================================================
  // FRIGIDERE ȘI CONGELATOARE
  // ============================================================
  'chladnicky-a-mraznicky': {
    title: 'Frigidere și Congelatoare Profesionale',
    description: 'Frigidere și congelatoare profesionale pentru bucătării comerciale. Modele verticale și orizontale, cu uși pline sau de sticlă, capacități de la 200L la 1400L. Conformitate HACCP garantată.',
    keywords: ['frigider profesional', 'congelator industrial', 'frigider restaurant', 'congelator horeca'],
  },

  'chladici-stoly': {
    title: 'Mese Refrigerate Profesionale',
    description: 'Mese refrigerate pentru preparare și depozitare simultană. Blat inox rezistent, compartimente GN, temperaturi între 0°C și +8°C. Ideale pentru pizza, saladbar și preparare rece.',
    keywords: ['masa refrigerata', 'masa frigorifica', 'masa preparare pizza', 'blat refrigerat'],
  },

  // ============================================================
  // GRĂTARE ȘI PLITE
  // ============================================================
  'grily': {
    title: 'Grătare Profesionale',
    description: 'Grătare profesionale pentru restaurante și steakhouse-uri. Grătare pe cărbuni, gaz sau electrice, cu suprafețe netede sau striate. Temperaturi înalte pentru gust autentic.',
    keywords: ['gratar profesional', 'gratar restaurant', 'gratar gaz', 'gratar electric'],
  },

  'grilovaci-plochy': {
    title: 'Plite și Grilluri Profesionale',
    description: 'Plite profesionale pentru bucătării comerciale - modele netede și striate. Suprafețe de gătit de la 400mm la 1200mm, încălzire uniformă și curățare ușoară.',
    keywords: ['plita profesionala', 'plita gaz', 'grill profesional', 'fry top'],
  },

  // ============================================================
  // FRITEUZE
  // ============================================================
  'fritezy': {
    title: 'Friteuze Profesionale',
    description: 'Friteuze profesionale cu capacități de 6L până la 40L. Modele electrice și pe gaz, cu zone reci pentru sedimente, termostat de siguranță și coșuri multiple pentru eficiență maximă.',
    keywords: ['friteuza profesionala', 'friteuza restaurant', 'friteuza gaz', 'friteuza electrica'],
  },

  // ============================================================
  // MAȘINI DE GHEAȚĂ
  // ============================================================
  'vyrobnik-ledu': {
    title: 'Mașini de Gheață Profesionale',
    description: 'Mașini de gheață pentru baruri, restaurante și hoteluri. Producție de la 20kg la 500kg/zi, cuburi, cubulețe sau gheață granulată. Rezervoare integrate sau separate.',
    keywords: ['masina gheata', 'producator gheata', 'cuburi gheata', 'ice maker profesional'],
  },

  // ============================================================
  // BĂUTURI
  // ============================================================
  'napojove-chlazeni': {
    title: 'Răcitoare de Băuturi',
    description: 'Răcitoare și vitrine pentru băuturi. Frigidere verticale cu uși de sticlă, vitrine pentru bar și minifrigidere compacte. Prezentare atractivă și răcire rapidă.',
    keywords: ['racitor bauturi', 'vitrina bauturi', 'frigider bauturi', 'cooler bar'],
  },

  // ============================================================
  // HOTE ȘI VENTILAȚIE
  // ============================================================
  'odsavace': {
    title: 'Hote și Sisteme de Ventilație',
    description: 'Hote profesionale și sisteme de ventilație pentru bucătării comerciale. Hote de perete, insulă sau compensare, cu filtre lavabile și iluminare integrată. Conformitate cu normele de siguranță.',
    keywords: ['hota profesionala', 'ventilatie bucatarie', 'hota restaurant', 'hota inox'],
  },

  // ============================================================
  // CHIUVETE ȘI MOBILIER INOX
  // ============================================================
  'drezy,-pracovni-stoly': {
    title: 'Chiuvete și Mese de Lucru Inox',
    description: 'Chiuvete profesionale și mese de lucru din inox pentru bucătării comerciale. Chiuvete cu 1-3 cuve, mese de preparare cu sau fără spălător, rafturi și dulapuri de depozitare.',
    keywords: ['chiuveta inox', 'masa lucru inox', 'mobiler bucatarie profesionala', 'chiuveta profesionala'],
  },

  // ============================================================
  // ÎNCĂLZITOARE ȘI MENȚINERE CALDĂ
  // ============================================================
  'ohrivace': {
    title: 'Încălzitoare și Menținere la Cald',
    description: 'Echipamente pentru menținerea alimentelor la temperatura optimă de servire. Căzi bain-marie, lămpi cu infraroșu, încălzitoare pentru farfurii și vitrine calde.',
    keywords: ['bain marie', 'incalzitor alimente', 'mentinere cald', 'vitrina calda'],
  },

  // ============================================================
  // TOASTERE ȘI SANDWICH
  // ============================================================
  'toastery': {
    title: 'Toastere și Sandwich Makere Profesionale',
    description: 'Toastere și sandwich makere pentru restaurante și fast-food. Modele cu plăci netede sau striate, simplex sau duplex, cu presiune reglabilă pentru rezultate perfecte.',
    keywords: ['toaster profesional', 'sandwich maker', 'panini grill', 'toaster restaurant'],
  },

  // ============================================================
  // MIXERE ȘI BLENDERE
  // ============================================================
  'mixery': {
    title: 'Mixere și Blendere Profesionale',
    description: 'Mixere de mână și blendere profesionale pentru bucătării comerciale. Motoare puternice, lame din inox și controlul vitezei pentru sosuri, supe și piureuri perfecte.',
    keywords: ['mixer profesional', 'blender bar', 'mixer mana', 'blender smoothie'],
  },

  // ============================================================
  // CÂNTARE
  // ============================================================
  'vahy': {
    title: 'Cântare Profesionale',
    description: 'Cântare de bucătărie profesionale cu precizie ridicată. Modele de masă și de podea, capacități de la 5kg la 300kg, display digital și funcții de tarare.',
    keywords: ['cantar profesional', 'cantar bucatarie', 'cantar digital', 'cantar alimentar'],
  },

  // ============================================================
  // TERMOS ȘI CATERING
  // ============================================================
  'termosy-a-prepravni-obaly': {
    title: 'Termos și Containere Transport',
    description: 'Termocontainere și recipiente izolate pentru transport alimente. Menținerea temperaturii pentru catering și livrări, capacități de la 10L la 100L, compatibilitate GN.',
    keywords: ['termocontainer', 'termos catering', 'transport alimente', 'recipient izolat'],
  },

  // ============================================================
  // TĂVI GASTRONORM
  // ============================================================
  'gastronadoby': {
    title: 'Tăvi și Recipiente Gastronorm',
    description: 'Tăvi și recipiente gastronorm (GN) din inox sau policarbonat. Toate dimensiunile standard de la GN 1/9 la GN 2/1, cu adâncimi variabile. Capace și accesorii incluse.',
    keywords: ['tavi gastronorm', 'recipiente gn', 'gastronorm inox', 'tavi horeca'],
  },

  // ============================================================
  // ACCESORII BUCĂTĂRIE
  // ============================================================
  'prislusenstvi': {
    title: 'Accesorii Bucătărie Profesională',
    description: 'Accesorii și ustensile pentru bucătării profesionale. Cuțite, tocătoare, spatule, vase și instrumente esențiale pentru preparare și servire.',
    keywords: ['accesorii bucatarie', 'ustensile profesionale', 'cutite chef', 'vase bucatarie'],
  },

  // ============================================================
  // EXPUNERE ȘI VITRINE
  // ============================================================
  'vitriny': {
    title: 'Vitrine de Expunere',
    description: 'Vitrine de expunere pentru patiserie, cofetărie și bufete. Modele refrigerate sau neutre, cu iluminare LED și design atractiv pentru prezentarea produselor.',
    keywords: ['vitrina patiserie', 'vitrina expunere', 'vitrina cofetarie', 'vitrina bufet'],
  },

  // ============================================================
  // ECHIPAMENTE PATISERIE
  // ============================================================
  'patisserie': {
    title: 'Echipamente pentru Patiserie',
    description: 'Echipamente profesionale pentru patiserie și cofetărie. Cuptoare pentru patiserie, malaxoare pentru aluat, temperatoare ciocolată și mașini de înghețată.',
    keywords: ['echipamente patiserie', 'cuptor patiserie', 'malaxor aluat', 'masina inghetata'],
  },

  // ============================================================
  // MAȘINI CAFEA
  // ============================================================
  'kavovary': {
    title: 'Mașini de Cafea Profesionale',
    description: 'Mașini espresso profesionale pentru cafenele și restaurante. Modele automate și semi-automate, grupuri multiple, presiune optimă și spumare lapte pentru cafea de specialitate.',
    keywords: ['masina cafea profesionala', 'espressor profesional', 'masina espresso', 'cafea specialitate'],
  },

  // ============================================================
  // CĂRUCIOARE ȘI TRANSPORT
  // ============================================================
  'vozy': {
    title: 'Cărucioare și Transport Intern',
    description: 'Cărucioare pentru transport intern în bucătărie și restaurant. Modele pentru tăvi GN, farfurii, băuturi și rufe. Roți pivotante și frâne pentru manevrare ușoară.',
    keywords: ['carucior bucatarie', 'carucior transport', 'carucior tavi', 'carucior horeca'],
  },

  // ============================================================
  // SPĂLĂTORIE
  // ============================================================
  'prani': {
    title: 'Echipamente Spălătorie Profesională',
    description: 'Echipamente pentru spălătorie profesională - mașini de spălat rufe industriale, uscătoare și sisteme de călcat. Capacități mari și eficiență energetică pentru hoteluri.',
    keywords: ['masina spalat industriala', 'uscator profesional', 'spalatorie hotel', 'echipamente spalatorie'],
  },

  // ============================================================
  // ROBOTI BUCĂTĂRIE
  // ============================================================
  'kuchynske-roboty': {
    title: 'Roboți de Bucătărie Profesionali',
    description: 'Roboți de bucătărie multifuncționali pentru preparare rapidă. Funcții de mărunțire, amestecare, frământare și feliere. Motoare puternice și accesorii multiple.',
    keywords: ['robot bucatarie', 'food processor', 'robot multifunctional', 'robot preparare'],
  },

  // ============================================================
  // FELIATOARE
  // ============================================================
  'krajece': {
    title: 'Feliatoare Profesionale',
    description: 'Feliatoare profesionale pentru mezeluri, brânzeturi și legume. Lame din inox cu ascuțire integrată, grosime reglabilă și protecții de siguranță.',
    keywords: ['feliator profesional', 'feliator mezeluri', 'feliator electric', 'slicer restaurant'],
  },

  // ============================================================
  // ELECTRICE MICI
  // ============================================================
  'male-elektro': {
    title: 'Electrocasnice Mici Profesionale',
    description: 'Electrocasnice mici pentru bucătării profesionale. Aparate compacte pentru preparare rapidă - fierbătoare, prăjitoare, mixere de mână și alte utilități esențiale.',
    keywords: ['electrocasnice profesionale', 'fierbator profesional', 'aparate mici horeca'],
  },

  // ============================================================
  // ROMANIAN SLUGS (path_ro versions)
  // ============================================================
  'cuptoare-cu-convectie': {
    title: 'Cuptoare cu Convecție Profesionale',
    description: 'Cuptoare cu convecție profesionale pentru restaurante și bucătării comerciale. Distribuție uniformă a căldurii pentru rezultate perfecte în patiserie, panificație și gătit. Modele cu control digital, multiple niveluri și funcții avansate.',
    keywords: ['cuptor convectie', 'cuptor profesional', 'cuptor restaurant', 'cuptor patiserie'],
  },

  'sistem-de-racire': {
    title: 'Sisteme de Răcire Profesionale',
    description: 'Sisteme complete de refrigerare pentru bucătării profesionale. Frigidere și congelatoare industriale, vitrine frigorifice, mese refrigerate și blast chillere. Conformitate HACCP și eficiență energetică pentru HoReCa.',
    keywords: ['frigider industrial', 'congelator profesional', 'refrigerare horeca', 'blast chiller'],
  },

  'racitoare-rapide': {
    title: 'Răcitoare Rapide - Blast Chiller',
    description: 'Răcitoare rapide (blast chiller) și congelatoare rapide (shock freezer) pentru răcirea alimentelor conform normelor HACCP. Răcire de la +90°C la +3°C în minute pentru siguranță alimentară maximă.',
    keywords: ['blast chiller', 'racitor rapid', 'shock freezer', 'racire rapida haccp'],
  },

  'masini-de-spalat-vase': {
    title: 'Mașini de Spălat Vase Profesionale',
    description: 'Mașini de spălat vase și pahare profesionale pentru restaurante. Modele front-loading, hood-type și tunnel pentru volume diferite. Cicluri scurte de 2-3 minute, temperatură de igienizare 82°C, consum redus.',
    keywords: ['masina spalat vase profesionala', 'dishwasher industrial', 'glasswasher', 'spalatorie horeca'],
  },

  'frigidere-si-congelatoare': {
    title: 'Frigidere și Congelatoare Industriale',
    description: 'Frigidere și congelatoare profesionale pentru bucătării comerciale. Modele verticale și orizontale, cu uși pline sau de sticlă, capacități de la 200L la 1400L. Conformitate HACCP garantată.',
    keywords: ['frigider profesional', 'congelator industrial', 'frigider restaurant', 'congelator horeca'],
  },

  'gratare': {
    title: 'Grătare Profesionale',
    description: 'Grătare profesionale pentru restaurante și steakhouse-uri. Grătare pe cărbuni, gaz sau electrice, cu suprafețe netede sau striate. Temperaturi înalte pentru gust autentic.',
    keywords: ['gratar profesional', 'gratar restaurant', 'gratar gaz', 'gratar electric'],
  },

  'friteuze': {
    title: 'Friteuze Profesionale',
    description: 'Friteuze profesionale cu capacități de 6L până la 40L. Modele electrice și pe gaz, cu zone reci pentru sedimente, termostat de siguranță și coșuri multiple pentru eficiență maximă.',
    keywords: ['friteuza profesionala', 'friteuza restaurant', 'friteuza gaz', 'friteuza electrica'],
  },

  'masini-de-gheata': {
    title: 'Mașini de Gheață Profesionale',
    description: 'Mașini de gheață pentru baruri, restaurante și hoteluri. Producție de la 20kg la 500kg/zi, cuburi, cubulețe sau gheață granulată. Rezervoare integrate sau separate.',
    keywords: ['masina gheata', 'producator gheata', 'cuburi gheata', 'ice maker profesional'],
  },

  'hote-si-ventilatie': {
    title: 'Hote și Sisteme de Ventilație',
    description: 'Hote profesionale și sisteme de ventilație pentru bucătării comerciale. Hote de perete, insulă sau compensare, cu filtre lavabile și iluminare integrată. Conformitate cu normele de siguranță.',
    keywords: ['hota profesionala', 'ventilatie bucatarie', 'hota restaurant', 'hota inox'],
  },

  'mese-de-lucru': {
    title: 'Mese de Lucru din Inox',
    description: 'Mese de lucru profesionale din inox pentru bucătării comerciale. Suprafețe rezistente la coroziune, design modular, cu sau fără polițe inferioare. Dimensiuni personalizabile.',
    keywords: ['masa lucru inox', 'masa profesionala', 'masa preparare', 'mobiler inox'],
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
