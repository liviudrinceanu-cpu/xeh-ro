'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'
import type { UserProfile, Partner } from '@/types/database'

type AuthContextType = {
  user: User | null
  session: Session | null
  profile: UserProfile | null
  partner: Partner | null
  isLoading: boolean
  isPartner: boolean
  isAdmin: boolean
  isApproved: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  partner: null,
  isLoading: true,
  isPartner: false,
  isAdmin: false,
  isApproved: false,
  signOut: async () => {},
  refreshProfile: async () => {},
})

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [partner, setPartner] = useState<Partner | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = createClient()

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (profileError) {
        console.error('Error fetching profile:', profileError)
        return
      }

      setProfile(profileData)

      // Fetch partner data if user is a partner
      if (profileData?.role === 'partner') {
        const { data: partnerData, error: partnerError } = await supabase
          .from('partners')
          .select('*')
          .eq('user_id', userId)
          .single()

        if (!partnerError && partnerData) {
          setPartner(partnerData)
        }
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error)
    }
  }, [supabase])

  const refreshProfile = useCallback(async () => {
    if (user?.id) {
      await fetchProfile(user.id)
    }
  }, [user?.id, fetchProfile])

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession()

        setSession(initialSession)
        setUser(initialSession?.user ?? null)

        if (initialSession?.user) {
          await fetchProfile(initialSession.user.id)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession)
        setUser(newSession?.user ?? null)

        if (event === 'SIGNED_IN' && newSession?.user) {
          await fetchProfile(newSession.user.id)
        }

        if (event === 'SIGNED_OUT') {
          setProfile(null)
          setPartner(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, fetchProfile])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setProfile(null)
    setPartner(null)
  }

  const value: AuthContextType = {
    user,
    session,
    profile,
    partner,
    isLoading,
    isPartner: profile?.role === 'partner',
    isAdmin: profile?.role === 'admin',
    isApproved: partner?.is_approved ?? false,
    signOut,
    refreshProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
