export const CONTACT_PHONE_NUMBER = '+31612345678'

export const CONTACT_URLS = {
  WHATSAPP: `https://wa.me/${CONTACT_PHONE_NUMBER.replace('+', '')}`,
  PHONE: `tel:${CONTACT_PHONE_NUMBER}`,
  MAP_EMBED: 'https://www.google.com/maps?q=Duisterendijk+2+8131+RA+Wijhe&output=embed',
} as const

export const ANCHOR_IDS = {
  CONTACT_FORM: 'contact-form',
} as const
