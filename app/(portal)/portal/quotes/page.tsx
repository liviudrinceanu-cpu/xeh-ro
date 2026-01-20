'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { FileText, Search, Filter, ChevronRight } from 'lucide-react'

type Quote = {
  id: string
  quote_number: string
  status: string
  contact_company: string | null
  contact_message: string | null
  created_at: string
  quote_items: { id: string; product_name: string }[]
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'În așteptare', color: 'bg-yellow-100 text-yellow-700' },
  in_progress: { label: 'În lucru', color: 'bg-blue-100 text-blue-700' },
  sent: { label: 'Trimisă', color: 'bg-green-100 text-green-700' },
  accepted: { label: 'Acceptată', color: 'bg-green-100 text-green-700' },
  rejected: { label: 'Respinsă', color: 'bg-red-100 text-red-700' },
  expired: { label: 'Expirată', color: 'bg-gray-100 text-gray-700' },
}

export default function QuotesPage() {
  const { profile, isLoading: authLoading } = useAuth()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadQuotes() {
      if (!profile?.id) return

      const supabase = createClient()

      try {
        let query = supabase
          .from('quote_requests')
          .select('id, quote_number, status, contact_company, contact_message, created_at, quote_items(id, product_name)')
          .eq('user_id', profile.id)
          .order('created_at', { ascending: false })

        if (statusFilter !== 'all') {
          query = query.eq('status', statusFilter)
        }

        const { data, error } = await query

        if (error) throw error

        setQuotes(data || [])
      } catch (error) {
        console.error('Error loading quotes:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (!authLoading) {
      loadQuotes()
    }
  }, [profile?.id, authLoading, statusFilter])

  const filteredQuotes = quotes.filter(quote => {
    if (!searchQuery) return true
    const search = searchQuery.toLowerCase()
    return (
      quote.quote_number.toLowerCase().includes(search) ||
      quote.quote_items?.some(item => item.product_name?.toLowerCase().includes(search))
    )
  })

  if (authLoading || isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="bg-white rounded-2xl h-96 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-600">Cotațiile Mele</h1>
          <p className="text-gray-500 mt-1">Istoricul cererilor tale de ofertă</p>
        </div>
        <Link
          href="/cerere-oferta"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-crimson hover:bg-crimson-dark text-white rounded-xl transition-colors"
        >
          Cerere Nouă
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Caută după număr sau produs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson appearance-none bg-white"
          >
            <option value="all">Toate statusurile</option>
            <option value="pending">În așteptare</option>
            <option value="in_progress">În lucru</option>
            <option value="sent">Trimise</option>
            <option value="accepted">Acceptate</option>
            <option value="rejected">Respinse</option>
          </select>
        </div>
      </div>

      {/* Quotes List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {filteredQuotes.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {quotes.length === 0
                ? 'Nu ai nicio cerere de ofertă încă.'
                : 'Nu s-au găsit rezultate pentru căutarea ta.'}
            </p>
            {quotes.length === 0 && (
              <Link
                href="/cerere-oferta"
                className="inline-block mt-4 text-crimson hover:underline"
              >
                Creează prima cerere
              </Link>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredQuotes.map((quote) => (
              <Link
                key={quote.id}
                href={`/portal/quotes/${quote.id}`}
                className="flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-gray-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-semibold text-gray-600">{quote.quote_number}</p>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        statusLabels[quote.status]?.color || 'bg-gray-100 text-gray-700'
                      }`}>
                        {statusLabels[quote.status]?.label || quote.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {quote.quote_items?.length || 0} produs(e) •{' '}
                      {new Date(quote.created_at).toLocaleDateString('ro-RO', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    {quote.quote_items && quote.quote_items.length > 0 && (
                      <p className="text-sm text-gray-400 mt-1 truncate">
                        {quote.quote_items.slice(0, 2).map(i => i.product_name).join(', ')}
                        {quote.quote_items.length > 2 && ` +${quote.quote_items.length - 2} altele`}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-crimson transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
