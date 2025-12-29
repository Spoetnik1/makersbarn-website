import { AccommodationOption, AccommodationCategory, AccommodationStat } from '@/types'
import { ACCOMMODATION_COLORS } from '@/constants'
import { IMAGES } from './images'

export const ACCOMMODATION_OPTIONS: AccommodationOption[] = [
  {
    id: 'hay-house',
    label: AccommodationCategory.GROUP_ACCOMMODATION,
    title: 'Enchanting Hay House',
    image: IMAGES.accommodation.hayHouseSun,
    color: ACCOMMODATION_COLORS.HAY_HOUSE,
    images: [
      IMAGES.accommodation.hayHouseSun,
      IMAGES.accommodation.hayHouseBench,
      IMAGES.accommodation.mainHouse,
      IMAGES.accommodation.atticBeds,
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
    label: AccommodationCategory.WORKSHOP_SPACE,
    title: 'The Cosmos',
    image: IMAGES.accommodation.cosmosView,
    color: ACCOMMODATION_COLORS.COSMOS,
    images: [
      IMAGES.accommodation.cosmosView,
      IMAGES.accommodation.cosmosCouch,
      IMAGES.accommodation.teahouse,
      IMAGES.accommodation.quoteImage,
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
    label: AccommodationCategory.OUTDOORS,
    title: 'Horizon',
    image: IMAGES.accommodation.fieldWalking,
    color: ACCOMMODATION_COLORS.HORIZON,
    images: [
      IMAGES.accommodation.fieldWalking,
      IMAGES.accommodation.outsideWalk,
      IMAGES.accommodation.hayHouseSun,
    ],
    description: 'Expansive outdoor spaces to connect with nature and find inspiration in the open air. Perfect for reflection, outdoor workshops, and enjoying the countryside.',
  },
  {
    id: 'sauna',
    label: AccommodationCategory.OUTDOORS,
    title: 'Sauna & Hot Tub',
    image: IMAGES.accommodation.sauna,
    color: ACCOMMODATION_COLORS.SAUNA,
    images: [
      IMAGES.accommodation.sauna,
      IMAGES.accommodation.quoteImage,
      IMAGES.accommodation.outsideWalk,
    ],
    description: 'Unwind and rejuvenate in our private sauna and hot tub area. The perfect way to decompress after a day of creative work or workshops.',
  },
  {
    id: 'pond',
    label: AccommodationCategory.OUTDOORS,
    title: 'Swimming Pond',
    image: IMAGES.accommodation.ducks,
    color: ACCOMMODATION_COLORS.POND,
    images: [
      IMAGES.accommodation.ducks,
      IMAGES.accommodation.quoteImage,
      IMAGES.accommodation.fieldWalking,
    ],
    description: 'A natural swimming pond surrounded by lush greenery and local wildlife. Perfect for a refreshing swim or enjoying the peaceful sounds of nature.',
  },
  {
    id: 'in-between',
    label: AccommodationCategory.WORKSHOP_SPACE,
    title: 'Everything in Between',
    image: IMAGES.accommodation.mainHouse,
    color: ACCOMMODATION_COLORS.IN_BETWEEN,
    images: [
      IMAGES.accommodation.mainHouse,
      IMAGES.accommodation.atticChill,
      IMAGES.accommodation.doubleEnsuite,
      IMAGES.accommodation.atticBeds,
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

export const ACCOMMODATION_STATS: AccommodationStat[] = [
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
