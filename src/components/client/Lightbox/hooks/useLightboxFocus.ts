'use client'

import { useEffect, useRef, useCallback } from 'react'
import { LIGHTBOX_TIMING } from '../constants'
import type { UseLightboxFocusOptions } from '../types'

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

export function useLightboxFocus({
  containerRef,
  isOpen,
  triggerRef,
}: UseLightboxFocusOptions): void {
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const getFocusableElements = useCallback((): HTMLElement[] => {
    if (!containerRef.current) return []
    return Array.from(
      containerRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
    ) as HTMLElement[]
  }, [containerRef])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      if (focusableElements.length === 0) return

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey) {
        // Shift+Tab: if on first, go to last
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else {
        // Tab: if on last, go to first
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    },
    [getFocusableElements]
  )

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement

      // Focus first element after a short delay to allow animation to start
      const timeoutId = setTimeout(() => {
        const focusableElements = getFocusableElements()
        if (focusableElements.length > 0) {
          focusableElements[0].focus()
        }
      }, LIGHTBOX_TIMING.focusTrapDelay)

      // Add focus trap listener
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      // Return focus to trigger or previous element
      const elementToFocus = triggerRef?.current ?? previousFocusRef.current
      if (elementToFocus) {
        elementToFocus.focus()
      }
      previousFocusRef.current = null
    }
  }, [isOpen, getFocusableElements, handleKeyDown, triggerRef])
}
