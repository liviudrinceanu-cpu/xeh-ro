import { NextResponse } from 'next/server'

/**
 * Web Vitals API endpoint - Collects Core Web Vitals metrics
 *
 * This endpoint receives metrics from the WebVitalsReporter client component
 * and logs them for monitoring and analysis.
 *
 * In production, this could be extended to:
 * - Store metrics in a database
 * - Send to analytics services (Google Analytics, Datadog, etc.)
 * - Trigger alerts for poor performance
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, name, value, rating, path } = body

    // Log metrics for monitoring (can be extended to store in DB or send to analytics)
    console.log('[Web Vitals]', {
      metric: name,
      value: typeof value === 'number' ? value.toFixed(2) : value,
      rating,
      path,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[Web Vitals] Error processing metrics:', error)
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
  }
}
