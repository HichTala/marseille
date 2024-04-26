import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is / redirect the user to /account
  if (user && req.nextUrl.pathname === '/login') {
    const {data: piscine} = await supabase
        .from('piscine')
        .select()
        .eq('id', user.id)
    if (piscine?.length){
      return NextResponse.redirect(new URL('/piscine/jobs', req.url))
    } else {
      return NextResponse.redirect(new URL('/vacataire/offres', req.url))
    }
  }

  if (user && req.nextUrl.pathname.startsWith('/piscine')) {
    const {data: vacataire} = await supabase
        .from('vacataire')
        .select()
        .eq('id', user.id)
    if (vacataire?.length){
      return NextResponse.redirect(new URL('/vacataire/offres', req.url))
    }
  }

  if (user && req.nextUrl.pathname.startsWith('/vacataire')) {
    const {data: piscine} = await supabase
        .from('piscine')
        .select()
        .eq('id', user.id)
    if (piscine?.length){
      return NextResponse.redirect(new URL('/piscine/jobs', req.url))
    }
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && (req.nextUrl.pathname !== '/' && req.nextUrl.pathname !== '/login')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/vacataire/:path*',
    '/piscine/:path*'
  ]
}