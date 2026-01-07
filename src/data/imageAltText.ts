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
    [Language.NL]: 'Retreat gasten wandelend door de velden rondom The Makers Barn',
  },
  '/images/sauna.jpg': {
    [Language.EN]: 'Outdoor sauna at The Makers Barn',
    [Language.NL]: 'Buitensauna bij The Makers Barn',
  },
  '/images/arial-overview.JPG': {
    [Language.EN]: 'Aerial overview of The Makers Barn and surrounding countryside',
    [Language.NL]: 'Luchtoverzicht van The Makers Barn en omringend platteland',
  },
  '/images/arial-view.jpg': {
    [Language.EN]: 'Aerial view of The Makers Barn and surrounding countryside',
    [Language.NL]: 'Luchtfoto van The Makers Barn en omringend platteland',
  },
  '/images/man-in-hammock-looking-on-field.jpg': {
    [Language.EN]: 'Person relaxing in a hammock looking out over the field at The Makers Barn',
    [Language.NL]: 'Persoon ontspant in een hangmat met uitzicht over het veld bij The Makers Barn',
  },
  '/images/hot-tub-in-field.jpeg': {
    [Language.EN]: 'Hot tub in the field at The Makers Barn',
    [Language.NL]: 'Bubbelbad in het veld bij The Makers Barn',
  },
  '/images/outside-shower-in-field.jpg': {
    [Language.EN]: 'Outside shower in the field at The Makers Barn',
    [Language.NL]: 'Buitendouche in het veld bij The Makers Barn',
  },
  '/images/fire-circle-wood-logs.jpg': {
    [Language.EN]: 'Fire circle with wood logs at The Makers Barn',
    [Language.NL]: 'Vuurplaats met houtblokken bij The Makers Barn',
  },
  '/images/fire-circle-gathering.jpg': {
    [Language.EN]: 'Gathering around the fire circle at The Makers Barn',
    [Language.NL]: 'Samenkomen rond de vuurplaats bij The Makers Barn',
  },
  '/images/playing-music-around-the-fire-pit.jpg': {
    [Language.EN]: 'Playing music around the fire pit at The Makers Barn',
    [Language.NL]: 'Muziek maken rond de vuurplaats bij The Makers Barn',
  },

  // Facilities images
  '/images/hay-house-against-sun.jpg': {
    [Language.EN]: 'Hay House glowing in the evening sun',
    [Language.NL]: 'Hooihuis gloeiend in de avondzon',
  },
  '/images/hay-house-bench-sunset.jpg': {
    [Language.EN]: 'Hay House bench at sunset',
    [Language.NL]: 'Hooihuis bank bij zonsondergang',
  },
  '/images/practice-rooms-with-mats.jpg': {
    [Language.EN]: 'Practice rooms with mats in the Hay House',
    [Language.NL]: 'Oefenruimtes met matten in het Hooihuis',
  },
  '/images/main-house.jpg': {
    [Language.EN]: 'The Makers Barn main house in the landscape',
    [Language.NL]: 'Het hoofdgebouw van The Makers Barn in het landschap',
  },
  '/images/attic-beds.jpg': {
    [Language.EN]: 'Attic bedroom with comfy beds',
    [Language.NL]: 'Zolderslaapkamer met comfortabele bedden',
  },
  '/images/attic-chill.jpg': {
    [Language.EN]: 'Cozy attic space for relaxing',
    [Language.NL]: 'Gezellige zolderruimte om te ontspannen',
  },
  '/images/cosmos-outside-wooden-cabin.jpeg': {
    [Language.EN]: 'Outside view of the Cosmos wooden cabin',
    [Language.NL]: 'Buitenaanzicht van de Cosmos houten cabin',
  },
  '/images/cosmos-view-living-room.jpg': {
    [Language.EN]: 'View from the Cosmos living room',
    [Language.NL]: 'Uitzicht vanuit de Cosmos woonkamer',
  },
  '/images/cosmos-luxury-couch.jpg': {
    [Language.EN]: 'Cosy couch in the Cosmos space',
    [Language.NL]: 'Gezellige bank in de Cosmos ruimte',
  },
  '/images/cosmos-kitchen.jpg': {
    [Language.EN]: 'Kitchen in the Cosmos wooden cabin with wood stove',
    [Language.NL]: 'Keuken in de Cosmos houten cabin met houtkachel',
  },
  '/images/double-ensuite.jpg': {
    [Language.EN]: 'Double ensuite bedroom',
    [Language.NL]: 'Tweepersoons slaapkamer met eigen badkamer',
  },
  '/images/teahous-with-chair.jpg': {
    [Language.EN]: 'Teahouse with a chair and window',
    [Language.NL]: 'Theehuis met stoel en raam',
  },
  '/images/ducks.jpg': {
    [Language.EN]: 'Ducks swimming in the natural pond at The Makers Barn',
    [Language.NL]: 'Eenden zwemmend in de natuurlijke vijver bij The Makers Barn',
  },
  '/images/pond-complete.jpg': {
    [Language.EN]: 'Complete view of the swimming pond at The Makers Barn',
    [Language.NL]: 'Volledig overzicht van de zwemvijver bij The Makers Barn',
  },
  '/images/yoga-pond-jetty-reflection.jpg': {
    [Language.EN]: 'Yoga session at the pond jetty with reflection',
    [Language.NL]: 'Yogasessie bij de vijversteiger met reflectie',
  },
  '/images/pond-coaching-session.jpg': {
    [Language.EN]: 'Coaching session by the pond at The Makers Barn',
    [Language.NL]: 'Coachingsessie bij de vijver van The Makers Barn',
  },
  '/images/woman-in-pond.jpg': {
    [Language.EN]: 'Woman swimming in the natural pond at The Makers Barn',
    [Language.NL]: 'Vrouw zwemmend in de natuurlijke vijver bij The Makers Barn',
  },
  '/images/outside-walk.jpg': {
    [Language.EN]: 'Peaceful walk through the grounds of The Makers Barn',
    [Language.NL]: 'Rustige wandeling over het terrein van The Makers Barn',
  },
  '/images/outside-guitar-circle.jpg': {
    [Language.EN]: 'Outdoor guitar circle gathering at The Makers Barn',
    [Language.NL]: 'Buitenbijeenkomst met gitaarcirkel bij The Makers Barn',
  },
  '/images/you-are-where-you-need-to-be.jpg': {
    [Language.EN]: 'Inspirational quote: You are where you need to be',
    [Language.NL]: 'Inspirerend citaat: Je bent waar je moet zijn',
  },
  '/images/two-beds-in-horizon.jpg': {
    [Language.EN]: 'Two beds in the Horizon facilities space',
    [Language.NL]: 'Twee bedden in de Horizon faciliteiten',
  },
  '/images/single-bed-with-wood.jpg': {
    [Language.EN]: 'Single bed with wooden details in Horizon facilities',
    [Language.NL]: 'Eenpersoonsbed met houten details in Horizon faciliteiten',
  },
  '/images/horizon-kitchen.jpg': {
    [Language.EN]: 'Kitchen on the second floor of the Horizon facility',
    [Language.NL]: 'Keuken op de tweede verdieping van de Horizon faciliteit',
  },
  '/images/horizon-shower.jpg': {
    [Language.EN]: 'Shower facilities in the Horizon accommodation',
    [Language.NL]: 'Douchefaciliteiten in de Horizon accommodatie',
  },

  // Team images
  '/images/nana-stairs.jpg': {
    [Language.EN]: 'Nana',
    [Language.NL]: 'Nana',
  },
  '/images/benny-smile.jpg': {
    [Language.EN]: 'Benny',
    [Language.NL]: 'Benny',
  },
  '/images/noud-banjo.jpg': {
    [Language.EN]: 'Noud',
    [Language.NL]: 'Noud',
  },

  // Location / Surroundings images
  '/images/Kasteel_Het_Nijenhuis.jpg': {
    [Language.EN]: 'Kasteel Het Nijenhuis - historic castle with sculpture garden near The Makers Barn',
    [Language.NL]: 'Kasteel Het Nijenhuis - historisch kasteel met beeldentuin nabij The Makers Barn',
  },
  '/images/Havezate Den Alerdinck.webp': {
    [Language.EN]: 'Havezate Den Alerdinck - historic manor house in the surrounding area',
    [Language.NL]: 'Havezate Den Alerdinck - historisch landhuis in de omgeving',
  },
  '/images/Havezate Den Alerdinck tress.png': {
    [Language.EN]: 'Tree-lined avenue at Havezate Den Alerdinck estate',
    [Language.NL]: 'Bomenlaan bij landgoed Havezate Den Alerdinck',
  },

  // Logo
  '/tmb-logo.webp': {
    [Language.EN]: 'Makers Barn Logo',
    [Language.NL]: 'Makers Barn Logo',
  },
} as const

