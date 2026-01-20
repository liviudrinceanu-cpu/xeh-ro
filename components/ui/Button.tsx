import { forwardRef } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  isLoading?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-crimson hover:bg-crimson-dark text-white hover:shadow-crimson',
  secondary: 'bg-gray-600 hover:bg-gray-500 text-white',
  outline: 'border-2 border-gray-200 hover:border-crimson text-gray-600 hover:text-crimson bg-transparent',
  ghost: 'text-gray-600 hover:text-crimson hover:bg-gray-100 bg-transparent',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, isLoading, children, disabled, ...props }, ref) => {
    const classes = cn(
      'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      variants[variant],
      sizes[size],
      className
    )

    if (href) {
      return (
        <Link href={href} className={classes}>
          {isLoading && <LoadingSpinner />}
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <LoadingSpinner />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}

export default Button
