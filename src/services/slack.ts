import { createLogger, formatGroupSize, getRetreatTypeDisplayLabel, type ValidatedContactFormData } from '@/lib'
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

function escapeSlackMarkdown(text: string): string {
  return text.replace(/[*_~`<>]/g, (char) => `\\${char}`)
}

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
    `*Name:* ${escapeSlackMarkdown(data.name)}`,
    `*Email:* ${escapeSlackMarkdown(data.email)}`,
  ]

  if (data.phone) {
    lines.push(`*Phone:* ${escapeSlackMarkdown(data.phone)}`)
  }

  lines.push('', `*Message:*`, escapeSlackMarkdown(data.message))

  return lines.join('\n')
}

function formatBookingDateInfo(data: ValidatedBookingFormData): string | undefined {
  if (data.startDate && data.flexibleDates) {
    return `${data.startDate} (flexible)`
  }
  if (data.startDate) {
    return data.startDate
  }
  if (data.flexibleDates && data.flexibleDatesText) {
    return `Flexible - ${data.flexibleDatesText}`
  }
  return undefined
}

export function formatBookingFormMessage(data: ValidatedBookingFormData): string {
  const lines: string[] = []

  const addLine = (value: string | undefined, prefix?: string) => {
    if (value) {
      lines.push(prefix ? `${prefix}${value}` : value)
    }
  }

  const addSection = () => lines.push('')

  const retreatTypeLabel = getRetreatTypeDisplayLabel(data.retreatType, data.retreatTypeOther)
  const groupSize = formatGroupSize(data.minGroupSize, data.maxGroupSize)
  const dateInfo = formatBookingDateInfo(data)

  lines.push('📅 *New Booking Request*', '')
  addLine(escapeSlackMarkdown(data.name), '*Name:* ')
  addLine(escapeSlackMarkdown(data.email), '*Email:* ')
  addLine(data.phone ? escapeSlackMarkdown(data.phone) : undefined, '*Phone:* ')

  if (retreatTypeLabel) {
    addSection()
    addLine(retreatTypeLabel, '*Retreat Type:* ')
  }

  addLine(dateInfo, '*Preferred Date:* ')
  addLine(data.duration ? `${data.duration} days` : undefined, '*Duration:* ')
  addLine(groupSize, '*Group Size:* ')

  if (data.startDate && data.flexibleDates && data.flexibleDatesText) {
    addLine(data.flexibleDatesText, '*Flexibility Notes:* ')
  }

  if (data.accommodationPreferences) {
    addSection()
    lines.push('*Accommodation Preferences:*', escapeSlackMarkdown(data.accommodationPreferences))
  }

  if (data.cateringNeeded) {
    addSection()
    lines.push('*Catering:* Yes')
    addLine(data.cateringDetails ? escapeSlackMarkdown(data.cateringDetails) : undefined, '*Catering Details:* ')
  }

  if (data.extraInfo) {
    addSection()
    lines.push('*Extra Information:*', escapeSlackMarkdown(data.extraInfo))
  }

  return lines.join('\n')
}

export function formatPartialBookingMessage(data: PartialBookingContactData): string {
  const lines = [
    '🚀 *Booking Started*',
    '',
    '_Someone started the booking process but has not completed it yet._',
    '',
    `*Name:* ${escapeSlackMarkdown(data.name)}`,
    `*Email:* ${escapeSlackMarkdown(data.email)}`,
  ]

  if (data.phone) {
    lines.push(`*Phone:* ${escapeSlackMarkdown(data.phone)}`)
  }

  lines.push('', '_Follow up if they do not complete the booking._')

  return lines.join('\n')
}
