import { NextResponse } from 'next/server'
import { toSpanishTeam } from '@/lib/espn'

export const dynamic = 'force-dynamic'

// Trae el scoreboard del Mundial desde ESPN y lo devuelve simplificado.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date') || ''
  const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard${date ? `?dates=${date}` : ''}`

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return NextResponse.json({ events: [] })
    const data = await res.json()

    const events = (data.events ?? []).map((e: any) => {
      const comp = e.competitions?.[0]
      const cs = comp?.competitors ?? []
      const home = cs.find((c: any) => c.homeAway === 'home')
      const away = cs.find((c: any) => c.homeAway === 'away')
      const st = e.status?.type ?? comp?.status?.type ?? {}
      return {
        id: String(e.id),
        date: e.date,
        state: st.state ?? 'pre',           // pre | in | post
        detail: st.shortDetail ?? '',
        completed: !!st.completed,
        home: toSpanishTeam(home?.team?.displayName ?? '?'),
        away: toSpanishTeam(away?.team?.displayName ?? '?'),
        homeScore: home?.score ?? null,
        awayScore: away?.score ?? null,
      }
    })

    return NextResponse.json({ events })
  } catch {
    return NextResponse.json({ events: [] })
  }
}
