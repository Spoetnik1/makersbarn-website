'use client'

import { useCallback, useRef, type TouchEvent, type MouseEvent } from 'react'
import { LIGHTBOX_GESTURES } from '../constants'
import type { UseLightboxGesturesOptions } from '../types'

interface TouchState {
  startX: number
  startY: number
  startTime: number
  isDragging: boolean
}

export function useLightboxGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeDown,
  onTap,
  enabled = true,
  swipeThreshold = LIGHTBOX_GESTURES.swipeThreshold,
  velocityThreshold = LIGHTBOX_GESTURES.velocityThreshold,
}: UseLightboxGesturesOptions) {
  const touchStateRef = useRef<TouchState>({
    startX: 0,
    startY: 0,
    startTime: 0,
    isDragging: false,
  })

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (!enabled) return

      const touch = event.touches[0]
      touchStateRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
        isDragging: true,
      }
    },
    [enabled]
  )

  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (!enabled || !touchStateRef.current.isDragging) return

      const touch = event.changedTouches[0]
      const deltaX = touch.clientX - touchStateRef.current.startX
      const deltaY = touch.clientY - touchStateRef.current.startY
      const deltaTime = Date.now() - touchStateRef.current.startTime

      const absX = Math.abs(deltaX)
      const absY = Math.abs(deltaY)
      const velocity = Math.sqrt(deltaX ** 2 + deltaY ** 2) / deltaTime

      touchStateRef.current.isDragging = false

      // Check if this is a tap (minimal movement)
      if (absX < 10 && absY < 10 && deltaTime < 300) {
        onTap()
        return
      }

      // Determine if swipe meets threshold
      const meetsThreshold =
        absX >= swipeThreshold ||
        absY >= swipeThreshold ||
        velocity >= velocityThreshold

      if (!meetsThreshold) return

      // Determine primary direction
      const isHorizontal = absX > absY

      if (isHorizontal) {
        if (deltaX < -swipeThreshold) {
          onSwipeLeft()
        } else if (deltaX > swipeThreshold) {
          onSwipeRight()
        }
      } else {
        if (deltaY > swipeThreshold) {
          onSwipeDown()
        }
      }
    },
    [enabled, swipeThreshold, velocityThreshold, onSwipeLeft, onSwipeRight, onSwipeDown, onTap]
  )

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!enabled) return

      // Only trigger tap on backdrop click, not on interactive elements
      const target = event.target as HTMLElement
      if (target.closest('button, a, img')) return

      onTap()
    },
    [enabled, onTap]
  )

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onClick: handleClick,
  }
}
