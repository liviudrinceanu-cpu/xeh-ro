'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/components/providers/AuthProvider'
import { createClient } from '@/lib/supabase/client'

interface FavoriteButtonProps {
  productId: string
  size?: 'sm' | 'lg'
  className?: string
  initialFavorite?: boolean
}

export default function FavoriteButton({
  productId,
  size = 'sm',
  className,
  initialFavorite = false,
}: FavoriteButtonProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [isFavorite, setIsFavorite] = useState(initialFavorite)
  const [isLoading, setIsLoading] = useState(false)

  // Check if product is favorite on mount (when user is logged in)
  useEffect(() => {
    if (!user) {
      setIsFavorite(false)
      return
    }

    const checkFavorite = async () => {
      const supabase = createClient()
      const { data } = await supabase
        .from('user_favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single()

      setIsFavorite(!!data)
    }

    checkFavorite()
  }, [user, productId])

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Redirect to login if not logged in
    if (!user) {
      router.push('/login')
      return
    }

    setIsLoading(true)
    const supabase = createClient()

    try {
      if (isFavorite) {
        // Remove from favorites
        await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('product_id', productId)

        setIsFavorite(false)
      } else {
        // Add to favorites
        await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            product_id: productId,
          })

        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sizeClasses = {
    sm: 'w-9 h-9',
    lg: 'w-11 h-11',
  }

  const iconSizes = {
    sm: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <button
      onClick={handleFavoriteClick}
      disabled={isLoading}
      className={cn(
        'flex items-center justify-center rounded-full transition-all duration-200',
        'bg-white/90 backdrop-blur-sm shadow-sm border border-gray-200',
        'hover:bg-white hover:shadow-md hover:scale-110',
        isLoading && 'opacity-50 cursor-not-allowed',
        sizeClasses[size],
        className
      )}
      aria-label={isFavorite ? 'Sterge din favorite' : 'Adauga la favorite'}
    >
      {isFavorite ? (
        // Filled heart
        <Heart className={cn(iconSizes[size], 'text-crimson fill-crimson')} />
      ) : (
        // Outline heart
        <Heart className={cn(iconSizes[size], 'text-gray-500 hover:text-crimson transition-colors')} />
      )}
    </button>
  )
}
