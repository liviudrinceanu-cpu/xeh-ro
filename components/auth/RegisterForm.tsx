'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, ChevronLeft, ChevronRight, Check } from 'lucide-react'

const registerSchema = z.object({
  // Step 1: Account
  email: z.string().email('Email invalid'),
  password: z.string().min(8, 'Parola trebuie să aibă minim 8 caractere'),
  password_confirm: z.string(),
  // Step 2: Personal
  first_name: z.string().min(2, 'Prenumele este obligatoriu'),
  last_name: z.string().min(2, 'Numele este obligatoriu'),
  phone: z.string().min(10, 'Număr de telefon invalid'),
  // Step 3: Company
  company_name: z.string().min(2, 'Numele companiei este obligatoriu'),
  company_cui: z.string().min(2, 'CUI-ul este obligatoriu'),
  company_reg_com: z.string().optional(),
  address_street: z.string().optional(),
  address_city: z.string().optional(),
  address_county: z.string().optional(),
  address_postal_code: z.string().optional(),
  // Consent
  gdpr_consent: z.boolean().refine(val => val === true, 'Trebuie să accepți termenii'),
}).refine(data => data.password === data.password_confirm, {
  message: 'Parolele nu coincid',
  path: ['password_confirm'],
})

type RegisterFormData = z.infer<typeof registerSchema>

const steps = [
  { id: 1, name: 'Cont', fields: ['email', 'password', 'password_confirm'] },
  { id: 2, name: 'Personal', fields: ['first_name', 'last_name', 'phone'] },
  { id: 3, name: 'Companie', fields: ['company_name', 'company_cui', 'company_reg_com', 'address_street', 'address_city', 'address_county', 'address_postal_code', 'gdpr_consent'] },
]

export default function RegisterForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  })

  const nextStep = async () => {
    const fields = steps[currentStep - 1].fields as (keyof RegisterFormData)[]
    const isValid = await trigger(fields)

    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: RegisterFormData) => {
    setError(null)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'A apărut o eroare la înregistrare')
        return
      }

      setSuccess(true)
    } catch (err) {
      console.error('Register error:', err)
      setError('A apărut o eroare. Încearcă din nou.')
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Înregistrare reușită!
          </h2>
          <p className="text-gray-500 mb-6">
            Contul tău a fost creat și este în așteptarea aprobării.
            Vei primi un email de confirmare când contul va fi activat.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-crimson hover:bg-crimson-dark text-white font-medium rounded-xl transition-colors"
          >
            Înapoi la autentificare
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-600">Înregistrare Partener</h1>
          <p className="text-gray-500 mt-2">Creează un cont pentru acces la prețuri speciale</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= step.id
                    ? 'bg-crimson text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={`ml-2 text-sm hidden sm:inline ${
                  currentStep >= step.id ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-3 ${
                    currentStep > step.id ? 'bg-crimson' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Account */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent ${
                    errors.email ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="email@companie.ro"
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
                  Parolă *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password')}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent ${
                      errors.password ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Minim 8 caractere"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-600 mb-2">
                  Confirmă Parola *
                </label>
                <div className="relative">
                  <input
                    type={showPasswordConfirm ? 'text' : 'password'}
                    id="password_confirm"
                    {...register('password_confirm')}
                    className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent ${
                      errors.password_confirm ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="Repetă parola"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPasswordConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password_confirm && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.password_confirm.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Personal */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-600 mb-2">
                    Prenume *
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    {...register('first_name')}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent ${
                      errors.first_name ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {errors.first_name && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.first_name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-600 mb-2">
                    Nume *
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    {...register('last_name')}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent ${
                      errors.last_name ? 'border-red-300' : 'border-gray-200'
                    }`}
                  />
                  {errors.last_name && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.last_name.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent ${
                    errors.phone ? 'border-red-300' : 'border-gray-200'
                  }`}
                  placeholder="07XX XXX XXX"
                />
                {errors.phone && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Company */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-600 mb-2">
                  Nume Companie *
                </label>
                <input
                  type="text"
                  id="company_name"
                  {...register('company_name')}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent ${
                    errors.company_name ? 'border-red-300' : 'border-gray-200'
                  }`}
                />
                {errors.company_name && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.company_name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company_cui" className="block text-sm font-medium text-gray-600 mb-2">
                    CUI / CIF *
                  </label>
                  <input
                    type="text"
                    id="company_cui"
                    {...register('company_cui')}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent ${
                      errors.company_cui ? 'border-red-300' : 'border-gray-200'
                    }`}
                    placeholder="RO12345678"
                  />
                  {errors.company_cui && (
                    <p className="mt-1.5 text-sm text-red-500">{errors.company_cui.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="company_reg_com" className="block text-sm font-medium text-gray-600 mb-2">
                    Nr. Reg. Com.
                  </label>
                  <input
                    type="text"
                    id="company_reg_com"
                    {...register('company_reg_com')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent"
                    placeholder="J40/1234/2020"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address_street" className="block text-sm font-medium text-gray-600 mb-2">
                  Adresă
                </label>
                <input
                  type="text"
                  id="address_street"
                  {...register('address_street')}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent"
                  placeholder="Strada, Nr., Bloc, Scara, Apartament"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="address_city" className="block text-sm font-medium text-gray-600 mb-2">
                    Oraș
                  </label>
                  <input
                    type="text"
                    id="address_city"
                    {...register('address_city')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="address_county" className="block text-sm font-medium text-gray-600 mb-2">
                    Județ
                  </label>
                  <input
                    type="text"
                    id="address_county"
                    {...register('address_county')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="address_postal_code" className="block text-sm font-medium text-gray-600 mb-2">
                    Cod Poștal
                  </label>
                  <input
                    type="text"
                    id="address_postal_code"
                    {...register('address_postal_code')}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('gdpr_consent')}
                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-crimson focus:ring-crimson"
                  />
                  <span className="text-sm text-gray-600">
                    Am citit și sunt de acord cu{' '}
                    <Link href="/termeni" className="text-crimson hover:underline" target="_blank">
                      Termenii și Condițiile
                    </Link>{' '}
                    și{' '}
                    <Link href="/confidentialitate" className="text-crimson hover:underline" target="_blank">
                      Politica de Confidențialitate
                    </Link>
                    . *
                  </span>
                </label>
                {errors.gdpr_consent && (
                  <p className="mt-1.5 text-sm text-red-500">{errors.gdpr_consent.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 px-4 py-2.5 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Înapoi
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 bg-crimson hover:bg-crimson-dark text-white font-medium rounded-xl transition-colors"
              >
                Continuă
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-crimson hover:bg-crimson-dark text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Se creează contul...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Finalizează Înregistrarea
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500">
            Ai deja cont?{' '}
            <Link href="/login" className="text-crimson font-medium hover:underline">
              Autentifică-te
            </Link>
          </p>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        <Link href="/" className="hover:text-crimson">
          ← Înapoi la site
        </Link>
      </p>
    </div>
  )
}
