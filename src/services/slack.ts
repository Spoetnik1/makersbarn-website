import { createLogger, getRetreatTypeDisplayLabel, type ValidatedContactFormData } from '@/lib'
import type { ValidatedBookingFormData, PartialBookingContactData } from '@/types'

const logger = createLogger('slack-service')

// Environment variables
const SLACK_WEBHOOK_APP_EVENTS = process.env.SLACK_WEBHOOK_APP_EVENTS
const SLACK_WEBHOOK_USER_CONTACTS = process.env.SLACK_WEBHOOK_USER_CONTACTS
const SLACK_INCOMING_WEBHOOK = process.env.SLACK_INCOMING_WEBHOOK
const SUPPRESS_SLACK_MESSAGES = process.env.SUPPRESS_SLACK_MESSAGES === 'true'
const NODE_ENV = process.env.NODE_ENV

export enum SlackChannel {
  APP_EVENTS = '#app-events',
  USER_CONTACTS = '#user-contacts',
}

const DEFAULT_CHANNEL = SlackChannel.USER_CONTACTS

interface SlackMessageParams {
  channel?: SlackChannel
  message: string
}

interface SlackResult {
  success: boolean
  error?: unknown
}

function getWebhookForChannel(channel: SlackChannel): string | undefined {
  const webhookMap: Record<SlackChannel, string | undefined> = {
    [SlackChannel.APP_EVENTS]: SLACK_WEBHOOK_APP_EVENTS,
    [SlackChannel.USER_CONTACTS]: SLACK_WEBHOOK_USER_CONTACTS,
  }
  return webhookMap[channel] || SLACK_INCOMING_WEBHOOK
}

function formatMessageForEnvironment(message: string): string {
  const isProduction = NODE_ENV === 'production'
  return isProduction ? message : `[${NODE_ENV}] ${message}`
}

export async function sendSlackMessage({
  channel = DEFAULT_CHANNEL,
  message,
}: SlackMessageParams): Promise<SlackResult> {
  if (SUPPRESS_SLACK_MESSAGES) {
    logger.debug('Slack message suppressed', { channel, messageLength: message.length })
    return { success: true }
  }

  const webhook = getWebhookForChannel(channel)

  if (!webhook) {
    logger.warn('Slack webhook not configured', { channel })
    return { success: false, error: `Webhook not configured for ${channel}` }
  }

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel,
        text: formatMessageForEnvironment(message),
      }),
    })

    if (!response.ok) {
      throw new Error(`Slack API responded with status: ${response.status}`)
    }

    logger.info('Slack message sent', { channel })
    return { success: true }
  } catch (error) {
    logger.error('Failed to send Slack message', { channel }, error)
    return { success: false, error }
  }
}

export function formatContactFormMessage(data: ValidatedContactFormData): string {
  const lines = [
    '📬 *New Contact Form Submission*',
    '',
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
  ]

  if (data.phone) {
    lines.push(`*Phone:* ${data.phone}`)
  }

  lines.push('', `*Message:*`, data.message)

  return lines.join('\n')
}

export function formatBookingFormMessage(data: ValidatedBookingFormData): string {
  const retreatTypeLabel = getRetreatTypeDisplayLabel(data.retreatType, data.retreatTypeOther)

  const lines = [
    '📅 *New Booking Request*',
    '',
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
  ]

  if (data.phone) {
    lines.push(`*Phone:* ${data.phone}`)
  }

  if (retreatTypeLabel) {
    lines.push('', `*Retreat Type:* ${retreatTypeLabel}`)
  }

  if (data.startDate) {
    const dateInfo = data.flexibleDates
      ? `${data.startDate} (flexible)`
      : data.startDate
    lines.push(`*Preferred Date:* ${dateInfo}`)
  } else if (data.flexibleDates && data.flexibleDatesText) {
    lines.push(`*Preferred Date:* Flexible - ${data.flexibleDatesText}`)
  }

  if (data.duration) {
    lines.push(`*Duration:* ${data.duration} days`)
  }

  if (data.minGroupSize || data.maxGroupSize) {
    const groupSize = data.minGroupSize && data.maxGroupSize
      ? `${data.minGroupSize} - ${data.maxGroupSize} people`
      : data.minGroupSize
        ? `${data.minGroupSize}+ people`
        : `Up to ${data.maxGroupSize} people`
    lines.push(`*Group Size:* ${groupSize}`)
  }

  // Only show flexibility notes if we have a start date (otherwise it's already shown in the date field)
  if (data.startDate && data.flexibleDates && data.flexibleDatesText) {
    lines.push(`*Flexibility Notes:* ${data.flexibleDatesText}`)
  }

  if (data.accommodationPreferences) {
    lines.push('', `*Accommodation Preferences:*`, data.accommodationPreferences)
  }

  if (data.cateringNeeded) {
    lines.push('', `*Catering:* Yes`)
    if (data.cateringDetails) {
      lines.push(`*Catering Details:* ${data.cateringDetails}`)
    }
  }

  if (data.extraInfo) {
    lines.push('', `*Extra Information:*`, data.extraInfo)
  }

  return lines.join('\n')
}

export function formatPartialBookingMessage(data: PartialBookingContactData): string {
  const lines = [
    '🚀 *Booking Started*',
    '',
    '_Someone started the booking process but has not completed it yet._',
    '',
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
  ]

  if (data.phone) {
    lines.push(`*Phone:* ${data.phone}`)
  }

  lines.push('', '_Follow up if they do not complete the booking._')

  return lines.join('\n')
}
