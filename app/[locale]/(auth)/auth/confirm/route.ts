import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { searchParams, origin } = new URL(request.url)
  const tokenHash = searchParams.get('token_hash')
  const type = searchParams.get('type')

  if (tokenHash && type) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { data, error } = await supabase.auth.verifyOtp({
      type: type as 'signup' | 'recovery' | 'email_change',
      token_hash: tokenHash,
    })

    if (!error) {
      // Zorg dat profiel bestaat (trigger kan gefaald zijn)
      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .single()

        if (!profile) {
          await supabase.from('profiles').insert({
            id: data.user.id,
            email: data.user.email ?? '',
            full_name: data.user.user_metadata?.full_name ?? null,
          })
        }
      }

      if (type === 'recovery') {
        return NextResponse.redirect(`${origin}/${locale}/auth/reset`)
      }

      if (type === 'signup') {
        return NextResponse.redirect(`${origin}/${locale}/dashboard`)
      }

      return NextResponse.redirect(`${origin}/${locale}/dashboard`)
    }
  }

  return NextResponse.redirect(`${origin}/${locale}/inloggen?error=bevestiging-mislukt`)
}
