import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 24,
          overflow: 'hidden',
        }}
      >
        {/* XEH part - crimson */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#DC143C',
            width: '68%',
            height: '100%',
            color: 'white',
            fontWeight: 900,
            fontSize: 56,
            letterSpacing: '-2px',
          }}
        >
          XEH
        </div>
        {/* .ro part - dark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#374151',
            width: '32%',
            height: '100%',
            color: 'white',
            fontWeight: 700,
            fontSize: 32,
          }}
        >
          .ro
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
