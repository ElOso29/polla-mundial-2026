export type Stage = 'group' | 'r32' | 'r16' | 'qf' | 'sf' | '3rd' | 'final'

export interface Profile {
  id: string
  username: string
  is_admin: boolean
  champion: string | null
  created_at: string
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
  exact_results: number   // resultado exacto (ambos scores correctos)
  partial_results: number // ganador/empate correcto sin exacto
  champion_pts: number
  finalist_pts: number
  semifinal_pts: number
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
  first:  180_000, // 50%
  second: 108_000, // 30%
  third:   72_000, // 20%
}
