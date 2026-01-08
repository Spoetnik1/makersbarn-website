import type { DateRange } from '@/types'

/**
 * Check if a date falls within any of the blocked date ranges
 * Uses UTC to ensure consistent behavior across timezones
 */
export function isDateBlocked(date: Date, blockedRanges: DateRange[]): boolean {
  const checkDate = new Date(date)
  checkDate.setUTCHours(0, 0, 0, 0)

  return blockedRanges.some((range) => {
    const start = new Date(range.start)
    const end = new Date(range.end)
    start.setUTCHours(0, 0, 0, 0)
    end.setUTCHours(23, 59, 59, 999)

    return checkDate >= start && checkDate <= end
  })
}

/**
 * Check if a date is a valid future date (today or later)
 * Uses UTC for consistent behavior across timezones
 */
export function isValidFutureDate(dateString: string): boolean {
  const date = new Date(dateString)
  if (isNaN(date.getTime())) {
    return false
  }

  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  date.setUTCHours(0, 0, 0, 0)

  return date >= today
}

/**
 * Get all dates within a date range
 */
export function getDatesInRange(start: Date, end: Date): Date[] {
  const dates: Date[] = []
  const currentDate = new Date(start)

  while (currentDate <= end) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

/**
 * Get all blocked dates from an array of date ranges
 */
export function getAllBlockedDates(blockedRanges: DateRange[]): Date[] {
  return blockedRanges.flatMap((range) => getDatesInRange(range.start, range.end))
}

/**
 * Format a date as YYYY-MM-DD string
 */
export function formatDateToISO(date: Date): string {
  return date.toISOString().split('T')[0]
}

/**
 * Parse a YYYY-MM-DD string to Date
 */
export function parseISODate(dateString: string): Date | null {
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date
}

/**
 * Format a date range for display
 */
export function formatDateRange(start: Date, end: Date, locale: string = 'en'): string {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }

  const formatter = new Intl.DateTimeFormat(locale, options)
  return `${formatter.format(start)} - ${formatter.format(end)}`
}

/**
 * Get minimum selectable date (today)
 * Uses UTC for consistent behavior across timezones
 */
export function getMinSelectableDate(): Date {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  return today
}

/**
 * Check if a date string is valid ISO format (YYYY-MM-DD)
 */
export function isValidISODateString(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) {
    return false
  }

  const date = new Date(dateString)
  return !isNaN(date.getTime())
}
