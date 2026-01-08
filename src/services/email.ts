'use server'

import * as postmark from 'postmark'
import { revalidatePath } from 'next/cache'
import { createLogger, escapeHtml, getRetreatTypeDisplayLabel, type ValidatedContactFormData } from '@/lib'
import type { ValidatedBookingFormData } from '@/types'

const logger = createLogger('email-service')

const EMAIL_SUBJECTS = {
  ADMIN_NOTIFICATION: 'New Contact Form Submission - The Makers Barn',
  USER_CONFIRMATION: 'Thank you for contacting The Makers Barn',
  BOOKING_ADMIN_NOTIFICATION: 'New Booking Request - The Makers Barn',
  BOOKING_USER_CONFIRMATION: 'Thank you for your booking request - The Makers Barn',
} as const

interface EmailResult {
  success: boolean
  error?: unknown
}

interface EmailField {
  label: string
  value: string | undefined
}

function createEmailHtml(fields: EmailField[]): string {
  return fields
    .filter(({ value }) => value)
    .map(({ label, value }) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value!)}</p>`)
    .join('')
}

function createEmailText(fields: EmailField[]): string {
  return fields
    .filter(({ value }) => value)
    .map(({ label, value }) => `${label}: ${value}`)
    .join('\n')
}

function buildFormFields(data: ValidatedContactFormData): EmailField[] {
  return [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Phone', value: data.phone },
    { label: 'Message', value: data.message },
  ]
}

export async function sendEmail(formData: ValidatedContactFormData): Promise<EmailResult> {
  const apiToken = process.env.POSTMARKAPP_API_TOKEN
  const senderEmail = process.env.POSTMARK_SENDER_EMAIL
  const adminEmail = process.env.POSTMARK_ADMIN_EMAIL

  if (!apiToken || !senderEmail || !adminEmail) {
    logger.error('Missing Postmark configuration', {
      hasApiToken: !!apiToken,
      hasSenderEmail: !!senderEmail,
      hasAdminEmail: !!adminEmail,
    })
    return { success: false, error: 'Email service not configured' }
  }

  const client = new postmark.ServerClient(apiToken)
  const fields = buildFormFields(formData)

  // Support multiple recipients: comma-separated string or array
  // Postmark accepts both formats
  const adminEmails = adminEmail.includes(',') 
    ? adminEmail.split(',').map(email => email.trim()).join(',')
    : adminEmail

  logger.info('Sending contact form emails', { 
    userEmail: formData.email,
    adminRecipients: adminEmails,
    recipientCount: adminEmails.split(',').length 
  })

  try {
    // Send notification email to admin(s)
    const adminEmailResponse = await client.sendEmail({
      From: senderEmail,
      To: adminEmails,
      Subject: EMAIL_SUBJECTS.ADMIN_NOTIFICATION,
      HtmlBody: `
        <h2>New Contact Form Submission</h2>
        <p>You have received a new inquiry from the website contact form.</p>
        <hr />
        ${createEmailHtml(fields)}
      `,
      TextBody: `
New Contact Form Submission
============================

You have received a new inquiry from the website contact form.

${createEmailText(fields)}
      `.trim(),
    })

    // Check if Postmark returned an error code
    if (adminEmailResponse.ErrorCode && adminEmailResponse.ErrorCode !== 0) {
      logger.error('Admin notification email failed', {
        to: adminEmails,
        errorCode: adminEmailResponse.ErrorCode,
        message: adminEmailResponse.Message,
      })
      return { 
        success: false, 
        error: `Admin notification email failed: ${adminEmailResponse.Message || 'Unknown error'}` 
      }
    }

    logger.info('Admin notification email sent', {
      to: adminEmails,
      messageId: adminEmailResponse.MessageID,
      submittedAt: adminEmailResponse.SubmittedAt,
      errorCode: adminEmailResponse.ErrorCode,
    })

    // Send confirmation email to user
    if (formData.email) {
      const userEmailResponse = await client.sendEmail({
        From: senderEmail,
        To: formData.email,
        Subject: EMAIL_SUBJECTS.USER_CONFIRMATION,
        HtmlBody: `
          <h2>Thank you for contacting The Makers Barn</h2>
          <p>We have received your message and will get back to you shortly.</p>
          <h3>Your submission details:</h3>
          ${createEmailHtml(fields)}
          <hr />
          <p>Best regards,<br />The Makers Barn Team</p>
        `,
        TextBody: `
Thank you for contacting The Makers Barn
=========================================

We have received your message and will get back to you shortly.

Your submission details:
${createEmailText(fields)}

