import { NextRequest, NextResponse } from 'next/server'

import {
  isMaliciousPath,
  getBlockReason,
  createLogger,
  detectLanguageFromDomain,
  getLanguageFromCookieString,
  createLanguageCookieValue,
} from '@/lib'
import { getLocaleFromPath, getLocalizedPath, getPathWithoutLocale } from '@/lib/routing'

const logger = createLogger('middleware')

const SECURITY_HEADERS = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
} as const

const SKIP_PATHS = ['/_next/', '/api/', '/static/', '/public/'] as const

function shouldSkipMiddleware(pathname: string): boolean {
  return SKIP_PATHS.some((path) => pathname.startsWith(path)) || pathname.includes('.')
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  return response
}

/**
 * Handles language detection and cookie setting
 * Priority: Existing cookie > Domain detection
 */
function handleLanguageDetection(request: NextRequest, response: NextResponse): NextResponse {
  const cookieString = request.headers.get('cookie') || ''
  const existingLanguage = getLanguageFromCookieString(cookieString)

  // If no language cookie exists, detect from domain and set cookie
  if (!existingLanguage) {
    const hostname = request.headers.get('host') || ''
    const detectedLanguage = detectLanguageFromDomain(hostname)
    response.headers.set('Set-Cookie', createLanguageCookieValue(detectedLanguage))
  }

  return response
}

/**
 * Handles locale routing and redirects
 * - Redirects root (/) to /en/ or preferred language
 * - Validates locale in URL and redirects invalid locales
 * - Sets language cookie based on URL locale
 */
function handleLocaleRouting(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl
  const cookieString = request.headers.get('cookie') || ''

  // Handle root redirect
  if (pathname === '/') {
    // Get preferred language from cookie or domain detection
    const existingLanguage = getLanguageFromCookieString(cookieString)
    const preferredLanguage = existingLanguage || detectLanguageFromDomain(request.headers.get('host') || '')
    
    // Redirect to localized home
    const localizedPath = getLocalizedPath('/', preferredLanguage)
    const url = request.nextUrl.clone()
    url.pathname = localizedPath
    return NextResponse.redirect(url)
  }

  // Extract locale from path
  const pathLocale = getLocaleFromPath(pathname)
  
  // If path has a locale, validate it
  if (pathLocale) {
    // Valid locale in path - set cookie to match
    const url = request.nextUrl.clone()
    url.pathname = pathname // Keep the path as-is
    const response = NextResponse.rewrite(url)
    response.headers.set('Set-Cookie', createLanguageCookieValue(pathLocale))
    return response
  }

  // No locale in path - check if it's a valid page path
  // If it's a known route without locale, redirect to localized version
  const pathWithoutLocale = getPathWithoutLocale(pathname)
  const knownRoutes = ['/', '/about', '/facilities', '/contact']
  
  if (knownRoutes.includes(pathWithoutLocale)) {
    // Get preferred language
    const existingLanguage = getLanguageFromCookieString(cookieString)
    const preferredLanguage = existingLanguage || detectLanguageFromDomain(request.headers.get('host') || '')
    
    // Redirect to localized version
    const localizedPath = getLocalizedPath(pathWithoutLocale, preferredLanguage)
    const url = request.nextUrl.clone()
    url.pathname = localizedPath
    return NextResponse.redirect(url)
  }

  // Let Next.js handle the request (might be a 404 or other route)
  return null
}

function logSecurityEvent(request: NextRequest, pathname: string, reason: string): void {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'

  logger.warn('Blocked malicious request', {
    ip,
    userAgent,
    path: pathname,
    reason,
  })
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block malicious requests immediately
  // Check both the full pathname and path without locale for security
  const pathWithoutLocale = getPathWithoutLocale(pathname)
  if (isMaliciousPath(pathname) || isMaliciousPath(pathWithoutLocale)) {
    const reason = getBlockReason(pathname)
    logSecurityEvent(request, pathname, reason)
    return new NextResponse('Not Found', { status: 404 })
  }

  // Skip middleware for static assets and API routes
  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next()
  }

  // Handle locale routing (redirects, etc.)
  const localeResponse = handleLocaleRouting(request)
  if (localeResponse) {
    addSecurityHeaders(localeResponse)
    return localeResponse
  }

  // For requests that don't need locale routing, continue normally
  const response = NextResponse.next()
  addSecurityHeaders(response)
  handleLanguageDetection(request, response)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next (Next.js internals)
     * - api (API routes)
     * - static (static files)
     * - public (public files)
     * - favicon.ico, robots.txt, sitemap.xml (common static files)
     */
    '/:path((?!_next|api|static|public|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
