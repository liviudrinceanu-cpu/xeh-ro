'use client'

import { useState } from 'react'
import PortalSidebar from '@/components/portal/PortalSidebar'
import PortalHeader from '@/components/portal/PortalHeader'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <PortalSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <PortalHeader onMenuClick={() => setSidebarOpen(true)} />

          <main className="p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
