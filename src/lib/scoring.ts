import type { Match, Prediction, Profile, PlayerStats } from '@/types'

// ============================================================
// CÁLCULO DE PUNTAJE POR PARTIDO
//   · Marcador exacto ............ 5 pts (máximo del partido)
//   · Si NO es exacto, se acumulan:
//       +3 acertar el ganador (o el empate)
//       +1 por CADA equipo cuyos goles exactos aciertes
// ============================================================

export function getMatchPoints(
  match: Match,
  pred: Prediction | undefined
): { points: number; exact: boolean; partial: boolean } {
  if (!pred || match.home_score === null || match.away_score === null) {
    return { points: 0, exact: false, partial: false }
  }

  const realHome = match.home_score
  const realAway = match.away_score
  const predHome = pred.home_score
  const predAway = pred.away_score

  // Exacto: ambos marcadores correctos → 5 pts
  if (predHome === realHome && predAway === realAway) {
    return { points: 5, exact: true, partial: false }
  }

  let points = 0

  // +3 por acertar el resultado (ganador o empate)
  if (Math.sign(predHome - predAway) === Math.sign(realHome - realAway)) {
    points += 3
  }

  // +1 por cada equipo cuyos goles aciertes
  if (predHome === realHome) points += 1
  if (predAway === realAway) points += 1

  return { points, exact: false, partial: points > 0 }
}

// ============================================================
// ¿Es un equipo "por definir" de fase eliminatoria?
// (códigos tipo 1A, 2B, 3C, W73, L101 que el admin aún no reemplaza)
// ============================================================
function isPlaceholderTeam(name: string): boolean {
  return name.startsWith('W') || name.startsWith('L') || /^\d[A-L]$/.test(name)
}

// ============================================================
// BONUS POR CAMPEÓN / SUBCAMPEÓN / TERCER PUESTO
//   · Campeón ...... 25 pts (ganador de la final)
//   · Subcampeón ... 20 pts (perdedor de la final)
//   · 3er puesto ... 10 pts (ganador del partido por el 3er lugar)
// ============================================================

export function getBonus(
  profile: Profile,
  matches: Match[]
): { champion: number; runner_up: number; third: number } {
  let championPts = 0
  let runnerPts = 0
  let thirdPts = 0

  // Final → campeón y subcampeón
  const finalMatch = matches.find(m => m.stage === 'final')
  if (
    finalMatch &&
    finalMatch.home_score !== null &&
    finalMatch.away_score !== null &&
    !isPlaceholderTeam(finalMatch.home_team)
  ) {
    const winner = finalMatch.home_score > finalMatch.away_score
      ? finalMatch.home_team
      : finalMatch.away_team
    const loser = finalMatch.home_score > finalMatch.away_score
      ? finalMatch.away_team
      : finalMatch.home_team

    if (profile.champion && profile.champion === winner) championPts = 25
    if (profile.runner_up && profile.runner_up === loser) runnerPts = 20
  }

  // Partido por el 3er lugar → tercer puesto
  const thirdMatch = matches.find(m => m.stage === '3rd')
  if (
    thirdMatch &&
    thirdMatch.home_score !== null &&
    thirdMatch.away_score !== null &&
    !isPlaceholderTeam(thirdMatch.home_team)
  ) {
    const thirdWinner = thirdMatch.home_score > thirdMatch.away_score
      ? thirdMatch.home_team
      : thirdMatch.away_team

    if (profile.third_place && profile.third_place === thirdWinner) thirdPts = 10
  }

  return { champion: championPts, runner_up: runnerPts, third: thirdPts }
}

// ============================================================
// TABLA DE POSICIONES
// ============================================================

export function computeStandings(
  profiles: Profile[],
  matches: Match[],
  predictions: Prediction[]
): PlayerStats[] {
  const predsByUser: Record<string, Record<number, Prediction>> = {}
  for (const pred of predictions) {
    if (!predsByUser[pred.user_id]) predsByUser[pred.user_id] = {}
    predsByUser[pred.user_id][pred.match_id] = pred
  }

  const standings: PlayerStats[] = profiles.map(profile => {
    const userPreds = predsByUser[profile.id] ?? {}
    let matchPoints = 0
    let exactResults = 0
    let partialResults = 0
    let matchesPredicted = 0

    for (const match of matches) {
      // No puntuar partidos de eliminatoria cuyos equipos aún no se definen
      if (match.stage !== 'group' && isPlaceholderTeam(match.home_team)) continue

      const pred = userPreds[match.id]
      if (pred) matchesPredicted++
      const { points, exact, partial } = getMatchPoints(match, pred)
      matchPoints += points
      if (exact) exactResults++
      if (partial) partialResults++
    }

    const bonus = getBonus(profile, matches)
    const totalPoints = matchPoints + bonus.champion + bonus.runner_up + bonus.third

    return {
      profile,
      total_points:     totalPoints,
      match_points:     matchPoints,
      exact_results:    exactResults,
      partial_results:  partialResults,
      champion_pts:     bonus.champion,
      runner_up_pts:    bonus.runner_up,
      third_pts:        bonus.third,
      matches_predicted: matchesPredicted,
    }
  })

  // Desempate: puntos totales → exactos → parciales → nombre
  return standings.sort((a, b) => {
    if (b.total_points !== a.total_points) return b.total_points - a.total_points
    if (b.exact_results !== a.exact_results) return b.exact_results - a.exact_results
    if (b.partial_results !== a.partial_results) return b.partial_results - a.partial_results
    return a.profile.username.localeCompare(b.profile.username)
  })
}
