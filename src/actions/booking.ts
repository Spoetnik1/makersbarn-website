'use server'

import { headers } from 'next/headers'

import { sendBookingEmail } from '@/services/email'
import { sendSlackMessage, formatBookingFormMessage, formatPartialBookingMessage, SlackChannel } from '@/services/slack'
import { createLogger, validateBookingForm, RateLimiter, ContactInfoSchema } from '@/lib'
import { BOOKING_RATE_LIMIT, BookingMessageCode } from '@/constants'
import type { BookingFormData, SubmitBookingFormResult, PartialBookingContactData, PartialBookingResult } from '@/types'

const logger = createLogger('booking-action')

const rateLimiter = new RateLimiter({
  windowMs: BOOKING_RATE_LIMIT.WINDOW_MS,
  maxRequests: BOOKING_RATE_LIMIT.MAX_REQUESTS,
})

/**
 * Mask email for logging (GDPR compliance)
 * e.g., "john@example.com" → "j***@example.com"
 */
function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) {return '***'}
  const maskedLocal = local.length > 1 ? `${local[0]}***` : '***'
  return `${maskedLocal}@${domain}`
}

/**
 * Validate IP address format (IPv4 or IPv6)
 */
function isValidIpFormat(ip: string): boolean {
  // IPv4: validate each octet is 0-255
  const ipv4Parts = ip.split('.')
  if (ipv4Parts.length === 4) {
    return ipv4Parts.every((part) => {
      const num = parseInt(part, 10)
      return !isNaN(num) && num >= 0 && num <= 255 && String(num) === part
    })
  }
  // IPv6 pattern (simplified - allows common formats)
  const ipv6Pattern = /^([0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$/
  return ipv6Pattern.test(ip)
}

/**
 * Get client identifier for rate limiting
 * Uses Vercel's trusted headers which cannot be spoofed by clients
 */
async function getClientIdentifier(): Promise<string> {
  const headersList = await headers()

  // Vercel sets these headers and they cannot be spoofed by clients
  // Priority: Vercel's forwarded IP > x-real-ip (set by reverse proxy) > fallback
  const vercelForwardedFor = headersList.get('x-vercel-forwarded-for')
  const realIp = headersList.get('x-real-ip')

  // Extract first IP from forwarded header (client IP)
  const clientIp = vercelForwardedFor?.split(',')[0]?.trim() || realIp

  // Validate IP format to prevent injection
  if (clientIp && isValidIpFormat(clientIp)) {
    return clientIp
  }

  return 'unknown'
}

export async function submitBookingForm(data: BookingFormData): Promise<SubmitBookingFormResult> {
  const clientId = await getClientIdentifier()

  // Rate limiting check
  if (!rateLimiter.isAllowed(clientId)) {
    logger.warn('Rate limit exceeded', { clientId })
    return {
      success: false,
      messageCode: BookingMessageCode.RATE_LIMITED,
    }
  }

  // Validate input
  const validation = validateBookingForm(data)

  if (!validation.success) {
    logger.warn('Validation failed', { clientId, errors: validation.errors })
    return {
      success: false,
      messageCode: BookingMessageCode.VALIDATION_ERROR,
      errors: validation.errors,
    }
  }

  const validatedData = validation.data!
  const maskedUserEmail = maskEmail(validatedData.email)
  logger.info('Booking form submission started', { email: maskedUserEmail })

  // Send Slack and Email notifications in parallel for faster response
  try {
    const slackMessage = formatBookingFormMessage(validatedData)

    const [slackResult, emailResult] = await Promise.allSettled([
      sendSlackMessage({
        channel: SlackChannel.USER_CONTACTS,
        message: slackMessage,
      }),
      sendBookingEmail(validatedData),
    ])

    // Log Slack result (non-critical)
    if (slackResult.status === 'rejected') {
      logger.warn('Slack notification failed', {
        email: maskedUserEmail,
        error: slackResult.reason,
      })
    } else if (!slackResult.value.success) {
      logger.warn('Slack notification failed', {
        email: maskedUserEmail,
        slackError: slackResult.value.error,
      })
    }

    // Check email result (critical)
    if (emailResult.status === 'rejected') {
      logger.error('Email sending failed unexpectedly', { email: maskedUserEmail }, emailResult.reason)
      return {
        success: false,
        messageCode: BookingMessageCode.EMAIL_FAILED,
      }
    }

    if (!emailResult.value.success) {
      logger.error('Email sending failed', { email: maskedUserEmail }, emailResult.value.error)
      return {
        success: false,
        messageCode: BookingMessageCode.EMAIL_FAILED,
      }
    }

    logger.info('Booking form submission completed successfully', { email: maskedUserEmail })
    return {
      success: true,
      messageCode: BookingMessageCode.SUCCESS,
    }
  } catch (error) {
    logger.error('Booking form submission failed unexpectedly', { email: maskedUserEmail }, error)
    return {
      success: false,
      messageCode: BookingMessageCode.UNEXPECTED_ERROR,
    }
  }
}

/**
 * Separate rate limiter for partial booking notifications
 * More lenient since it's a passive notification
 */
const partialBookingRateLimiter = new RateLimiter({
  windowMs: BOOKING_RATE_LIMIT.WINDOW_MS,
  maxRequests: BOOKING_RATE_LIMIT.PARTIAL_MAX_REQUESTS,
})

/**
 * Notify when user starts booking process (captures partial leads)
 */
export async function notifyBookingStarted(data: PartialBookingContactData): Promise<PartialBookingResult> {
  const clientId = await getClientIdentifier()

  // Rate limiting check
  if (!partialBookingRateLimiter.isAllowed(clientId)) {
    logger.warn('Partial booking rate limit exceeded', { clientId })
    return { success: false }
  }

  // Validate input using shared schema
  const validation = ContactInfoSchema.safeParse(data)
  if (!validation.success) {
    logger.warn('Partial booking validation failed', { clientId, errors: validation.error.issues })
    return { success: false }
  }

  const validatedData = validation.data
  const maskedUserEmail = maskEmail(validatedData.email)
  logger.info('Booking started notification', { email: maskedUserEmail, clientId })

  try {
    const slackMessage = formatPartialBookingMessage(validatedData)
    const slackResult = await sendSlackMessage({
      channel: SlackChannel.USER_CONTACTS,
      message: slackMessage,
    })

    if (!slackResult.success) {
      logger.warn('Partial booking Slack notification failed', {
        email: maskedUserEmail,
        slackError: slackResult.error,
      })
      return { success: false }
    }

    logger.info('Booking started notification sent', { email: maskedUserEmail })
    return { success: true }
  } catch (error) {
    logger.warn('Partial booking notification failed', { email: maskedUserEmail, error })
    return { success: false }
  }
}
