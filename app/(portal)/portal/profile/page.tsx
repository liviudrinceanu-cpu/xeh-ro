'use client'

import { useState } from 'react'
import { useAuth } from '@/components/providers/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { User, Building2, MapPin, Loader2, Check } from 'lucide-react'

export default function ProfilePage() {
  const { profile, partner, refreshProfile, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    first_name: profile?.first_name || '',
    last_name: profile?.last_name || '',
    phone: profile?.phone || '',
    company_name: profile?.company_name || '',
    company_cui: profile?.company_cui || '',
    company_reg_com: profile?.company_reg_com || '',
    address_street: profile?.address_street || '',
    address_city: profile?.address_city || '',
    address_county: profile?.address_county || '',
    address_postal_code: profile?.address_postal_code || '',
  })

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setSaveSuccess(false)

    try {
      const supabase = createClient()

      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone: formData.phone,
          company_name: formData.company_name,
          company_cui: formData.company_cui,
          company_reg_com: formData.company_reg_com,
          address_street: formData.address_street,
          address_city: formData.address_city,
          address_county: formData.address_county,
          address_postal_code: formData.address_postal_code,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile?.id)

      if (updateError) {
        throw updateError
      }

      await refreshProfile()
      setSaveSuccess(true)
      setIsEditing(false)

      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err) {
      console.error('Save error:', err)
      setError('Eroare la salvare. Încearcă din nou.')
    } finally {
      setIsSaving(false)
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

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-600">Profil</h1>
          <p className="text-gray-500 mt-1">Gestionează informațiile contului tău</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => {
              setFormData({
                first_name: profile?.first_name || '',
                last_name: profile?.last_name || '',
                phone: profile?.phone || '',
                company_name: profile?.company_name || '',
                company_cui: profile?.company_cui || '',
                company_reg_com: profile?.company_reg_com || '',
                address_street: profile?.address_street || '',
                address_city: profile?.address_city || '',
                address_county: profile?.address_county || '',
                address_postal_code: profile?.address_postal_code || '',
              })
              setIsEditing(true)
            }}
            className="px-4 py-2 bg-crimson hover:bg-crimson-dark text-white rounded-xl transition-colors"
          >
            Editează
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              Anulează
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-crimson hover:bg-crimson-dark text-white rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Se salvează...
                </>
              ) : (
                'Salvează'
              )}
            </button>
          </div>
        )}
      </div>

      {/* Success/Error messages */}
      {saveSuccess && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700">
          <Check className="w-5 h-5" />
          Modificările au fost salvate cu succes!
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      {/* Account Info */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-crimson-bg text-crimson rounded-xl flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-600">Date Personale</h2>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Prenume</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.first_name}
                onChange={e => setFormData({ ...formData, first_name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
              />
            ) : (
              <p className="text-gray-600">{profile?.first_name || '-'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Nume</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.last_name}
                onChange={e => setFormData({ ...formData, last_name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
              />
            ) : (
              <p className="text-gray-600">{profile?.last_name || '-'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
            <p className="text-gray-600">{profile?.email}</p>
            <p className="text-xs text-gray-400 mt-1">Email-ul nu poate fi modificat</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Telefon</label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
              />
            ) : (
              <p className="text-gray-600">{profile?.phone || '-'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-600">Date Companie</h2>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-2">Nume Companie</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.company_name}
                onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
              />
            ) : (
              <p className="text-gray-600">{profile?.company_name || '-'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">CUI / CIF</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.company_cui}
                onChange={e => setFormData({ ...formData, company_cui: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
              />
            ) : (
              <p className="text-gray-600">{profile?.company_cui || '-'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Nr. Reg. Com.</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.company_reg_com}
                onChange={e => setFormData({ ...formData, company_reg_com: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
              />
            ) : (
              <p className="text-gray-600">{profile?.company_reg_com || '-'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-gray-600">Adresă</h2>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-500 mb-2">Adresă</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address_street}
                onChange={e => setFormData({ ...formData, address_street: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
                placeholder="Strada, Nr., Bloc, Scara, Apartament"
              />
            ) : (
              <p className="text-gray-600">{profile?.address_street || '-'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Oraș</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address_city}
                onChange={e => setFormData({ ...formData, address_city: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
              />
            ) : (
              <p className="text-gray-600">{profile?.address_city || '-'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Județ</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address_county}
                onChange={e => setFormData({ ...formData, address_county: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
              />
            ) : (
              <p className="text-gray-600">{profile?.address_county || '-'}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Cod Poștal</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address_postal_code}
                onChange={e => setFormData({ ...formData, address_postal_code: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson"
              />
            ) : (
              <p className="text-gray-600">{profile?.address_postal_code || '-'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Partner Status */}
      {partner && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Status Partener</h2>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                partner.is_approved
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {partner.is_approved ? 'Cont Aprobat' : 'În Așteptare Aprobare'}
              </span>
              {partner.approved_at && (
                <span className="text-sm text-gray-500">
                  Aprobat pe {new Date(partner.approved_at).toLocaleDateString('ro-RO')}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
