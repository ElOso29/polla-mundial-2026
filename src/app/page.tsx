'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { computeStandings } from '@/lib/scoring'
import type { Profile, Match, Prediction, PlayerStats, Awards, SecretPicks } from '@/types'
import { PRIZES } from '@/types'

const MEDALS = ['🥇', '🥈', '🥉']
const PRIZE_LABELS = [
  `$${(PRIZES.first / 1000).toFixed(0)}.000`,
  `$${(PRIZES.second / 1000).toFixed(0)}.000`,
  `$${(PRIZES.third / 1000).toFixed(0)}.000`,
]

export default function HomePage() {
  const [standings, setStandings] = useState<PlayerStats[]>([])
  const [loading, setLoading]     = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const loadStandings = async () => {
    const supabase = createClient()
    const [{ data: profiles }, { data: matches }, { data: predictions }, { data: awards }, { data: counts }, { data: secrets }] = await Promise.all([
      supabase.from('profiles').select('*'),
      supabase.from('matches').select('*').order('match_number'),
      supabase.from('predictions').select('*'),
      supabase.from('awards').select('*').maybeSingle(),
      supabase.rpc('prediction_counts'),
      supabase.from('secret_picks').select('*'),
    ])
    if (profiles && matches && predictions) {
      const secretByUser: Record<string, SecretPicks> = {}
      for (const s of (secrets ?? []) as SecretPicks[]) if (s.user_id) secretByUser[s.user_id] = s
      const table = computeStandings(
        profiles as Profile[], matches as Match[], predictions as Prediction[], (awards as Awards) ?? null, secretByUser
      )
      // Conteo de pronósticos por jugador (vía función segura, sin exponer el contenido)
      const countMap: Record<string, number> = {}
      for (const r of (counts ?? []) as { user_id: string; n: number }[]) countMap[r.user_id] = Number(r.n)
      for (const s of table) {
        if (countMap[s.profile.id] !== undefined) s.matches_predicted = countMap[s.profile.id]
      }
      setStandings(table)
      setLastUpdate(new Date())
    }
    setLoading(false)
  }

  useEffect(() => {
    loadStandings()

    // Actualización en tiempo real cuando cambien resultados o pronósticos
    const supabase = createClient()
    const channel = supabase
      .channel('standings-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, loadStandings)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'predictions' }, loadStandings)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  if (loading) return <LoadingSkeleton />

  const totalPlayers = standings.length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="font-display text-5xl sm:text-7xl tracking-wider text-gold gold-glow">
          POLLA MUNDIAL 2026
        </h1>
        <p className="text-gray-400 text-sm">
          {totalPlayers} participantes · Bote total:{' '}
          <span className="text-gold font-semibold">$360.000 CLP</span>
        </p>
        <p className="text-gray-600 text-xs">
          Actualizado: {lastUpdate.toLocaleTimeString('es-CL')}
        </p>
      </div>

      {/* Podio top 3 */}
      {standings.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {standings.slice(0, 3).map((s, i) => (
            <Link
              key={s.profile.id}
              href={`/player/${s.profile.id}`}
              className={`relative rounded-xl border p-4 text-center transition-all hover:scale-105 hover:border-gold/50 ${
                i === 0
                  ? 'border-gold/60 bg-gold/5 ring-1 ring-gold/20'
                  : 'border-pitch-border bg-pitch-card'
              }`}
            >
              <div className="text-2xl mb-1">{MEDALS[i]}</div>
              <div className={`font-display text-3xl sm:text-4xl ${i === 0 ? 'text-gold gold-glow' : 'text-gray-100'}`}>
                {s.total_points}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">pts</div>
              <div className="mt-2 font-semibold text-sm truncate">{s.profile.username}</div>
              {s.profile.champion && (
                <div className="mt-1 text-xs text-gold-dark truncate">🏆 {s.profile.champion}</div>
              )}
              <div className="mt-2 text-xs text-gold font-semibold">{PRIZE_LABELS[i]}</div>
            </Link>
          ))}
        </div>
      )}

      {/* Tabla completa */}
      <div className="rounded-xl border border-pitch-border bg-pitch-card overflow-hidden">
        <div className="px-4 py-3 border-b border-pitch-border flex items-center justify-between">
          <h2 className="font-display text-xl tracking-wide text-gold">TABLA DE POSICIONES</h2>
          <button
            onClick={loadStandings}
            className="text-xs text-gray-500 hover:text-gold transition-colors"
          >
            ↻ Actualizar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-pitch-border text-gray-500 text-xs uppercase tracking-wide">
                <th className="text-left px-4 py-2 w-8">#</th>
                <th className="text-left px-4 py-2">Jugador</th>
                <th className="text-right px-3 py-2">Pts</th>
                <th className="text-right px-3 py-2 hidden sm:table-cell">Exactos</th>
                <th className="text-right px-3 py-2 hidden sm:table-cell">Parciales</th>
                <th className="text-right px-3 py-2 hidden md:table-cell">Campeón</th>
                <th className="text-right px-3 py-2 hidden md:table-cell">Pronósticos</th>
              </tr>
            </thead>
            <tbody>
              {standings.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500">
                    Aún no hay participantes registrados
                  </td>
                </tr>
              )}
              {standings.map((s, i) => (
                <tr
                  key={s.profile.id}
                  className={`border-b border-pitch-border/50 transition-colors hover:bg-pitch-muted ${
                    i < 3 ? 'hover:bg-gold/5' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                    {i < 3 ? MEDALS[i] : i + 1}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/player/${s.profile.id}`} className="hover:text-gold transition-colors">
                      <span className="font-medium">{s.profile.username}</span>
                      {s.profile.champion && (
                        <span className="ml-2 text-xs text-gold-dark hidden sm:inline">
                          🏆 {s.profile.champion}
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className={`px-3 py-3 text-right font-bold font-mono tabular-nums ${
                    i === 0 ? 'text-gold' : i < 3 ? 'text-gray-200' : 'text-gray-300'
                  }`}>
                    {s.total_points}
                  </td>
                  <td className="px-3 py-3 text-right text-gray-400 hidden sm:table-cell font-mono">
                    {s.exact_results}
                  </td>
                  <td className="px-3 py-3 text-right text-gray-400 hidden sm:table-cell font-mono">
                    {s.partial_results}
                  </td>
                  <td className="px-3 py-3 text-right hidden md:table-cell">
                    {s.profile.champion
                      ? <span className="text-xs text-gray-400 truncate max-w-[100px] inline-block">{s.profile.champion}</span>
                      : <span className="text-gray-600">—</span>
                    }
                  </td>
                  <td className="px-3 py-3 text-right text-gray-500 text-xs hidden md:table-cell font-mono">
                    {s.matches_predicted}/104
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA para registrarse */}
      {standings.length < 12 && (
        <div className="rounded-xl border border-gold/20 bg-gold/5 p-6 text-center space-y-3">
          <p className="font-display text-2xl text-gold tracking-wide">
            QUEDAN {12 - standings.length} CUPOS
          </p>
          <p className="text-gray-400 text-sm">
            El plazo vence el 11 de junio de 2026. ¡No te quedes afuera!
          </p>
          <Link
            href="/auth"
            className="inline-block bg-gold text-pitch font-bold px-6 py-2.5 rounded-lg hover:bg-gold-light transition-colors"
          >
            Registrarse ahora →
          </Link>
        </div>
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="text-center space-y-2">
        <div className="h-16 bg-pitch-card rounded mx-auto w-3/4" />
        <div className="h-4 bg-pitch-card rounded mx-auto w-1/3" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[0,1,2].map(i => <div key={i} className="h-32 bg-pitch-card rounded-xl shimmer" />)}
      </div>
      <div className="h-64 bg-pitch-card rounded-xl shimmer" />
    </div>
  )
}
