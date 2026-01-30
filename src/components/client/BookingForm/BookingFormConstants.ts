import { RetreatType, type BookingFormData } from '@/types'

export const INITIAL_FORM_DATA: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  startDate: '',
  duration: '',
  flexibleDates: false,
  flexibleDatesText: '',
  minGroupSize: '',
  maxGroupSize: '',
  retreatType: RetreatType.PRIVATE_GROUP,
  retreatTypeOther: '',
  accommodationPreferences: '',
  cateringNeeded: false,
  cateringDetails: '',
  extraInfo: '',
}

export const FORM_FIELD_IDS = {
  NAME: 'booking-name',
  EMAIL: 'booking-email',
  PHONE: 'booking-phone',
  START_DATE: 'booking-start-date',
  DURATION: 'booking-duration',
  FLEXIBLE_DATES: 'booking-flexible-dates',
  FLEXIBLE_DATES_TEXT: 'booking-flexible-text',
  MIN_GROUP_SIZE: 'booking-min-group',
  MAX_GROUP_SIZE: 'booking-max-group',
  RETREAT_TYPE: 'booking-retreat-type',
  RETREAT_TYPE_OTHER: 'booking-retreat-other',
  ACCOMMODATION: 'booking-accommodation',
  CATERING_NEEDED: 'booking-catering-needed',
  CATERING_DETAILS: 'booking-catering-details',
  EXTRA_INFO: 'booking-extra-info',
} as const

export const RETREAT_TYPE_KEYS = [
  { value: RetreatType.PRIVATE_GROUP, labelKey: 'privateGroup' as const },
  { value: RetreatType.YOGA, labelKey: 'yoga' as const },
  { value: RetreatType.WORKSHOP, labelKey: 'workshop' as const },
  { value: RetreatType.OTHER, labelKey: 'other' as const },
]

export enum WizardStep {
  CONTACT = 1,
  RETREAT = 2,
  DETAILS = 3,
  REVIEW = 4,
}

export const TOTAL_STEPS = 4

export const FIELD_TO_STEP: Partial<Record<keyof BookingFormData, WizardStep>> = {
  name: WizardStep.CONTACT,
  email: WizardStep.CONTACT,
  phone: WizardStep.CONTACT,
  retreatType: WizardStep.RETREAT,
  retreatTypeOther: WizardStep.RETREAT,
  startDate: WizardStep.RETREAT,
  duration: WizardStep.RETREAT,
  flexibleDates: WizardStep.RETREAT,
  flexibleDatesText: WizardStep.RETREAT,
  minGroupSize: WizardStep.DETAILS,
  maxGroupSize: WizardStep.DETAILS,
  accommodationPreferences: WizardStep.DETAILS,
  cateringNeeded: WizardStep.DETAILS,
  cateringDetails: WizardStep.DETAILS,
  extraInfo: WizardStep.REVIEW,
}

interface StepLabels {
  contact: string
  retreat: string
  details: string
  review: string
}

const STEP_LABEL_KEYS: Record<WizardStep, keyof StepLabels> = {
  [WizardStep.CONTACT]: 'contact',
  [WizardStep.RETREAT]: 'retreat',
  [WizardStep.DETAILS]: 'details',
  [WizardStep.REVIEW]: 'review',
}

export function getStepLabel(step: WizardStep, stepLabels: StepLabels): string {
  return stepLabels[STEP_LABEL_KEYS[step]]
}

export const STEP_VARIANTS = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
} as const
