'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { PICKS_DEADLINE } from '@/types'

export default function AuthPage() {
  const [mode, setMode]       = useState<'login' | 'register'>('login')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [info, setInfo]       = useState('')
  const router = useRouter()
  const supabase = createClient()

  const registrationOpen = new Date() < PICKS_DEADLINE

  const handleForgot = async () => {
    setError(''); setInfo('')
    if (!email) { setError('Escribe tu email arriba y vuelve a tocar el enlace.'); return }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset`,
    })
    if (error) setError(error.message)
    else setInfo('Te enviamos un correo para restablecer tu contraseña. Revisa tu bandeja (y la carpeta de spam).')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    router.push('/predictions')
    router.refresh()
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!registrationOpen) { setError('El plazo de inscripción ha cerrado.'); return }
    if (username.length < 3) { setError('El nombre de usuario debe tener al menos 3 caracteres.'); return }

    setLoading(true); setError(''); setInfo('')

    // Verificar que el username no esté tomado
    const { data: existing } = await supabase
      .from('profiles').select('id').eq('username', username).maybeSingle()
    if (existing) { setError('Ese nombre de usuario ya está en uso.'); setLoading(false); return }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })
    setLoading(false)
    if (signUpError) { setError(signUpError.message); return }

    if (data.session) {
      // Sin confirmación de email: ya hay sesión, entra directo
      router.push('/predictions'); router.refresh()
    } else {
      // Con confirmación de email: hay que confirmar el correo antes de entrar
      setMode('login')
      setInfo('¡Cuenta creada! 📧 Te enviamos un correo para confirmar tu cuenta. Ábrelo, haz clic en el enlace y luego inicia sesión. Después podrás elegir tu campeón, podio y pronósticos.')
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h1 className="font-display text-4xl tracking-wider text-gold">
          {mode === 'login' ? 'INGRESAR' : 'REGISTRARSE'}
        </h1>
        {!registrationOpen && mode === 'register' && (
          <p className="mt-2 text-red-400 text-sm">⛔ Inscripción cerrada (11 jun 2026)</p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex rounded-lg overflow-hidden border border-pitch-border">
        {(['login', 'register'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); setError(''); setInfo('') }}
            className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
              mode === m
                ? 'bg-gold text-pitch'
                : 'bg-pitch-card text-gray-400 hover:text-gray-200'
            }`}
          >
            {m === 'login' ? 'Ya tengo cuenta' : 'Crear cuenta'}
          </button>
        ))}
      </div>

      <form
        onSubmit={mode === 'login' ? handleLogin : handleRegister}
        className="space-y-4 bg-pitch-card border border-pitch-border rounded-xl p-6"
      >
        {mode === 'register' && (
          <div>
            <label className="block text-xs text-gray-400 mb-1">Nombre de usuario</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value.replace(/\s/g, '_'))}
              placeholder="Ej: el_mago_chileno"
              required
              maxLength={30}
              className="w-full bg-pitch border border-pitch-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50 text-gray-100"
            />
            <p className="text-xs text-gray-600 mt-1">Este nombre aparecerá en la tabla pública</p>
          </div>
        )}

        <div>
          <label className="block text-xs text-gray-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="w-full bg-pitch border border-pitch-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50 text-gray-100"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            required
            minLength={6}
            className="w-full bg-pitch border border-pitch-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50 text-gray-100"
          />
        </div>

        {mode === 'register' && (
          <p className="text-xs text-gray-500 bg-pitch border border-pitch-border rounded-lg px-3 py-2">
            🏆 Tu campeón, subcampeón, 3er puesto y premios (goleador, MVP...) los eliges en <span className="text-gold">"Mis Pronósticos"</span> una vez que entres. Plazo: 11 jun 14:00.
          </p>
        )}

        {error && (
          <div className="rounded-lg bg-red-900/20 border border-red-800/50 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}
        {info && (
          <div className="rounded-lg bg-green-900/20 border border-green-800/50 px-3 py-2 text-sm text-green-400">
            {info}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || (mode === 'register' && !registrationOpen)}
          className="w-full bg-gold text-pitch font-bold py-3 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? 'Cargando...'
            : mode === 'login'
              ? 'Entrar →'
              : 'Crear cuenta y elegir pronósticos →'
          }
        </button>

        {mode === 'login' && (
          <button
            type="button"
            onClick={handleForgot}
            className="w-full text-xs text-gray-500 hover:text-gold transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </button>
        )}
      </form>

      {mode === 'register' && (
        <div className="rounded-xl border border-pitch-border bg-pitch-card/50 p-4 text-xs text-gray-500 space-y-1">
          <p className="text-gray-400 font-semibold">Resumen de la polla</p>
          <p>💰 Bote: $360.000 CLP (12 × $30.000)</p>
          <p>🥇 1er lugar: $252.000 · 🥈 2do: $72.000 · 🥉 3ro: $36.000</p>
          <p>⚽ Exacto = 5pts · Ganador = 3pts · Goles de un equipo = 1pt c/u</p>
          <p>🏆 Campeón +25 · Subcampeón +20 · 3er puesto +10</p>
          <p>📅 Plazo de inscripción y elecciones: 11 jun 2026, 14:00 (Chile)</p>
        </div>
      )}
    </div>
  )
}
