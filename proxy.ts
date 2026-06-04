import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { createServerClient } from '@supabase/ssr'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

const PROTECTED_PATHS = ['/dashboard', '/scan', '/geschiedenis', '/instellingen', '/abonnement']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ingelogde gebruikers van home naar dashboard sturen
  const isHomePage = pathname === '/' || /^\/(nl|en)\/?$/.test(pathname)

  if (isHomePage) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {},
        },
      }
    )
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      const locale = pathname.startsWith('/en') ? 'en' : 'nl'
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }
  }

  // Controleer of het een beschermde route is (strip de locale prefix)
  const isProtected = PROTECTED_PATHS.some((path) => pathname.match(new RegExp(`^/(nl|en)${path}`)))

  if (isProtected) {
    let response = NextResponse.next({ request })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      const locale = pathname.startsWith('/en') ? 'en' : 'nl'
      const loginUrl = new URL(`/${locale}/inloggen`, request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }

    return response
  }

  return intlMiddleware(request as Parameters<typeof intlMiddleware>[0])
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
