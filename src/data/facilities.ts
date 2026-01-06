import { FacilitiesOption, FacilitiesCategory, FacilitiesStat } from '@/types'
import { FACILITIES_COLORS } from '@/constants'
import { IMAGES } from './images'

export const FACILITIES_OPTIONS: FacilitiesOption[] = [
  {
    id: 'hay-house',
    label: FacilitiesCategory.GROUP_ACCOMMODATION,
    title: 'Hay House Practice Space',
    image: IMAGES.accommodation.practiceRoomsWithMats,
    color: FACILITIES_COLORS.HAY_HOUSE,
    images: [
      IMAGES.accommodation.practiceRoomsWithMats,
      IMAGES.accommodation.hayHouseSun,
      IMAGES.accommodation.hayHouseBench,
    ],
    description: 'An enchanting hay house with space for yoga, breathing sessions, and much more! Even more beautiful when the sun is out creating mesmerizing colorful reflections.',
    features: [
      '65+ m² space',
      'Heated floor',
      'Yoga mats and accessories',
      'Sound system',
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
      IMAGES.accommodation.cosmosKitchen,
    ],
    description: 'A wooden cabin with wood stove. Cosy as no other while creating a luxury vibe. Private terrace with one of the best views the Netherlands has to offer.',
    features: [
      '60 m²',
      'Double bed or two singles',
      'Sleeper sofa',
      'Shower',
      'Kitchen',
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
      IMAGES.accommodation.horizonKitchen,
      IMAGES.accommodation.horizonShower,
    ],
    description: 'Old barn turned into luxury sleeping arrangement. Chill area, rooms with private and shared showers. Kitchen present on the second floor',
    features: [
      '3 bed room with shared shower',
      '2 bed room with ensuit shower',
      'Private room with shared shower',
      'Large attic (2-4 beds, shower)',
      'Attic space for indoor practic sessions',
    ],
  },
  {
    id: 'sauna',
    label: FacilitiesCategory.OUTDOORS,
    title: 'Sauna, Hot Tub & Fire Circle',
    image: IMAGES.accommodation.sauna,
    color: FACILITIES_COLORS.SAUNA,
    images: [
      IMAGES.accommodation.sauna,
      IMAGES.accommodation.hotTubInField,
      IMAGES.accommodation.outsideShowerInField,
      IMAGES.accommodation.fireCircleWoodLogs,
      IMAGES.accommodation.fireCircleGathering,
    ],
    description: 'Unwind and rejuvenate in our private sauna, hot tub, and fire circle area. The perfect way to decompress after a day of creative work or workshops.',
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
      IMAGES.accommodation.womanInPond,
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
      IMAGES.accommodation.outsideGuitarCircle,
    ],
    description: 'The offered Facilities are essential for a retreat, but it\'s the little things in between that make a place truly special',
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

