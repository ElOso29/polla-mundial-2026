'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Match, Profile, Stage, Player, Awards } from '@/types'
import { STAGE_LABELS } from '@/types'

type ResultDraft = Record<number, { home: string; away: string }>

const STAGES_ORDER: Stage[] = ['group', 'r32', 'r16', 'qf', 'sf', '3rd', 'final']

export default function AdminPage() {
  const [profile,   setProfile]   = useState<Profile | null>(null)
  const [matches,   setMatches]   = useState<Match[]>([])
  const [results,   setResults]   = useState<ResultDraft>({})
  const [saving,    setSaving]    = useState<Record<number, boolean>>({})
  const [messages,  setMessages]  = useState<Record<number, string>>({})
  const [activeStage, setActiveStage] = useState<Stage>('group')
  const [activeGroup, setActiveGroup] = useState<string>('A')
  const [players,   setPlayers]   = useState<Player[]>([])
  const [awards,    setAwards]    = useState({ top_scorer: '', mvp: '', best_gk: '', young_player: '' })
  const [loading,   setLoading]   = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/auth'); return }

      const { data: profileData } = await supabase
        .from('profiles').select('*').eq('id', user.id).single()

      if (!profileData?.is_admin) { router.push('/'); return }
      setProfile(profileData)

      const { data: playerData } = await supabase.from('players').select('*').order('team')
      if (playerData) setPlayers(playerData)
      const { data: awardData } = await supabase.from('awards').select('*').maybeSingle()
      if (awardData) setAwards({
        top_scorer:   awardData.top_scorer ?? '',
        mvp:          awardData.mvp ?? '',
        best_gk:      awardData.best_gk ?? '',
        young_player: awardData.young_player ?? '',
      })

      const { data: matchData } = await supabase
        .from('matches').select('*').order('match_number')
      if (matchData) {
        setMatches(matchData)
        const draft: ResultDraft = {}
        for (const m of matchData) {
          if (m.home_score !== null) {
            draft[m.id] = { home: String(m.home_score), away: String(m.away_score) }
          }
        }
        setResults(draft)
      }
      setLoading(false)
    }
    load()
  }, [])

  const saveResult = async (matchId: number) => {
    const d = results[matchId]
    if (!d || d.home === '' || d.away === '') return
    const homeScore = parseInt(d.home)
    const awayScore = parseInt(d.away)
    if (isNaN(homeScore) || isNaN(awayScore)) return

    setSaving(s => ({ ...s, [matchId]: true }))
    setMessages(m => ({ ...m, [matchId]: '' }))

    const { error } = await supabase
      .from('matches')
      .update({ home_score: homeScore, away_score: awayScore, locked: true })
      .eq('id', matchId)

    setSaving(s => ({ ...s, [matchId]: false }))
    setMessages(m => ({
      ...m,
      [matchId]: error ? `Error: ${error.message}` : '✓ Guardado'
    }))

    // Actualizar local
    setMatches(prev => prev.map(m =>
      m.id === matchId ? { ...m, home_score: homeScore, away_score: awayScore, locked: true } : m
    ))

    setTimeout(() => setMessages(m => ({ ...m, [matchId]: '' })), 2000)
  }

  const updateTeam = async (matchId: number, field: 'home_team' | 'away_team', value: string) => {
    await supabase.from('matches').update({ [field]: value }).eq('id', matchId)
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, [field]: value } : m))
  }

  const toggleLock = async (matchId: number, locked: boolean) => {
    await supabase.from('matches').update({ locked }).eq('id', matchId)
    setMatches(prev => prev.map(m => m.id === matchId ? { ...m, locked } : m))
  }

  const saveAward = async (next: Partial<typeof awards>) => {
    const merged = { ...awards, ...next }
    setAwards(merged)
    await supabase.from('awards').update(merged).eq('id', 1)
  }

  if (loading) return <div className="text-center py-20 text-gray-500 animate-pulse">Cargando...</div>
  if (!profile?.is_admin) return null

  const goalkeepers = players.filter(p => p.position === 'GK')
  const playerOptgroups = (list: Player[]) =>
    [...new Set(list.map(p => p.team))].sort().map(team => (
      <optgroup key={team} label={team}>
        {list.filter(p => p.team === team).map(p => (
          <option key={p.id} value={p.name}>{p.name}</option>
        ))}
      </optgroup>
    ))

  const stages = STAGES_ORDER.filter(s => matches.some(m => m.stage === s))
  const groups = [...new Set(
    matches.filter(m => m.stage === 'group' && m.group_name).map(m => m.group_name!)
  )].sort()

  const filteredMatches = activeStage === 'group'
    ? matches.filter(m => m.stage === 'group' && m.group_name === activeGroup)
    : matches.filter(m => m.stage === activeStage)

  const resultsEntered = matches.filter(m => m.home_score !== null).length
  const lockedCount    = matches.filter(m => m.locked).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl tracking-wider text-gold">PANEL ADMIN</h1>
        <div className="text-right text-xs text-gray-500">
          <div>Resultados: <span className="text-gold">{resultsEntered}/104</span></div>
          <div>Bloqueados: <span className="text-gray-300">{lockedCount}/104</span></div>
        </div>
      </div>

      <div className="rounded-xl border border-yellow-900/40 bg-yellow-900/10 p-3 text-xs text-yellow-400">
        ⚠️ Esta página es solo visible para admins. Los resultados que ingreses aquí se usan para calcular puntos en tiempo real.
      </div>

      {/* Premios individuales (resultado real) */}
      <div className="rounded-xl border border-gold/30 bg-gold/5 p-4 space-y-3">
        <h2 className="font-display text-lg tracking-wide text-gold">⭐ PREMIOS INDIVIDUALES (resultado)</h2>
        <p className="text-xs text-gray-500">
          Ingresa quién ganó cada premio al final del torneo. Otorga +10 a quien lo haya acertado. Se guarda al elegir.
        </p>
        {players.length === 0 ? (
          <p className="text-xs text-gray-600">Aún no hay jugadores cargados en la base.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {([
              { key: 'top_scorer',   label: '⚽ Goleador',      list: players },
              { key: 'mvp',          label: '⭐ MVP',           list: players },
              { key: 'best_gk',      label: '🧤 Mejor arquero', list: goalkeepers },
              { key: 'young_player', label: '🌱 Jugador joven', list: players },
            ] as const).map(({ key, label, list }) => (
              <div key={key}>
                <label className="block text-xs text-gray-400 mb-1">{label}</label>
                <select
                  value={awards[key]}
                  onChange={e => saveAward({ [key]: e.target.value })}
                  className="w-full bg-pitch border border-pitch-border rounded-lg px-2 py-2 text-sm focus:outline-none focus:border-gold/50 text-gray-100"
                >
                  <option value="">Sin definir...</option>
                  {playerOptgroups(list)}
                </select>
              </div>
            ))}
          </div>
        )}
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
          const d = results[match.id] ?? { home: '', away: '' }
          const isSaving = saving[match.id]
          const msg = messages[match.id]

          return (
            <div
              key={match.id}
              className={`rounded-xl border p-4 ${
                match.home_score !== null
                  ? 'border-green-900/40 bg-green-900/5'
                  : 'border-pitch-border bg-pitch-card'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-6 flex-shrink-0">#{match.match_number}</span>

                {/* Editable team names for knockout */}
                {match.stage !== 'group' ? (
                  <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <input
                      type="text"
                      defaultValue={match.home_team}
                      onBlur={e => updateTeam(match.id, 'home_team', e.target.value)}
                      className="bg-pitch border border-pitch-border rounded px-2 py-1 text-sm text-right focus:outline-none focus:border-gold/50"
                    />
                    <span className="text-gray-600 text-xs">vs</span>
                    <input
                      type="text"
                      defaultValue={match.away_team}
                      onBlur={e => updateTeam(match.id, 'away_team', e.target.value)}
                      className="bg-pitch border border-pitch-border rounded px-2 py-1 text-sm focus:outline-none focus:border-gold/50"
                    />
                  </div>
                ) : (
                  <div className="flex-1 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    <span className="text-sm font-semibold text-right">{match.home_team}</span>
                    <span className="text-gray-600 text-xs">vs</span>
                    <span className="text-sm font-semibold">{match.away_team}</span>
                  </div>
                )}

                {/* Score inputs */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={d.home}
                    onChange={e => setResults(prev => ({ ...prev, [match.id]: { ...d, home: e.target.value } }))}
                    placeholder="—"
                    className="w-10 h-10 text-center text-lg font-bold rounded-lg border border-pitch-border bg-pitch text-gray-100 focus:outline-none focus:border-gold/50"
                  />
                  <span className="text-gray-600">-</span>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={d.away}
                    onChange={e => setResults(prev => ({ ...prev, [match.id]: { ...d, away: e.target.value } }))}
                    placeholder="—"
                    className="w-10 h-10 text-center text-lg font-bold rounded-lg border border-pitch-border bg-pitch text-gray-100 focus:outline-none focus:border-gold/50"
                  />
                  <button
                    onClick={() => saveResult(match.id)}
                    disabled={isSaving}
                    className="ml-1 px-3 h-10 bg-gold text-pitch text-xs font-bold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50"
                  >
                    {isSaving ? '...' : 'OK'}
                  </button>
                </div>

                {/* Lock toggle */}
                <button
                  onClick={() => toggleLock(match.id, !match.locked)}
                  title={match.locked ? 'Desbloquear pronósticos' : 'Bloquear pronósticos'}
                  className={`text-xs px-2 py-1 rounded border transition-colors flex-shrink-0 ${
                    match.locked
                      ? 'border-red-900 text-red-400 hover:bg-red-900/20'
                      : 'border-pitch-border text-gray-600 hover:text-gray-300'
                  }`}
                >
                  {match.locked ? '🔒' : '🔓'}
                </button>
              </div>

              {msg && (
                <div className={`mt-2 text-xs ${msg.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                  {msg}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
