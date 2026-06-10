'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Profile } from '@/types'

export default function Navigation() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      if (data) setProfile(data)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') { setProfile(null); return }
      if (session?.user) {
        const { data } = await supabase
          .from('profiles').select('*').eq('id', session.user.id).single()
        if (data) setProfile(data)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors hover:text-gold ${
        pathname === href ? 'text-gold' : 'text-gray-400'
      }`}
      onClick={() => setMenuOpen(false)}
    >
      {label}
    </Link>
  )

  return (
    <nav className="sticky top-0 z-50 border-b border-pitch-border bg-pitch/95 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="font-display text-2xl tracking-wider text-gold hover:text-gold-light transition-colors">
          ⚽ MUNDIAL 2026
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-6">
          {profile && navLink('/', 'Tabla')}
          {profile && navLink('/envivo', 'En vivo')}
          {profile && navLink('/fixture', 'Fixture')}
          {profile && navLink('/comparar', 'Comparar')}
          {profile && navLink('/rules', 'Reglas')}
          {profile && navLink('/predictions', 'Mis Pronósticos')}
          {profile?.is_admin && navLink('/admin', 'Admin')}
        </div>

        {/* User section */}
        <div className="hidden sm:flex items-center gap-3">
          {profile ? (
            <>
              <span className="text-xs text-gray-500">
                {profile.champion && <span className="text-gold-dark mr-1">🏆 {profile.champion}</span>}
                {profile.username}
              </span>
              <button
                onClick={signOut}
                className="text-xs text-gray-500 hover:text-red-400 transition-colors border border-pitch-border rounded px-2 py-1"
              >
                Salir
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              className="text-xs font-semibold bg-gold text-pitch px-3 py-1.5 rounded hover:bg-gold-light transition-colors"
            >
              Ingresar
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-gray-400 hover:text-gold"
          onClick={() => setMenuOpen(v => !v)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden bg-pitch-card border-t border-pitch-border px-4 py-4 flex flex-col gap-4">
          {profile && navLink('/', 'Tabla')}
          {profile && navLink('/envivo', 'En vivo')}
          {profile && navLink('/fixture', 'Fixture')}
          {profile && navLink('/comparar', 'Comparar')}
          {profile && navLink('/rules', 'Reglas')}
          {profile && navLink('/predictions', 'Mis Pronósticos')}
          {profile?.is_admin && navLink('/admin', 'Admin')}
          <div className="border-t border-pitch-border pt-4">
            {profile ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{profile.username}</span>
                <button onClick={signOut} className="text-xs text-red-400">Salir</button>
              </div>
            ) : (
              <Link href="/auth" className="block text-center bg-gold text-pitch font-semibold px-4 py-2 rounded" onClick={() => setMenuOpen(false)}>
                Ingresar / Registrarse
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
