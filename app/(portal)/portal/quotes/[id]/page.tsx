'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, FileText, Package, Clock, CheckCircle, XCircle, Mail, Phone } from 'lucide-react'

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
  response: Record<string, unknown> | null
  created_at: string
  updated_at: string
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
      product_images: { cloudinary_url: string }[]
    } | null
  }[]
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType; bgColor: string }> = {
  pending: { label: 'În așteptare', color: 'text-yellow-700', icon: Clock, bgColor: 'bg-yellow-100' },
  in_progress: { label: 'În lucru', color: 'text-blue-700', icon: Clock, bgColor: 'bg-blue-100' },
  sent: { label: 'Ofertă trimisă', color: 'text-green-700', icon: CheckCircle, bgColor: 'bg-green-100' },
  accepted: { label: 'Acceptată', color: 'text-green-700', icon: CheckCircle, bgColor: 'bg-green-100' },
  rejected: { label: 'Respinsă', color: 'text-red-700', icon: XCircle, bgColor: 'bg-red-100' },
  expired: { label: 'Expirată', color: 'text-gray-700', icon: Clock, bgColor: 'bg-gray-100' },
}

export default function QuoteDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { profile, isLoading: authLoading } = useAuth()
  const [quote, setQuote] = useState<QuoteDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadQuote() {
      if (!profile?.id || !params.id) return

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
                product_images (cloudinary_url)
              )
            )
          `)
          .eq('id', params.id)
          .eq('user_id', profile.id)
          .single()

        if (error) throw error

        setQuote(data)
      } catch (error) {
        console.error('Error loading quote:', error)
        router.push('/portal/quotes')
      } finally {
        setIsLoading(false)
      }
    }

    if (!authLoading) {
      loadQuote()
    }
  }, [profile?.id, params.id, authLoading, router])

  if (authLoading || isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
        <div className="bg-white rounded-2xl h-96 animate-pulse" />
      </div>
    )
  }

  if (!quote) {
    return null
  }

  const status = statusConfig[quote.status] || statusConfig.pending
  const StatusIcon = status.icon

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back button */}
      <Link
        href="/portal/quotes"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Înapoi la cotații
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-600">{quote.quote_number}</h1>
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
      </div>

      {/* Status Timeline */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-600 mb-4">Status Cerere</h2>
        <div className="flex items-center gap-4">
          {['pending', 'in_progress', 'sent', 'accepted'].map((s, index) => {
            const stepStatus = statusConfig[s]
            const isActive = ['pending', 'in_progress', 'sent', 'accepted'].indexOf(quote.status) >= index
            const isCurrent = quote.status === s

            return (
              <div key={s} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  isActive ? 'bg-crimson text-white' : 'bg-gray-100 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-crimson/20' : ''}`}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                  {stepStatus.label}
                </span>
                {index < 3 && (
                  <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                    ['pending', 'in_progress', 'sent'].indexOf(quote.status) > index ? 'bg-crimson' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-600 mb-4">Date Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nume</p>
            <p className="text-gray-600 font-medium">{quote.contact_name}</p>
          </div>
          {quote.contact_company && (
            <div>
              <p className="text-sm text-gray-500">Companie</p>
              <p className="text-gray-600 font-medium">{quote.contact_company}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <a href={`mailto:${quote.contact_email}`} className="text-crimson hover:underline flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {quote.contact_email}
            </a>
          </div>
          <div>
            <p className="text-sm text-gray-500">Telefon</p>
            <a href={`tel:${quote.contact_phone}`} className="text-crimson hover:underline flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {quote.contact_phone}
            </a>
          </div>
        </div>
        {quote.contact_message && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Mesaj</p>
            <p className="text-gray-600 whitespace-pre-wrap">{quote.contact_message}</p>
          </div>
        )}
      </div>

      {/* Products */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-600">Produse Solicitate</h2>
        </div>
        {quote.quote_items.length === 0 ? (
          <div className="p-12 text-center">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Niciun produs în această cerere</p>
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
                  <p className="font-medium text-gray-600">{item.product_name}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    {item.product_sku && <span>SKU: {item.product_sku}</span>}
                    <span>Cantitate: {item.quantity}</span>
                  </div>
                  {item.notes && (
                    <p className="text-sm text-gray-400 mt-2">{item.notes}</p>
                  )}
                </div>
                {item.product?.price_amount && (
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-gray-600">
                      {item.product.price_amount.toLocaleString('ro-RO')} EUR
                    </p>
                    <p className="text-xs text-gray-400">preț de listă</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
