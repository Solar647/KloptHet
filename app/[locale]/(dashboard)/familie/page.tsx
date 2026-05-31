import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FamilieClient } from '@/components/dashboard/familie-client'

const maxByTier: Record<string, number> = { free: 0, standard: 0, family: 3, premium: 5 }

export default async function FamiliePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/inloggen`)

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('tier')
    .eq('user_id', user.id)
    .single()

  const tier = sub?.tier ?? 'free'
  const max = maxByTier[tier] ?? 0

  const { data: family } = await supabase
    .from('families')
    .select('id')
    .eq('owner_id', user.id)
    .maybeSingle()

  type MemberRow = {
    id: string
    invited_email: string
    status: 'pending' | 'active' | 'removed'
    owner_can_see_scans: boolean
    member_can_see_owner: boolean
    joined_at: string | null
    user_id: string | null
    recentScans: {
      verdict_category: 'safe' | 'doubt' | 'phishing'
      verdict_score: number
      created_at: string
    }[]
  }

  let members: MemberRow[] = []

  if (family) {
    const { data: rawMembers } = await supabase
      .from('family_members')
      .select(
        'id, invited_email, status, owner_can_see_scans, member_can_see_owner, joined_at, user_id'
      )
      .eq('family_id', family.id)
      .neq('status', 'removed')
      .order('invited_at', { ascending: true })

    if (rawMembers && rawMembers.length > 0) {
      const activeUserIds = rawMembers
        .filter((m) => m.status === 'active' && m.owner_can_see_scans && m.user_id)
        .map((m) => m.user_id as string)

      const scansByUser: Record<string, MemberRow['recentScans']> = {}

      if (activeUserIds.length > 0) {
        const { data: allScans } = await supabase
          .from('scans')
          .select('user_id, verdict_category, verdict_score, created_at')
          .in('user_id', activeUserIds)
          .order('created_at', { ascending: false })
          .limit(activeUserIds.length * 5)

        for (const scan of allScans ?? []) {
          if (!scansByUser[scan.user_id]) scansByUser[scan.user_id] = []
          if (scansByUser[scan.user_id].length < 5) {
            scansByUser[scan.user_id].push({
              verdict_category: scan.verdict_category as 'safe' | 'doubt' | 'phishing',
              verdict_score: scan.verdict_score,
              created_at: scan.created_at,
            })
          }
        }
      }

      members = rawMembers.map((m) => ({
        id: m.id,
        invited_email: m.invited_email,
        status: m.status as 'pending' | 'active' | 'removed',
        owner_can_see_scans: m.owner_can_see_scans,
        member_can_see_owner: m.member_can_see_owner,
        joined_at: m.joined_at,
        user_id: m.user_id,
        recentScans: (m.user_id && scansByUser[m.user_id]) || [],
      }))
    }
  }

  return <FamilieClient tier={tier} userEmail={user.email ?? ''} members={members} max={max} />
}
