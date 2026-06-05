'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { getMatchPoints } from '@/lib/scoring'
import type { Match, Prediction, Profile, Stage } from '@/types'
import { STAGE_LABELS } from '@/types'

type PredMap = Record<number, { home: string; away: string }>
type SavedMap = Record<number, Prediction>

const STAGES_ORDER: Stage[] = ['group', 'r32', 'r16', 'qf', 'sf', '3rd', 'final']

export default function PredictionsPage() {
  const [profile,    setProfile]    = useState<Profile | null>(null)
  const [matches,    setMatches]    = useState<Match[]>([])
  const [saved,      setSaved]      = useState<SavedMap>({})
  const [draft,      setDraft]      = useState<PredMap>({})
  const [activeStage, setActiveStage] = useState<Stage>('group')
  const [activeGroup, setActiveGroup] = useState<string>('A')
  const [saving,     setSaving]     = useState<Record<number, boolean>>({})
  const [loading,    setLoading]    = useState(true)
  const router = useRouter()

  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }

      const [{ data: profileData }, { data: matchData }, { data: predData }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('matches').select('*').order('match_number'),
        supabase.from('predictions').select('*').eq('user_id', user.id),
      ])

      if (profileData) setProfile(profileData)
      if (matchData)   setMatches(matchData)
      if (predData) {
        const savedMap: SavedMap = {}
        const draftMap: PredMap  = {}
        for (const p of predData) {
          savedMap[p.match_id] = p
          draftMap[p.match_id] = { home: String(p.home_score), away: String(p.away_score) }
        }
        setSaved(savedMap)
        setDraft(draftMap)
      }
      setLoading(false)
    }
    load()
  }, [])

  const savePrediction = useCallback(async (matchId: number) => {
    const d = draft[matchId]
    if (!d || d.home === '' || d.away === '') return
    const homeScore = parseInt(d.home)
    const awayScore = parseInt(d.away)
    if (isNaN(homeScore) || isNaN(awayScore)) return
    if (homeScore < 0 || awayScore < 0) return

    setSaving(s => ({ ...s, [matchId]: true }))

    const { data, error } = await supabase
      .from('predictions')
      .upsert(
        { user_id: profile!.id, match_id: matchId, home_score: homeScore, away_score: awayScore },
        { onConflict: 'user_id,match_id' }
      )
      .select()
      .single()

    if (!error && data) {
      setSaved(s => ({ ...s, [matchId]: data }))
    }
    setSaving(s => ({ ...s, [matchId]: false }))
  }, [draft, profile])

  if (loading) return (
    <div className="text-center py-20 text-gray-500 animate-pulse">Cargando pronósticos...</div>
  )

  if (!profile) return null

  const stages = STAGES_ORDER.filter(s => matches.some(m => m.stage === s))
  const groups = [...new Set(
    matches.filter(m => m.stage === 'group' && m.group_name).map(m => m.group_name!)
  )].sort()

  const filteredMatches = activeStage === 'group'
    ? matches.filter(m => m.stage === 'group' && m.group_name === activeGroup)
    : matches.filter(m => m.stage === activeStage)

  const stageTotal = matches.filter(m => m.stage === activeStage)
  const stageSaved = stageTotal.filter(m => saved[m.id]).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="font-display text-4xl tracking-wider text-gold">MIS PRONÓSTICOS</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Hola <span className="text-gray-300">{profile.username}</span>
            {profile.champion && (
              <span className="ml-2 text-gold-dark">🏆 Campeón: {profile.champion}</span>
            )}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gold">
            {Object.keys(saved).length}
            <span className="text-sm text-gray-400 font-normal">/104</span>
          </div>
          <div className="text-xs text-gray-500">pronósticos guardados</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-pitch-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all duration-500"
          style={{ width: `${(Object.keys(saved).length / 104) * 100}%` }}
        />
      </div>

      {/* Stage tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
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
            <span className={`ml-1.5 text-xs ${activeStage === stage ? 'text-pitch/70' : 'text-gray-600'}`}>
              {matches.filter(m => m.stage === stage && saved[m.id]).length}/
              {matches.filter(m => m.stage === stage).length}
            </span>
          </button>
        ))}
      </div>

      {/* Group tabs */}
      {activeStage === 'group' && (
        <div className="flex gap-1.5 flex-wrap">
          {groups.map(g => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                activeGroup === g
                  ? 'bg-gold/20 text-gold border border-gold/50'
                  : 'bg-pitch-card border border-pitch-border text-gray-400 hover:text-gray-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Matches */}
      <div className="space-y-2">
        {filteredMatches.map(match => {
          const pred      = saved[match.id]
          const d         = draft[match.id] ?? { home: '', away: '' }
          const isSaving  = saving[match.id]
          const isLocked  = match.locked
          const hasResult = match.home_score !== null
          const { points, exact, partial } = hasResult
            ? getMatchPoints(match, pred)
            : { points: 0, exact: false, partial: false }

          const matchDate = match.match_date
            ? new Date(match.match_date).toLocaleDateString('es-CL', {
                day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
              })
            : null

          return (
            <div
              key={match.id}
              className={`rounded-xl border p-4 transition-all ${
                isLocked
                  ? 'border-pitch-border bg-pitch-card/50 opacity-80'
                  : exact
                    ? 'border-gold/40 bg-gold/5'
                    : partial
                      ? 'border-blue-800/50 bg-blue-900/5'
                      : hasResult
                        ? 'border-red-900/30 bg-pitch-card'
                        : 'border-pitch-border bg-pitch-card hover:border-pitch-border/80'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Match info */}
                <div className="flex-shrink-0 text-right w-14 hidden sm:block">
                  <div className="text-xs text-gray-500">
                    {match.stage === 'group' && `G.${match.group_name}`}
                    {match.stage !== 'group' && `P${match.match_number}`}
                  </div>
                  {matchDate && <div className="text-xs text-gray-600 mt-0.5">{matchDate}</div>}
                </div>

                {/* Teams + prediction input */}
                <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                  {/* Home */}
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm font-semibold text-right leading-tight">{match.home_team}</span>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={d.home}
                      disabled={isLocked}
                      onChange={e => setDraft(prev => ({ ...prev, [match.id]: { ...d, home: e.target.value } }))}
                      onBlur={() => savePrediction(match.id)}
                      placeholder="—"
                      className={`w-10 h-10 text-center text-lg font-bold rounded-lg border focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors ${
                        isLocked
                          ? 'bg-pitch-muted border-pitch-border text-gray-500 cursor-not-allowed'
                          : 'bg-pitch border-pitch-border text-gray-100 hover:border-gold/30'
                      }`}
                    />
                  </div>

                  {/* VS / Result */}
                  <div className="text-center">
                    {hasResult ? (
                      <div className="flex items-center gap-1 text-sm font-bold text-gray-300">
                        <span>{match.home_score}</span>
                        <span className="text-gray-600">-</span>
                        <span>{match.away_score}</span>
                      </div>
                    ) : (
                      <span className="text-gray-600 text-xs font-bold">VS</span>
                    )}
                  </div>

                  {/* Away */}
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={d.away}
                      disabled={isLocked}
                      onChange={e => setDraft(prev => ({ ...prev, [match.id]: { ...d, away: e.target.value } }))}
                      onBlur={() => savePrediction(match.id)}
                      placeholder="—"
                      className={`w-10 h-10 text-center text-lg font-bold rounded-lg border focus:outline-none focus:ring-1 focus:ring-gold/50 transition-colors ${
                        isLocked
                          ? 'bg-pitch-muted border-pitch-border text-gray-500 cursor-not-allowed'
                          : 'bg-pitch border-pitch-border text-gray-100 hover:border-gold/30'
                      }`}
                    />
                    <span className="text-sm font-semibold text-left leading-tight">{match.away_team}</span>
                  </div>
                </div>

                {/* Points badge */}
                <div className="flex-shrink-0 w-12 text-right">
                  {isSaving && <span className="text-xs text-gray-500 animate-pulse">...</span>}
                  {!isSaving && hasResult && pred && (
                    <span className={`text-sm font-bold ${exact ? 'text-gold' : partial ? 'text-blue-400' : 'text-gray-600'}`}>
                      +{points}
                    </span>
                  )}
                  {!isSaving && !hasResult && pred && (
                    <span className="text-xs text-green-600">✓</span>
                  )}
                  {isLocked && !pred && (
                    <span className="text-xs text-red-800">—</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-xs text-gray-600 text-center pb-4">
        Los pronósticos se guardan automáticamente al salir de cada campo.
        Se bloquean cuando empieza cada partido.
      </p>
    </div>
  )
}
