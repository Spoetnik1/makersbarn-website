/**
 * Validation schemas and utilities using Zod
 */

import { z } from 'zod'

import { RetreatType, type ValidatedBookingFormData } from '@/types'
import { BOOKING_FIELD_LIMITS, RETREAT_TYPE_LABELS } from '@/constants'

const VALIDATION_LIMITS = {
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  PHONE_MAX: 20,
  MESSAGE_MIN: 1,
  MESSAGE_MAX: 5000,
} as const

const VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Name is required',
  NAME_TOO_LONG: `Name must be less than ${VALIDATION_LIMITS.NAME_MAX} characters`,
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  EMAIL_TOO_LONG: `Email must be less than ${VALIDATION_LIMITS.EMAIL_MAX} characters`,
  PHONE_TOO_LONG: `Phone must be less than ${VALIDATION_LIMITS.PHONE_MAX} characters`,
  MESSAGE_REQUIRED: 'Message is required',
  MESSAGE_TOO_LONG: `Message must be less than ${VALIDATION_LIMITS.MESSAGE_MAX} characters`,
} as const

/**
 * Shared contact info schema - reused by contact and booking forms
 */
export const ContactInfoSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.NAME_REQUIRED)
    .max(BOOKING_FIELD_LIMITS.NAME_MAX, VALIDATION_MESSAGES.NAME_TOO_LONG)
    .trim(),
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.EMAIL_REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL_INVALID)
    .max(BOOKING_FIELD_LIMITS.EMAIL_MAX, VALIDATION_MESSAGES.EMAIL_TOO_LONG)
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .max(BOOKING_FIELD_LIMITS.PHONE_MAX, VALIDATION_MESSAGES.PHONE_TOO_LONG)
    .trim()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
})

export type ValidatedContactInfo = z.infer<typeof ContactInfoSchema>

/**
 * Get display label for retreat type (server-side use: emails, logs, Slack)
 * Handles "Other" type with custom text
 */
export function getRetreatTypeDisplayLabel(
  retreatType?: RetreatType,
  retreatTypeOther?: string
): string | undefined {
  if (!retreatType) {return undefined}

  if (retreatType === RetreatType.OTHER && retreatTypeOther) {
    return `Other: ${retreatTypeOther}`
  }

  return RETREAT_TYPE_LABELS[retreatType]
}

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.NAME_REQUIRED)
    .max(VALIDATION_LIMITS.NAME_MAX, VALIDATION_MESSAGES.NAME_TOO_LONG)
    .trim(),
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.EMAIL_REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL_INVALID)
    .max(VALIDATION_LIMITS.EMAIL_MAX, VALIDATION_MESSAGES.EMAIL_TOO_LONG)
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .max(VALIDATION_LIMITS.PHONE_MAX, VALIDATION_MESSAGES.PHONE_TOO_LONG)
    .trim()
    .optional()
    .transform((val) => val || undefined),
  message: z
    .string()
    .min(VALIDATION_LIMITS.MESSAGE_MIN, VALIDATION_MESSAGES.MESSAGE_REQUIRED)
    .max(VALIDATION_LIMITS.MESSAGE_MAX, VALIDATION_MESSAGES.MESSAGE_TOO_LONG)
    .trim(),
})

export type ValidatedContactFormData = z.infer<typeof ContactFormSchema>

export interface ValidationResult<T> {
  success: boolean
  data?: T
  errors?: Record<string, string>
}

export function validateContactForm(data: unknown): ValidationResult<ValidatedContactFormData> {
  const result = ContactFormSchema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors: Record<string, string> = {}
  result.error.issues.forEach((issue) => {
    const field = issue.path[0]
    if (typeof field === 'string') {
      errors[field] = issue.message
    }
  })

  return { success: false, errors }
}

/**
 * Booking form validation messages
 * Minimal - only name and email are required
 */
const BOOKING_VALIDATION_MESSAGES = {
  NAME_REQUIRED: 'Name is required',
  NAME_TOO_LONG: `Name must be less than ${BOOKING_FIELD_LIMITS.NAME_MAX} characters`,
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  EMAIL_TOO_LONG: `Email must be less than ${BOOKING_FIELD_LIMITS.EMAIL_MAX} characters`,
} as const

/**
 * Booking form validation schema
 * Minimal validation - only name and email required to capture intent
 */
export const BookingFormSchema = z.object({
  name: z
    .string()
    .min(1, BOOKING_VALIDATION_MESSAGES.NAME_REQUIRED)
    .max(BOOKING_FIELD_LIMITS.NAME_MAX, BOOKING_VALIDATION_MESSAGES.NAME_TOO_LONG)
    .trim(),
  email: z
    .string()
    .min(1, BOOKING_VALIDATION_MESSAGES.EMAIL_REQUIRED)
    .email(BOOKING_VALIDATION_MESSAGES.EMAIL_INVALID)
    .max(BOOKING_FIELD_LIMITS.EMAIL_MAX, BOOKING_VALIDATION_MESSAGES.EMAIL_TOO_LONG)
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .max(BOOKING_FIELD_LIMITS.PHONE_MAX)
    .trim()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  startDate: z
    .string()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  duration: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val.length === 0) {return undefined}
      const num = parseInt(val, 10)
      return isNaN(num) ? undefined : num
    }),
  flexibleDates: z.boolean().default(false),
  flexibleDatesText: z
    .string()
    .max(BOOKING_FIELD_LIMITS.FLEXIBLE_TEXT_MAX)
    .trim()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  minGroupSize: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val.length === 0) {return undefined}
      const num = parseInt(val, 10)
      return isNaN(num) ? undefined : num
    }),
  maxGroupSize: z
    .string()
    .optional()
    .transform((val) => {
      if (!val || val.length === 0) {return undefined}
      const num = parseInt(val, 10)
      return isNaN(num) ? undefined : num
    }),
  retreatType: z.nativeEnum(RetreatType).optional(),
  retreatTypeOther: z
    .string()
    .max(BOOKING_FIELD_LIMITS.OTHER_TYPE_MAX)
    .trim()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  accommodationPreferences: z
    .string()
    .max(BOOKING_FIELD_LIMITS.PREFERENCES_MAX)
    .trim()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  cateringNeeded: z.boolean().default(false),
  cateringDetails: z
    .string()
    .max(BOOKING_FIELD_LIMITS.CATERING_DETAILS_MAX)
    .trim()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
  extraInfo: z
    .string()
    .max(BOOKING_FIELD_LIMITS.EXTRA_INFO_MAX)
    .trim()
    .optional()
    .transform((val) => (val && val.length > 0 ? val : undefined)),
})

/**
 * Validate booking form data
 */
export function validateBookingForm(data: unknown): ValidationResult<ValidatedBookingFormData> {
  const result = BookingFormSchema.safeParse(data)

  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors: Record<string, string> = {}
  result.error.issues.forEach((issue) => {
    const field = issue.path[0]
    if (typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message
    }
  })

  return { success: false, errors }
}
