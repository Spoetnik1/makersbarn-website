import { Language } from '@/types'
import { IMAGE_ALT_TEXT } from '@/data/imageAltText'

/**
 * Retrieves alt text for an image by its path and language.
 * 
 * @param imagePath - The path to the image (e.g., '/images/sauna.jpg')
 * @param language - The language code (defaults to English)
 * @returns The alt text for the image in the specified language, or English if not available, or empty string if image not found
 */
export function getImageAltText(
  imagePath: string,
  language: Language = Language.EN
): string {
  const imageData: Record<Language, string> | undefined = IMAGE_ALT_TEXT[imagePath] as Record<Language, string> | undefined

  if (!imageData) {
    return ''
  }

  return imageData[language] || imageData[Language.EN] || ''
}

