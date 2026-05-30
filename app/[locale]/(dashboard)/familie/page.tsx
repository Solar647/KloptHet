import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FamilieClient } from '@/components/dashboard/familie-client'

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

  // Haal bestaande familie + leden op
  const { data: family } = await supabase
    .from('families')
    .select('id')
    .eq('owner_id', user.id)
    .single()

  let initialInvited: { email: string; status: string }[] = []
  if (family) {
    const { data: members } = await supabase
      .from('family_members')
      .select('user_id, invited_at, joined_at')
      .eq('family_id', family.id)
      .neq('role', 'owner')

    if (members && members.length > 0) {
      const userIds = members.filter((m) => m.user_id).map((m) => m.user_id)
      const emailMap: Record<string, string> = {}
      if (userIds.length > 0) {
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id, email')
          .in('id', userIds)
        profiles?.forEach((p) => {
          emailMap[p.id] = p.email
        })
      }
      initialInvited = members.map((m) => ({
        email: emailMap[m.user_id ?? ''] ?? 'Uitnodiging verstuurd',
        status: m.joined_at ? 'Actief lid' : 'Uitnodiging verstuurd',
      }))
    }
  }

  return (
    <FamilieClient
      tier={sub?.tier ?? 'free'}
      userEmail={user.email ?? ''}
      initialInvited={initialInvited}
    />
  )
}
