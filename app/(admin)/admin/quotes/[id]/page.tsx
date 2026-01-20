'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Mail,
  Phone,
  Building2,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  MessageSquare
} from 'lucide-react'

type QuoteDetail = {
  id: string
  quote_number: string
  status: string
  contact_name: string
  contact_email: string
  contact_phone: string
  contact_company: string | null
  contact_message: string | null
  customer_notes: string | null
  internal_notes: string | null
  created_at: string
  updated_at: string
  user_id: string | null
  quote_items: {
    id: string
    product_name: string
    product_sku: string | null
    quantity: number
    notes: string | null
    product: {
      id: string
      model: string
      price_amount: number | null
      price_currency: string
      product_images: { cloudinary_url: string }[]
    } | null
  }[]
}

const statusConfig: Record<string, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  pending: { label: 'Nouă', color: 'text-yellow-700', bgColor: 'bg-yellow-100', icon: Clock },
  in_progress: { label: 'În lucru', color: 'text-blue-700', bgColor: 'bg-blue-100', icon: Clock },
  sent: { label: 'Trimisă', color: 'text-green-700', bgColor: 'bg-green-100', icon: Send },
  accepted: { label: 'Acceptată', color: 'text-green-700', bgColor: 'bg-green-100', icon: CheckCircle },
  rejected: { label: 'Respinsă', color: 'text-red-700', bgColor: 'bg-red-100', icon: XCircle },
  expired: { label: 'Expirată', color: 'text-gray-700', bgColor: 'bg-gray-100', icon: Clock },
}

export default function AdminQuoteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [quote, setQuote] = useState<QuoteDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [internalNotes, setInternalNotes] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadQuote() {
      if (!params.id) return

      const supabase = createClient()

      try {
        const { data, error } = await supabase
          .from('quote_requests')
          .select(`
            *,
            quote_items (
              id,
              product_name,
              product_sku,
              quantity,
              notes,
              product:products (
                id,
                model,
                price_amount,
                price_currency,
                product_images (cloudinary_url)
              )
            )
          `)
          .eq('id', params.id)
          .single()

        if (error) throw error

        // Transform nested product arrays
        const transformedData = {
          ...data,
          quote_items: (data.quote_items || []).map((item: Record<string, unknown>) => ({
            ...item,
            product: Array.isArray(item.product) ? item.product[0] : item.product
          }))
        }

        setQuote(transformedData as QuoteDetail)
        setInternalNotes(data.internal_notes || '')
      } catch (error) {
        console.error('Error loading quote:', error)
        router.push('/admin/quotes')
      } finally {
        setIsLoading(false)
      }
    }

    loadQuote()
  }, [params.id, router])

  const updateStatus = async (newStatus: string) => {
    if (!quote) return

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', quote.id)

      if (error) throw error

      setQuote({ ...quote, status: newStatus })
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const saveInternalNotes = async () => {
    if (!quote) return

    setIsSaving(true)

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ internal_notes: internalNotes, updated_at: new Date().toISOString() })
        .eq('id', quote.id)

      if (error) throw error

      setQuote({ ...quote, internal_notes: internalNotes })
    } catch (error) {
      console.error('Error saving notes:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const calculateTotal = () => {
    if (!quote?.quote_items) return 0
    return quote.quote_items.reduce((total, item) => {
      const price = item.product?.price_amount || 0
      return total + (price * item.quantity)
    }, 0)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
        <div className="bg-white rounded-2xl h-96 animate-pulse" />
      </div>
    )
  }

  if (!quote) return null

  const status = statusConfig[quote.status] || statusConfig.pending
  const StatusIcon = status.icon
  const total = calculateTotal()

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Back button */}
      <Link
        href="/admin/quotes"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Înapoi la cotații
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">{quote.quote_number}</h1>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${status.bgColor} ${status.color}`}>
              <StatusIcon className="w-4 h-4" />
              {status.label}
            </span>
          </div>
          <p className="text-gray-500 mt-1">
            Creată pe {new Date(quote.created_at).toLocaleDateString('ro-RO', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={quote.status}
            onChange={e => updateStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
          >
            <option value="pending">Nouă</option>
            <option value="in_progress">În lucru</option>
            <option value="sent">Trimisă</option>
            <option value="accepted">Acceptată</option>
            <option value="rejected">Respinsă</option>
          </select>
          <a
            href={`mailto:${quote.contact_email}?subject=Re: ${quote.quote_number} - Ofertă XEH.ro`}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-crimson hover:bg-crimson-dark text-white rounded-xl transition-colors"
          >
            <Mail className="w-5 h-5" />
            Răspunde
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">Produse Solicitate</h2>
            </div>
            {quote.quote_items.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Niciun produs în această cerere
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {quote.quote_items.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6 flex items-start gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {item.product?.product_images?.[0]?.cloudinary_url ? (
                        <img
                          src={item.product.product_images[0].cloudinary_url}
                          alt={item.product_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900">{item.product_name}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        {item.product_sku && <span>SKU: {item.product_sku}</span>}
                        <span>Cantitate: <strong>{item.quantity}</strong></span>
                      </div>
                      {item.notes && (
                        <p className="text-sm text-gray-400 mt-2 italic">&quot;{item.notes}&quot;</p>
                      )}
                    </div>
                    {item.product?.price_amount && (
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-gray-900">
                          {(item.product.price_amount * item.quantity).toLocaleString('ro-RO')} {item.product.price_currency}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.product.price_amount.toLocaleString('ro-RO')} × {item.quantity}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {total > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Total estimat (preț de listă):</span>
                  <span className="text-xl font-bold text-gray-900">
                    {total.toLocaleString('ro-RO')} EUR
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Customer Message */}
          {quote.contact_message && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gray-400" />
                Mesaj Client
              </h2>
              <p className="text-gray-600 whitespace-pre-wrap">{quote.contact_message}</p>
            </div>
          )}

          {/* Internal Notes */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Note Interne</h2>
            <textarea
              value={internalNotes}
              onChange={e => setInternalNotes(e.target.value)}
              rows={4}
              placeholder="Adaugă note interne despre această cerere..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson resize-none"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={saveInternalNotes}
                disabled={isSaving}
                className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                {isSaving ? 'Se salvează...' : 'Salvează Notele'}
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Contact Client</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Nume</p>
                <p className="font-medium text-gray-900">{quote.contact_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a
                  href={`mailto:${quote.contact_email}`}
                  className="text-crimson hover:underline flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  {quote.contact_email}
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefon</p>
                <a
                  href={`tel:${quote.contact_phone}`}
                  className="text-crimson hover:underline flex items-center gap-1"
                >
                  <Phone className="w-4 h-4" />
                  {quote.contact_phone}
                </a>
              </div>
              {quote.contact_company && (
                <div>
                  <p className="text-sm text-gray-500">Companie</p>
                  <p className="text-gray-900 flex items-center gap-1">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    {quote.contact_company}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Acțiuni Rapide</h2>
            <div className="space-y-3">
              <a
                href={`mailto:${quote.contact_email}?subject=Re: ${quote.quote_number} - Ofertă XEH.ro`}
                className="block w-full text-center px-4 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
              >
                Trimite Email
              </a>
              <a
                href={`tel:${quote.contact_phone}`}
                className="block w-full text-center px-4 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
              >
                Sună Clientul
              </a>
              {quote.user_id && (
                <Link
                  href={`/admin/partners?search=${quote.contact_email}`}
                  className="block w-full text-center px-4 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Vezi Profil Partener
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
