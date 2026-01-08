import type { DateRange, DateRangeConfig } from '@/types'

/**
 * Hardcoded unavailable date ranges (ISO string format)
 * Uses strings to prevent SSR/client hydration mismatch
 * Convert to DateRange[] using getBlockedDateRanges() on client side
 */
const BLOCKED_DATE_RANGE_CONFIG: DateRangeConfig[] = [
  { start: '2026-06-19', end: '2026-06-24' },
  { start: '2026-08-04', end: '2026-08-09' },
]

/**
 * Get blocked date ranges as Date objects
 * Call this on client side to avoid hydration mismatch
 */
export function getBlockedDateRanges(): DateRange[] {
  return BLOCKED_DATE_RANGE_CONFIG.map((config) => ({
    start: new Date(config.start),
    end: new Date(config.end),
  }))
}

/**
 * @deprecated Use getBlockedDateRanges() instead to avoid hydration mismatch
 * Kept for backwards compatibility - will be removed in future version
 */
export const BLOCKED_DATE_RANGES: DateRange[] = BLOCKED_DATE_RANGE_CONFIG.map((config) => ({
  start: new Date(config.start),
  end: new Date(config.end),
}))

/**
 * Group size constraints
 */
export const GROUP_SIZE = {
  MIN: 1,
  MAX: 20,
} as const

/**
 * Duration constraints (in days)
 */
export const DURATION = {
  MIN: 1,
  MAX: 14,
} as const

/**
 * Rate limiting configuration for booking form
 */
export const BOOKING_RATE_LIMIT = {
  WINDOW_MS: 60000,
  MAX_REQUESTS: 3,
  PARTIAL_MAX_REQUESTS: 5,
} as const

/**
 * Form field validation limits
 */
export const BOOKING_FIELD_LIMITS = {
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  PHONE_MAX: 20,
  FLEXIBLE_TEXT_MAX: 500,
  OTHER_TYPE_MAX: 200,
  PREFERENCES_MAX: 1000,
  CATERING_DETAILS_MAX: 500,
  EXTRA_INFO_MAX: 1000,
} as const

/**
 * Message codes for booking form - server returns codes, client maps to i18n
 */
export enum BookingMessageCode {
  SUCCESS = 'success',
  EMAIL_FAILED = 'emailFailed',
  UNEXPECTED_ERROR = 'unexpectedError',
  VALIDATION_ERROR = 'validationError',
  RATE_LIMITED = 'rateLimited',
}

/**
 * Retreat type labels for server-side use (emails, logs)
 * For client-side display, use i18n translations
 */
export const RETREAT_TYPE_LABELS = {
  private_group: 'Private/Group Retreat',
  yoga: 'Yoga Retreat',
  workshop: 'Workshop',
  other: 'Other',
} as const

/**
 * Anchor ID for booking form section
 */
export const BOOKING_ANCHOR_ID = 'booking-form' as const
