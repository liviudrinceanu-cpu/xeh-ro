import { type NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@/lib/supabase/auth'

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createMiddlewareClient(request)

  // Refresh session if expired
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Protected portal routes - require authenticated user
  if (pathname.startsWith('/portal')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    // Check if partner is approved (only for portal, not for pending page)
    if (!pathname.startsWith('/portal/pending')) {
      const { data: partner } = await supabase
        .from('partners')
        .select('is_approved')
        .eq('user_id', user.id)
        .single()

      // If partner exists but not approved, redirect to pending page
      if (partner && !partner.is_approved) {
        const url = request.nextUrl.clone()
        url.pathname = '/portal/pending'
        return NextResponse.redirect(url)
      }
    }
  }

  // Protected admin routes - require authenticated admin user
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      // Not admin - redirect to portal or home
      const url = request.nextUrl.clone()
      url.pathname = '/portal/dashboard'
      return NextResponse.redirect(url)
    }
  }

  // Redirect logged-in users away from auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    if (user) {
      // Check if admin
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const url = request.nextUrl.clone()
      url.pathname = profile?.role === 'admin' ? '/admin' : '/portal/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/portal/:path*',
    '/admin/:path*',
    '/login',
    '/register',
  ],
}
