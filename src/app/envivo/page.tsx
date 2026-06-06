'use client'
import { useEffect, useState, useCallback } from 'react'

type Ev = {
  id: string; date: string; state: string; detail: string; completed: boolean
  home: string; away: string; homeScore: string | null; awayScore: string | null
}

function ymd(d: Date) {
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
}

export default function EnVivoPage() {
  const [date, setDate] = useState<Date>(() => {
    const today = new Date()
    const start = new Date('2026-06-11T12:00:00')
    return today < start ? start : today
  })
  const [events, setEvents] = useState<Ev[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/scores?date=${ymd(date)}`)
      const data = await res.json()
      setEvents(data.events ?? [])
    } catch { /* noop */ }
    setLoading(false)
  }, [date])

  useEffect(() => {
    setLoading(true)
    load()
    const t = setInterval(load, 30000) // refresca cada 30s
    return () => clearInterval(t)
  }, [load])

  const shift = (days: number) => setDate(d => { const n = new Date(d); n.setDate(n.getDate() + days); return n })

  return (
    <div className="space-y-5">
      <h1 className="font-display text-4xl tracking-wider text-gold text-center">EN VIVO</h1>

      {/* Navegación por día */}
      <div className="flex items-center justify-between gap-3">
        <button onClick={() => shift(-1)} className="px-3 py-1.5 rounded-lg bg-pitch-card border border-pitch-border text-gray-300 hover:text-gold">◀</button>
        <span className="text-sm text-gray-300 capitalize text-center">
          {date.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
        <button onClick={() => shift(1)} className="px-3 py-1.5 rounded-lg bg-pitch-card border border-pitch-border text-gray-300 hover:text-gold">▶</button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500 animate-pulse">Cargando...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 text-gray-600 text-sm">No hay partidos este día.</div>
      ) : (
        <div className="space-y-2">
          {events.map(ev => {
            const live = ev.state === 'in'
            const finished = ev.state === 'post'
            const kickoff = new Date(ev.date).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
            return (
              <div key={ev.id} className={`rounded-xl border p-4 ${live ? 'border-green-700/50 bg-green-900/5' : 'border-pitch-border bg-pitch-card'}`}>
                <div className="flex items-center gap-3">
                  <span className="flex-1 text-right font-semibold text-sm">{ev.home}</span>
                  <div className="flex-shrink-0 text-center min-w-[64px]">
                    {ev.state === 'pre' ? (
                      <span className="text-xs text-gray-500">{kickoff}</span>
                    ) : (
                      <span className="font-display text-2xl text-gold">{ev.homeScore}–{ev.awayScore}</span>
                    )}
                  </div>
                  <span className="flex-1 text-left font-semibold text-sm">{ev.away}</span>
                </div>
                <div className="text-center mt-1">
                  {live && <span className="text-xs text-green-400 font-semibold">🔴 EN VIVO · {ev.detail}</span>}
                  {finished && <span className="text-xs text-gray-500">Finalizado</span>}
                  {ev.state === 'pre' && <span className="text-xs text-gray-600">Programado</span>}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <p className="text-xs text-gray-600 text-center">Resultados en vivo vía ESPN · se actualiza cada 30 segundos</p>
    </div>
  )
}
