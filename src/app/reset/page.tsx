'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function ResetPasswordPage() {
  const [ready, setReady]   = useState(false)
  const [password, setPassword]   = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState('')
  const [done, setDone]   = useState(false)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setReady(true)
    })
    return () => subscription.unsubscribe()
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 6)   { setError('La contraseña debe tener al menos 6 caracteres.'); return }
    if (password !== password2) { setError('Las contraseñas no coinciden.'); return }
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError('Error: ' + error.message); return }
    setDone(true)
    setTimeout(() => { router.push('/predictions'); router.refresh() }, 1800)
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="font-display text-4xl tracking-wider text-gold text-center">NUEVA CONTRASEÑA</h1>

      {done ? (
        <div className="rounded-xl border border-green-800/50 bg-green-900/20 p-4 text-sm text-green-400 text-center">
          ✓ Contraseña actualizada. Redirigiéndote...
        </div>
      ) : !ready ? (
        <p className="text-center text-gray-500 text-sm">
          Abre esta página desde el enlace que te llegó por correo. Si llegaste aquí directo,
          vuelve a <a href="/auth" className="text-gold hover:underline">Ingresar</a> y pide el enlace.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-4 bg-pitch-card border border-pitch-border rounded-xl p-6">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Nueva contraseña</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres" required minLength={6}
              className="w-full bg-pitch border border-pitch-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50 text-gray-100"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Repite la contraseña</label>
            <input
              type="password" value={password2} onChange={e => setPassword2(e.target.value)}
              required minLength={6}
              className="w-full bg-pitch border border-pitch-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50 text-gray-100"
            />
          </div>
          {error && (
            <div className="rounded-lg bg-red-900/20 border border-red-800/50 px-3 py-2 text-sm text-red-400">{error}</div>
          )}
          <button type="submit" className="w-full bg-gold text-pitch font-bold py-3 rounded-lg hover:bg-gold-light transition-colors">
            Guardar contraseña
          </button>
        </form>
      )}
    </div>
  )
}
