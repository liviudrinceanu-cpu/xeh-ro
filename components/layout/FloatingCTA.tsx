'use client'

import { Phone, MessageCircle } from 'lucide-react'

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
      <a
        href="https://wa.me/40371232404"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
        title="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href="tel:+40371232404"
        className="w-14 h-14 bg-crimson hover:bg-crimson-dark text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all"
        title="Telefon"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  )
}
