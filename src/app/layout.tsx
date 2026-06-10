import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import AuthGate from '@/components/AuthGate'

export const metadata: Metadata = {
  metadataBase: new URL('https://polla-mundial-2026-sand.vercel.app'),
  title: 'Polla Mundial 2026 ⚽🏆',
  description: 'Pronostica los 104 partidos, elige campeón, goleador y MVP. 12 amigos, $360.000 en juego. ¡Entra y juega!',
  openGraph: {
    title: 'Polla Mundial 2026 ⚽🏆',
    description: 'Pronostica los 104 partidos, elige campeón, goleador y MVP. ¡Entra y juega!',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Polla Mundial 2026 ⚽🏆',
    description: 'Pronostica los 104 partidos, elige campeón, goleador y MVP. ¡Entra y juega!',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-pitch text-gray-100 font-body">
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <AuthGate>{children}</AuthGate>
        </main>
      </body>
    </html>
  )
}
