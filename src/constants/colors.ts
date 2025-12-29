export const ACCOMMODATION_COLORS = {
  HAY_HOUSE: '#b8894a',
  COSMOS: '#7d6fa6',
  HORIZON: '#5b8b5b',
  SAUNA: '#c06b3e',
  POND: '#3f7d85',
  IN_BETWEEN: '#94775a',
} as const

export type AccommodationColor = (typeof ACCOMMODATION_COLORS)[keyof typeof ACCOMMODATION_COLORS]
