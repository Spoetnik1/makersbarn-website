import { useEffect } from 'react'

export function useClickOutside(
  isOpen: boolean,
  containerRef: React.RefObject<HTMLDivElement | null>,
  onClose: () => void
) {
  useEffect(() => {
    if (!isOpen) {return}

    const container = containerRef.current
    if (!container) {return}

    const handleClickOutside = (event: MouseEvent) => {
      if (!container.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, containerRef, onClose])
}

export function useEscapeKey(
  isOpen: boolean,
  onClose: () => void,
  returnFocusRef?: React.RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!isOpen) {return}

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        returnFocusRef?.current?.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose, returnFocusRef])
}

export function useFocusTrap(
  isOpen: boolean,
  dropdownRef: React.RefObject<HTMLDivElement | null>
) {
  useEffect(() => {
    if (!isOpen) {return}
    const dropdown = dropdownRef.current
    if (!dropdown) {return}

    const focusableSelector = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusableElements = dropdown.querySelectorAll<HTMLElement>(focusableSelector)
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]

    const focusTimer = setTimeout(() => {
      firstFocusable.focus()
    }, 0)

    const handleTabTrap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {return}

      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault()
          lastFocusable.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault()
          firstFocusable.focus()
        }
      }
    }

    dropdown.addEventListener('keydown', handleTabTrap)

    return () => {
      clearTimeout(focusTimer)
      dropdown.removeEventListener('keydown', handleTabTrap)
    }
  }, [isOpen, dropdownRef])
}
