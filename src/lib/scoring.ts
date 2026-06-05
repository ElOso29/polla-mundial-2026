import type { Match, Prediction, Profile, PlayerStats } from '@/types'

// ============================================================
// CÁLCULO DE PUNTAJE POR PARTIDO
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

  // Exacto: ambos scores correctos
  if (predHome === realHome && predAway === realAway) {
    return { points: 3, exact: true, partial: false }
  }

  // Parcial: ganador correcto o empate acertado
  const realResult = Math.sign(realHome - realAway)
  const predResult = Math.sign(predHome - predAway)

  if (realResult === predResult) {
    return { points: 1, exact: false, partial: true }
  }

  return { points: 0, exact: false, partial: false }
}

// ============================================================
// BONUS POR PRONÓSTICO DE CAMPEÓN / FINALISTAS / SEMIFINALISTAS
// ============================================================

export function getKnockoutBonus(
  profile: Profile,
  matches: Match[]
): { champion: number; finalist: number; semifinal: number } {
  if (!profile.champion) return { champion: 0, finalist: 0, semifinal: 0 }

  const champion = profile.champion
  let championPts = 0
  let finalistPts = 0
  let semifinalPts = 0

  const finalMatch = matches.find(m => m.stage === 'final')
  if (finalMatch && finalMatch.home_score !== null) {
    const winner = finalMatch.home_score > finalMatch.away_score
      ? finalMatch.home_team
      : finalMatch.away_team
    const loser = finalMatch.home_score > finalMatch.away_score
      ? finalMatch.away_team
      : finalMatch.home_team

    if (champion === winner) championPts = 5
    else if (champion === loser) finalistPts = 3
  }

  const semiMatches = matches.filter(m => m.stage === 'sf')
  if (semiMatches.length === 2) {
    const semiLosers: string[] = []
    for (const semi of semiMatches) {
      if (semi.home_score !== null && semi.away_score !== null) {
        const loser = semi.home_score > semi.away_score
          ? semi.away_team
          : semi.home_team
        semiLosers.push(loser)
      }
    }
    if (semiLosers.includes(champion) && finalistPts === 0 && championPts === 0) {
      semifinalPts = 2
    }
  }

  return { champion: championPts, finalist: finalistPts, semifinal: semifinalPts }
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
    let totalPoints = 0
    let exactResults = 0
    let partialResults = 0
    let matchesPredicted = 0

    for (const match of matches) {
      if (match.stage === 'r32' || match.stage === 'r16' ||
          match.stage === 'qf'  || match.stage === 'sf'  ||
          match.stage === '3rd' || match.stage === 'final') {
        // Solo se puntúan partidos que ya tienen equipos reales
        if (match.home_team.startsWith('W') || match.home_team.startsWith('L') ||
            match.home_team.match(/^\d[A-L]$/)) continue
      }

      const pred = userPreds[match.id]
      if (pred) matchesPredicted++
      const { points, exact, partial } = getMatchPoints(match, pred)
      totalPoints += points
      if (exact) exactResults++
      if (partial) partialResults++
    }

    const bonus = getKnockoutBonus(profile, matches)
    totalPoints += bonus.champion + bonus.finalist + bonus.semifinal

    return {
      profile,
      total_points:    totalPoints,
      exact_results:   exactResults,
      partial_results: partialResults,
      champion_pts:    bonus.champion,
      finalist_pts:    bonus.finalist,
      semifinal_pts:   bonus.semifinal,
      matches_predicted: matchesPredicted,
    }
  })

  // Ordenar: puntos totales → exactos → parciales → nombre
  return standings.sort((a, b) => {
    if (b.total_points !== a.total_points) return b.total_points - a.total_points
    if (b.exact_results !== a.exact_results) return b.exact_results - a.exact_results
    if (b.partial_results !== a.partial_results) return b.partial_results - a.partial_results
    return a.profile.username.localeCompare(b.profile.username)
  })
}
