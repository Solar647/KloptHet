import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Niet ingelogd.' }, { status: 401 })

  const [{ data: profile }, { data: scans }, { data: sub }, { data: familyMember }] =
    await Promise.all([
      supabase
        .from('profiles')
        .select('full_name, email, avatar_url, birth_date, created_at')
        .eq('id', user.id)
        .single(),
      supabase
        .from('scans')
        .select(
          'verdict_category, verdict_score, verdict_summary, verdict_flags, fraud_type, input_kind, created_at'
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('subscriptions')
        .select('tier, status, created_at')
        .eq('user_id', user.id)
        .single(),
      supabase
        .from('family_members')
        .select('family_id, status, owner_can_see_scans, joined_at')
        .eq('user_id', user.id)
        .maybeSingle(),
    ])

  const exportData = {
    exported_at: new Date().toISOString(),
    account: {
      id: user.id,
      email: user.email,
      naam: profile?.full_name ?? null,
      geboortedatum: profile?.birth_date ?? null,
      aangemeld_op: profile?.created_at ?? user.created_at,
    },
    abonnement: sub ? { type: sub.tier, status: sub.status, gestart_op: sub.created_at } : null,
    familie: familyMember
      ? {
          familie_id: familyMember.family_id,
          status: familyMember.status,
          scans_gedeeld: familyMember.owner_can_see_scans,
          lid_sinds: familyMember.joined_at,
        }
      : null,
    scans: (scans ?? []).map((s) => ({
      datum: s.created_at,
      type: s.input_kind === 'image' ? 'screenshot' : 'tekst',
      uitkomst: s.verdict_category,
      score: s.verdict_score,
      samenvatting: s.verdict_summary,
      fraude_type: s.fraud_type ?? null,
    })),
  }

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="klopthet-gegevens-${new Date().toISOString().slice(0, 10)}.json"`,
    },
  })
}
