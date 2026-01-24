import { Shield, Truck, HeadphonesIcon, Award, Lock, FileText } from 'lucide-react'

interface TrustBadge {
  icon: typeof Shield
  title: string
  description: string
}

const badges: TrustBadge[] = [
  {
    icon: Award,
    title: 'Distribuitor Autorizat',
    description: 'RM Gastro & REDFOX',
  },
  {
    icon: Truck,
    title: 'Livrare Națională',
    description: 'În toată România',
  },
  {
    icon: HeadphonesIcon,
    title: 'Suport Tehnic',
    description: 'Consultanță gratuită',
  },
  {
    icon: Shield,
    title: 'Garanție Producător',
    description: 'Pe toate produsele',
  },
  {
    icon: Lock,
    title: 'Tranzacții Sigure',
    description: 'Date protejate',
  },
  {
    icon: FileText,
    title: 'Factură Fiscală',
    description: 'Pentru deduceri',
  },
]

interface TrustBadgesProps {
  variant?: 'default' | 'compact' | 'horizontal'
  showAll?: boolean
  className?: string
}

export default function TrustBadges({
  variant = 'default',
  showAll = false,
  className = ''
}: TrustBadgesProps) {
  const displayBadges = showAll ? badges : badges.slice(0, 4)

  if (variant === 'compact') {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        {displayBadges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-2 text-gray-500"
          >
            <badge.icon className="w-4 h-4 text-crimson" />
            <span className="text-xs font-medium">{badge.title}</span>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className={`flex flex-wrap justify-center gap-6 md:gap-8 ${className}`}>
        {displayBadges.map((badge) => (
          <div
            key={badge.title}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-crimson/10 rounded-lg flex items-center justify-center">
              <badge.icon className="w-5 h-5 text-crimson" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600">{badge.title}</div>
              <div className="text-xs text-gray-400">{badge.description}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Default grid variant
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.title}
          className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-gray-100 hover:border-crimson/20 transition-colors"
        >
          <div className="w-10 h-10 bg-crimson/10 rounded-lg flex items-center justify-center mb-3">
            <badge.icon className="w-5 h-5 text-crimson" />
          </div>
          <div className="text-sm font-semibold text-gray-600">{badge.title}</div>
          <div className="text-xs text-gray-400 mt-1">{badge.description}</div>
        </div>
      ))}
    </div>
  )
}

// Smaller version for product pages
export function TrustBadgesInline() {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Award className="w-3.5 h-3.5 text-green-500" />
        <span>Distribuitor Autorizat</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Truck className="w-3.5 h-3.5 text-blue-500" />
        <span>Livrare România</span>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Shield className="w-3.5 h-3.5 text-crimson" />
        <span>Garanție</span>
      </div>
    </div>
  )
}
