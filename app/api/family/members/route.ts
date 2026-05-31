import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// PATCH — update permissions
// DELETE — verwijder lid
// Body: { memberId, ...fields } or { memberId } for delete

export async function PATCH(req: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const { memberId, owner_can_see_scans, member_can_see_owner } = await req.json()
  if (!memberId) return NextResponse.json({ error: 'memberId vereist' }, { status: 400 })

  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Controleer dat dit een lid is van de familie van de ingelogde gebruiker
  const { data: member } = await service
    .from('family_members')
    .select('id, family_id')
    .eq('id', memberId)
    .single()

  if (!member) return NextResponse.json({ error: 'Lid niet gevonden' }, { status: 404 })

  const { data: family } = await service
    .from('families')
    .select('owner_id')
    .eq('id', member.family_id)
    .single()

  if (family?.owner_id !== user.id) {
    return NextResponse.json({ error: 'Geen toegang' }, { status: 403 })
  }

  const updates: Record<string, boolean> = {}
  if (typeof owner_can_see_scans === 'boolean') updates.owner_can_see_scans = owner_can_see_scans
  if (typeof member_can_see_owner === 'boolean') updates.member_can_see_owner = member_can_see_owner

  await service.from('family_members').update(updates).eq('id', memberId)

  return NextResponse.json({ success: true })
}

export async function DELETE(req: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })

  const { memberId } = await req.json()
  if (!memberId) return NextResponse.json({ error: 'memberId vereist' }, { status: 400 })

  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: member } = await service
    .from('family_members')
    .select('id, family_id')
    .eq('id', memberId)
    .single()

  if (!member) return NextResponse.json({ error: 'Lid niet gevonden' }, { status: 404 })

  const { data: family } = await service
    .from('families')
    .select('owner_id')
    .eq('id', member.family_id)
    .single()

  if (family?.owner_id !== user.id) {
    return NextResponse.json({ error: 'Geen toegang' }, { status: 403 })
  }

  await service.from('family_members').update({ status: 'removed' }).eq('id', memberId)

  return NextResponse.json({ success: true })
}
