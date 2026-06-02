import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FamilieClient } from '@/components/dashboard/familie-client'
import { FamilielidView } from '@/components/dashboard/familielid-view'

const maxByTier: Record<string, number> = { free: 0, standard: 0, family: 3, premium: 5 }

export default async function FamiliePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/inloggen`)

  // Check of user LID is van iemands familie
  const { data: memberRecord } = await supabase
    .from('family_members')
    .select('id, family_id, status, owner_can_see_scans, member_can_see_owner, joined_at')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .maybeSingle()

  if (memberRecord) {
    // Haal eigenaar info op
    const { data: ownerFamily } = await supabase
      .from('families')
      .select('owner_id')
      .eq('id', memberRecord.family_id)
      .single()

    let ownerName = 'Uw familielid'
    let ownerEmail = ''
    let ownerAvatarUrl: string | null = null

    if (ownerFamily?.owner_id) {
      const { data: ownerProfile } = await supabase
        .from('profiles')
        .select('email, full_name, avatar_url')
        .eq('id', ownerFamily.owner_id)
        .single()
      ownerName = ownerProfile?.full_name || ownerProfile?.email || 'Uw familielid'
      ownerEmail = ownerProfile?.email || ''
      ownerAvatarUrl = ownerProfile?.avatar_url ?? null
    }

    return (
      <FamilielidView
        memberId={memberRecord.id}
        ownerName={ownerName}
        ownerEmail={ownerEmail}
        ownerAvatarUrl={ownerAvatarUrl}
        joinedAt={memberRecord.joined_at}
        ownerCanSeeScans={memberRecord.owner_can_see_scans}
      />
    )
  }

  // Eigenaar flow
  const { data: sub } = await supabase
    .from('subscriptions')
    .select('tier')
    .eq('user_id', user.id)
    .single()

  const tier = sub?.tier ?? 'free'
  const max = maxByTier[tier] ?? 0

  const { data: ownerProfile } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('id', user.id)
    .single()

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
    avatar_url?: string | null
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
      const avatarMap: Record<string, string> = {}

      if (activeUserIds.length > 0) {
        const [{ data: allScans }, { data: profiles }] = await Promise.all([
          supabase
            .from('scans')
            .select('user_id, verdict_category, verdict_score, created_at')
            .in('user_id', activeUserIds)
            .order('created_at', { ascending: false })
            .limit(activeUserIds.length * 5),
          supabase.from('profiles').select('id, avatar_url').in('id', activeUserIds),
        ])
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
        profiles?.forEach((p) => {
          if (p.avatar_url) avatarMap[p.id] = p.avatar_url
        })
      }

      members = rawMembers.map((m) => ({
        id: m.id,
        invited_email: m.invited_email,
        status: m.status as 'pending' | 'active' | 'removed',
        owner_can_see_scans: m.owner_can_see_scans,
        member_can_see_owner: m.member_can_see_owner,
        joined_at: m.joined_at,
        user_id: m.user_id,
        avatar_url: (m.user_id && avatarMap[m.user_id]) || null,
        recentScans: (m.user_id && scansByUser[m.user_id]) || [],
      }))
    }
  }

  return (
    <FamilieClient
      tier={tier}
      userEmail={user.email ?? ''}
      ownerAvatarUrl={ownerProfile?.avatar_url ?? null}
      members={members}
      max={max}
    />
  )
}
