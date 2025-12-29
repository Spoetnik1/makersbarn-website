export const IMAGES = {
  hero: {
    fieldWalking: '/images/field-walking-women.jpg',
    sauna: '/images/sauna.jpg',
  },
  accommodation: {
    hayHouseSun: '/images/hay-house-against-sun.jpg',
    hayHouseBench: '/images/hay-house-bench-sunset.jpg',
    mainHouse: '/images/main-house.jpg',
    atticBeds: '/images/attic-beds.jpg',
    atticChill: '/images/attic-chill.jpg',
    cosmosView: '/images/cosmos-view-living-room.jpg',
    cosmosCouch: '/images/cosmos-luxury-couch.jpg',
    doubleEnsuite: '/images/double-ensuite.jpg',
    teahouse: '/images/teahous-with-chair.jpg',
    sauna: '/images/sauna.jpg',
    ducks: '/images/ducks.jpg',
    outsideWalk: '/images/outside-walk.jpg',
    quoteImage: '/images/you-are-where-you-need-to-be.jpg',
    fieldWalking: '/images/field-walking-women.jpg',
  },
  team: {
    nana: '/images/nana-stairs.jpg',
    benny: '/images/benny-smile.jpg',
    noud: '/images/noud-banjo.jpg',
  },
  logo: '/tmb-logo.webp',
} as const

export const CAROUSEL_IMAGES = [
  IMAGES.accommodation.mainHouse,
  IMAGES.accommodation.hayHouseSun,
  IMAGES.accommodation.atticBeds,
  IMAGES.accommodation.cosmosView,
  IMAGES.accommodation.cosmosCouch,
  IMAGES.accommodation.atticChill,
  IMAGES.accommodation.doubleEnsuite,
  IMAGES.accommodation.sauna,
  IMAGES.accommodation.teahouse,
  IMAGES.accommodation.outsideWalk,
  IMAGES.accommodation.ducks,
  IMAGES.team.benny,
  IMAGES.accommodation.quoteImage,
] as const

export const POLAROID_IMAGES = [
  { src: IMAGES.accommodation.mainHouse, alt: 'The Makers Barn main house in the landscape' },
  { src: IMAGES.accommodation.hayHouseSun, alt: 'Hay House glowing in the evening sun' },
  { src: IMAGES.accommodation.atticBeds, alt: 'Attic bedroom with comfy beds' },
  { src: IMAGES.accommodation.cosmosView, alt: 'View from the Cosmos living room' },
  { src: IMAGES.accommodation.sauna, alt: 'Outdoor sauna at The Makers Barn' },
  { src: IMAGES.accommodation.teahouse, alt: 'Teahouse with a chair and window' },
  { src: IMAGES.accommodation.cosmosCouch, alt: 'Cosy couch in the Cosmos space' },
  { src: IMAGES.accommodation.doubleEnsuite, alt: 'Double ensuite bedroom' },
] as const
