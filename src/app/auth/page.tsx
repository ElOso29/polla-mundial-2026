'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

// Las 48 selecciones clasificadas al Mundial 2026 (sorteo oficial FIFA).
// Los nombres coinciden EXACTAMENTE con los del fixture para que el
// bonus de campeón se calcule bien.
const TEAMS_2026 = [
  'Alemania','Arabia Saudita','Argelia','Argentina','Australia','Austria',
  'Bélgica','Bosnia y Herzegovina','Brasil','Cabo Verde','Canadá','Colombia',
  'Corea del Sur','Costa de Marfil','Croacia','Curazao','Ecuador','Egipto',
  'Escocia','España','Francia','Ghana','Haití','Inglaterra','Irán','Iraq',
  'Japón','Jordania','Marruecos','México','Noruega','Nueva Zelanda','Países Bajos',
  'Panamá','Paraguay','Portugal','Qatar','RD Congo','Rep. Checa','Senegal',
  'Sudáfrica','Suecia','Suiza','Túnez','Turquía','USA','Uruguay','Uzbekistán',
].sort()

const REGISTRATION_DEADLINE = new Date('2026-06-11T00:00:00-05:00')

export default function AuthPage() {
  const [mode, setMode]       = useState<'login' | 'register'>('login')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [champion, setChampion] = useState('')
  const [runnerUp, setRunnerUp] = useState('')
  const [thirdPlace, setThirdPlace] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const router = useRouter()
  const supabase = createClient()

  const registrationOpen = new Date() < REGISTRATION_DEADLINE

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
    if (!champion)         { setError('Debes elegir un campeón.'); return }
    if (!runnerUp)         { setError('Debes elegir un subcampeón.'); return }
    if (!thirdPlace)       { setError('Debes elegir un 3er puesto.'); return }
    if (new Set([champion, runnerUp, thirdPlace]).size < 3) {
      setError('Campeón, subcampeón y 3er puesto deben ser equipos distintos.'); return
    }
    if (username.length < 3) { setError('El nombre de usuario debe tener al menos 3 caracteres.'); return }

    setLoading(true); setError('')

    // Verificar que el username no esté tomado
    const { data: existing } = await supabase
      .from('profiles').select('id').eq('username', username).maybeSingle()
    if (existing) { setError('Ese nombre de usuario ya está en uso.'); setLoading(false); return }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })
    if (signUpError) { setError(signUpError.message); setLoading(false); return }

    // Actualizar perfil con username y campeón
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        username,
        champion,
        runner_up: runnerUp,
        third_place: thirdPlace,
      })
    }
    router.push('/predictions')
    router.refresh()
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
            onClick={() => { setMode(m); setError('') }}
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
          <>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                🥇 Elige tu CAMPEÓN{' '}
                <span className="text-gold text-xs">(+25 pts — no se puede cambiar)</span>
              </label>
              <select
                value={champion}
                onChange={e => setChampion(e.target.value)}
                required
                className="w-full bg-pitch border border-pitch-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50 text-gray-100"
              >
                <option value="">Selecciona un país...</option>
                {TEAMS_2026.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                🥈 Elige tu SUBCAMPEÓN{' '}
                <span className="text-gold text-xs">(+20 pts)</span>
              </label>
              <select
                value={runnerUp}
                onChange={e => setRunnerUp(e.target.value)}
                required
                className="w-full bg-pitch border border-pitch-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50 text-gray-100"
              >
                <option value="">Selecciona un país...</option>
                {TEAMS_2026.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1">
                🥉 Elige tu 3er PUESTO{' '}
                <span className="text-gold text-xs">(+10 pts)</span>
              </label>
              <select
                value={thirdPlace}
                onChange={e => setThirdPlace(e.target.value)}
                required
                className="w-full bg-pitch border border-pitch-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50 text-gray-100"
              >
                <option value="">Selecciona un país...</option>
                {TEAMS_2026.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </>
        )}

        {error && (
          <div className="rounded-lg bg-red-900/20 border border-red-800/50 px-3 py-2 text-sm text-red-400">
            {error}
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
      </form>

      {mode === 'register' && (
        <div className="rounded-xl border border-pitch-border bg-pitch-card/50 p-4 text-xs text-gray-500 space-y-1">
          <p className="text-gray-400 font-semibold">Resumen de la polla</p>
          <p>💰 Bote: $360.000 CLP (12 × $30.000)</p>
          <p>🥇 1er lugar: $252.000 · 🥈 2do: $72.000 · 🥉 3ro: $36.000</p>
          <p>⚽ Exacto = 5pts · Ganador = 3pts · Goles de un equipo = 1pt c/u</p>
          <p>🏆 Campeón +25 · Subcampeón +20 · 3er puesto +10</p>
          <p>📅 Plazo de inscripción: 11 de junio 2026</p>
        </div>
      )}
    </div>
  )
}
