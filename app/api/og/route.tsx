import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'XEH.ro - eXpert Echipamente Horeca'
  const subtitle = searchParams.get('subtitle') || 'Echipamente profesionale pentru industria HoReCa'
  const type = searchParams.get('type') || 'default' // default, blog, product, category

  // Color schemes based on type
  const colors = {
    default: { bg: '#1a1a2e', accent: '#dc2626' },
    blog: { bg: '#1e3a5f', accent: '#dc2626' },
    product: { bg: '#1a1a2e', accent: '#dc2626' },
    category: { bg: '#0f172a', accent: '#dc2626' },
  }

  const color = colors[type as keyof typeof colors] || colors.default

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: color.bg,
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top: Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '36px',
              fontWeight: 'bold',
            }}
          >
            <span style={{ color: '#ffffff' }}>XEH</span>
            <span style={{ color: color.accent }}>.ro</span>
          </div>
          <div
            style={{
              color: '#9ca3af',
              fontSize: '20px',
              marginLeft: '16px',
            }}
          >
            eXpert Echipamente Horeca
          </div>
        </div>

        {/* Middle: Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '900px',
          }}
        >
          <div
            style={{
              fontSize: title.length > 50 ? '48px' : '56px',
              fontWeight: 'bold',
              color: '#ffffff',
              lineHeight: 1.2,
              letterSpacing: '-1px',
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: '24px',
                color: '#9ca3af',
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Bottom: Brands */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
            }}
          >
            <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold' }}>RM</span>
            <span style={{ color: '#9ca3af', fontSize: '16px' }}>Gastro</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
            }}
          >
            <span style={{ color: color.accent, fontSize: '18px', fontWeight: 'bold' }}>REDFOX</span>
          </div>
          <div
            style={{
              color: '#6b7280',
              fontSize: '16px',
              marginLeft: 'auto',
            }}
          >
            xeh.ro
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
