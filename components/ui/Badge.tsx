import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'crimson' | 'success' | 'warning' | 'rm' | 'redfox'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-600',
  crimson: 'bg-crimson text-white',
  success: 'bg-green-50 text-green-700',
  warning: 'bg-orange-50 text-orange-700',
  rm: 'bg-gray-600 text-white',
  redfox: 'bg-crimson text-white',
}

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
