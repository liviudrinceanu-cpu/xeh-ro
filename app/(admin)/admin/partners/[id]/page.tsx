'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/components/providers/AuthProvider'
import {
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Tag,
  Plus,
  Trash2,
  Save
} from 'lucide-react'
import type { PartnerDiscountRule } from '@/types/database'

type PartnerDetail = {
  id: string
  user_id: string
  company_name: string
  cui: string | null
  reg_com: string | null
  address: string | null
  is_approved: boolean
  credit_limit: number | null
  created_at: string
  approved_at: string | null
  approved_by: string | null
  user_profile: {
    id: string
    first_name: string
    last_name: string
    email: string
    phone: string | null
  } | null
}

export default function AdminPartnerDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { profile } = useAuth()
  const [partner, setPartner] = useState<PartnerDetail | null>(null)
  const [discountRules, setDiscountRules] = useState<PartnerDiscountRule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [newRule, setNewRule] = useState({
    applies_to: 'all' as 'all' | 'brand' | 'category' | 'product',
    brand: '',
    discount_type: 'percentage' as 'percentage' | 'fixed',
    discount_value: 0,
  })
  const [isSavingRule, setIsSavingRule] = useState(false)

  useEffect(() => {
    async function loadPartner() {
      if (!params.id) return

      const supabase = createClient()

      try {
        // Load partner details
        // Use !user_id hint to specify which foreign key (partners has both user_id and approved_by referencing user_profiles)
        const { data: partnerData, error: partnerError } = await supabase
          .from('partners')
          .select(`
            *,
            user_profile:user_profiles!user_id (id, first_name, last_name, email, phone)
          `)
          .eq('id', params.id)
          .single()

        if (partnerError) throw partnerError

        // Transform data
        const transformedPartner = {
          ...partnerData,
          user_profile: Array.isArray(partnerData.user_profile)
            ? partnerData.user_profile[0]
            : partnerData.user_profile
        }

        setPartner(transformedPartner)

        // Load discount rules
        const { data: rulesData } = await supabase
          .from('partner_discount_rules')
          .select('*')
          .eq('partner_id', params.id)
          .order('created_at', { ascending: false })

        setDiscountRules(rulesData || [])
      } catch (error) {
        console.error('Error loading partner:', error)
        router.push('/admin/partners')
      } finally {
        setIsLoading(false)
      }
    }

    loadPartner()
  }, [params.id, router])

  const handleApprove = async () => {
    if (!partner || !profile) return

    setIsApproving(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('partners')
        .update({
          is_approved: true,
          approved_at: new Date().toISOString(),
          approved_by: profile.id,
        })
        .eq('id', partner.id)

      if (error) throw error

      // Send approval email
      await fetch('/api/admin/partners/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: partner.id,
          action: 'approved',
        }),
      })

      setPartner({ ...partner, is_approved: true, approved_at: new Date().toISOString() })
    } catch (error) {
      console.error('Error approving partner:', error)
      alert('Eroare la aprobarea partenerului')
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    if (!partner) return

    const reason = prompt('Motivul respingerii (opțional):')

    setIsRejecting(true)

    try {
      const supabase = createClient()

      // Delete the partner and associated user
      const { error } = await supabase
        .from('partners')
        .delete()
        .eq('id', partner.id)

      if (error) throw error

      // Send rejection email
      await fetch('/api/admin/partners/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          partnerId: partner.id,
          action: 'rejected',
          reason,
          email: partner.user_profile?.email,
          name: partner.user_profile?.first_name,
        }),
      })

      router.push('/admin/partners')
    } catch (error) {
      console.error('Error rejecting partner:', error)
      alert('Eroare la respingerea partenerului')
    } finally {
      setIsRejecting(false)
    }
  }

  const handleAddDiscountRule = async () => {
    if (!partner || newRule.discount_value <= 0) return

    setIsSavingRule(true)

    try {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('partner_discount_rules')
        .insert({
          partner_id: partner.id,
          applies_to: newRule.applies_to,
          brand: newRule.applies_to === 'brand' ? newRule.brand : null,
          discount_type: newRule.discount_type,
          discount_value: newRule.discount_value,
          is_active: true,
        })
        .select()
        .single()

      if (error) throw error

      setDiscountRules([data, ...discountRules])
      setNewRule({
        applies_to: 'all',
        brand: '',
        discount_type: 'percentage',
        discount_value: 0,
      })
    } catch (error) {
      console.error('Error adding discount rule:', error)
      alert('Eroare la adăugarea regulii de discount')
    } finally {
      setIsSavingRule(false)
    }
  }

  const handleDeleteRule = async (ruleId: string) => {
    if (!confirm('Sigur vrei să ștergi această regulă?')) return

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('partner_discount_rules')
        .delete()
        .eq('id', ruleId)

      if (error) throw error

      setDiscountRules(discountRules.filter(r => r.id !== ruleId))
    } catch (error) {
      console.error('Error deleting rule:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse" />
        <div className="bg-white rounded-2xl h-96 animate-pulse" />
      </div>
    )
  }

  if (!partner) return null

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back button */}
      <Link
        href="/admin/partners"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Înapoi la parteneri
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-gray-900">{partner.company_name}</h1>
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
          </div>
        </div>

        {!partner.is_approved && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleReject}
              disabled={isRejecting}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
            >
              <XCircle className="w-5 h-5" />
              {isRejecting ? 'Se procesează...' : 'Respinge'}
            </button>
            <button
              onClick={handleApprove}
              disabled={isApproving}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors disabled:opacity-50"
            >
              <CheckCircle className="w-5 h-5" />
              {isApproving ? 'Se aprobă...' : 'Aprobă Partenerul'}
            </button>
          </div>
        )}
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-gray-400" />
          Informații Companie
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Denumire</p>
            <p className="text-gray-900 font-medium">{partner.company_name}</p>
          </div>
          {partner.cui && (
            <div>
              <p className="text-sm text-gray-500">CUI</p>
              <p className="text-gray-900 font-medium">{partner.cui}</p>
            </div>
          )}
          {partner.reg_com && (
            <div>
              <p className="text-sm text-gray-500">Nr. Reg. Com.</p>
              <p className="text-gray-900 font-medium">{partner.reg_com}</p>
            </div>
          )}
          {partner.address && (
            <div className="sm:col-span-2">
              <p className="text-sm text-gray-500">Adresă</p>
              <p className="text-gray-900 font-medium">{partner.address}</p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Persoană de Contact</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Nume</p>
            <p className="text-gray-900 font-medium">
              {partner.user_profile?.first_name} {partner.user_profile?.last_name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <a
              href={`mailto:${partner.user_profile?.email}`}
              className="text-crimson hover:underline flex items-center gap-1"
            >
              <Mail className="w-4 h-4" />
              {partner.user_profile?.email}
            </a>
          </div>
          {partner.user_profile?.phone && (
            <div>
              <p className="text-sm text-gray-500">Telefon</p>
              <a
                href={`tel:${partner.user_profile.phone}`}
                className="text-crimson hover:underline flex items-center gap-1"
              >
                <Phone className="w-4 h-4" />
                {partner.user_profile.phone}
              </a>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500">Înregistrat pe</p>
            <p className="text-gray-900 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              {new Date(partner.created_at).toLocaleDateString('ro-RO', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Discount Rules - Only show for approved partners */}
      {partner.is_approved && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <Tag className="w-5 h-5 text-gray-400" />
              Reguli Discount
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Configurează discount-urile pentru acest partener
            </p>
          </div>

          {/* Add New Rule */}
          <div className="p-6 bg-gray-50 border-b border-gray-100">
            <div className="flex flex-wrap items-end gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Se aplică la
                </label>
                <select
                  value={newRule.applies_to}
                  onChange={e => setNewRule({ ...newRule, applies_to: e.target.value as typeof newRule.applies_to })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson"
                >
                  <option value="all">Toate produsele</option>
                  <option value="brand">Brand specific</option>
                </select>
              </div>

              {newRule.applies_to === 'brand' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Brand
                  </label>
                  <select
                    value={newRule.brand}
                    onChange={e => setNewRule({ ...newRule, brand: e.target.value })}
                    className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson"
                  >
                    <option value="">Selectează brand</option>
                    <option value="rm">RM Gastro</option>
                    <option value="redfox">REDFOX</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tip discount
                </label>
                <select
                  value={newRule.discount_type}
                  onChange={e => setNewRule({ ...newRule, discount_type: e.target.value as 'percentage' | 'fixed' })}
                  className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson"
                >
                  <option value="percentage">Procentual (%)</option>
                  <option value="fixed">Fix (EUR)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Valoare
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newRule.discount_value || ''}
                  onChange={e => setNewRule({ ...newRule, discount_value: parseFloat(e.target.value) || 0 })}
                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson"
                  placeholder="0"
                />
              </div>

              <button
                onClick={handleAddDiscountRule}
                disabled={isSavingRule || newRule.discount_value <= 0 || (newRule.applies_to === 'brand' && !newRule.brand)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-crimson hover:bg-crimson-dark text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                {isSavingRule ? 'Se salvează...' : 'Adaugă'}
              </button>
            </div>
          </div>

          {/* Existing Rules */}
          {discountRules.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Nicio regulă de discount configurată
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {discountRules.map((rule) => (
                <div key={rule.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Tag className="w-5 h-5 text-green-600" />
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
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
