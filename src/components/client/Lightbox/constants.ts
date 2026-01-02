/**
 * Animation configuration
 */
export const LIGHTBOX_ANIMATION = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  image: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 },
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },

  slideNext: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },

  slidePrev: {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
  },

  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25 },
  },

  controls: {
    show: { opacity: 1 },
    hide: { opacity: 0 },
    transition: { duration: 0.3 },
  },
} as const

/**
 * Gesture detection thresholds
 */
export const LIGHTBOX_GESTURES = {
  swipeThreshold: 50,
  velocityThreshold: 0.3,
  directionTolerance: 30,
  closeSwipeDistance: 100,
  resistanceFactor: 0.4,
} as const

/**
 * Timing configuration
 */
export const LIGHTBOX_TIMING = {
  controlsAutoHide: 3000,
  wheelDebounce: 300,
  imageLoadTimeout: 10000,
  focusTrapDelay: 100,
  closeAnimationDuration: 250,
} as const

/**
 * Layout configuration
 */
export const LIGHTBOX_LAYOUT = {
  maxImageWidthPercent: 90,
  maxImageHeightPercent: 85,
  safeAreaPadding: 16,
  minTouchTarget: 44,
  thumbnail: {
    width: 72,
    height: 54,
  },
} as const

/**
 * Z-index scale
 */
export const LIGHTBOX_Z_INDEX = {
  backdrop: 9999,
  image: 9998,
  controls: 10000,
} as const

/**
 * Breakpoints
 */
export const LIGHTBOX_BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const

/**
 * Keyboard keys
 */
export const LIGHTBOX_KEYS = {
  ESCAPE: 'Escape',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End',
} as const
