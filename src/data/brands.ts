import { Brand } from '@/types'

export const brands: Brand[] = [
  {
    id: 'rm',
    slug: 'rm',
    name: 'RM Gastro',
    shortName: 'RM',
    description: 'Echipamente premium pentru bucătării profesionale de mari dimensiuni. Calitate germană, fiabilitate maximă și performanță de top pentru cele mai exigente medii HoReCa.',
    tagline: 'Premium pentru bucătării mari',
    logo: '/images/brands/rm-logo.png',
    color: '#1a1a1a',
    accentColor: '#333333',
  },
  {
    id: 'redfox',
    slug: 'redfox',
    name: 'REDFOX',
    shortName: 'REDFOX',
    description: 'Echipamente HoReCa cu raport calitate-preț excelent. Soluții fiabile și accesibile pentru restaurante, cafenele și hoteluri de toate dimensiunile.',
    tagline: 'Raport calitate-preț excelent',
    logo: '/images/brands/redfox-logo.png',
    color: '#DC143C',
    accentColor: '#B22222',
  },
]

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((brand) => brand.slug === slug)
}

export function getAllBrands(): Brand[] {
  return brands
}
