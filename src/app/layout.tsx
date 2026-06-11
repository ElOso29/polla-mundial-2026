import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import AuthGate from '@/components/AuthGate'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-display', display: 'swap' })
const dmSans = DM_Sans({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://polla-mundial-2026-sand.vercel.app'),
  title: 'Polla Mundial 2026 ⚽🏆',
  description: 'Pronostica los 104 partidos, elige campeón, goleador y MVP. 10 amigos, $300.000 en juego. ¡Entra y juega!',
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
    <html lang="es" className={`${bebas.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-pitch text-gray-100 font-body">
        <Navigation />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <AuthGate>{children}</AuthGate>
        </main>
      </body>
    </html>
  )
}
