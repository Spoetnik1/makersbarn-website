import { NextRequest, NextResponse } from 'next/server'
import {
  isMaliciousPath,
  getBlockReason,
  createLogger,
  detectLanguageFromDomain,
  getLanguageFromCookieString,
  createLanguageCookieValue,
} from '@/lib'

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
  if (isMaliciousPath(pathname)) {
    const reason = getBlockReason(pathname)
    logSecurityEvent(request, pathname, reason)
    return new NextResponse('Not Found', { status: 404 })
  }

  // Skip middleware for static assets and API routes
  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next()
  }

  // Add security headers and handle language detection
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
