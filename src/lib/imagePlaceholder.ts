/**
 * Image placeholder utilities for better loading experience
 */

import { IMAGES } from '@/data'

/**
 * Generates a shimmer SVG as a base64 data URL
 * Creates a subtle animated gradient effect while images load
 */
export function generateShimmerPlaceholder(
  width: number = 700,
  height: number = 475
): string {
  const shimmerSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#e8e4df;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#f5f2ed;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e8e4df;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#shimmer)" />
    </svg>
  `.trim()

  return `data:image/svg+xml;base64,${Buffer.from(shimmerSvg).toString('base64')}`
}

/**
 * Generates a blurred color placeholder based on dominant color
 * Uses SVG with gaussian blur for a soft loading effect
 */
export function generateBlurPlaceholder(
  dominantColor: string = '#e8e4df',
  accentColor: string = '#d4cfc7',
  width: number = 10,
  height: number = 10
): string {
  const blurSvg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="blur" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${dominantColor}" />
          <stop offset="100%" style="stop-color:${accentColor}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" filter="url(#blur)" />
    </svg>
  `.trim()

  return `data:image/svg+xml;base64,${Buffer.from(blurSvg).toString('base64')}`
}

/**
 * Color palette extracted from key images for accurate placeholders
 */
export const IMAGE_PLACEHOLDER_COLORS = {
  // Warm earth tones for barn/indoor images
  warm: { dominant: '#8b7355', accent: '#a69076' },
  // Green tones for outdoor/nature images
  nature: { dominant: '#4a5d4a', accent: '#6b7d6b' },
  // Neutral tones for general use
  neutral: { dominant: '#e8e4df', accent: '#d4cfc7' },
  // Blue tones for sky/water images
  sky: { dominant: '#6b8ca6', accent: '#8aa5bc' },
  // Warm sunset tones
  sunset: { dominant: '#c4956b', accent: '#e8b88a' },
} as const

export type PlaceholderColorScheme = keyof typeof IMAGE_PLACEHOLDER_COLORS

/**
 * Pre-generated blur placeholders for specific images
 * Maps image paths to their blur data URLs
 */
export const IMAGE_BLUR_DATA: Record<string, string> = {
  // Hero image - practice rooms (warm indoor tones)
  [IMAGES.accommodation.practiceRoomsWithMats]: generateBlurPlaceholder(
    IMAGE_PLACEHOLDER_COLORS.warm.dominant,
    IMAGE_PLACEHOLDER_COLORS.warm.accent
  ),
  // HeroDetails image - hay house bench (warm sunset tones)
  [IMAGES.accommodation.hayHouseBench]: generateBlurPlaceholder(
    IMAGE_PLACEHOLDER_COLORS.sunset.dominant,
    IMAGE_PLACEHOLDER_COLORS.sunset.accent
  ),
  // Common outdoor images
  [IMAGES.accommodation.fieldWalking]: generateBlurPlaceholder(
    IMAGE_PLACEHOLDER_COLORS.nature.dominant,
    IMAGE_PLACEHOLDER_COLORS.nature.accent
  ),
  [IMAGES.accommodation.pondComplete]: generateBlurPlaceholder(
    IMAGE_PLACEHOLDER_COLORS.sky.dominant,
    IMAGE_PLACEHOLDER_COLORS.nature.accent
  ),
} as const

/**
 * Default placeholder for general use (pre-computed for performance)
 */
export const DEFAULT_BLUR_PLACEHOLDER = generateBlurPlaceholder(
  IMAGE_PLACEHOLDER_COLORS.neutral.dominant,
  IMAGE_PLACEHOLDER_COLORS.neutral.accent
)

/**
 * Get blur placeholder for an image path
 * Falls back to pre-computed neutral placeholder if not pre-generated
 */
export function getImageBlurData(imagePath: string): string {
  return IMAGE_BLUR_DATA[imagePath] ?? DEFAULT_BLUR_PLACEHOLDER
}
