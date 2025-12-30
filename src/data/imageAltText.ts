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

  // Accommodation images
  '/images/hay-house-against-sun.jpg': {
    [Language.EN]: 'Hay House glowing in the evening sun',
    [Language.NL]: '',
  },
  '/images/hay-house-bench-sunset.jpg': {
    [Language.EN]: 'Hay House bench at sunset',
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
  '/images/outside-walk.jpg': {
    [Language.EN]: 'Peaceful walk through the grounds of The Makers Barn',
    [Language.NL]: '',
  },
  '/images/you-are-where-you-need-to-be.jpg': {
    [Language.EN]: 'Inspirational quote: You are where you need to be',
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

