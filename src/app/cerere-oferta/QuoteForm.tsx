'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { getProductBySlug } from '@/data/products'
import { categories } from '@/data/categories'

export default function QuoteForm() {
  const searchParams = useSearchParams()
  const productSlug = searchParams.get('produs')
  const preselectedProduct = productSlug ? getProductBySlug(productSlug) : null

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: preselectedProduct?.categorySlug || '',
    productName: preselectedProduct?.name || '',
    quantity: '1',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        category: preselectedProduct.categorySlug,
        productName: preselectedProduct.name,
      }))
    }
  }, [preselectedProduct])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-primary mb-3">Cerere Trimisă cu Succes!</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Îți mulțumim pentru cererea de ofertă. Echipa noastră o va analiza și te va contacta
          în cel mai scurt timp posibil, de obicei în maxim 24 de ore.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto mb-6">
          <h4 className="font-semibold text-primary mb-2">Ce urmează?</h4>
          <ul className="text-left text-sm text-gray-600 space-y-2">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Vei primi un email de confirmare
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Un specialist te va contacta pentru detalii
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Vei primi oferta personalizată în maxim 24h
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            setSubmitted(false)
            setFormData({
              name: '',
              email: '',
              phone: '',
              company: '',
              category: '',
              productName: '',
              quantity: '1',
              message: '',
            })
          }}
          className="text-accent font-medium hover:underline"
        >
          Trimite o nouă cerere
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Info */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Informații Contact</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="label">
              Nume complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="Ion Popescu"
            />
          </div>
          <div>
            <label htmlFor="company" className="label">
              Companie (opțional)
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="input-field"
              placeholder="Numele companiei"
            />
          </div>
          <div>
            <label htmlFor="email" className="label">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="ion@exemplu.ro"
            />
          </div>
          <div>
            <label htmlFor="phone" className="label">
              Telefon <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="0712 345 678"
            />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Detalii Produs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="category" className="label">
              Categorie
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Selectează categoria</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className="label">
              Cantitate
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
              className="input-field"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="productName" className="label">
              Produs / Echipament dorit <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="ex: Cuptor convecție 10 tăvi, Vitrină frigorifică 1.5m, etc."
            />
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label">
          Detalii suplimentare (opțional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="input-field resize-none"
          placeholder="Descrie cerințele tale specifice: dimensiuni, funcționalități dorite, buget estimativ, termen de livrare, etc."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-accent py-4 justify-center text-lg disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Se procesează...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Trimite Cererea de Ofertă
          </>
        )}
      </button>

      <p className="text-sm text-gray-500 text-center">
        Prin trimiterea formularului, ești de acord cu{' '}
        <a href="#" className="text-accent hover:underline">politica de confidențialitate</a>.
      </p>
    </form>
  )
}
