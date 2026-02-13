import { Users, Package, Clock, Award } from 'lucide-react'

const stats = [
  {
    icon: Clock,
    value: '15+',
    label: 'Ani Experiență',
    description: 'Din 2009 în industria HoReCa',
  },
  {
    icon: Package,
    value: '2,600+',
    label: 'Produse în Catalog',
    description: 'RM Gastro și REDFOX',
  },
  {
    icon: Users,
    value: '1,000+',
    label: 'Clienți Mulțumiți',
    description: 'Restaurante, hoteluri, cafenele',
  },
  {
    icon: Award,
    value: '100%',
    label: 'Distribuitor Autorizat',
    description: 'Garanție și suport oficial',
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-600 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            De Ce Să Alegi XEH.ro?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Suntem distribuitorul autorizat al brandurilor RM Gastro și REDFOX în România,
            cu experiență solidă în echiparea bucătăriilor profesionale.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl hover:bg-white/15 transition-colors"
            >
              <div className="w-12 h-12 bg-crimson/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-crimson-light" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
