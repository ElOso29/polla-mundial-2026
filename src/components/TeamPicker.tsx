'use client'
import { useState, useMemo, useRef, useEffect } from 'react'

// Selector de selección (país) con buscador.
export default function TeamPicker({
  teams,
  value,
  onChange,
  disabled,
  placeholder = 'Selecciona un país...',
}: {
  teams: string[]
  value: string
  onChange: (team: string) => void
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
    return q ? teams.filter(t => t.toLowerCase().includes(q)) : teams
  }, [teams, query])

  if (disabled) {
    return <div className="text-sm font-semibold text-gray-200 py-2">{value || '—'}</div>
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setQuery('') }}
        className="w-full text-left bg-pitch border border-pitch-border rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-gold/50 flex items-center justify-between gap-2"
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
            placeholder="Buscar país..."
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
            {filtered.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => { onChange(t); setOpen(false); setQuery('') }}
                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-pitch-muted ${
                  t === value ? 'text-gold' : 'text-gray-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
