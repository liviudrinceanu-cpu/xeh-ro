'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Users, FileText, Clock, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react'

type DashboardStats = {
  totalPartners: number
  pendingPartners: number
  approvedPartners: number
  totalQuotes: number
  pendingQuotes: number
  recentPartners: {
    id: string
    company_name: string
    created_at: string
    is_approved: boolean
    user_profile: { first_name: string; last_name: string; email: string } | null
  }[]
  recentQuotes: {
    id: string
    quote_number: string
    status: string
    contact_name: string
    created_at: string
  }[]
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('[Admin] useEffect running')
    async function loadStats() {
      console.log('[Admin] loadStats called')
      const supabase = createClient()
      console.log('[Admin] Supabase client created, starting queries...')

      try {
        // Get partner counts
        const { count: totalPartners } = await supabase
          .from('partners')
          .select('*', { count: 'exact', head: true })

        const { count: pendingPartners } = await supabase
          .from('partners')
          .select('*', { count: 'exact', head: true })
          .eq('is_approved', false)

        const { count: approvedPartners } = await supabase
          .from('partners')
          .select('*', { count: 'exact', head: true })
          .eq('is_approved', true)

        // Get quote counts
        const { count: totalQuotes } = await supabase
          .from('quote_requests')
          .select('*', { count: 'exact', head: true })

        const { count: pendingQuotes } = await supabase
          .from('quote_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending')

        // Get recent partners with user profile join
        // Use !partners_user_id_fkey to specify the exact foreign key constraint name
        const { data: recentPartners, error: partnersError } = await supabase
          .from('partners')
          .select(`
            id,
            company_name,
            created_at,
            is_approved,
            user_profile:user_profiles!partners_user_id_fkey (first_name, last_name, email)
          `)
          .order('created_at', { ascending: false })
          .limit(5)

        if (partnersError) {
          console.error('Error fetching partners:', partnersError)
        }

        // Get recent quotes
        const { data: recentQuotes, error: quotesError } = await supabase
          .from('quote_requests')
          .select('id, quote_number, status, contact_name, created_at')
          .order('created_at', { ascending: false })
          .limit(5)

        if (quotesError) {
          console.error('Error fetching quotes:', quotesError)
        }

        // Transform data to handle array relations from Supabase join
        const transformedPartners = (recentPartners || []).map(p => ({
          ...p,
          user_profile: Array.isArray(p.user_profile) ? p.user_profile[0] : p.user_profile
        }))

        setStats({
          totalPartners: totalPartners || 0,
          pendingPartners: pendingPartners || 0,
          approvedPartners: approvedPartners || 0,
          totalQuotes: totalQuotes || 0,
          pendingQuotes: pendingQuotes || 0,
          recentPartners: transformedPartners,
          recentQuotes: recentQuotes || [],
        })
      } catch (error) {
        console.error('[Admin] Error loading admin stats:', error)
      } finally {
        console.log('[Admin] Setting isLoading to false')
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-white rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-500 mt-1">Bine ai venit în panoul de administrare</p>
      </div>

      {/* Alert for pending partners */}
      {stats && stats.pendingPartners > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-800">
              {stats.pendingPartners} partener{stats.pendingPartners > 1 ? 'i' : ''} în așteptare
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              Ai cereri de înregistrare care așteaptă aprobarea ta.
            </p>
            <Link
              href="/admin/partners?status=pending"
              className="inline-block mt-2 text-sm font-medium text-yellow-800 hover:text-yellow-900"
            >
              Vezi cererile →
            </Link>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats?.totalPartners || 0}</span>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Total Parteneri</p>
          <p className="text-sm text-gray-400">
            {stats?.approvedPartners || 0} aprobați
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats?.pendingPartners || 0}</span>
          </div>
          <p className="mt-4 text-gray-600 font-medium">În Așteptare</p>
          <p className="text-sm text-gray-400">parteneri de aprobat</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats?.totalQuotes || 0}</span>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Total Cotații</p>
          <p className="text-sm text-gray-400">cereri de ofertă</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-crimson/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-crimson" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{stats?.pendingQuotes || 0}</span>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Cotații Noi</p>
          <p className="text-sm text-gray-400">de procesat</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Partners */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Parteneri Recenți</h2>
            <Link href="/admin/partners" className="text-sm text-crimson hover:underline">
              Vezi toți
            </Link>
          </div>
          {stats?.recentPartners && stats.recentPartners.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {stats.recentPartners.map((partner) => (
                <Link
                  key={partner.id}
                  href={`/admin/partners/${partner.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {partner.company_name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {partner.user_profile?.first_name} {partner.user_profile?.last_name}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {partner.is_approved ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                        Aprobat
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                        În așteptare
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Niciun partener înregistrat încă
            </div>
          )}
        </div>

        {/* Recent Quotes */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Cotații Recente</h2>
            <Link href="/admin/quotes" className="text-sm text-crimson hover:underline">
              Vezi toate
            </Link>
          </div>
          {stats?.recentQuotes && stats.recentQuotes.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {stats.recentQuotes.map((quote) => (
                <Link
                  key={quote.id}
                  href={`/admin/quotes/${quote.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">
                      {quote.quote_number}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {quote.contact_name}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <StatusBadge status={quote.status} />
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(quote.created_at).toLocaleDateString('ro-RO')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              Nicio cotație încă
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; color: string }> = {
    pending: { label: 'Nouă', color: 'bg-yellow-100 text-yellow-700' },
    in_progress: { label: 'În lucru', color: 'bg-blue-100 text-blue-700' },
    sent: { label: 'Trimisă', color: 'bg-green-100 text-green-700' },
    accepted: { label: 'Acceptată', color: 'bg-green-100 text-green-700' },
    rejected: { label: 'Respinsă', color: 'bg-red-100 text-red-700' },
  }

  const { label, color } = config[status] || { label: status, color: 'bg-gray-100 text-gray-700' }

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>
      {label}
    </span>
  )
}
