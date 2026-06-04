import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Alleen home pagina's onderscheppen
  const isHomePage = pathname === '/' || pathname === '/nl' || pathname === '/en'

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
      data: { session },
    } = await supabase.auth.getSession()

    if (session) {
      const locale = pathname.startsWith('/en') ? 'en' : 'nl'
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(nl|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
}
