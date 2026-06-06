import { PRIZES, PRIZE_POOL } from '@/types'

export default function RulesPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="font-display text-5xl tracking-wider text-gold text-center">
        REGLAMENTO
      </h1>

      {/* Premio */}
      <section className="rounded-xl border border-gold/30 bg-gold/5 p-6 space-y-4">
        <h2 className="font-display text-2xl tracking-wide text-gold">💰 BOTE TOTAL</h2>
        <p className="text-3xl font-bold text-gray-100">
          ${PRIZE_POOL.toLocaleString('es-CL')} CLP
        </p>
        <p className="text-gray-400 text-sm">12 participantes × $30.000 CLP</p>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { medal: '🥇', place: '1er lugar', prize: PRIZES.first, pct: '70%' },
            { medal: '🥈', place: '2do lugar', prize: PRIZES.second, pct: '20%' },
            { medal: '🥉', place: '3er lugar', prize: PRIZES.third, pct: '10%' },
          ].map(({ medal, place, prize, pct }) => (
            <div key={place} className="text-center rounded-lg border border-pitch-border bg-pitch-card p-3">
              <div className="text-2xl mb-1">{medal}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wide">{place}</div>
              <div className="text-lg font-bold text-gold mt-1">
                ${(prize / 1000).toFixed(0)}.000
              </div>
              <div className="text-xs text-gray-600">{pct}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Puntaje por partido */}
      <section className="rounded-xl border border-pitch-border bg-pitch-card p-6 space-y-4">
        <h2 className="font-display text-2xl tracking-wide text-gold">⚽ PUNTAJE POR PARTIDO</h2>
        <div className="space-y-3">
          {[
            { pts: '5', label: 'Marcador exacto', desc: 'Aciertas el marcador exacto de ambos equipos (máximo del partido)', color: 'text-gold' },
            { pts: '3', label: 'Ganador o empate', desc: 'Aciertas quién gana, o que terminó en empate', color: 'text-blue-400' },
            { pts: '+1', label: 'Goles de un equipo', desc: 'Por CADA equipo cuyos goles exactos aciertes (se suma a los 3 del ganador)', color: 'text-blue-400' },
            { pts: '0', label: 'Fallo', desc: 'No aciertas ni el ganador ni los goles de ningún equipo', color: 'text-gray-600' },
          ].map(({ pts, label, desc, color }) => (
            <div key={label} className="flex items-start gap-3">
              <span className={`font-display text-2xl w-8 text-center flex-shrink-0 ${color}`}>{pts}</span>
              <div>
                <p className="text-sm font-semibold text-gray-200">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bonus campeón */}
      <section className="rounded-xl border border-pitch-border bg-pitch-card p-6 space-y-4">
        <h2 className="font-display text-2xl tracking-wide text-gold">🏆 BONUS PODIO</h2>
        <p className="text-sm text-gray-400">
          Al registrarte eliges campeón, subcampeón y 3er puesto del torneo. No se pueden cambiar una vez confirmados.
        </p>
        <div className="space-y-3">
          {[
            { pts: '+25', label: 'Campeón', desc: 'Aciertas el campeón del Mundial', color: 'text-gold' },
            { pts: '+20', label: 'Subcampeón', desc: 'Aciertas el finalista que pierde la final', color: 'text-gray-300' },
            { pts: '+10', label: '3er puesto', desc: 'Aciertas quién gana el partido por el tercer lugar', color: 'text-gray-400' },
          ].map(({ pts, label, desc, color }) => (
            <div key={label} className="flex items-start gap-3">
              <span className={`font-display text-2xl w-10 text-center flex-shrink-0 ${color}`}>{pts}</span>
              <div>
                <p className="text-sm font-semibold text-gray-200">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Desempate */}
      <section className="rounded-xl border border-pitch-border bg-pitch-card p-6 space-y-4">
        <h2 className="font-display text-2xl tracking-wide text-gold">⚖️ CRITERIOS DE DESEMPATE</h2>
        <ol className="space-y-2 text-sm">
          {[
            'Mayor cantidad de resultados exactos (3 pts)',
            'Mayor cantidad de resultados parciales (ganador/empate correcto)',
            'En caso de triple empate: los premios involucrados se dividen en partes iguales',
          ].map((rule, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-gold font-bold flex-shrink-0">{i + 1}.</span>
              <span className="text-gray-300">{rule}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Plazos */}
      <section className="rounded-xl border border-pitch-border bg-pitch-card p-6 space-y-3">
        <h2 className="font-display text-2xl tracking-wide text-gold">📅 PLAZOS IMPORTANTES</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between border-b border-pitch-border pb-2">
            <span className="text-gray-400">Inscripción y elección de campeón</span>
            <span className="text-gray-200 font-semibold">Hasta el 11 jun 2026</span>
          </div>
          <div className="flex justify-between border-b border-pitch-border pb-2">
            <span className="text-gray-400">Pronósticos fase de grupos</span>
            <span className="text-gray-200 font-semibold">Antes de cada partido</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Pronósticos fase eliminatoria</span>
            <span className="text-gray-200 font-semibold">Antes de cada partido</span>
          </div>
        </div>
        <p className="text-xs text-gray-600">
          Los pronósticos se bloquean automáticamente al iniciar cada partido.
        </p>
      </section>
    </div>
  )
}
