import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  // Redirect từ /d/... → /phim/...
  if (pathname.startsWith('/d/')) {
    const newUrl = pathname.replace('/d/', '/xem-phim/')
    return NextResponse.redirect(`${origin}${newUrl}`, 301)
  }

  if (pathname.startsWith('/q/')) {
    const newUrl = pathname.replace('/q/', '/phim/')
    return NextResponse.redirect(`${origin}/${newUrl}`, 301)
  }

  return NextResponse.next()
}
