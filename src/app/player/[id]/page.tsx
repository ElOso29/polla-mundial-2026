'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { getMatchPoints } from '@/lib/scoring'
import type { Match, Prediction, Profile, Stage } from '@/types'
import { STAGE_LABELS } from '@/types'

const STAGES_ORDER: Stage[] = ['group', 'r32', 'r16', 'qf', 'sf', '3rd', 'final']

export default function PlayerPage() {
  const { id } = useParams<{ id: string }>()
  const [player,    setPlayer]    = useState<Profile | null>(null)
  const [matches,   setMatches]   = useState<Match[]>([])
  const [preds,     setPreds]     = useState<Record<number, Prediction>>({})
  const [activeStage, setActiveStage] = useState<Stage>('group')
  const [activeGroup, setActiveGroup] = useState<string>('A')
  const [loading,   setLoading]   = useState(true)
  const [notFound,  setNotFound]  = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const [{ data: playerData }, { data: matchData }, { data: predData }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', id).single(),
        supabase.from('matches').select('*').order('match_number'),
        supabase.from('predictions').select('*').eq('user_id', id),
      ])
      if (!playerData) { setNotFound(true); setLoading(false); return }
      setPlayer(playerData)
      if (matchData) setMatches(matchData)
      if (predData) {
        const map: Record<number, Prediction> = {}
        for (const p of predData) map[p.match_id] = p
        setPreds(map)
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <div className="text-center py-20 text-gray-500 animate-pulse">Cargando...</div>
  if (notFound) return (
    <div className="text-center py-20">
      <p className="text-gray-400">Jugador no encontrado</p>
      <Link href="/" className="text-gold hover:underline text-sm mt-2 inline-block">← Volver</Link>
    </div>
  )

  const stages = STAGES_ORDER.filter(s => matches.some(m => m.stage === s))
  const groups = [...new Set(
    matches.filter(m => m.stage === 'group' && m.group_name).map(m => m.group_name!)
  )].sort()

  const filteredMatches = activeStage === 'group'
    ? matches.filter(m => m.stage === 'group' && m.group_name === activeGroup)
    : matches.filter(m => m.stage === activeStage)

  // Stats totales
  let totalPts = 0, exactCount = 0, partialCount = 0
  for (const match of matches) {
    const pred = preds[match.id]
    const { points, exact, partial } = getMatchPoints(match, pred)
    totalPts += points
    if (exact) exactCount++
    if (partial) partialCount++
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <Link href="/" className="text-xs text-gray-500 hover:text-gold transition-colors">
            ← Tabla de posiciones
          </Link>
          <h1 className="font-display text-4xl tracking-wider text-gold mt-1">
            {player!.username}
          </h1>
          {player!.champion && (
            <p className="text-sm text-gold-dark mt-0.5">🏆 Campeón: {player!.champion}</p>
          )}
        </div>
        <div className="flex gap-4 text-center">
          {[
            { label: 'Puntos', value: totalPts, color: 'text-gold' },
            { label: 'Exactos', value: exactCount, color: 'text-gray-200' },
            { label: 'Parciales', value: partialCount, color: 'text-blue-400' },
            { label: 'Pronósticos', value: Object.keys(preds).length, color: 'text-gray-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-pitch-card border border-pitch-border rounded-xl px-3 py-2 min-w-[60px]">
              <div className={`font-bold text-xl font-mono ${color}`}>{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stage tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {stages.map(stage => (
          <button
            key={stage}
            onClick={() => { setActiveStage(stage); if (stage === 'group') setActiveGroup('A') }}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeStage === stage
                ? 'bg-gold text-pitch'
                : 'bg-pitch-card border border-pitch-border text-gray-400 hover:text-gray-200'
            }`}
          >
            {STAGE_LABELS[stage]}
          </button>
        ))}
      </div>

      {/* Group tabs */}
      {activeStage === 'group' && (
        <div className="flex gap-1.5 flex-wrap">
          {groups.map(g => (
            <button key={g} onClick={() => setActiveGroup(g)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                activeGroup === g
                  ? 'bg-gold/20 text-gold border border-gold/50'
                  : 'bg-pitch-card border border-pitch-border text-gray-400 hover:text-gray-200'
              }`}
            >{g}</button>
          ))}
        </div>
      )}

      {/* Matches */}
      <div className="space-y-2">
        {filteredMatches.map(match => {
          const pred = preds[match.id]
          const hasResult = match.home_score !== null
          const { points, exact, partial } = hasResult
            ? getMatchPoints(match, pred)
            : { points: 0, exact: false, partial: false }

          return (
            <div
              key={match.id}
              className={`rounded-xl border p-3 ${
                exact   ? 'border-gold/40 bg-gold/5' :
                partial ? 'border-blue-800/40 bg-blue-900/5' :
                hasResult && pred ? 'border-red-900/30 bg-pitch-card' :
                'border-pitch-border bg-pitch-card'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-6 flex-shrink-0">#{match.match_number}</span>

                <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-sm">
                  <span className="text-right font-semibold">{match.home_team}</span>
                  <div className="text-center">
                    {pred ? (
                      <span className="font-bold text-gray-300">
                        {pred.home_score} – {pred.away_score}
                      </span>
                    ) : (
                      <span className="text-gray-700 text-xs">sin pron.</span>
                    )}
                  </div>
                  <span className="font-semibold">{match.away_team}</span>
                </div>

                {/* Real result */}
                {hasResult && (
                  <div className="flex-shrink-0 text-xs text-gray-500 border-l border-pitch-border pl-3">
                    Res: {match.home_score}–{match.away_score}
                  </div>
                )}

                {/* Points */}
                <div className="flex-shrink-0 w-8 text-right">
                  {hasResult && pred && (
                    <span className={`text-sm font-bold ${exact ? 'text-gold' : partial ? 'text-blue-400' : 'text-gray-600'}`}>
                      +{points}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
