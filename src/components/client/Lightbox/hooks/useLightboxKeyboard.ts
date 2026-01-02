'use client'

import { useEffect, useCallback } from 'react'
import { LIGHTBOX_KEYS } from '../constants'
import type { UseLightboxKeyboardOptions } from '../types'

export function useLightboxKeyboard({
  isOpen,
  onClose,
  onNext,
  onPrevious,
  onFirst,
  onLast,
  canGoNext,
  canGoPrevious,
  enabled = true,
}: UseLightboxKeyboardOptions): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || !isOpen) return

      const handledKeys = [
        LIGHTBOX_KEYS.ESCAPE,
        LIGHTBOX_KEYS.ARROW_LEFT,
        LIGHTBOX_KEYS.ARROW_RIGHT,
        LIGHTBOX_KEYS.ARROW_UP,
        LIGHTBOX_KEYS.ARROW_DOWN,
        LIGHTBOX_KEYS.HOME,
        LIGHTBOX_KEYS.END,
      ]

      if (handledKeys.includes(event.key as typeof LIGHTBOX_KEYS[keyof typeof LIGHTBOX_KEYS])) {
        event.preventDefault()
      }

      switch (event.key) {
        case LIGHTBOX_KEYS.ESCAPE:
          onClose()
          break
        case LIGHTBOX_KEYS.ARROW_RIGHT:
        case LIGHTBOX_KEYS.ARROW_DOWN:
          if (canGoNext) onNext()
          break
        case LIGHTBOX_KEYS.ARROW_LEFT:
        case LIGHTBOX_KEYS.ARROW_UP:
          if (canGoPrevious) onPrevious()
          break
        case LIGHTBOX_KEYS.HOME:
          onFirst()
          break
        case LIGHTBOX_KEYS.END:
          onLast()
          break
      }
    },
    [enabled, isOpen, onClose, onNext, onPrevious, onFirst, onLast, canGoNext, canGoPrevious]
  )

  useEffect(() => {
    if (!enabled || !isOpen) return

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [enabled, isOpen, handleKeyDown])
}
