// ============================================================
// XEH.ro - CONSTANTE ȘI MAPPING-URI
// ============================================================

import { Brand, Language } from './index';

// ============================================================
// DICȚIONAR CATEGORII EN → RO (SEO-Optimizat)
// ============================================================
// Bazat pe terminologia din industria HoReCa din România
// Surse: maxigel.ro, bilancia.ro, terminology standard
// ============================================================

export const CATEGORY_TRANSLATIONS: Record<string, { ro: string; en: string }> = {
  // ─────────────────────────────────────────────────────────
  // LINII DE GĂTIT - RM 700 / REDFOX 600/700/900
  // ─────────────────────────────────────────────────────────
  'ranges': { ro: 'Mașini de Gătit', en: 'Ranges' },
  'boiling-tops': { ro: 'Mașini de Gătit', en: 'Boiling Tops' },
  'oven-ranges': { ro: 'Mașini de Gătit cu Cuptor', en: 'Oven Ranges' },
  'fry-top-griddles': { ro: 'Plite Fry-Top', en: 'Fry Top Griddles' },
  'griddles': { ro: 'Plite și Grătare Plate', en: 'Griddles' },
  'chargrills': { ro: 'Grătare Profesionale', en: 'Chargrills' },
  'water-grills': { ro: 'Grătare cu Apă', en: 'Water Grills' },
  'lava-stone-grills': { ro: 'Grătare cu Piatră Lavică', en: 'Lava Stone Grills' },
  'fryers': { ro: 'Friteuze Profesionale', en: 'Fryers' },
  'pasta-cookers': { ro: 'Mașini de Fiert Paste', en: 'Pasta Cookers' },
  'bains-marie': { ro: 'Bain-Marie', en: 'Bains Marie' },
  'tilting-bratt-pans': { ro: 'Tigăi Basculante', en: 'Tilting Bratt Pans' },
  'boiling-kettles': { ro: 'Marmite', en: 'Boiling Kettles' },
  'work-tops': { ro: 'Elemente Neutre', en: 'Work Tops' },
  'neutral-elements': { ro: 'Elemente Neutre', en: 'Neutral Elements' },
  'open-pedestals': { ro: 'Baze și Suporturi', en: 'Open Pedestals' },

  // ─────────────────────────────────────────────────────────
  // ALIMENTARE
  // ─────────────────────────────────────────────────────────
  'electric': { ro: 'Electric', en: 'Electric' },
  'gas': { ro: 'Pe Gaz', en: 'Gas' },
  'induction': { ro: 'Cu Inducție', en: 'Induction' },
  'solid-top': { ro: 'Cu Plită Solidă', en: 'Solid Top' },

  // ─────────────────────────────────────────────────────────
  // CUPTOARE
  // ─────────────────────────────────────────────────────────
  'convection-ovens': { ro: 'Cuptoare cu Convecție', en: 'Convection Ovens' },
  'combi-steamers': { ro: 'Combi Steamere', en: 'Combi Steamers' },
  'pizza-ovens': { ro: 'Cuptoare Pizza', en: 'Pizza Ovens' },
  'deck-ovens': { ro: 'Cuptoare cu Vatră', en: 'Deck Ovens' },
  'salamanders': { ro: 'Salamandre', en: 'Salamanders' },

  // ─────────────────────────────────────────────────────────
  // REFRIGERARE
  // ─────────────────────────────────────────────────────────
  'blast-chillers': { ro: 'Abatitoare', en: 'Blast Chillers' },
  'blast-freezers': { ro: 'Congelatoare Rapide', en: 'Blast Freezers' },
  'refrigerators': { ro: 'Frigidere Profesionale', en: 'Refrigerators' },
  'freezers': { ro: 'Congelatoare Profesionale', en: 'Freezers' },
  'cooling-tables': { ro: 'Mese Frigorifice', en: 'Cooling Tables' },
  'cold-rooms': { ro: 'Camere Frigorifice', en: 'Cold Rooms' },
  'display-cases': { ro: 'Vitrine Frigorifice', en: 'Display Cases' },
  'ice-makers': { ro: 'Mașini de Gheață', en: 'Ice Makers' },
  'bottle-coolers': { ro: 'Răcitoare de Sticle', en: 'Bottle Coolers' },

  // ─────────────────────────────────────────────────────────
  // SPĂLARE
  // ─────────────────────────────────────────────────────────
  'dishwashers': { ro: 'Mașini de Spălat Vase', en: 'Dishwashers' },
  'glasswashers': { ro: 'Mașini de Spălat Pahare', en: 'Glasswashers' },
  'pot-washers': { ro: 'Mașini de Spălat Oale', en: 'Pot Washers' },
  'water-softeners': { ro: 'Dedurizatoare Apă', en: 'Water Softeners' },

  // ─────────────────────────────────────────────────────────
  // PREPARARE ALIMENTE
  // ─────────────────────────────────────────────────────────
  'slicers': { ro: 'Feliatoare', en: 'Slicers' },
  'meat-grinders': { ro: 'Mașini de Tocat Carne', en: 'Meat Grinders' },
  'vegetable-cutters': { ro: 'Tăietoare de Legume', en: 'Vegetable Cutters' },
  'food-processors': { ro: 'Roboți de Bucătărie', en: 'Food Processors' },
  'cutters': { ro: 'Cuttere', en: 'Cutters' },
  'potato-peelers': { ro: 'Mașini de Curățat Cartofi', en: 'Potato Peelers' },
  'mixers': { ro: 'Mixere Planetare', en: 'Mixers' },
  'immersion-blenders': { ro: 'Mixere de Mână', en: 'Immersion Blenders' },
  'vacuum-packers': { ro: 'Mașini de Ambalat în Vid', en: 'Vacuum Packers' },

  // ─────────────────────────────────────────────────────────
  // PIZZA PROGRAM
  // ─────────────────────────────────────────────────────────
  'pizza-program': { ro: 'Program Pizza', en: 'Pizza Program' },
  'dough-mixers': { ro: 'Malaxoare pentru Aluat', en: 'Dough Mixers' },
  'dough-sheeters': { ro: 'Laminatoare de Aluat', en: 'Dough Sheeters' },
  'pizza-presses': { ro: 'Prese pentru Pizza', en: 'Pizza Presses' },
  'pizza-tables': { ro: 'Mese pentru Pizza', en: 'Pizza Tables' },

  // ─────────────────────────────────────────────────────────
  // BAR & CAFENEA
  // ─────────────────────────────────────────────────────────
  'coffee-machines': { ro: 'Espressoare', en: 'Coffee Machines' },
  'coffee-grinders': { ro: 'Râșnițe de Cafea', en: 'Coffee Grinders' },
  'blenders': { ro: 'Blendere', en: 'Blenders' },
  'juicers': { ro: 'Storcătoare', en: 'Juicers' },
  'drink-dispensers': { ro: 'Dozatoare de Băuturi', en: 'Drink Dispensers' },
  'beer-coolers': { ro: 'Răcitoare de Bere', en: 'Beer Coolers' },

  // ─────────────────────────────────────────────────────────
  // DISTRIBUȚIE & SERVIRE
  // ─────────────────────────────────────────────────────────
  'drop-in': { ro: 'Drop-In', en: 'Drop-In' },
  'buffet-equipment': { ro: 'Echipamente Bufet', en: 'Buffet Equipment' },
  'food-warmers': { ro: 'Încălzitoare de Alimente', en: 'Food Warmers' },
  'heat-lamps': { ro: 'Lămpi cu Infraroșu', en: 'Heat Lamps' },
  'serving-trolleys': { ro: 'Cărucioare de Servire', en: 'Serving Trolleys' },
  'display-warmers': { ro: 'Vitrine Calde', en: 'Display Warmers' },

  // ─────────────────────────────────────────────────────────
  // MOBILIER INOX
  // ─────────────────────────────────────────────────────────
  'stainless-steel-tables': { ro: 'Mese din Inox', en: 'Stainless Steel Tables' },
  'sinks': { ro: 'Chiuvete Profesionale', en: 'Sinks' },
  'shelving': { ro: 'Rafturi din Inox', en: 'Shelving' },
  'wall-cabinets': { ro: 'Dulapuri de Perete', en: 'Wall Cabinets' },
  'base-cabinets': { ro: 'Dulapuri de Bază', en: 'Base Cabinets' },
  'hoods': { ro: 'Hote Profesionale', en: 'Hoods' },

  // ─────────────────────────────────────────────────────────
  // PATISERIE & BRUTĂRIE
  // ─────────────────────────────────────────────────────────
  'bakery-ovens': { ro: 'Cuptoare de Patiserie', en: 'Bakery Ovens' },
  'proofers': { ro: 'Dospitoare', en: 'Proofers' },
  'bread-slicers': { ro: 'Feliatoare de Pâine', en: 'Bread Slicers' },
  'pastry-equipment': { ro: 'Echipamente Patiserie', en: 'Pastry Equipment' },
};

