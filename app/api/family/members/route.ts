import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

    const { memberId, owner_can_see_scans, member_can_see_owner } = await req.json()
    if (!memberId) return NextResponse.json({ error: 'memberId vereist' }, { status: 400 })

    const updates: Record<string, boolean> = {}
    if (typeof owner_can_see_scans === 'boolean') updates.owner_can_see_scans = owner_can_see_scans
    if (typeof member_can_see_owner === 'boolean')
      updates.member_can_see_owner = member_can_see_owner

    const { error } = await supabase.from('family_members').update(updates).eq('id', memberId)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Members PATCH fout:', err)
    return NextResponse.json({ error: 'Serverfout' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

    const { memberId } = await req.json()
    if (!memberId) return NextResponse.json({ error: 'memberId vereist' }, { status: 400 })

    const { error } = await supabase
      .from('family_members')
      .update({ status: 'removed' })
      .eq('id', memberId)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Members DELETE fout:', err)
    return NextResponse.json({ error: 'Serverfout' }, { status: 500 })
  }
}
