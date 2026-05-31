import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

    const { token } = await req.json()
    if (!token) return NextResponse.json({ error: 'Token vereist' }, { status: 400 })

    // Gebruik service role of anon key voor token lookup (public invite)
    const service = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: member } = await service
      .from('family_members')
      .select('id, status, family_id')
      .eq('invite_token', token)
      .maybeSingle()

    if (!member) return NextResponse.json({ error: 'Uitnodiging niet gevonden' }, { status: 404 })
    if (member.status === 'active') return NextResponse.json({ success: true, alreadyMember: true })
    if (member.status === 'removed')
      return NextResponse.json({ error: 'Uitnodiging is ingetrokken' }, { status: 400 })

    const { data: family } = await service
      .from('families')
      .select('owner_id')
      .eq('id', member.family_id)
      .maybeSingle()

    if (family?.owner_id === user.id) {
      return NextResponse.json({ error: 'U kunt uw eigen familie niet joinen' }, { status: 400 })
    }

    await service
      .from('family_members')
      .update({ user_id: user.id, status: 'active', joined_at: new Date().toISOString() })
      .eq('id', member.id)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Accept route fout:', err)
    return NextResponse.json({ error: 'Serverfout' }, { status: 500 })
  }
}
