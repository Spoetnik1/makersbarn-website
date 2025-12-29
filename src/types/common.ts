export enum Language {
  EN = 'en',
  NL = 'nl',
}

export interface LanguageOption {
  code: Language
  label: string
  title: string
}

export enum SocialPlatform {
  INSTAGRAM = 'Instagram',
  FACEBOOK = 'Facebook',
  LINKEDIN = 'LinkedIn',
}

export interface SocialLink {
  platform: SocialPlatform
  url: string
  ariaLabel: string
}
