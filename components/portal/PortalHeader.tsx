'use client'

import { Menu, Bell, ChevronDown } from 'lucide-react'
import { useAuth } from '@/components/providers/AuthProvider'
import Link from 'next/link'

interface PortalHeaderProps {
  onMenuClick: () => void
}

export default function PortalHeader({ onMenuClick }: PortalHeaderProps) {
  const { profile, partner } = useAuth()

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-gray-800"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Title - hidden on mobile */}
        <div className="hidden lg:block">
          <h1 className="text-lg font-semibold text-gray-600">Portal Parteneri</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Status badge */}
          {partner && (
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              partner.is_approved
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                partner.is_approved ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              {partner.is_approved ? 'Cont Activ' : 'În Așteptare'}
            </div>
          )}

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <Bell className="w-5 h-5" />
            {/* Notification badge */}
            {/* <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-crimson rounded-full" /> */}
          </button>

          {/* User dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-2 -mr-2 text-gray-600 hover:text-gray-800">
              <div className="w-8 h-8 bg-crimson-bg text-crimson rounded-full flex items-center justify-center font-medium text-sm">
                {profile?.first_name?.[0]}{profile?.last_name?.[0]}
              </div>
              <ChevronDown className="w-4 h-4 hidden sm:block" />
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-600 truncate">
                  {profile?.first_name} {profile?.last_name}
                </p>
                <p className="text-xs text-gray-400 truncate">{profile?.email}</p>
              </div>
              <Link
                href="/portal/profile"
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                Profil
              </Link>
              <Link
                href="/"
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                Înapoi la site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
