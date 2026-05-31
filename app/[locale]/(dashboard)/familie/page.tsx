import { createClient } from '@/lib/supabase/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import { FamilieClient } from '@/components/dashboard/familie-client'

const maxByTier: Record<string, number> = { free: 0, standard: 0, family: 5, premium: 5 }

export default async function FamiliePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/inloggen`)

  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: sub } = await service
    .from('subscriptions')
    .select('tier')
    .eq('user_id', user.id)
    .single()

  const tier = sub?.tier ?? 'free'
  const max = maxByTier[tier] ?? 0

  // Haal familie op
  const { data: family } = await service
    .from('families')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  type MemberRow = {
    id: string
    invited_email: string
    status: 'pending' | 'active' | 'removed'
    owner_can_see_scans: boolean
    member_can_see_owner: boolean
    joined_at: string | null
    user_id: string | null
  }

  let members: MemberRow[] = []

  if (family) {
    const { data: rawMembers } = await service
      .from('family_members')
      .select(
        'id, invited_email, status, owner_can_see_scans, member_can_see_owner, joined_at, user_id'
      )
      .eq('family_id', family.id)
      .neq('status', 'removed')
      .order('invited_at', { ascending: true })

    members = (rawMembers ?? []) as MemberRow[]
  }

  // Haal recente scans op voor actieve leden (alleen als owner_can_see_scans = true)
  const membersWithScans = await Promise.all(
    members.map(async (m) => {
      if (m.status !== 'active' || !m.owner_can_see_scans || !m.user_id) {
        return { ...m, recentScans: [] }
      }
      const { data: scans } = await service
        .from('scans')
        .select('verdict_category, verdict_score, created_at')
        .eq('user_id', m.user_id)
        .order('created_at', { ascending: false })
        .limit(5)
      return { ...m, recentScans: scans ?? [] }
    })
  )

  return (
    <FamilieClient tier={tier} userEmail={user.email ?? ''} members={membersWithScans} max={max} />
  )
}
