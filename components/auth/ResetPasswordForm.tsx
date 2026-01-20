'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Eye, EyeOff, Loader2, Check, ArrowLeft } from 'lucide-react'

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Parola trebuie să aibă minim 8 caractere'),
  password_confirm: z.string(),
}).refine(data => data.password === data.password_confirm, {
  message: 'Parolele nu coincid',
  path: ['password_confirm'],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isValidSession, setIsValidSession] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        setIsValidSession(true)
      } else {
        setError('Link invalid sau expirat. Solicită un nou link de resetare.')
      }
      setIsChecking(false)
    }

    checkSession()
  }, [])

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError(null)

    try {
      const supabase = createClient()

      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password,
      })

      if (updateError) {
        setError(updateError.message)
        return
      }

      setSuccess(true)

      // Sign out and redirect to login after 3 seconds
      setTimeout(async () => {
        await supabase.auth.signOut()
        router.push('/login')
      }, 3000)
    } catch (err) {
      console.error('Reset password error:', err)
      setError('A apărut o eroare. Încearcă din nou.')
    }
  }

  if (isChecking) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <Loader2 className="w-8 h-8 text-crimson animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Se verifică link-ul...</p>
        </div>
      </div>
    )
  }

  if (!isValidSession && !success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">!</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Link Invalid
          </h2>
          <p className="text-gray-500 mb-6">
            {error || 'Link-ul de resetare este invalid sau a expirat.'}
          </p>
          <Link
            href="/forgot-password"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-crimson hover:bg-crimson-dark text-white font-medium rounded-xl transition-colors"
          >
            Solicită un nou link
          </Link>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Parolă Schimbată!
          </h2>
          <p className="text-gray-500 mb-6">
            Parola ta a fost actualizată cu succes.
            Vei fi redirecționat către pagina de autentificare...
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 text-crimson font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Mergi la autentificare
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-600">Parolă Nouă</h1>
          <p className="text-gray-500 mt-2">Introdu noua ta parolă</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Parolă Nouă
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
              Confirmă Parola
            </label>
            <div className="relative">
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                id="password_confirm"
                {...register('password_confirm')}
                className={`w-full px-4 py-3 pr-12 border rounded-xl focus:outline-none focus:ring-2 focus:ring-crimson focus:border-transparent ${
                  errors.password_confirm ? 'border-red-300' : 'border-gray-200'
                }`}
                placeholder="Repetă noua parolă"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-crimson hover:bg-crimson-dark text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Se salvează...
              </>
            ) : (
              'Schimbă Parola'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
