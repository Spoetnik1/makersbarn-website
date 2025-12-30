import { Language } from '@/types'

/**
 * Centralized mapping of image paths to multilingual alt text.
 * Keyed by image file paths (e.g., '/images/sauna.jpg').
 * Each entry contains alt text for each supported language.
 */
export const IMAGE_ALT_TEXT: Record<string, Record<Language, string>> = {
  // Hero images
  '/images/field-walking-women.jpg': {
    [Language.EN]: 'Retreat guests walking through the fields around The Makers Barn',
    [Language.NL]: '',
  },
  '/images/sauna.jpg': {
    [Language.EN]: 'Outdoor sauna at The Makers Barn',
    [Language.NL]: '',
  },
  '/images/arial-overview.JPG': {
    [Language.EN]: 'Aerial overview of The Makers Barn and surrounding countryside',
    [Language.NL]: '',
  },
  '/images/hot-tub-in-field.jpeg': {
    [Language.EN]: 'Hot tub in the field at The Makers Barn',
    [Language.NL]: '',
  },
  '/images/outside-shower-in-field.jpg': {
    [Language.EN]: 'Outside shower in the field at The Makers Barn',
    [Language.NL]: '',
  },

  // Facilities images
  '/images/hay-house-against-sun.jpg': {
    [Language.EN]: 'Hay House glowing in the evening sun',
    [Language.NL]: '',
  },
  '/images/hay-house-bench-sunset.jpg': {
    [Language.EN]: 'Hay House bench at sunset',
    [Language.NL]: '',
  },
  '/images/practice-rooms-with-mats.jpg': {
    [Language.EN]: 'Practice rooms with mats in the Hay House',
    [Language.NL]: '',
  },
  '/images/main-house.jpg': {
    [Language.EN]: 'The Makers Barn main house in the landscape',
    [Language.NL]: '',
  },
  '/images/attic-beds.jpg': {
    [Language.EN]: 'Attic bedroom with comfy beds',
    [Language.NL]: '',
  },
  '/images/attic-chill.jpg': {
    [Language.EN]: 'Cozy attic space for relaxing',
    [Language.NL]: '',
  },
  '/images/cosmos-outside-wooden-cabin.jpeg': {
    [Language.EN]: 'Outside view of the Cosmos wooden cabin',
    [Language.NL]: '',
  },
  '/images/cosmos-view-living-room.jpg': {
    [Language.EN]: 'View from the Cosmos living room',
    [Language.NL]: '',
  },
  '/images/cosmos-luxury-couch.jpg': {
    [Language.EN]: 'Cosy couch in the Cosmos space',
    [Language.NL]: '',
  },
  '/images/double-ensuite.jpg': {
    [Language.EN]: 'Double ensuite bedroom',
    [Language.NL]: '',
  },
  '/images/teahous-with-chair.jpg': {
    [Language.EN]: 'Teahouse with a chair and window',
    [Language.NL]: '',
  },
  '/images/ducks.jpg': {
    [Language.EN]: 'Ducks swimming in the natural pond at The Makers Barn',
    [Language.NL]: '',
  },
  '/images/pond-complete.jpg': {
    [Language.EN]: 'Complete view of the swimming pond at The Makers Barn',
    [Language.NL]: '',
  },
  '/images/yoga-pond-jetty-reflection.jpg': {
    [Language.EN]: 'Yoga session at the pond jetty with reflection',
    [Language.NL]: '',
  },
  '/images/pond-coaching-session.jpg': {
    [Language.EN]: 'Coaching session by the pond at The Makers Barn',
    [Language.NL]: '',
  },
  '/images/outside-walk.jpg': {
    [Language.EN]: 'Peaceful walk through the grounds of The Makers Barn',
    [Language.NL]: '',
  },
  '/images/you-are-where-you-need-to-be.jpg': {
    [Language.EN]: 'Inspirational quote: You are where you need to be',
    [Language.NL]: '',
  },
  '/images/two-beds-in-horizon.jpg': {
    [Language.EN]: 'Two beds in the Horizon facilities space',
    [Language.NL]: '',
  },
  '/images/single-bed-with-wood.jpg': {
    [Language.EN]: 'Single bed with wooden details in Horizon facilities',
    [Language.NL]: '',
  },

  // Team images
  '/images/nana-stairs.jpg': {
    [Language.EN]: 'Nana',
    [Language.NL]: '',
  },
  '/images/benny-smile.jpg': {
    [Language.EN]: 'Benny',
    [Language.NL]: '',
  },
  '/images/noud-banjo.jpg': {
    [Language.EN]: 'Noud',
    [Language.NL]: '',
  },

  // Logo
  '/tmb-logo.webp': {
    [Language.EN]: 'Makers Barn Logo',
    [Language.NL]: '',
  },
} as const

