import { SocialLink, SocialPlatform } from '@/types'

export const FOOTER_EMAIL = 'info@makersbarn.com'

export const FOOTER_ADDRESS = {
  street: 'Duisterendijk 2',
  postalCode: '8131 RA',
  city: 'Wijhe',
  country: 'Netherlands',
} as const

export const FOOTER_TAGLINE = 'Where creativity meets tranquility'

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: SocialPlatform.INSTAGRAM,
    url: 'https://www.instagram.com/makersbarn',
    ariaLabel: 'Instagram',
  },
  {
    platform: SocialPlatform.FACEBOOK,
    url: 'https://www.facebook.com/makersbarn',
    ariaLabel: 'Facebook',
  },
  {
    platform: SocialPlatform.LINKEDIN,
    url: 'https://www.linkedin.com/company/makersbarn',
    ariaLabel: 'LinkedIn',
  },
]