Best regards,
The Makers Barn Team
        `.trim(),
      })

      logger.info('User confirmation email sent', {
        to: formData.email,
        messageId: userEmailResponse.MessageID,
        submittedAt: userEmailResponse.SubmittedAt,
        errorCode: userEmailResponse.ErrorCode,
      })
    }

    revalidatePath('/contact')
    return { success: true }
  } catch (error) {
    logger.error('Failed to send email', { userEmail: formData.email }, error)
    return { success: false, error }
  }
}

function buildBookingFields(data: ValidatedBookingFormData): EmailField[] {
  const retreatTypeLabel = getRetreatTypeDisplayLabel(data.retreatType, data.retreatTypeOther)

  const groupSize = data.minGroupSize && data.maxGroupSize
    ? `${data.minGroupSize} - ${data.maxGroupSize} people`
    : data.minGroupSize
      ? `${data.minGroupSize}+ people`
      : data.maxGroupSize
        ? `Up to ${data.maxGroupSize} people`
        : undefined

  const dateInfo = data.startDate
    ? data.flexibleDates && data.flexibleDatesText
      ? `${data.startDate} (flexible: ${data.flexibleDatesText})`
      : data.flexibleDates
        ? `${data.startDate} (flexible)`
        : data.startDate
    : data.flexibleDates && data.flexibleDatesText
      ? `Flexible: ${data.flexibleDatesText}`
      : undefined

  return [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Phone', value: data.phone },
    { label: 'Preferred Dates', value: dateInfo },
    { label: 'Duration', value: data.duration ? `${data.duration} days` : undefined },
    { label: 'Group Size', value: groupSize },
    { label: 'Retreat Type', value: retreatTypeLabel },
    { label: 'Accommodation Preferences', value: data.accommodationPreferences },
    { label: 'Catering', value: data.cateringNeeded ? 'Yes' : undefined },
    { label: 'Catering Details', value: data.cateringDetails },
    { label: 'Extra Information', value: data.extraInfo },
  ]
}

export async function sendBookingEmail(formData: ValidatedBookingFormData): Promise<EmailResult> {
  const apiToken = process.env.POSTMARKAPP_API_TOKEN
  const senderEmail = process.env.POSTMARK_SENDER_EMAIL
  const adminEmail = process.env.POSTMARK_ADMIN_EMAIL

  if (!apiToken || !senderEmail || !adminEmail) {
    logger.error('Missing Postmark configuration for booking email', {
      hasApiToken: !!apiToken,
      hasSenderEmail: !!senderEmail,
      hasAdminEmail: !!adminEmail,
    })
    return { success: false, error: 'Email service not configured' }
  }

  const client = new postmark.ServerClient(apiToken)
  const fields = buildBookingFields(formData)

  const adminEmails = adminEmail.includes(',')
    ? adminEmail.split(',').map(email => email.trim()).join(',')
    : adminEmail

  logger.info('Sending booking request emails', {
    userEmail: formData.email,
    adminRecipients: adminEmails,
    retreatType: formData.retreatType,
  })

  try {
    // Send notification email to admin(s)
    const adminEmailResponse = await client.sendEmail({
      From: senderEmail,
      To: adminEmails,
      Subject: EMAIL_SUBJECTS.BOOKING_ADMIN_NOTIFICATION,
      HtmlBody: `
        <h2>New Booking Request</h2>
        <p>You have received a new booking request from the website.</p>
        <hr />
        ${createEmailHtml(fields)}
      `,
      TextBody: `
New Booking Request
============================

You have received a new booking request from the website.

${createEmailText(fields)}
      `.trim(),
    })

    if (adminEmailResponse.ErrorCode && adminEmailResponse.ErrorCode !== 0) {
      logger.error('Admin booking notification email failed', {
        to: adminEmails,
        errorCode: adminEmailResponse.ErrorCode,
        message: adminEmailResponse.Message,
      })
      return {
        success: false,
        error: `Admin notification email failed: ${adminEmailResponse.Message || 'Unknown error'}`,
      }
    }

    logger.info('Admin booking notification email sent', {
      to: adminEmails,
      messageId: adminEmailResponse.MessageID,
    })

    // Send confirmation email to user
    if (formData.email) {
      try {
        const userEmailResponse = await client.sendEmail({
          From: senderEmail,
          To: formData.email,
          Subject: EMAIL_SUBJECTS.BOOKING_USER_CONFIRMATION,
          HtmlBody: `
            <h2>Thank you for your booking request</h2>
            <p>We have received your retreat booking request and will review your details shortly.</p>
            <p>One of our team members will get back to you within 24-48 hours with availability and pricing information.</p>
            <h3>Your booking request details:</h3>
            ${createEmailHtml(fields)}
            <hr />
            <p>Best regards,<br />The Makers Barn Team</p>
          `,
          TextBody: `
Thank you for your booking request
===================================

We have received your retreat booking request and will review your details shortly.

One of our team members will get back to you within 24-48 hours with availability and pricing information.

Your booking request details:
${createEmailText(fields)}

Best regards,
The Makers Barn Team
          `.trim(),
        })

        // Check if user confirmation email failed
        if (userEmailResponse.ErrorCode !== 0) {
          logger.warn('User booking confirmation email failed', {
            to: formData.email,
            errorCode: userEmailResponse.ErrorCode,
            message: userEmailResponse.Message,
          })
          // Don't fail the entire operation - admin was notified, user can be contacted
        } else {
          logger.info('User booking confirmation email sent', {
            to: formData.email,
            messageId: userEmailResponse.MessageID,
          })
        }
      } catch (userEmailError) {
        // Log but don't fail - admin notification succeeded
        logger.warn('User booking confirmation email failed unexpectedly', {
          to: formData.email,
        }, userEmailError)
      }
    }

    revalidatePath('/book')
    return { success: true }
  } catch (error) {
    logger.error('Failed to send booking email', { userEmail: formData.email }, error)
    return { success: false, error }
  }
}
