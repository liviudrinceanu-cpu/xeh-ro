import Link from 'next/link'
import {
  Flame, Snowflake, Pizza, Waves, Wind, Coffee,
  UtensilsCrossed, Refrigerator, ChefHat, Sandwich,
  IceCream, Droplets, Box, Lightbulb
} from 'lucide-react'
import { cn, getCategoryUrl, getCategoryName } from '@/lib/utils'
import type { Category } from '@/types/database'

// Map category names to icons
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'cooking': Flame,
  'refrigeration': Snowflake,
  'pizza': Pizza,
  'dishwashing': Waves,
  'ventilation': Wind,
  'coffee': Coffee,
  'preparation': UtensilsCrossed,
  'cold': Refrigerator,
  'bakery': ChefHat,
  'snack': Sandwich,
  'ice': IceCream,
  'water': Droplets,
  'storage': Box,
  'buffet': Lightbulb,
}

function getCategoryIcon(categoryName: string): React.ComponentType<{ className?: string }> {
  const name = categoryName.toLowerCase()

  if (name.includes('cook') || name.includes('gătit') || name.includes('grill') || name.includes('fryer')) return Flame
  if (name.includes('refrig') || name.includes('cold') || name.includes('chill') || name.includes('freez')) return Snowflake
  if (name.includes('pizza')) return Pizza
  if (name.includes('wash') || name.includes('spăl')) return Waves
  if (name.includes('vent')) return Wind
  if (name.includes('coffee') || name.includes('cafea') || name.includes('bar')) return Coffee
  if (name.includes('prep') || name.includes('robot')) return UtensilsCrossed
  if (name.includes('bake') || name.includes('patis') || name.includes('oven') || name.includes('cuptor')) return ChefHat
  if (name.includes('snack') || name.includes('fast')) return Sandwich
  if (name.includes('ice') || name.includes('gheaț')) return IceCream
  if (name.includes('water') || name.includes('apă')) return Droplets
  if (name.includes('buffet') || name.includes('display') || name.includes('vitrin')) return Lightbulb

  return Box // Default icon
}

interface CategoryCardProps {
  category: Category
  productCount?: number
  className?: string
}

export default function CategoryCard({ category, productCount, className }: CategoryCardProps) {
  const brandSlug = category.brand?.slug || 'rm'
  const categoryUrl = getCategoryUrl(brandSlug, category.path)
  const Icon = getCategoryIcon(category.name)
  const displayName = getCategoryName(category.name, category.name_ro)

  return (
    <Link
      href={categoryUrl}
      className={cn(
        'group bg-gray-50 hover:bg-white rounded-2xl p-6 text-center transition-all duration-200',
        'border border-transparent hover:border-crimson hover:shadow-md',
        className
      )}
    >
      <div className="w-14 h-14 mx-auto mb-4 bg-gray-100 group-hover:bg-crimson-bg rounded-xl flex items-center justify-center transition-colors">
        <Icon className="w-7 h-7 text-gray-500 group-hover:text-crimson transition-colors" />
      </div>

      <h3 className="font-semibold text-gray-600 text-sm mb-1 group-hover:text-crimson transition-colors">
        {displayName}
      </h3>

      {productCount !== undefined && (
        <p className="text-xs text-gray-400">
          {productCount} {productCount === 1 ? 'produs' : 'produse'}
        </p>
      )}
    </Link>
  )
}
