import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

// "Toca" la base de datos para mantener el proyecto activo (evita que Supabase se pause).
export async function GET() {
  try {
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await sb.from('matches').select('id').limit(1)
    return NextResponse.json({ ok: true, at: new Date().toISOString() })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
