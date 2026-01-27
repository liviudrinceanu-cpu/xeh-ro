'use client'

import { Component, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Ceva nu a funcționat corect
          </h2>
          <p className="text-gray-600 mb-4">
            A apărut o eroare neașteptată. Te rugăm să încerci din nou.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            className="px-4 py-2 bg-crimson text-white rounded-lg hover:bg-crimson-dark transition-colors"
          >
            Încearcă din nou
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// For use with Next.js error boundaries
export default function ErrorFallback({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <AlertTriangle className="w-16 h-16 text-yellow-500 mb-6" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Ceva nu a funcționat corect
      </h2>
      <p className="text-gray-600 mb-6 max-w-md">
        A apărut o eroare neașteptată. Te rugăm să încerci din nou sau să revii mai târziu.
      </p>
      {process.env.NODE_ENV === 'development' && error?.message && (
        <pre className="mb-6 p-4 bg-gray-100 rounded-lg text-sm text-left max-w-full overflow-auto">
          {error.message}
        </pre>
      )}
      <button
        onClick={reset}
        className="px-6 py-3 bg-crimson text-white font-semibold rounded-xl hover:bg-crimson-dark transition-colors"
      >
        Încearcă din nou
      </button>
    </div>
  )
}