// ============================================================
// ICONURI LUCIDE PENTRU CATEGORII
// ============================================================

export const CATEGORY_ICONS: Record<string, string> = {
  // Gătit
  'ranges': 'flame',
  'boiling-tops': 'flame',
  'oven-ranges': 'square',
  'fry-top-griddles': 'layout-grid',
  'griddles': 'layout-grid',
  'chargrills': 'flame-kindling',
  'fryers': 'droplets',
  'pasta-cookers': 'soup',
  'bains-marie': 'bath',
  
  // Cuptoare
  'convection-ovens': 'fan',
  'combi-steamers': 'cloud',
  'pizza-ovens': 'pizza',
  'salamanders': 'sun',
  
  // Refrigerare
  'blast-chillers': 'snowflake',
  'refrigerators': 'thermometer-snowflake',
  'freezers': 'thermometer-snowflake',
  'cooling-tables': 'table',
  'ice-makers': 'ice-cream-cone',
  'display-cases': 'square-dashed',
  
  // Spălare
  'dishwashers': 'sparkles',
  'glasswashers': 'wine',
  
  // Preparare
  'slicers': 'slice',
  'meat-grinders': 'beef',
  'vegetable-cutters': 'carrot',
  'food-processors': 'cog',
  'mixers': 'rotate-3d',
  'vacuum-packers': 'package',
  
  // Pizza
  'pizza-program': 'pizza',
  'dough-mixers': 'rotate-3d',
  
  // Bar
  'coffee-machines': 'coffee',
  'blenders': 'blend',
  'ice-makers': 'snowflake',
  
  // Distribuție
  'drop-in': 'layout-dashboard',
  'buffet-equipment': 'utensils',
  'food-warmers': 'thermometer-sun',
  
  // Mobilier
  'stainless-steel-tables': 'table-2',
  'sinks': 'droplet',
  'shelving': 'archive',
  'hoods': 'wind',
};

