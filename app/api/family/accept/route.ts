import { createClient } from '@/lib/supabase/server'
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

    // Token opzoeken via anon key (RLS policy staat dit toe)
    const { data: member } = await supabase
      .from('family_members')
      .select('id, status, family_id')
      .eq('invite_token', token)
      .maybeSingle()

    if (!member) return NextResponse.json({ error: 'Uitnodiging niet gevonden' }, { status: 404 })
    if (member.status === 'active') return NextResponse.json({ success: true, alreadyMember: true })
    if (member.status === 'removed')
      return NextResponse.json({ error: 'Uitnodiging is ingetrokken' }, { status: 400 })

    const { data: family } = await supabase
      .from('families')
      .select('owner_id')
      .eq('id', member.family_id)
      .maybeSingle()

    if (family?.owner_id === user.id) {
      return NextResponse.json({ error: 'U kunt uw eigen familie niet joinen' }, { status: 400 })
    }

    // Update via anon client — RLS policy "Leden updaten door eigenaar of lid" staat dit toe
    const { error } = await supabase
      .from('family_members')
      .update({ user_id: user.id, status: 'active', joined_at: new Date().toISOString() })
      .eq('id', member.id)

    if (error) {
      console.error('Accept update fout:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Accept route fout:', err)
    return NextResponse.json({ error: 'Serverfout' }, { status: 500 })
  }
}
