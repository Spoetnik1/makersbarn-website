'use server'

import * as postmark from 'postmark'
import { revalidatePath } from 'next/cache'
import { createLogger, escapeHtml, type ValidatedContactFormData } from '@/lib'

const logger = createLogger('email-service')

const EMAIL_SUBJECTS = {
  ADMIN_NOTIFICATION: 'New Contact Form Submission - The Makers Barn',
  USER_CONFIRMATION: 'Thank you for contacting The Makers Barn',
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
