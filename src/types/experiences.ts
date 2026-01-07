export enum ExperienceType {
  SOLO_RETREAT = 'solo_retreat',
  ACCOMMODATION = 'accommodation',
  TOGETHER_RETREAT = 'together_retreat',
}

export enum BookingPlatform {
  AIRBNB = 'airbnb',
  NATUURHUISJE = 'natuurhuisje',
}

export interface ExternalLink {
  platform: BookingPlatform
  url: string
}

export interface ExperienceOffer {
  id: string
  type: ExperienceType
  image: string
  externalUrl?: string
  bookingLinks?: ExternalLink[]
}

export interface FeaturedRetreat {
  id: string
  title: string
  image: string
  dateRange: string
  externalUrl: string
}
