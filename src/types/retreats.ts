export enum RetreatId {
  SHANTI_DEVA = 'shanti-deva',
}

export enum RetreatDateId {
  JUNE_2026 = 'june-2026',
  AUGUST_2026 = 'august-2026',
}

export enum ScheduleDayType {
  ARRIVAL = 'arrival',
  STUDY = 'study',
  FINAL = 'final',
}

export interface RetreatDate {
  id: RetreatDateId
  startDate: string
  endDate: string
}

export interface Teacher {
  id: string
  name: string
  title: string
  imageUrl: string
}

export interface ScheduleItem {
  time: string
  activityKey: string
}

export interface DaySchedule {
  dayType: ScheduleDayType
  items: ScheduleItem[]
}

export interface PriceBreakdownItem {
  labelKey: string
  amount: string
}

export interface AccessibilityItem {
  key: string
}

export interface RetreatLocation {
  nameKey: string
  address: string
  accessibilityKeys: string[]
}

export interface RetreatContact {
  whatsapp: string
  email: string
}

export interface ParticipantRange {
  min: number
  max: number
}

export interface RetreatData {
  id: RetreatId
  slug: string
  heroImage: string
  teachers: Teacher[]
  dates: RetreatDate[]
  duration: string
  dailyTime: string
  location: RetreatLocation
  schedule: DaySchedule[]
  specialActivityKeys: string[]
  includedServiceKeys: string[]
  accommodationOptionKeys: string[]
  priceBreakdown: PriceBreakdownItem[]
  totalPrice: string
  paymentTermKeys: string[]
  cancellationPolicyKeys: string[]
  participantRange: ParticipantRange
  contact: RetreatContact
  bookingUrl: string
}
