'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

// Páginas que SÍ se pueden ver sin iniciar sesión.
const PUBLIC_PATHS = ['/auth', '/reset']

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [authed, setAuthed] = useState(false)

  const isPublic = PUBLIC_PATHS.includes(pathname)

  useEffect(() => {
    const supabase = createClient()
    let mounted = true

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!mounted) return
      setAuthed(!!session)
      setReady(true)
      if (!session && !PUBLIC_PATHS.includes(pathname)) router.replace('/auth')
    }
    check()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!mounted) return
      setAuthed(!!session)
      if (!session && !PUBLIC_PATHS.includes(pathname)) router.replace('/auth')
    })

    return () => { mounted = false; subscription.unsubscribe() }
  }, [pathname, router])

  // Login y recuperación: siempre visibles.
  if (isPublic) return <>{children}</>

  // Mientras verifica la sesión, no mostramos contenido protegido.
  if (!ready) return <div className="text-center py-20 text-gray-500 animate-pulse">Cargando...</div>

  // Sin sesión: no mostramos nada (se está redirigiendo a /auth).
  if (!authed) return null

  return <>{children}</>
}
