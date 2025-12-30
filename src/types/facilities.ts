export enum FacilitiesCategory {
  GROUP_ACCOMMODATION = 'Group Accommodation',
  WORKSHOP_SPACE = 'Workshop Space',
  OUTDOORS = 'Outdoors',
}

export interface FacilitiesOption {
  id: string
  label: FacilitiesCategory
  title: string
  image: string
  color: string
  images: string[]
  description: string
  features?: string[]
}

export interface FacilitiesStat {
  number: string
  description: string
}


