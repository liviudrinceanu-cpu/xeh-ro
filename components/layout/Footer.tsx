import Link from 'next/link'
import { Phone, Mail, MapPin, Shield, Truck, Award, Clock } from 'lucide-react'

const footerLinks = {
  branduri: [
    { name: 'RM Gastro', href: '/rm' },
    { name: 'REDFOX', href: '/redfox' },
  ],
  categorii: [
    { name: 'Cuptoare Profesionale', href: '/cuptoare-profesionale' },
    { name: 'Frigidere Industriale', href: '/frigidere-industriale' },
    { name: 'Mașini Spălat Vase', href: '/masini-spalat-vase-profesionale' },
    { name: 'Echipamente Pizzerie', href: '/echipamente-pizzerie' },
  ],
  servicii: [
    { name: 'Distribuitor RM Gastro', href: '/distribuitor-rm-gastro-romania' },
    { name: 'Consultanță Gratuită', href: '/consultanta-echipamente-horeca' },
    { name: 'Echipamente Economic', href: '/echipamente-horeca-economice' },
    { name: 'Echipamente Premium', href: '/echipamente-horeca-premium' },
  ],
  companie: [
    { name: 'Despre Noi', href: '/despre-noi' },
    { name: 'Echipa', href: '/echipa' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ],
}

const trustBadges = [
  { icon: Award, label: 'Distribuitor Autorizat' },
  { icon: Truck, label: 'Livrare Națională' },
  { icon: Shield, label: 'Garanție Producător' },
  { icon: Clock, label: 'Suport Tehnic' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-600 text-white">
      {/* Trust Badges Bar */}
      <div className="bg-gray-700 border-b border-gray-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-gray-300">
                <badge.icon className="w-4 h-4 text-crimson-light" />
                <span className="text-xs font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-0 font-bold text-2xl mb-4">
              <span className="bg-crimson text-white px-2.5 py-1.5 rounded-l-md">XEH</span>
              <span className="bg-white text-gray-600 px-2.5 py-1.5 rounded-r-md">.ro</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-4">
              eXpert Echipamente Horeca - Distribuitor autorizat de echipamente profesionale
              pentru industria HoReCa din 2009.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              <p>Driatheli Group SRL</p>
              <p>CUI: RO26209397</p>
            </div>
          </div>

          {/* Branduri */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Branduri
            </h4>
            <ul className="space-y-3">
              {footerLinks.branduri.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-crimson-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorii */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Categorii
            </h4>
            <ul className="space-y-3">
              {footerLinks.categorii.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-crimson-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicii */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Servicii
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicii.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-crimson-light transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://maps.google.com/?q=Calea+Lugojului+47B+Ghiroda+Timis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-gray-400 hover:text-crimson-light transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Calea Lugojului 47/B, Ghiroda, Timiș</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+40724256250"
                  className="flex items-center gap-2 text-gray-400 hover:text-crimson-light transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+40 724 256 250</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:secretariat@infinitrade-romania.ro"
                  className="flex items-center gap-2 text-gray-400 hover:text-crimson-light transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>secretariat@infinitrade-romania.ro</span>
                </a>
              </li>
              <li className="text-gray-500 text-xs pt-2">
                Program: Luni - Vineri, 08:00 - 16:30
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} XEH.ro - eXpert Echipamente Horeca. Toate drepturile rezervate.
          </p>
          <div className="flex gap-6">
            <Link href="/termeni" className="text-gray-500 hover:text-white text-sm transition-colors">
              Termeni și Condiții
            </Link>
            <Link href="/confidentialitate" className="text-gray-500 hover:text-white text-sm transition-colors">
              Confidențialitate
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-white text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
