'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('A apărut o eroare. Vă rugăm încercați din nou.')
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'A apărut o eroare.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-600 mb-2">
          Mesaj trimis!
        </h2>
        <p className="text-gray-500 mb-6">
          Îți mulțumim. Te vom contacta în curând.
        </p>
        <Button href="/" variant="outline">
          Înapoi la pagina principală
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
            Nume *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-transparent outline-none transition-all"
            placeholder="Numele tău"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-transparent outline-none transition-all"
            placeholder="email@exemplu.ro"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">
            Telefon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-transparent outline-none transition-all"
            placeholder="07XX XXX XXX"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-600 mb-2">
            Subiect *
          </label>
          <select
            id="subject"
            name="subject"
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-transparent outline-none transition-all bg-white"
          >
            <option value="">Selectează subiectul</option>
            <option value="informatii">Informații produse</option>
            <option value="oferta">Cerere ofertă</option>
            <option value="suport">Suport tehnic</option>
            <option value="parteneriat">Parteneriat</option>
            <option value="altele">Altele</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-600 mb-2">
          Mesaj *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-crimson focus:border-transparent outline-none transition-all resize-none"
          placeholder="Scrie mesajul tău aici..."
        />
      </div>

      <Button type="submit" size="lg" className="w-full md:w-auto" isLoading={isSubmitting}>
        {isSubmitting ? 'Se trimite...' : 'Trimite Mesajul'}
      </Button>
    </form>
  )
}
