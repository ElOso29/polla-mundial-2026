'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import type { Player } from '@/types'

// Selector de jugador con buscador (autocompletado por nombre o país).
export default function PlayerPicker({
  players,
  value,
  onChange,
  disabled,
  placeholder = 'Sin elegir...',
}: {
  players: Player[]
  value: string
  onChange: (name: string) => void
  disabled?: boolean
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = q
      ? players.filter(p => p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q))
      : players
    return base.slice(0, 60)
  }, [players, query])

  if (disabled) {
    return <div className="text-sm font-semibold text-gray-200 py-2">{value || '—'}</div>
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setQuery('') }}
        className="w-full text-left bg-pitch border border-pitch-border rounded-lg px-2 py-2 text-sm text-gray-100 focus:outline-none focus:border-gold/50 flex items-center justify-between gap-2"
      >
        <span className={value ? '' : 'text-gray-500'}>{value || placeholder}</span>
        <span className="text-gray-500 text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full bg-pitch-card border border-pitch-border rounded-lg shadow-xl max-h-72 flex flex-col overflow-hidden">
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar jugador o país..."
            className="m-2 bg-pitch border border-pitch-border rounded px-2 py-1.5 text-sm text-gray-100 focus:outline-none focus:border-gold/50"
          />
          <div className="overflow-y-auto">
            {value && (
              <button
                type="button"
                onClick={() => { onChange(''); setOpen(false); setQuery('') }}
                className="w-full text-left px-3 py-1.5 text-xs text-gray-500 hover:bg-pitch-muted"
              >
                ✕ Quitar selección
              </button>
            )}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-xs text-gray-600">Sin resultados</div>
            )}
            {filtered.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => { onChange(p.name); setOpen(false); setQuery('') }}
                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-pitch-muted flex items-center justify-between gap-2 ${
                  p.name === value ? 'text-gold' : 'text-gray-200'
                }`}
              >
                <span className="truncate">{p.name}</span>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {p.team}{p.position ? ` · ${p.position}` : ''}
                </span>
              </button>
            ))}
            {!query && players.length > 60 && (
              <div className="px-3 py-1.5 text-xs text-gray-600">Escribe para ver más…</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
