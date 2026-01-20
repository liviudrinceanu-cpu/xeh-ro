'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import {
  FileText,
  Heart,
  TrendingUp,
  Clock,
  ArrowRight,
  Package
} from 'lucide-react'

type DashboardStats = {
  totalQuotes: number
  pendingQuotes: number
  favoritesCount: number
}

type RecentQuote = {
  id: string
  quote_number: string
  status: string
  created_at: string
  quote_items: { id: string }[]
}

export default function DashboardPage() {
  const { profile, partner, isLoading } = useAuth()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentQuotes, setRecentQuotes] = useState<RecentQuote[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  useEffect(() => {
    async function loadDashboardData() {
      if (!profile?.id) return

      const supabase = createClient()

      try {
        // Get quote stats
        const { data: quotes } = await supabase
          .from('quote_requests')
          .select('id, status')
          .eq('user_id', profile.id)

        const totalQuotes = quotes?.length || 0
        const pendingQuotes = quotes?.filter(q => q.status === 'pending' || q.status === 'in_progress').length || 0

        // Get favorites count
        const { count: favoritesCount } = await supabase
          .from('user_favorites')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', profile.id)

        setStats({
          totalQuotes,
          pendingQuotes,
          favoritesCount: favoritesCount || 0,
        })

        // Get recent quotes
        const { data: recent } = await supabase
          .from('quote_requests')
          .select('id, quote_number, status, created_at, quote_items(id)')
          .eq('user_id', profile.id)
          .order('created_at', { ascending: false })
          .limit(5)

        setRecentQuotes(recent || [])
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setIsLoadingData(false)
      }
    }

    if (!isLoading) {
      loadDashboardData()
    }
  }, [profile?.id, isLoading])

  if (isLoading || isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-white rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: 'În așteptare', color: 'bg-yellow-100 text-yellow-700' },
    in_progress: { label: 'În lucru', color: 'bg-blue-100 text-blue-700' },
    sent: { label: 'Trimisă', color: 'bg-green-100 text-green-700' },
    accepted: { label: 'Acceptată', color: 'bg-green-100 text-green-700' },
    rejected: { label: 'Respinsă', color: 'bg-red-100 text-red-700' },
    expired: { label: 'Expirată', color: 'bg-gray-100 text-gray-700' },
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-gray-600">
          Bun venit, {profile?.first_name}!
        </h1>
        <p className="text-gray-500 mt-1">
          Aici ai o privire de ansamblu asupra contului tău de partener.
        </p>
      </div>

      {/* Status Alert */}
      {partner && !partner.is_approved && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="font-medium text-yellow-800">Cont în așteptare aprobare</p>
              <p className="text-yellow-700 text-sm mt-1">
                Contul tău este în curs de verificare. Vei primi un email când va fi activat.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-crimson-bg text-crimson rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-600">{stats?.totalQuotes || 0}</p>
              <p className="text-sm text-gray-500">Cereri ofertă</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-600">{stats?.pendingQuotes || 0}</p>
              <p className="text-sm text-gray-500">În procesare</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-600">{stats?.favoritesCount || 0}</p>
              <p className="text-sm text-gray-500">Produse favorite</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/cerere-oferta"
          className="bg-crimson hover:bg-crimson-dark text-white rounded-2xl p-6 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">Cerere Ofertă Nouă</p>
              <p className="text-crimson-100 text-sm mt-1">Solicită o ofertă personalizată</p>
            </div>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <Link
          href="/catalog"
          className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-6 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg text-gray-600">Explorează Catalogul</p>
              <p className="text-gray-500 text-sm mt-1">Vezi toate produsele disponibile</p>
            </div>
            <Package className="w-6 h-6 text-gray-400 group-hover:text-crimson transition-colors" />
          </div>
        </Link>
      </div>

      {/* Recent Quotes */}
      <div className="bg-white rounded-2xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-600">Cereri Recente</h2>
            <Link
              href="/portal/quotes"
              className="text-sm text-crimson hover:underline"
            >
              Vezi toate
            </Link>
          </div>
        </div>

        {recentQuotes.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nu ai nicio cerere de ofertă încă.</p>
            <Link
              href="/cerere-oferta"
              className="inline-block mt-4 text-crimson hover:underline"
            >
              Creează prima cerere
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentQuotes.map((quote) => (
              <Link
                key={quote.id}
                href={`/portal/quotes/${quote.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">{quote.quote_number}</p>
                    <p className="text-sm text-gray-500">
                      {quote.quote_items?.length || 0} produs(e) •{' '}
                      {new Date(quote.created_at).toLocaleDateString('ro-RO')}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusLabels[quote.status]?.color || 'bg-gray-100 text-gray-700'
                }`}>
                  {statusLabels[quote.status]?.label || quote.status}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
