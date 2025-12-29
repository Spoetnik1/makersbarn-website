export enum AccommodationCategory {
  GROUP_ACCOMMODATION = 'Group Accommodation',
  WORKSHOP_SPACE = 'Workshop Space',
  OUTDOORS = 'Outdoors',
}

export interface AccommodationOption {
  id: string
  label: AccommodationCategory
  title: string
  image: string
  color: string
  images: string[]
  description: string
  features?: string[]
}

export interface AccommodationStat {
  number: string
  description: string
}
