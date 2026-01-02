export const CONTACT_PHONE_NUMBER = '+31649778965'

export const CONTACT_URLS = {
  WHATSAPP: `https://wa.me/${CONTACT_PHONE_NUMBER.replace('+', '')}`,
  PHONE: `tel:${CONTACT_PHONE_NUMBER}`,
  MAP_EMBED: 'https://www.google.com/maps?q=Duisterendijk+2+8131+RA+Wijhe&output=embed',
} as const

export const ANCHOR_IDS = {
  CONTACT_FORM: 'contact-form',
} as const

export const CONTACT_FORM_MESSAGES = {
  SUCCESS: 'Thank you for your message! We will get back to you soon.',
  EMAIL_FAILED: 'There was an issue sending your message. Please try again later.',
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  RATE_LIMITED: 'Too many requests. Please wait a moment before trying again.',
  LOADING: 'Sending...',
} as const

export const CONTACT_RATE_LIMIT = {
  WINDOW_MS: 60000,
  MAX_REQUESTS: 5,
} as const
