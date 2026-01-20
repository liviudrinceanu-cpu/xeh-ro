import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 12,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
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
            width: '70%',
            height: '100%',
            color: 'white',
            fontWeight: 900,
            fontSize: 11,
            letterSpacing: '-0.5px',
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
            width: '30%',
            height: '100%',
            color: 'white',
            fontWeight: 700,
            fontSize: 7,
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
