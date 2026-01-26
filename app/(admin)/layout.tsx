'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'
import {
  LayoutDashboard,
  Users,
  Tag,
  FileText,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/partners', label: 'Parteneri', icon: Users },
  { href: '/admin/discounts', label: 'Discount-uri', icon: Tag },
  { href: '/admin/quotes', label: 'Cotații', icon: FileText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { profile, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  // Middleware handles auth protection - just render the layout
  // Profile may be null initially, that's OK
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 transform transition-transform duration-300
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <Link href="/admin" className="flex items-center gap-2">
              <span className="text-xl font-bold text-white">XEH.ro</span>
              <span className="px-2 py-0.5 bg-crimson text-white text-xs font-medium rounded">
                Admin
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href))
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                    ${isActive
                      ? 'bg-crimson text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="w-10 h-10 bg-crimson rounded-full flex items-center justify-center text-white font-semibold">
                {profile?.first_name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">
                  {profile?.first_name || 'Admin'} {profile?.last_name || ''}
                </p>
                <p className="text-gray-400 text-sm truncate">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl transition-colors mt-2"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Deconectare</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 h-16 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-xl"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm ml-4 lg:ml-0">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700">
              Admin
            </Link>
            {pathname !== '/admin' && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 font-medium">
                  {navItems.find(item => pathname.startsWith(item.href) && item.href !== '/admin')?.label || 'Pagină'}
                </span>
              </>
            )}
          </div>

          {/* Back to site */}
          <Link
            href="/"
            className="ml-auto text-sm text-gray-500 hover:text-crimson transition-colors"
          >
            ← Înapoi la site
          </Link>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
