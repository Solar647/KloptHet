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

    // Controleer eerst of token bestaat
    const { data: member } = await supabase
      .from('family_members')
      .select('id, status')
      .eq('invite_token', token)
      .maybeSingle()

    if (!member) return NextResponse.json({ error: 'Uitnodiging niet gevonden' }, { status: 404 })
    if (member.status === 'active') return NextResponse.json({ success: true, alreadyMember: true })
    if (member.status === 'removed')
      return NextResponse.json({ error: 'Uitnodiging is ingetrokken' }, { status: 400 })

    // Gebruik de security definer functie om RLS te omzeilen voor de update
    const { data: accepted, error } = await supabase.rpc('accept_family_invite', {
      p_token: token,
      p_user_id: user.id,
    })

    if (error) {
      console.error('Accept fout:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!accepted) {
      return NextResponse.json(
        { error: 'Uitnodiging kon niet worden geaccepteerd' },
        { status: 400 }
      )
    }

    // Verwijder invite token uit user metadata
    await supabase.auth.updateUser({ data: { invite_token: null } })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Accept route fout:', err)
    return NextResponse.json({ error: 'Serverfout' }, { status: 500 })
  }
}
