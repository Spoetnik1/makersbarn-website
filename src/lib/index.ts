export { cn } from './cn'
export { generatePageMetadata, baseMetadata } from './metadata'
export {
  isMaliciousPath,
  getBlockReason,
  RateLimiter,
  SecurityPatternCategory,
  type SecurityEvent,
} from './security'
export { createLogger, LogLevel, type Logger } from './logger'
export { escapeHtml, escapeHtmlObject } from './html'
export {
  ContactFormSchema,
  validateContactForm,
  type ValidatedContactFormData,
  type ValidationResult,
} from './validation'
export { getImageAltText } from './imageAltText'
export {
  LANGUAGE_COOKIE_NAME,
  LANGUAGE_STORAGE_KEY,
  isValidLanguage,
  detectLanguageFromDomain,
  getLanguageFromCookieString,
  createLanguageCookieValue,
  getLanguageFromLocalStorage,
  setLanguageToLocalStorage,
  setLanguageCookie,
  getLanguageFromDocumentCookie,
  resolveLanguage,
} from './language'
export {
  generateShimmerPlaceholder,
  generateBlurPlaceholder,
  getImageBlurData,
  DEFAULT_BLUR_PLACEHOLDER,
  IMAGE_PLACEHOLDER_COLORS,
  IMAGE_BLUR_DATA,
  type PlaceholderColorScheme,
} from './imagePlaceholder'
export {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateBreadcrumbListSchema,
  generatePageBreadcrumbs,
  generateContactPageSchema,
  type OrganizationSchema,
  type LocalBusinessSchema,
  type WebSiteSchema,
  type BreadcrumbListSchema,
  type ContactPageSchema,
} from './structuredData'
