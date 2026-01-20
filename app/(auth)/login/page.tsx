import { Suspense } from 'react'
import LoginForm from '@/components/auth/LoginForm'

export const metadata = {
  title: 'Autentificare',
  description: 'Autentifică-te în contul tău de partener XEH.ro',
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-md h-96 bg-white rounded-3xl animate-pulse" />}>
      <LoginForm />
    </Suspense>
  )
}
