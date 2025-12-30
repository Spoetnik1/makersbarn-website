import { FacilitiesOption, FacilitiesCategory, FacilitiesStat } from '@/types'
import { FACILITIES_COLORS } from '@/constants'
import { IMAGES } from './images'

export const FACILITIES_OPTIONS: FacilitiesOption[] = [
  {
    id: 'hay-house',
    label: FacilitiesCategory.GROUP_ACCOMMODATION,
    title: 'Enchanting Hay House',
    image: IMAGES.accommodation.hayHouseSun,
    color: FACILITIES_COLORS.HAY_HOUSE,
    images: [
      IMAGES.accommodation.hayHouseSun,
      IMAGES.accommodation.hayHouseBench,
      IMAGES.accommodation.practiceRoomsWithMats,
    ],
    description: 'A beautifully converted hay barn offering 23 comfortable beds across two former stables. Perfect for retreats, workshops, and creative gatherings.',
    features: [
      'Kitchen',
      'Bathroom',
      '23 beds across two former stables',
      'Large common area',
    ],
  },
  {
    id: 'cosmos',
    label: FacilitiesCategory.WORKSHOP_SPACE,
    title: 'The Cosmos',
    image: IMAGES.accommodation.cosmosOutside,
    color: FACILITIES_COLORS.COSMOS,
    images: [
      IMAGES.accommodation.cosmosOutside,
      IMAGES.accommodation.cosmosView,
      IMAGES.accommodation.cosmosCouch,
    ],
    description: 'An intimate workshop space designed for smaller sessions, masterclasses, and one-on-one creative work. Perfect for intimate gatherings and specialized workshops.',
    features: [
      'Workshop space',
      'Comfortable seating',
      'Natural light',
    ],
  },
  {
    id: 'horizon',
    label: FacilitiesCategory.OUTDOORS,
    title: 'Horizon',
    image: IMAGES.accommodation.atticChill,
    color: FACILITIES_COLORS.HORIZON,
    images: [
      IMAGES.accommodation.atticChill,
      IMAGES.accommodation.atticBeds,
      IMAGES.accommodation.doubleEnsuite,
      IMAGES.accommodation.singleBedWithWood,
    ],
    description: 'Expansive outdoor spaces to connect with nature and find inspiration in the open air. Perfect for reflection, outdoor workshops, and enjoying the countryside.',
  },
  {
    id: 'sauna',
    label: FacilitiesCategory.OUTDOORS,
    title: 'Sauna & Hot Tub',
    image: IMAGES.accommodation.sauna,
    color: FACILITIES_COLORS.SAUNA,
    images: [
      IMAGES.accommodation.sauna,
      IMAGES.accommodation.hotTubInField,
      IMAGES.accommodation.outsideShowerInField,
    ],
    description: 'Unwind and rejuvenate in our private sauna and hot tub area. The perfect way to decompress after a day of creative work or workshops.',
  },
  {
    id: 'pond',
    label: FacilitiesCategory.OUTDOORS,
    title: 'Swimming Pond',
    image: IMAGES.accommodation.pondComplete,
    color: FACILITIES_COLORS.POND,
    images: [
      IMAGES.accommodation.pondComplete,
      IMAGES.accommodation.yogaPondJettyReflection,
      IMAGES.accommodation.pondCoachingSession,
    ],
    description: 'A natural swimming pond surrounded by lush greenery and local wildlife. Perfect for a refreshing swim or enjoying the peaceful sounds of nature.',
  },
  {
    id: 'in-between',
    label: FacilitiesCategory.WORKSHOP_SPACE,
    title: 'Everything in Between',
    image: IMAGES.accommodation.ducks,
    color: FACILITIES_COLORS.IN_BETWEEN,
    images: [
      IMAGES.accommodation.ducks,
      IMAGES.accommodation.mainHouse,
      IMAGES.accommodation.outsideWalk,
      IMAGES.accommodation.teahouse,
    ],
    description: 'Versatile spaces throughout our property, from cozy attic rooms to comfortable ensuite accommodations. Flexible spaces that adapt to your needs.',
    features: [
      'Kitchen',
      'Bathroom',
      'Two single or one double bed',
      'Ensuite options available',
    ],
  },
]

export const FACILITIES_STATS: FacilitiesStat[] = [
  {
    number: '60m²+',
    description: 'Open space practice hall.',
  },
  {
    number: '14',
    description: 'Beds across 6 cozy rooms',
  },
  {
    number: '1.3ha+',
    description: 'Of private land, a natural swimming pond, sauna, and fire circle.',
  },
]

