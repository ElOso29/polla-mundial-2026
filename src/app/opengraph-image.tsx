import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Polla Mundial 2026'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 50% 30%, #1a1a1a 0%, #0a0a0a 70%)',
          color: '#e5c66b',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 90, marginBottom: 8 }}>🏆 ⚽</div>
        <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: 4, color: '#e5c66b' }}>
          POLLA MUNDIAL
        </div>
        <div style={{ fontSize: 130, fontWeight: 800, color: '#f0d77f', lineHeight: 1 }}>
          2026
        </div>
        <div style={{ fontSize: 34, color: '#9ca3af', marginTop: 24 }}>
          Pronósticos · 104 partidos · $360.000 en juego
        </div>
      </div>
    ),
    { ...size }
  )
}