// ============================================================
// SPECIFICAȚII TEHNICE PER TIP PRODUS
// ============================================================

export const PRODUCT_SPEC_GROUPS = {
  // Specificații comune tuturor
  common: [
    { key: 'sap_code', label: { ro: 'Cod SAP', en: 'SAP Code' } },
    { key: 'net_width', label: { ro: 'Lățime netă', en: 'Net Width' }, unit: 'mm' },
    { key: 'net_depth', label: { ro: 'Adâncime netă', en: 'Net Depth' }, unit: 'mm' },
    { key: 'net_height', label: { ro: 'Înălțime netă', en: 'Net Height' }, unit: 'mm' },
    { key: 'net_weight', label: { ro: 'Greutate netă', en: 'Net Weight' }, unit: 'kg' },
    { key: 'gross_width', label: { ro: 'Lățime brută', en: 'Gross Width' }, unit: 'mm' },
    { key: 'gross_depth', label: { ro: 'Adâncime brută', en: 'Gross Depth' }, unit: 'mm' },
    { key: 'gross_height', label: { ro: 'Înălțime brută', en: 'Gross Height' }, unit: 'mm' },
    { key: 'gross_weight', label: { ro: 'Greutate brută', en: 'Gross Weight' }, unit: 'kg' },
    { key: 'material', label: { ro: 'Material', en: 'Material' } },
  ],

  // Specificații electrice
  electric: [
    { key: 'voltage', label: { ro: 'Tensiune', en: 'Voltage' }, unit: 'V' },
    { key: 'phases', label: { ro: 'Faze', en: 'Phases' } },
    { key: 'frequency', label: { ro: 'Frecvență', en: 'Frequency' }, unit: 'Hz' },
    { key: 'power_electric', label: { ro: 'Putere electrică', en: 'Electric Power' }, unit: 'kW' },
  ],

  // Specificații gaz
  gas: [
    { key: 'gas_type', label: { ro: 'Tip gaz', en: 'Gas Type' } },
    { key: 'power_gas', label: { ro: 'Putere pe gaz', en: 'Gas Power' }, unit: 'kW' },
    { key: 'gas_consumption', label: { ro: 'Consum gaz', en: 'Gas Consumption' } },
  ],

  // Friteuze
  fryer: [
    { key: 'basin_volume', label: { ro: 'Volum bazin', en: 'Basin Volume' }, unit: 'l' },
    { key: 'basin_dimensions', label: { ro: 'Dimensiuni bazin', en: 'Basin Dimensions' } },
    { key: 'heating_location', label: { ro: 'Locație încălzire', en: 'Heating Location' } },
    { key: 'baskets_count', label: { ro: 'Număr coșuri', en: 'Number of Baskets' } },
    { key: 'power_ratio', label: { ro: 'Raport putere/volum', en: 'Power/Volume Ratio' }, unit: 'kW/l' },
    { key: 'drain_type', label: { ro: 'Tip golire', en: 'Drain Type' } },
  ],

  // Blast Chillers
  blast_chiller: [
    { key: 'refrigerant', label: { ro: 'Agent frigorific', en: 'Refrigerant' } },
    { key: 'cooling_capacity', label: { ro: 'Capacitate răcire', en: 'Cooling Capacity' }, unit: 'kg' },
    { key: 'freezing_capacity', label: { ro: 'Capacitate congelare', en: 'Freezing Capacity' }, unit: 'kg' },
    { key: 'gn_capacity', label: { ro: 'Capacitate GN', en: 'GN Capacity' } },
    { key: 'probe_type', label: { ro: 'Tip sondă', en: 'Probe Type' } },
    { key: 'haccp', label: { ro: 'HACCP', en: 'HACCP' } },
    { key: 'usb_port', label: { ro: 'Port USB', en: 'USB Port' } },
  ],

  // Cuptoare Pizza
  pizza_oven: [
    { key: 'pizza_capacity', label: { ro: 'Capacitate pizza', en: 'Pizza Capacity' } },
    { key: 'pizza_diameter', label: { ro: 'Diametru pizza', en: 'Pizza Diameter' }, unit: 'cm' },
    { key: 'chambers', label: { ro: 'Număr camere', en: 'Number of Chambers' } },
    { key: 'stone_type', label: { ro: 'Tip piatră', en: 'Stone Type' } },
    { key: 'stone_thickness', label: { ro: 'Grosime piatră', en: 'Stone Thickness' }, unit: 'mm' },
    { key: 'internal_height', label: { ro: 'Înălțime internă', en: 'Internal Height' }, unit: 'mm' },
  ],

  // Mașini de gătit
  cooking_range: [
    { key: 'burners_count', label: { ro: 'Număr arzătoare', en: 'Number of Burners' } },
    { key: 'burner_power', label: { ro: 'Putere arzător', en: 'Burner Power' }, unit: 'kW' },
    { key: 'ignition_type', label: { ro: 'Tip aprindere', en: 'Ignition Type' } },
    { key: 'oven_capacity', label: { ro: 'Capacitate cuptor', en: 'Oven Capacity' } },
    { key: 'grill_surface', label: { ro: 'Suprafață grill', en: 'Grill Surface' }, unit: 'mm²' },
  ],
};

