'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onLCP, onFCP, onTTFB, type Metric } from 'web-vitals'

/**
 * Web Vitals Reporter - Tracks Core Web Vitals and reports them to analytics
 *
 * Core Web Vitals tracked:
 * - INP (Interaction to Next Paint) - Responsiveness
 * - LCP (Largest Contentful Paint) - Loading performance
 * - CLS (Cumulative Layout Shift) - Visual stability
 *
 * Additional metrics:
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 */
export function WebVitalsReporter() {
  useEffect(() => {
    const handleMetric = (metric: Metric) => {
      const { id, name, value, rating } = metric

      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${name}:`, {
          value: value.toFixed(2),
          rating,
          id,
        })
      }

      // Send to analytics endpoint
      if (typeof window !== 'undefined' && 'sendBeacon' in navigator) {
        const body = JSON.stringify({
          id,
          name,
          value,
          rating,
          path: window.location.pathname,
        })

        navigator.sendBeacon('/api/vitals', body)
      }
    }

    // Register all Web Vitals observers
    onCLS(handleMetric)
    onINP(handleMetric)
    onLCP(handleMetric)
    onFCP(handleMetric)
    onTTFB(handleMetric)
  }, [])

  return null
}
