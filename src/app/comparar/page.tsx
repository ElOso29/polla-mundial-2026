'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { getMatchPoints } from '@/lib/scoring'
import type { Match, Prediction, Profile } from '@/types'

export default function CompararPage() {
  const [matches, setMatches]   = useState<Match[]>([])
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [preds, setPreds]       = useState<Prediction[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const load = async () => {
      const [{ data: m }, { data: p }, { data: pr }] = await Promise.all([
        supabase.from('matches').select('*').order('match_number'),
        supabase.from('profiles').select('*'),
        supabase.from('predictions').select('*'),
      ])
      if (m) setMatches(m)
      if (p) setProfiles(p)
      if (pr) setPreds(pr)
      setLoading(false)
    }
    load()
    const channel = supabase
      .channel('comparar-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'predictions' }, load)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  if (loading) return <div className="text-center py-20 text-gray-500 animate-pulse">Cargando...</div>

  const started = matches
    .filter(m => m.match_date && Date.now() >= new Date(m.match_date).getTime())
    .sort((a, b) => b.match_number - a.match_number)

  if (started.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16 space-y-3">
        <h1 className="font-display text-4xl tracking-wider text-gold">COMPARAR</h1>
        <p className="text-gray-400">Todavía no empieza ningún partido.</p>
        <p className="text-gray-600 text-sm">
          Los pronósticos de todos se revelan al iniciar cada partido. Vuelve cuando arranque el primero. 🔒
        </p>
        <Link href="/" className="text-gold hover:underline text-sm inline-block">← Volver a la tabla</Link>
      </div>
    )
  }

  const currentId = selected ?? started[0].id
  const match = matches.find(m => m.id === currentId)!
  const hasResult = match.home_score !== null && match.away_score !== null

  const rows = profiles
    .map(profile => {
      const pred = preds.find(p => p.match_id === currentId && p.user_id === profile.id)
      const { points, exact, partial } = getMatchPoints(match, pred)
      return { profile, pred, points, exact, partial }
    })
    .sort((a, b) => b.points - a.points || a.profile.username.localeCompare(b.profile.username))

  return (
    <div className="space-y-6">
      <h1 className="font-display text-4xl tracking-wider text-gold text-center">COMPARAR PRONÓSTICOS</h1>

      {/* Selector de partido */}
      <div>
        <label className="block text-xs text-gray-400 mb-1">Elige un partido (ya iniciado)</label>
        <select
          value={currentId}
          onChange={e => setSelected(Number(e.target.value))}
          className="w-full bg-pitch border border-pitch-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-gold/50 text-gray-100"
        >
          {started.map(m => (
            <option key={m.id} value={m.id}>
              #{m.match_number} · {m.home_team} vs {m.away_team}
            </option>
          ))}
        </select>
      </div>

      {/* Encabezado del partido */}
      <div className="rounded-xl border border-pitch-border bg-pitch-card p-4 text-center">
        <div className="text-sm text-gray-400">{match.home_team} vs {match.away_team}</div>
        <div className="font-display text-3xl text-gold mt-1">
          {hasResult ? `${match.home_score} – ${match.away_score}` : 'Sin resultado aún'}
        </div>
        {match.venue && <div className="text-xs text-gray-600 mt-1">{match.venue}</div>}
      </div>

      {/* Pronósticos de cada jugador */}
      <div className="rounded-xl border border-pitch-border bg-pitch-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-pitch-border text-gray-500 text-xs uppercase">
              <th className="text-left px-4 py-2">Jugador</th>
              <th className="text-center px-3 py-2">Pronóstico</th>
              <th className="text-right px-4 py-2">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ profile, pred, points, exact, partial }) => (
              <tr key={profile.id} className="border-b border-pitch-border/50">
                <td className="px-4 py-2.5">
                  <Link href={`/player/${profile.id}`} className="hover:text-gold transition-colors">
                    {profile.username}
                  </Link>
                </td>
                <td className="text-center px-3 py-2.5 font-mono font-bold text-gray-200">
                  {pred ? `${pred.home_score} – ${pred.away_score}` : <span className="text-gray-700">—</span>}
                </td>
                <td className="text-right px-4 py-2.5">
                  {hasResult && pred ? (
                    <span className={`font-bold font-mono ${exact ? 'text-gold' : partial ? 'text-blue-400' : 'text-gray-600'}`}>
                      +{points}
                    </span>
                  ) : (
                    <span className="text-gray-700">·</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
