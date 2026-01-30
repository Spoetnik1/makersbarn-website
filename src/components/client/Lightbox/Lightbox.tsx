'use client'

import { useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

import { useTranslation } from '@/context'

import { LightboxProvider, useLightbox } from './LightboxContext'
import { LightboxImage } from './LightboxImage'
import { LightboxControls } from './LightboxControls'
import { LightboxDots } from './LightboxDots'
import { LightboxThumbnails } from './LightboxThumbnails'
import { useLightboxKeyboard, useLightboxGestures, useLightboxFocus, useMediaQuery, useBodyScrollLock, useAutoHideControls } from './hooks'
import { LIGHTBOX_ANIMATION, LIGHTBOX_Z_INDEX, LIGHTBOX_BREAKPOINTS } from './constants'
import type { LightboxProps, LightboxTranslations } from './types'
import styles from './Lightbox.module.css'

interface LightboxContentProps {
  showThumbnails: boolean
  showDots: boolean
  enableSwipeClose: boolean
  enableBackdropClose: boolean
  enableKeyboard: boolean
  triggerRef?: LightboxProps['triggerRef']
  translations: LightboxTranslations
}

function LightboxContent({
  showThumbnails,
  showDots,
  enableSwipeClose,
  enableBackdropClose,
  enableKeyboard,
  triggerRef,
  translations,
}: LightboxContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const {
    images,
    currentIndex,
    state,
    controlsVisible,
    direction,
    goToNext,
    goToPrevious,
    goToFirst,
    goToLast,
    goTo,
    close,
    canGoNext,
    canGoPrevious,
    showControls,
    toggleControls,
    markImageLoaded,
  } = useLightbox()

  // Keyboard navigation
  useLightboxKeyboard({
    isOpen: state === 'open',
    onClose: close,
    onNext: goToNext,
    onPrevious: goToPrevious,
    onFirst: goToFirst,
    onLast: goToLast,
    canGoNext,
    canGoPrevious,
    enabled: enableKeyboard,
  })

  // Touch gestures - extract only touch handlers, onClick is handled separately
  const { onTouchStart, onTouchEnd } = useLightboxGestures({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    onSwipeDown: enableSwipeClose ? close : () => {},
    onTap: toggleControls,
    enabled: true,
  })

  // Focus management
  useLightboxFocus({
    containerRef,
    isOpen: state === 'open',
    triggerRef,
  })

  // Lock body scroll when open
  useBodyScrollLock(state === 'open' || state === 'opening')

  // Show controls on mouse movement
  useAutoHideControls(state === 'open', showControls)

  const handleBackdropClick = (event: React.MouseEvent) => {
    // First check if it's a backdrop click (for closing)
    if (enableBackdropClose && event.target === event.currentTarget) {
      close()
      return
    }
    // Otherwise handle as tap for controls toggle (from gesture handler)
    const target = event.target as HTMLElement
    if (!target.closest('button, a, img')) {
      toggleControls()
    }
  }

  const currentImage = images[currentIndex]

  // Responsive thumbnail visibility
  const isDesktop = useMediaQuery(`(min-width: ${LIGHTBOX_BREAKPOINTS.mobile}px)`)
  const shouldShowThumbnails = showThumbnails && images.length > 3 && isDesktop

  return (
    <AnimatePresence mode="wait">
      {(state === 'open' || state === 'opening' || state === 'closing') && (
        <motion.div
          ref={containerRef}
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={translations.imageNavigation}
          aria-describedby="lightbox-instructions"
          style={{ zIndex: LIGHTBOX_Z_INDEX.backdrop }}
          initial={LIGHTBOX_ANIMATION.backdrop.initial}
          animate={LIGHTBOX_ANIMATION.backdrop.animate}
          exit={LIGHTBOX_ANIMATION.backdrop.exit}
          transition={LIGHTBOX_ANIMATION.backdrop.transition}
          onClick={handleBackdropClick}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Screen reader instructions */}
          <div id="lightbox-instructions" className={styles.srOnly}>
            {translations.keyboardInstructions}
          </div>

          {/* Live region for announcements */}
          <div
            id="lightbox-announcer"
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={styles.srOnly}
          >
            {translations.viewImage} {currentIndex + 1} {translations.imageOf} {images.length}. {currentImage.alt}
          </div>

          {/* Main image */}
          <LightboxImage
            image={currentImage}
            isActive={true}
            direction={direction}
            onLoad={() => markImageLoaded(currentIndex)}
          />

          {/* Controls */}
          <LightboxControls
            currentIndex={currentIndex}
            totalImages={images.length}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
            onClose={close}
            onPrevious={goToPrevious}
            onNext={goToNext}
            isVisible={controlsVisible}
            translations={translations}
          />

          {/* Dot indicators */}
          {showDots && images.length > 1 && (
            <LightboxDots
              totalImages={images.length}
              currentIndex={currentIndex}
              onDotClick={goTo}
              isVisible={controlsVisible}
              translations={translations}
            />
          )}

          {/* Thumbnails */}
          {shouldShowThumbnails && (
            <LightboxThumbnails
              images={images}
              currentIndex={currentIndex}
              onThumbnailClick={goTo}
              isVisible={controlsVisible}
              translations={translations}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Lightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onImageChange,
  showThumbnails = true,
  showDots = true,
  enableSwipeClose = true,
  enableBackdropClose = true,
  enableKeyboard = true,
  loop = false,
  triggerRef,
}: LightboxProps) {
  const { t } = useTranslation('common')

  // Don't render anything if closed and no images
  if (!isOpen || images.length === 0) {
    return null
  }

  // Only render in browser (portal needs document.body)
  if (typeof window === 'undefined') {
    return null
  }

  // Render in portal for proper stacking
  return createPortal(
    <LightboxProvider
      images={images}
      initialIndex={initialIndex}
      isOpen={isOpen}
      loop={loop}
      onClose={onClose}
      onImageChange={onImageChange}
    >
      <LightboxContent
        showThumbnails={showThumbnails}
        showDots={showDots}
        enableSwipeClose={enableSwipeClose}
        enableBackdropClose={enableBackdropClose}
        enableKeyboard={enableKeyboard}
        triggerRef={triggerRef}
        translations={t.lightbox}
      />
    </LightboxProvider>,
    document.body
  )
}
