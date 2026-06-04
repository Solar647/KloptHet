import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { GeschiedenisClient } from '@/components/dashboard/geschiedenis-client'

export const dynamic = 'force-dynamic'

export default async function GeschiedenisPage({
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

  const { data: scans } = await supabase
    .from('scans')
    .select(
      'id, verdict_category, verdict_score, verdict_summary, verdict_flags, created_at, input_kind, fraud_type'
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50)

  return <GeschiedenisClient scans={scans ?? []} />
}
