'use client'

import { useState } from 'react'
import { Share2, Check, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ShareButtonProps {
  title: string
  text?: string
  url?: string
  size?: 'sm' | 'lg'
  className?: string
}

export default function ShareButton({
  title,
  text,
  url,
  size = 'lg',
  className,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  const shareText = text || `Vezi ${title} pe XEH.ro`

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsSharing(true)

    // Try Web Share API first (mobile + some desktop browsers)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        })
        setIsSharing(false)
        return
      } catch (error) {
        // User cancelled or share failed, fall back to clipboard
        if ((error as Error).name === 'AbortError') {
          setIsSharing(false)
          return
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      // Final fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    setIsSharing(false)
  }

  const sizeClasses = {
    sm: 'w-9 h-9',
    lg: 'w-11 h-11',
  }

  const iconSizes = {
    sm: 'w-5 h-5',
    lg: 'w-5 h-5',
  }

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className={cn(
        'flex items-center justify-center rounded-full transition-all duration-200',
        'bg-white/90 backdrop-blur-sm shadow-sm border border-gray-200',
        'hover:bg-white hover:shadow-md hover:scale-110',
        copied && 'bg-green-50 border-green-300',
        isSharing && 'opacity-50 cursor-not-allowed',
        sizeClasses[size],
        className
      )}
      aria-label={copied ? 'Link copiat!' : 'Distribuie produsul'}
      title={copied ? 'Link copiat!' : 'Distribuie'}
    >
      {copied ? (
        <Check className={cn(iconSizes[size], 'text-green-600')} />
      ) : (
        <Share2 className={cn(iconSizes[size], 'text-gray-500 hover:text-crimson transition-colors')} />
      )}
    </button>
  )
}
