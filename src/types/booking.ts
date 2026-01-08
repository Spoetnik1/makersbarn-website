/**
 * Retreat type options for booking form
 */
export enum RetreatType {
  PRIVATE_GROUP = 'private_group',
  YOGA = 'yoga',
  WORKSHOP = 'workshop',
  OTHER = 'other',
}

/**
 * Date range for blocked dates (runtime - uses Date objects)
 */
export interface DateRange {
  start: Date
  end: Date
}

/**
 * Date range configuration (static - uses ISO strings)
 * Prevents hydration mismatch by avoiding Date object creation at module load
 */
export interface DateRangeConfig {
  start: string
  end: string
}

/**
 * Form data structure for booking form (client-side)
 */
export interface BookingFormData {
  name: string
  email: string
  phone: string
  startDate: string
  duration: string
  flexibleDates: boolean
  flexibleDatesText: string
  minGroupSize: string
  maxGroupSize: string
  retreatType: RetreatType
  retreatTypeOther: string
  accommodationPreferences: string
  cateringNeeded: boolean
  cateringDetails: string
  extraInfo: string
}

/**
 * Validated booking form data (after Zod validation)
 * Only name and email are required - everything else captures intent
 */
export interface ValidatedBookingFormData {
  name: string
  email: string
  phone?: string
  startDate?: string
  duration?: number
  flexibleDates: boolean
  flexibleDatesText?: string
  minGroupSize?: number
  maxGroupSize?: number
  retreatType?: RetreatType
  retreatTypeOther?: string
  accommodationPreferences?: string
  cateringNeeded: boolean
  cateringDetails?: string
  extraInfo?: string
}

/**
 * Result of booking form submission
 * Uses messageCode for i18n - client maps codes to translations
 */
export interface SubmitBookingFormResult {
  success: boolean
  messageCode: string
  errors?: Record<string, string>
}

/**
 * Partial booking contact data (step 1 of wizard)
 */
export interface PartialBookingContactData {
  name: string
  email: string
  phone?: string
}

/**
 * Result of partial booking notification
 */
export interface PartialBookingResult {
  success: boolean
  message?: string
}
