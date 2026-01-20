import Link from 'next/link'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple Header */}
      <header className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-0 font-bold text-2xl">
            <span className="bg-crimson text-white px-2.5 py-1.5 rounded-l-md">XEH</span>
            <span className="bg-gray-600 text-white px-2.5 py-1.5 rounded-r-md">.ro</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} XEH.ro - eXpert Echipamente Horeca</p>
      </footer>
    </div>
  )
}
