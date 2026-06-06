'use client'
import { useEffect, useState } from 'react'
import { PICKS_DEADLINE } from '@/types'

export default function Countdown() {
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  if (now === null) return null // evita desajuste servidor/cliente

  const diff = +PICKS_DEADLINE - now
  if (diff <= 0) {
    return (
      <div className="rounded-xl border border-red-900/40 bg-red-900/10 px-4 py-3 text-center text-sm text-red-400">
        ⛔ Inscripciones cerradas
      </div>
    )
  }

  const d = Math.floor(diff / 86_400_000)
  const h = Math.floor((diff % 86_400_000) / 3_600_000)
  const m = Math.floor((diff % 3_600_000) / 60_000)
  const s = Math.floor((diff % 60_000) / 1000)

  const Box = ({ v, l }: { v: number; l: string }) => (
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl sm:text-4xl text-gold tabular-nums">
        {String(v).padStart(2, '0')}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-gray-500">{l}</span>
    </div>
  )

  return (
    <div className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3">
      <p className="text-center text-xs text-gray-400 mb-1">⏳ Cierre de inscripciones y elecciones (11 jun 14:00)</p>
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <Box v={d} l="días" />
        <span className="text-gold/40 text-2xl">:</span>
        <Box v={h} l="horas" />
        <span className="text-gold/40 text-2xl">:</span>
        <Box v={m} l="min" />
        <span className="text-gold/40 text-2xl">:</span>
        <Box v={s} l="seg" />
      </div>
    </div>
  )
}
