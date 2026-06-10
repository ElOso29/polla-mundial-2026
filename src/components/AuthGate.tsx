'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import AuthPage from '@/app/auth/page'

// Páginas que ya tienen su propio contenido público.
const PUBLIC_PATHS = ['/auth', '/reset']

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState(false)
  const isPublic = PUBLIC_PATHS.includes(pathname)

  useEffect(() => {
    const supabase = createClient()
    let mounted = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return
      setAuthed(!!session)
      setReady(true)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (mounted) setAuthed(!!session)
    })

    return () => { mounted = false; subscription.unsubscribe() }
  }, [])

  // Login y recuperación tienen su propia ruta.
  if (isPublic) return <>{children}</>

  // Mientras verifica la sesión.
  if (!ready) return <div className="text-center py-20 text-gray-500 animate-pulse">Cargando...</div>

  // Sin sesión → mostramos el formulario de ingreso/registro AQUÍ MISMO (centro de la página).
  if (!authed) return <AuthPage />

  return <>{children}</>
}
