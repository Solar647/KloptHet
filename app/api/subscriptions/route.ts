import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const { tier, billing } = await request.json()

    if (!['standard', 'family', 'premium'].includes(tier)) {
      return NextResponse.json({ error: 'Ongeldig abonnement' }, { status: 400 })
    }

    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Niet ingelogd' }, { status: 401 })
    }

    // Zorg dat profiel bestaat (trigger kan gefaald zijn bij Google OAuth)
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!profile) {
      await supabase.from('profiles').insert({
        id: user.id,
        email: user.email ?? '',
        full_name: user.user_metadata?.full_name ?? null,
      })
    }

    const days = billing === 'yearly' ? 365 : 30
    const periodEnd = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()

    // Probeer eerst te updaten
    const { data: updated, error: updateError } = await supabase
      .from('subscriptions')
      .update({
        tier,
        status: 'active',
        updated_at: new Date().toISOString(),
        current_period_end: periodEnd,
      })
      .eq('user_id', user.id)
      .select()

    if (updateError) {
      console.error('Update error:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Als er geen rij was, maak er één aan
    if (!updated || updated.length === 0) {
      const { error: insertError } = await supabase
        .from('subscriptions')
        .insert({ user_id: user.id, tier, status: 'active', current_period_end: periodEnd })

      if (insertError) {
        console.error('Insert error:', insertError)
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, tier })
  } catch (err) {
    console.error('Subscription update error:', err)
    return NextResponse.json({ error: 'Server fout' }, { status: 500 })
  }
}
