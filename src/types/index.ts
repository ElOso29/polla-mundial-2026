export type Stage = 'group' | 'r32' | 'r16' | 'qf' | 'sf' | '3rd' | 'final'

export interface Profile {
  id: string
  username: string
  is_admin: boolean
  champion: string | null   // público (visible para todos)
  created_at: string
}

// Elecciones privadas hasta que empieza el Mundial (tabla aparte con RLS).
export interface SecretPicks {
  user_id?: string
  runner_up: string | null
  third_place: string | null
  top_scorer: string | null
  mvp: string | null
  best_gk: string | null
  young_player: string | null
}

export interface Player {
  id: number
  team: string
  name: string
  position: string | null   // GK / DEF / MID / FWD
}

// Premios individuales reales del torneo (los ingresa el admin al final).
export interface Awards {
  top_scorer: string | null
  mvp: string | null
  best_gk: string | null
  young_player: string | null
}

export interface Match {
  id: number
  match_number: number
  stage: Stage
  group_name: string | null
  home_team: string
  away_team: string
  match_date: string | null
  venue: string | null
  home_score: number | null
  away_score: number | null
  locked: boolean
}

export interface Prediction {
  id: number
  user_id: string
  match_id: number
  home_score: number
  away_score: number
  created_at: string
  updated_at: string
}

export interface PlayerStats {
  profile: Profile
  total_points: number
  match_points: number    // puntos solo de partidos
  exact_results: number   // resultado exacto (5 pts)
  partial_results: number // acertó algo (ganador y/o goles) sin ser exacto
  champion_pts: number    // 25
  runner_up_pts: number   // 20
  third_pts: number       // 10
  award_pts: number       // goleador + MVP + arquero + joven (10 c/u)
  matches_predicted: number
}

export const STAGE_LABELS: Record<Stage, string> = {
  group:  'Fase de Grupos',
  r32:    'Ronda de 32',
  r16:    'Octavos de Final',
  qf:     'Cuartos de Final',
  sf:     'Semifinales',
  '3rd':  'Tercer Lugar',
  final:  'Gran Final',
}

export const PRIZE_POOL = 360_000 // CLP
export const PRIZES = {
  first:  252_000, // 70%
  second:  72_000, // 20%
  third:   36_000, // 10%
}

// Plazo para elegir/editar campeón, subcampeón, 3er puesto y premios
// individuales (MVP, goleador, etc.). Hora de Chile (-04).
export const PICKS_DEADLINE = new Date('2026-06-11T14:00:00-04:00')

// Minutos antes del inicio de cada partido en que se cierra el pronóstico.
export const MATCH_LOCK_MINUTES = 10
