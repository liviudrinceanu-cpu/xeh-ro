'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Tag, Search, Trash2, Users, ChevronRight } from 'lucide-react'
import type { PartnerDiscountRule } from '@/types/database'

type DiscountRuleWithPartner = PartnerDiscountRule & {
  partner: {
    id: string
    company_name: string
    user_profile: { first_name: string; last_name: string } | null
  } | null
}

export default function AdminDiscountsPage() {
  const [rules, setRules] = useState<DiscountRuleWithPartner[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    async function loadRules() {
      const supabase = createClient()

      try {
        const { data, error } = await supabase
          .from('partner_discount_rules')
          .select(`
            *,
            partner:partners (
              id,
              company_name,
              user_profile:user_profiles (first_name, last_name)
            )
          `)
          .order('created_at', { ascending: false })

        if (error) throw error

        // Transform data to handle array relations
        const transformedData = (data || []).map(rule => ({
          ...rule,
          partner: Array.isArray(rule.partner) ? rule.partner[0] : rule.partner,
        })).map(rule => ({
          ...rule,
          partner: rule.partner ? {
            ...rule.partner,
            user_profile: Array.isArray(rule.partner.user_profile)
              ? rule.partner.user_profile[0]
              : rule.partner.user_profile
          } : null
        }))

        setRules(transformedData as DiscountRuleWithPartner[])
      } catch (error) {
        console.error('Error loading discount rules:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadRules()
  }, [])

  const filteredRules = rules.filter(rule => {
    if (!searchQuery) return true
    const search = searchQuery.toLowerCase()
    return (
      rule.partner?.company_name?.toLowerCase().includes(search) ||
      rule.brand?.toLowerCase().includes(search)
    )
  })

  const handleDeleteRule = async (ruleId: string) => {
    if (!confirm('Sigur vrei să ștergi această regulă de discount?')) return

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('partner_discount_rules')
        .delete()
        .eq('id', ruleId)

      if (error) throw error

      setRules(rules.filter(r => r.id !== ruleId))
    } catch (error) {
      console.error('Error deleting rule:', error)
    }
  }

  const toggleRuleActive = async (ruleId: string, isActive: boolean) => {
    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('partner_discount_rules')
        .update({ is_active: !isActive })
        .eq('id', ruleId)

      if (error) throw error

      setRules(rules.map(r =>
        r.id === ruleId ? { ...r, is_active: !isActive } : r
      ))
    } catch (error) {
      console.error('Error toggling rule:', error)
    }
  }

  // Group rules by partner
  const rulesByPartner = filteredRules.reduce((acc, rule) => {
    const partnerId = rule.partner_id
    if (!acc[partnerId]) {
      acc[partnerId] = {
        partner: rule.partner,
        rules: [],
      }
    }
    acc[partnerId].rules.push(rule)
    return acc
  }, {} as Record<string, { partner: DiscountRuleWithPartner['partner']; rules: DiscountRuleWithPartner[] }>)

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
        <h1 className="text-2xl font-bold text-gray-900">Discount-uri</h1>
        <p className="text-gray-500 mt-1">
          Vizualizează toate regulile de discount active
        </p>
      </div>

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <p className="text-blue-800">
          <strong>Notă:</strong> Pentru a adăuga discount-uri noi, accesează pagina de detalii a partenerului din secțiunea{' '}
          <Link href="/admin/partners" className="text-crimson hover:underline">Parteneri</Link>.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Tag className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{rules.length}</p>
              <p className="text-gray-500 text-sm">Total reguli</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Tag className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {rules.filter(r => r.is_active).length}
              </p>
              <p className="text-gray-500 text-sm">Reguli active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Object.keys(rulesByPartner).length}
              </p>
              <p className="text-gray-500 text-sm">Parteneri cu discount</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Caută după partener sau brand..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
        />
      </div>

      {/* Rules by Partner */}
      {Object.keys(rulesByPartner).length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            {rules.length === 0
              ? 'Nicio regulă de discount configurată'
              : 'Nu s-au găsit rezultate'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(rulesByPartner).map(([partnerId, { partner, rules: partnerRules }]) => (
            <div key={partnerId} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Partner Header */}
              <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{partner?.company_name || 'Partener necunoscut'}</p>
                    <p className="text-sm text-gray-500">
                      {partner?.user_profile?.first_name} {partner?.user_profile?.last_name}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/admin/partners/${partnerId}`}
                  className="inline-flex items-center gap-1 text-crimson hover:underline text-sm font-medium"
                >
                  Editează
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Rules */}
              <div className="divide-y divide-gray-100">
                {partnerRules.map((rule) => (
                  <div key={rule.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        rule.is_active ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Tag className={`w-5 h-5 ${rule.is_active ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {rule.discount_type === 'percentage'
                            ? `${rule.discount_value}% discount`
                            : `${rule.discount_value} EUR discount`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {rule.applies_to === 'all' && 'Pe toate produsele'}
                          {rule.applies_to === 'brand' && `Pe brandul ${rule.brand?.toUpperCase()}`}
                          {rule.applies_to === 'category' && 'Pe categorie'}
                          {rule.applies_to === 'product' && 'Pe produs specific'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleRuleActive(rule.id, rule.is_active)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                          rule.is_active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {rule.is_active ? 'Activ' : 'Inactiv'}
                      </button>
                      <button
                        onClick={() => handleDeleteRule(rule.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
