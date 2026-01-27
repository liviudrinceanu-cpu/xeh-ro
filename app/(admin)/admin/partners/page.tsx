'use client'

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Users, Search, Filter, ChevronRight, CheckCircle, Clock, XCircle } from 'lucide-react'

type Partner = {
  id: string
  company_name: string
  cui: string | null
  is_approved: boolean
  created_at: string
  approved_at: string | null
  user_profile: {
    first_name: string
    last_name: string
    email: string
    phone: string | null
  } | null
}

function PartnersContent() {
  const searchParams = useSearchParams()
  const [partners, setPartners] = useState<Partner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState(searchParams.get('status') || 'all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadPartners() {
      const supabase = createClient()

      try {
        let query = supabase
          .from('partners')
          .select(`
            id,
            company_name,
            cui,
            is_approved,
            created_at,
            approved_at,
            user_profile:user_profiles!partners_user_id_fkey (first_name, last_name, email, phone)
          `)
          .order('created_at', { ascending: false })

        if (statusFilter === 'pending') {
          query = query.eq('is_approved', false)
        } else if (statusFilter === 'approved') {
          query = query.eq('is_approved', true)
        }

        const { data, error } = await query

        if (error) throw error

        // Transform data to handle array relations
        const transformedData = (data || []).map(p => ({
          ...p,
          user_profile: Array.isArray(p.user_profile) ? p.user_profile[0] : p.user_profile
        }))

        setPartners(transformedData)
      } catch (error) {
        console.error('Error loading partners:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPartners()
  }, [statusFilter])

  const filteredPartners = partners.filter(partner => {
    if (!searchQuery) return true
    const search = searchQuery.toLowerCase()
    return (
      partner.company_name?.toLowerCase().includes(search) ||
      partner.user_profile?.first_name?.toLowerCase().includes(search) ||
      partner.user_profile?.last_name?.toLowerCase().includes(search) ||
      partner.user_profile?.email?.toLowerCase().includes(search) ||
      partner.cui?.toLowerCase().includes(search)
    )
  })

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
        <h1 className="text-2xl font-bold text-gray-900">Parteneri</h1>
        <p className="text-gray-500 mt-1">
          Gestionează conturile partenerilor B2B
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-2xl text-left transition-colors ${
            statusFilter === 'all' ? 'bg-gray-900 text-white' : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5" />
            <span className="font-medium">Toți</span>
          </div>
          <p className={`text-2xl font-bold mt-2 ${statusFilter === 'all' ? 'text-white' : 'text-gray-900'}`}>
            {partners.length}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter('pending')}
          className={`p-4 rounded-2xl text-left transition-colors ${
            statusFilter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <Clock className={`w-5 h-5 ${statusFilter === 'pending' ? 'text-white' : 'text-yellow-600'}`} />
            <span className="font-medium">În așteptare</span>
          </div>
          <p className={`text-2xl font-bold mt-2 ${statusFilter === 'pending' ? 'text-white' : 'text-gray-900'}`}>
            {partners.filter(p => !p.is_approved).length}
          </p>
        </button>

        <button
          onClick={() => setStatusFilter('approved')}
          className={`p-4 rounded-2xl text-left transition-colors ${
            statusFilter === 'approved' ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <CheckCircle className={`w-5 h-5 ${statusFilter === 'approved' ? 'text-white' : 'text-green-600'}`} />
            <span className="font-medium">Aprobați</span>
          </div>
          <p className={`text-2xl font-bold mt-2 ${statusFilter === 'approved' ? 'text-white' : 'text-gray-900'}`}>
            {partners.filter(p => p.is_approved).length}
          </p>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Caută după nume, email, companie sau CUI..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
        />
      </div>

      {/* Partners List */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {filteredPartners.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {partners.length === 0
                ? 'Niciun partener înregistrat încă'
                : 'Nu s-au găsit rezultate'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                    Partener
                  </th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-4">
                    Contact
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
                {filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {partner.company_name}
                        </p>
                        {partner.cui && (
                          <p className="text-sm text-gray-500">CUI: {partner.cui}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-900">
                          {partner.user_profile?.first_name} {partner.user_profile?.last_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {partner.user_profile?.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {partner.is_approved ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                          <CheckCircle className="w-4 h-4" />
                          Aprobat
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                          <Clock className="w-4 h-4" />
                          În așteptare
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(partner.created_at).toLocaleDateString('ro-RO', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/partners/${partner.id}`}
                        className="inline-flex items-center gap-1 text-crimson hover:underline text-sm font-medium"
                      >
                        Detalii
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminPartnersPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse" />
        <div className="bg-white rounded-2xl h-96 animate-pulse" />
      </div>
    }>
      <PartnersContent />
    </Suspense>
  )
}
