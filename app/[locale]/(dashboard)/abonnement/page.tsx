import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AbonnementClient } from '@/components/dashboard/abonnement-client'

export default async function AbonnementPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/inloggen`)

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('tier, status, current_period_end')
    .eq('user_id', user.id)
    .single()

  const currentTier = sub?.tier ?? 'free'

  // Jaarlijks afleiden uit period_end (>180 dagen = jaarlijks)
  const now = new Date()
  const isYearly = sub?.current_period_end
    ? (new Date(sub.current_period_end).getTime() - now.getTime()) / (1000 * 60 * 60 * 24) > 180
    : false

  return (
    <AbonnementClient
      currentTier={currentTier}
      currentPeriodEnd={sub?.current_period_end ?? null}
      isYearly={isYearly}
    />
  )
}
