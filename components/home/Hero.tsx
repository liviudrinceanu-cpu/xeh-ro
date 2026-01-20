import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-100 py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-block bg-crimson-bg text-crimson px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
          Distribuitor Autorizat RM Gastro
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          <span className="text-gradient-crimson">eXpert</span>{' '}
          <span className="text-gradient-dark">Echipamente Horeca</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Echipamente profesionale pentru bucătăria ta. Calitate premium de la brandurile
          de top <strong className="text-gray-600">RM</strong> și <strong className="text-crimson">REDFOX</strong>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/catalog" size="lg">
            Explorează Catalogul
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contactează-ne
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-600">2600+</div>
            <div className="text-sm text-gray-400 mt-1">Produse</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-600">2</div>
            <div className="text-sm text-gray-400 mt-1">Branduri</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-gray-600">400+</div>
            <div className="text-sm text-gray-400 mt-1">Categorii</div>
          </div>
        </div>
      </div>
    </section>
  )
}