// ============================================================
// CONFIGURARE BRANDURI
// ============================================================

export const BRAND_CONFIGS = {
  [Brand.RM]: {
    id: Brand.RM,
    name: 'RM Gastro',
    tagline: {
      ro: 'Linia Premium • Performanță Maximă',
      en: 'Premium Line • Maximum Performance',
    },
    color_primary: '#1D1D1F',
    color_secondary: '#86868B',
    source_website: 'https://rm.rmgastro.com',
    source_base_url: 'https://rm.rmgastro.com/Group/rm',
  },
  [Brand.REDFOX]: {
    id: Brand.REDFOX,
    name: 'REDFOX',
    tagline: {
      ro: 'Linia Economică • Raport Calitate-Preț Excelent',
      en: 'Economic Line • Excellent Value for Money',
    },
    color_primary: '#DC143C',
    color_secondary: '#B01030',
    source_website: 'https://redfox.rmgastro.com',
    source_base_url: 'https://redfox.rmgastro.com/Group/redfox',
  },
};

// ============================================================
// STĂRI STOC - TEXTE
// ============================================================

export const STOCK_STATUS_TEXT = {
  in_stock: {
    ro: 'Disponibil în stoc la depozitul central',
    en: 'Available at the central warehouse',
  },
  in_transit: {
    ro: 'Pe drum',
    en: 'In transit',
  },
  on_request: {
    ro: 'La cerere',
    en: 'On request',
  },
};

// ============================================================
// CONFIGURARE SITE
// ============================================================

export const SITE_CONFIG = {
  name: 'XEH.ro',
  full_name: 'eXpert Echipamente Horeca',
  tagline: {
    ro: 'Echipamente profesionale pentru bucătăria ta',
    en: 'Professional equipment for your kitchen',
  },
  contact: {
    email: 'secretariat@infinitrade-romania.ro',
    phone: '+40 123 456 789',
    whatsapp: '+40 123 456 789',
  },
  address: {
    street: '',
    city: 'București',
    county: 'București',
    postal_code: '',
    country: 'România',
  },
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },
  colors: {
    primary: '#DC143C',      // Crimson
    primary_dark: '#B01030',
    primary_light: '#E8354F',
    secondary: '#1D1D1F',    // Apple black
    background: '#FAFAFA',
    surface: '#FFFFFF',
    text: '#1D1D1F',
    text_muted: '#86868B',
  },
};
