import type { RefObject } from 'react'

/**
 * Represents a single image in the lightbox gallery
 */
export interface LightboxImage {
  src: string
  alt: string
  width?: number
  height?: number
  blurDataURL?: string
  thumbnailSrc?: string
  caption?: string
}

/**
 * Navigation direction for animations
 */
export type NavigationDirection = 'next' | 'prev' | 'none'

/**
 * Lightbox open/close state
 */
export type LightboxState = 'closed' | 'opening' | 'open' | 'closing'

/**
 * Animation style options
 */
export type AnimationStyle = 'slide' | 'fade' | 'scale' | 'none'

/**
 * Exit method for analytics/callbacks
 */
export type ExitMethod =
  | 'escape'
  | 'closeButton'
  | 'backdrop'
  | 'swipeDown'
  | 'browserBack'

/**
 * Main Lightbox component props
 */
export interface LightboxProps {
  images: LightboxImage[]
  initialIndex?: number
  isOpen: boolean
  onClose: () => void
  onImageChange?: (index: number) => void
  showThumbnails?: boolean
  showDots?: boolean
  enableSwipeClose?: boolean
  enableBackdropClose?: boolean
  enableKeyboard?: boolean
  loop?: boolean
  animation?: AnimationStyle
  zIndex?: number
  preloadCount?: number
  className?: string
  triggerRef?: RefObject<HTMLElement | null>
}

/**
 * LightboxImage component props
 */
export interface LightboxImageProps {
  image: LightboxImage
  isActive: boolean
  direction: NavigationDirection
  onLoad?: () => void
  onError?: () => void
}

/**
 * LightboxControls component props
 */
export interface LightboxControlsProps {
  currentIndex: number
  totalImages: number
  canGoPrevious: boolean
  canGoNext: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  isVisible: boolean
}

/**
 * LightboxDots component props
 */
export interface LightboxDotsProps {
  totalImages: number
  currentIndex: number
  onDotClick: (index: number) => void
  isVisible: boolean
}

/**
 * LightboxThumbnails component props
 */
export interface LightboxThumbnailsProps {
  images: LightboxImage[]
  currentIndex: number
  onThumbnailClick: (index: number) => void
  isVisible: boolean
}

/**
 * Lightbox context value
 */
export interface LightboxContextValue {
  images: LightboxImage[]
  currentIndex: number
  state: LightboxState
  isLoading: boolean
  loadedImages: Set<number>
  controlsVisible: boolean
  direction: NavigationDirection
  goTo: (index: number) => void
  goToNext: () => void
  goToPrevious: () => void
  goToFirst: () => void
  goToLast: () => void
  close: () => void
  showControls: () => void
  hideControls: () => void
  toggleControls: () => void
  markImageLoaded: (index: number) => void
  canGoPrevious: boolean
  canGoNext: boolean
}

/**
 * Internal reducer state
 */
export interface LightboxReducerState {
  currentIndex: number
  state: LightboxState
  isLoading: boolean
  loadedImages: Set<number>
  controlsVisible: boolean
  direction: NavigationDirection
}

/**
 * Reducer actions
 */
export type LightboxAction =
  | { type: 'OPEN'; payload: { index: number } }
  | { type: 'CLOSE' }
  | { type: 'CLOSED' }
  | { type: 'GO_TO'; payload: { index: number; direction: NavigationDirection } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'IMAGE_LOADED'; payload: number }
  | { type: 'SHOW_CONTROLS' }
  | { type: 'HIDE_CONTROLS' }
  | { type: 'TOGGLE_CONTROLS' }

/**
 * useLightboxKeyboard hook options
 */
export interface UseLightboxKeyboardOptions {
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  onFirst: () => void
  onLast: () => void
  canGoNext: boolean
  canGoPrevious: boolean
  enabled?: boolean
}

/**
 * useLightboxGestures hook options
 */
export interface UseLightboxGesturesOptions {
  onSwipeLeft: () => void
  onSwipeRight: () => void
  onSwipeDown: () => void
  onTap: () => void
  enabled?: boolean
  swipeThreshold?: number
  velocityThreshold?: number
}

/**
 * Swipe detection result
 */
export interface SwipeResult {
  direction: 'left' | 'right' | 'up' | 'down'
  distance: number
  velocity: number
}

/**
 * useLightboxFocus hook options
 */
export interface UseLightboxFocusOptions {
  containerRef: RefObject<HTMLDivElement | null>
  isOpen: boolean
  triggerRef?: RefObject<HTMLElement | null>
}
