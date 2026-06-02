import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { InstellingenClient } from '@/components/dashboard/instellingen-client'

export const dynamic = 'force-dynamic'

export default async function InstellingenPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/inloggen`)

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, locale, avatar_url')
    .eq('id', user.id)
    .single()

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('tier, status, current_period_end')
    .eq('user_id', user.id)
    .single()

  return (
    <InstellingenClient
      email={user.email ?? ''}
      fullName={profile?.full_name ?? ''}
      avatarUrl={profile?.avatar_url ?? null}
      userId={user.id}
      tier={sub?.tier ?? 'standard'}
      status={sub?.status ?? 'active'}
      periodEnd={sub?.current_period_end ?? null}
    />
  )
}
