'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { FileText, Search, Filter, ChevronRight, Clock, CheckCircle, XCircle, Send } from 'lucide-react'

type Quote = {
  id: string
  quote_number: string
  status: string
  contact_name: string
  contact_email: string
  contact_company: string | null
  created_at: string
  quote_items: { id: string }[]
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Nouă', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  in_progress: { label: 'În lucru', color: 'bg-blue-100 text-blue-700', icon: Clock },
  sent: { label: 'Trimisă', color: 'bg-green-100 text-green-700', icon: Send },
  accepted: { label: 'Acceptată', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: 'Respinsă', color: 'bg-red-100 text-red-700', icon: XCircle },
  expired: { label: 'Expirată', color: 'bg-gray-100 text-gray-700', icon: Clock },
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadQuotes() {
      const supabase = createClient()

      try {
        let query = supabase
          .from('quote_requests')
          .select('id, quote_number, status, contact_name, contact_email, contact_company, created_at, quote_items(id)')
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

    loadQuotes()
  }, [statusFilter])

  const filteredQuotes = quotes.filter(quote => {
    if (!searchQuery) return true
    const search = searchQuery.toLowerCase()
    return (
      quote.quote_number.toLowerCase().includes(search) ||
      quote.contact_name?.toLowerCase().includes(search) ||
      quote.contact_email?.toLowerCase().includes(search) ||
      quote.contact_company?.toLowerCase().includes(search)
    )
  })

  const updateStatus = async (quoteId: string, newStatus: string) => {
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('quote_requests')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', quoteId)

      if (error) throw error

      setQuotes(quotes.map(q =>
        q.id === quoteId ? { ...q, status: newStatus } : q
      ))
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (isLoading) {
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cotații</h1>
        <p className="text-gray-500 mt-1">
          Gestionează cererile de ofertă
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Caută după număr, nume sau email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson appearance-none"
          >
            <option value="all">Toate statusurile</option>
            <option value="pending">Noi</option>
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
                ? 'Nicio cerere de ofertă încă'
                : 'Nu s-au găsit rezultate'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                    Cerere
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                    Client
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                    Produse
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                    Status
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                    Data
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredQuotes.map((quote) => {
                  const status = statusConfig[quote.status] || statusConfig.pending
                  const StatusIcon = status.icon

                  return (
                    <tr key={quote.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">{quote.quote_number}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-gray-900">{quote.contact_name}</p>
                          <p className="text-sm text-gray-500">{quote.contact_email}</p>
                          {quote.contact_company && (
                            <p className="text-sm text-gray-400">{quote.contact_company}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-600">
                          {quote.quote_items?.length || 0} produs(e)
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={quote.status}
                          onChange={e => updateStatus(quote.id, e.target.value)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-crimson cursor-pointer ${status.color}`}
                        >
                          <option value="pending">Nouă</option>
                          <option value="in_progress">În lucru</option>
                          <option value="sent">Trimisă</option>
                          <option value="accepted">Acceptată</option>
                          <option value="rejected">Respinsă</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">
                        {new Date(quote.created_at).toLocaleDateString('ro-RO', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/quotes/${quote.id}`}
                          className="inline-flex items-center gap-1 text-crimson hover:underline text-sm font-medium"
                        >
                          Detalii
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
