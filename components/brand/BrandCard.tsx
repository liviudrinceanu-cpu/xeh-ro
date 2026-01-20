import Link from 'next/link'
import { cn } from '@/lib/utils'

interface BrandCardProps {
  brand: 'rm' | 'redfox'
  productCount?: number
  categoryCount?: number
  className?: string
}

const brandData = {
  rm: {
    name: 'RM',
    tagline: 'Linia Premium • Performanță Maximă',
    logoColor: 'text-gray-600',
  },
  redfox: {
    name: 'REDFOX',
    tagline: 'Linia Economică • Raport Calitate-Preț',
    logoColor: 'text-crimson',
  },
}

export default function BrandCard({
  brand,
  productCount = 0,
  categoryCount = 0,
  className,
}: BrandCardProps) {
  const data = brandData[brand]

  return (
    <Link
      href={`/${brand}`}
      className={cn(
        'group relative bg-white rounded-3xl p-12 text-center transition-all duration-300',
        'border border-gray-200 hover:shadow-lg hover:-translate-y-1 overflow-hidden',
        className
      )}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-crimson transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      {/* Brand Logo */}
      <div className={cn('text-5xl font-extrabold mb-4', data.logoColor)}>
        {data.name}
      </div>

      {/* Tagline */}
      <p className="text-gray-500 text-base mb-6">
        {data.tagline}
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-12">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-600">{productCount}+</div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">Produse</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-600">{categoryCount}</div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">Categorii</div>
        </div>
      </div>
    </Link>
  )
}
