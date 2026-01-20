'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Mail, ArrowLeft } from 'lucide-react'

const forgotPasswordSchema = z.object({
  email: z.string().email('Email invalid'),
})

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null)

    try {
      const supabase = createClient()

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      )

      if (resetError) {
        setError(resetError.message)
        return
      }

      setSuccess(true)
    } catch (err) {
      console.error('Forgot password error:', err)
      setError('A apărut o eroare. Încearcă din nou.')
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-crimson-bg rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-crimson" />
          </div>
          <h2 className="text-2xl font-bold text-gray-600 mb-4">
            Verifică email-ul
          </h2>
          <p className="text-gray-500 mb-6">
            Am trimis un link de resetare a parolei la adresa ta de email.
            Verifică și folderul de spam dacă nu găsești email-ul.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 text-crimson font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la autentificare
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-600">Resetare Parolă</h1>
          <p className="text-gray-500 mt-2">
            Introdu adresa de email asociată contului tău
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              autoComplete="email"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-crimson hover:bg-crimson-dark text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Se trimite...
              </>
            ) : (
              'Trimite Link de Resetare'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-crimson font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Înapoi la autentificare
          </Link>
        </div>
      </div>
    </div>
  )
}
