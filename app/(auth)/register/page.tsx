import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Înregistrare Partener',
  description: 'Înregistrarea partenerilor este temporar dezactivată.',
}

export default function RegisterPage() {
  // Partner registration temporarily disabled
  redirect('/')
}
