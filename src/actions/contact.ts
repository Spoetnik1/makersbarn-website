'use server'

import { headers } from 'next/headers'

import { sendEmail } from '@/services/email'
import { sendSlackMessage, formatContactFormMessage, SlackChannel } from '@/services/slack'
import { createLogger, validateContactForm, RateLimiter } from '@/lib'
import { CONTACT_FORM_MESSAGES, CONTACT_RATE_LIMIT } from '@/constants'
import type { ContactFormData } from '@/types'

const logger = createLogger('contact-action')

const rateLimiter = new RateLimiter({
  windowMs: CONTACT_RATE_LIMIT.WINDOW_MS,
  maxRequests: CONTACT_RATE_LIMIT.MAX_REQUESTS,
})

export interface SubmitContactFormResult {
  success: boolean
  message: string
  errors?: Record<string, string>
}

async function getClientIdentifier(): Promise<string> {
  const headersList = await headers()
  const vercelForwardedFor = headersList.get('x-vercel-forwarded-for')
  const realIp = headersList.get('x-real-ip')
  return vercelForwardedFor?.split(',')[0]?.trim() || realIp || 'unknown'
}

export async function submitContactForm(data: ContactFormData): Promise<SubmitContactFormResult> {
  const clientId = await getClientIdentifier()

  // Rate limiting check
  if (!rateLimiter.isAllowed(clientId)) {
    logger.warn('Rate limit exceeded', { clientId })
    return {
      success: false,
      message: CONTACT_FORM_MESSAGES.RATE_LIMITED,
    }
  }

  // Validate input
  const validation = validateContactForm(data)

  if (!validation.success) {
    logger.warn('Validation failed', { clientId, errors: validation.errors })
    return {
      success: false,
      message: CONTACT_FORM_MESSAGES.VALIDATION_ERROR,
      errors: validation.errors,
    }
  }

  const validatedData = validation.data!
  logger.info('Contact form submission started', { email: validatedData.email })

  // Send Slack notification (secondary - failures don't affect email)
  try {
    const slackMessage = formatContactFormMessage(validatedData)
    const slackResult = await sendSlackMessage({
      channel: SlackChannel.USER_CONTACTS,
      message: slackMessage,
    })

    if (!slackResult.success) {
      logger.warn('Slack notification failed, continuing with email', {
        email: validatedData.email,
        slackError: slackResult.error,
      })
    }
  } catch (error) {
    logger.warn('Slack notification failed unexpectedly, continuing with email', {
      email: validatedData.email,
      error,
    })
  }

  // Send email notifications (primary)
  try {
    const emailResult = await sendEmail(validatedData)

    if (!emailResult.success) {
      logger.error('Email sending failed', { email: validatedData.email }, emailResult.error)
      return {
        success: false,
        message: CONTACT_FORM_MESSAGES.EMAIL_FAILED,
      }
    }

    logger.info('Contact form submission completed successfully', { email: validatedData.email })
    return {
      success: true,
      message: CONTACT_FORM_MESSAGES.SUCCESS,
    }
  } catch (error) {
    logger.error('Contact form submission failed unexpectedly', { email: validatedData.email }, error)
    return {
      success: false,
      message: CONTACT_FORM_MESSAGES.UNEXPECTED_ERROR,
    }
  }
}
