'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Heart,
  Tag,
  User,
  LogOut,
  X
} from 'lucide-react'
import { useAuth } from '@/components/providers/AuthProvider'

const navigation = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
  { name: 'Cotațiile Mele', href: '/portal/quotes', icon: FileText },
  { name: 'Produse Favorite', href: '/portal/favorites', icon: Heart },
  { name: 'Lista Prețuri', href: '/portal/price-list', icon: Tag },
  { name: 'Profil', href: '/portal/profile', icon: User },
]

interface PortalSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function PortalSidebar({ isOpen, onClose }: PortalSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { profile, signOut } = useAuth()

  const handleSignOut = async () => {
    onClose()
    await signOut()
    router.push('/')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Link href="/" className="inline-flex items-center gap-0 font-bold text-xl">
              <span className="bg-crimson text-white px-2 py-1 rounded-l-md">XEH</span>
              <span className="bg-gray-600 text-white px-2 py-1 rounded-r-md">.ro</span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm text-gray-500">Bine ai venit,</p>
            <p className="font-medium text-gray-600 truncate">
              {profile?.first_name} {profile?.last_name}
            </p>
            {profile?.company_name && (
              <p className="text-sm text-gray-500 truncate mt-0.5">
                {profile.company_name}
              </p>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-crimson-bg text-crimson'
                      : 'text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Deconectare
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
