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

  return <FamilieClient tier={sub?.tier ?? 'standard'} userEmail={user.email ?? ''} />
}
