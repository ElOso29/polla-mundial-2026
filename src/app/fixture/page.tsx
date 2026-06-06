'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import type { Match, Stage } from '@/types'
import { STAGE_LABELS } from '@/types'

type GroupRow = {
  team: string; pj: number; g: number; e: number; p: number; gf: number; gc: number; pts: number
}

function computeGroup(groupMatches: Match[]): GroupRow[] {
  const rows: Record<string, GroupRow> = {}
  const ensure = (t: string) => (rows[t] ??= { team: t, pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 })
  for (const m of groupMatches) {
    ensure(m.home_team); ensure(m.away_team)
    if (m.home_score === null || m.away_score === null) continue
    const h = rows[m.home_team], a = rows[m.away_team]
    h.pj++; a.pj++
    h.gf += m.home_score; h.gc += m.away_score
    a.gf += m.away_score; a.gc += m.home_score
    if (m.home_score > m.away_score) { h.g++; h.pts += 3; a.p++ }
    else if (m.home_score < m.away_score) { a.g++; a.pts += 3; h.p++ }
    else { h.e++; a.e++; h.pts++; a.pts++ }
  }
  return Object.values(rows).sort((x, y) =>
    y.pts - x.pts || (y.gf - y.gc) - (x.gf - x.gc) || y.gf - x.gf || x.team.localeCompare(y.team)
  )
}

const KO_STAGES: Stage[] = ['r32', 'r16', 'qf', 'sf', '3rd', 'final']

export default function FixturePage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    const load = async () => {
      const { data } = await supabase.from('matches').select('*').order('match_number')
      if (data) setMatches(data)
      setLoading(false)
    }
    load()
    const channel = supabase
      .channel('fixture-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'matches' }, load)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  if (loading) return <div className="text-center py-20 text-gray-500 animate-pulse">Cargando fixture...</div>

  const groups = [...new Set(
    matches.filter(m => m.stage === 'group' && m.group_name).map(m => m.group_name!)
  )].sort()

  return (
    <div className="space-y-8">
      <h1 className="font-display text-5xl tracking-wider text-gold text-center">FIXTURE</h1>

      {/* GRUPOS */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl tracking-wide text-gold">FASE DE GRUPOS</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map(g => {
            const rows = computeGroup(matches.filter(m => m.stage === 'group' && m.group_name === g))
            return (
              <div key={g} className="rounded-xl border border-pitch-border bg-pitch-card overflow-hidden">
                <div className="px-3 py-2 border-b border-pitch-border font-display tracking-wide text-gold text-sm">
                  GRUPO {g}
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-500 uppercase">
                      <th className="text-left px-3 py-1.5">Equipo</th>
                      <th className="text-right px-1.5">PJ</th>
                      <th className="text-right px-1.5">DG</th>
                      <th className="text-right px-3">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={r.team} className={`border-t border-pitch-border/40 ${i < 2 ? 'bg-gold/5' : ''}`}>
                        <td className="px-3 py-1.5">
                          <span className={`mr-1.5 ${i < 2 ? 'text-gold' : 'text-gray-600'}`}>{i + 1}</span>
                          <span className="text-gray-200">{r.team}</span>
                        </td>
                        <td className="text-right px-1.5 text-gray-400 font-mono">{r.pj}</td>
                        <td className="text-right px-1.5 text-gray-400 font-mono">{r.gf - r.gc > 0 ? `+${r.gf - r.gc}` : r.gf - r.gc}</td>
                        <td className="text-right px-3 font-bold font-mono text-gray-100">{r.pts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })}
        </div>
        <p className="text-xs text-gray-600">Los 2 primeros de cada grupo (resaltados) avanzan, más los mejores terceros.</p>
      </section>

      {/* ELIMINATORIAS */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl tracking-wide text-gold">ELIMINATORIAS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {KO_STAGES.map(stage => {
            const stageMatches = matches.filter(m => m.stage === stage)
            if (stageMatches.length === 0) return null
            return (
              <div key={stage} className="rounded-xl border border-pitch-border bg-pitch-card p-3 space-y-2">
                <div className="font-display tracking-wide text-gold text-sm">{STAGE_LABELS[stage]}</div>
                {stageMatches.map(m => {
                  const played = m.home_score !== null && m.away_score !== null
                  return (
                    <div key={m.id} className="flex items-center justify-between gap-2 text-xs border-t border-pitch-border/40 pt-2 first:border-0 first:pt-0">
                      <span className="text-gray-200 flex-1 text-right truncate">{m.home_team}</span>
                      <span className={`font-mono font-bold px-2 ${played ? 'text-gold' : 'text-gray-600'}`}>
                        {played ? `${m.home_score}-${m.away_score}` : 'vs'}
                      </span>
                      <span className="text-gray-200 flex-1 truncate">{m.away_team}</span>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
        <p className="text-xs text-gray-600">Los equipos de eliminatoria se actualizan a medida que avanzan los clasificados.</p>
      </section>
    </div>
  )
}
