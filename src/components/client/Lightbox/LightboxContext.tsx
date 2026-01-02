'use client'

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  type ReactNode,
} from 'react'
import { LIGHTBOX_TIMING } from './constants'
import type {
  LightboxContextValue,
  LightboxReducerState,
  LightboxAction,
  LightboxImage,
  NavigationDirection,
} from './types'

const LightboxContext = createContext<LightboxContextValue | null>(null)

function lightboxReducer(
  state: LightboxReducerState,
  action: LightboxAction
): LightboxReducerState {
  switch (action.type) {
    case 'OPEN':
      return {
        ...state,
        state: 'opening',
        currentIndex: action.payload.index,
        controlsVisible: true,
        direction: 'none',
      }

    case 'CLOSE':
      return {
        ...state,
        state: 'closing',
      }

    case 'CLOSED':
      return {
        ...state,
        state: 'closed',
        controlsVisible: true,
        direction: 'none',
      }

    case 'GO_TO':
      return {
        ...state,
        currentIndex: action.payload.index,
        direction: action.payload.direction,
        isLoading: !state.loadedImages.has(action.payload.index),
      }

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }

    case 'IMAGE_LOADED': {
      const newLoadedImages = new Set(state.loadedImages)
      newLoadedImages.add(action.payload)
      return {
        ...state,
        loadedImages: newLoadedImages,
        isLoading: action.payload === state.currentIndex ? false : state.isLoading,
      }
    }

    case 'SHOW_CONTROLS':
      return { ...state, controlsVisible: true }

    case 'HIDE_CONTROLS':
      return { ...state, controlsVisible: false }

    case 'TOGGLE_CONTROLS':
      return { ...state, controlsVisible: !state.controlsVisible }

    default:
      return state
  }
}

interface LightboxProviderProps {
  children: ReactNode
  images: LightboxImage[]
  initialIndex: number
  isOpen: boolean
  loop: boolean
  onClose: () => void
  onImageChange?: (index: number) => void
}

export function LightboxProvider({
  children,
  images,
  initialIndex,
  isOpen,
  loop,
  onClose,
  onImageChange,
}: LightboxProviderProps) {
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const [state, dispatch] = useReducer(lightboxReducer, {
    currentIndex: initialIndex,
    state: isOpen ? 'open' : 'closed',
    isLoading: false,
    loadedImages: new Set<number>(),
    controlsVisible: true,
    direction: 'none',
  })

  const canGoPrevious = loop || state.currentIndex > 0
  const canGoNext = loop || state.currentIndex < images.length - 1

  const goTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= images.length) return

      const direction: NavigationDirection =
        index > state.currentIndex
          ? 'next'
          : index < state.currentIndex
            ? 'prev'
            : 'none'

      dispatch({ type: 'GO_TO', payload: { index, direction } })
      onImageChange?.(index)
    },
    [images.length, state.currentIndex, onImageChange]
  )

  const goToNext = useCallback(() => {
    if (!canGoNext) return

    const nextIndex =
      state.currentIndex === images.length - 1 ? 0 : state.currentIndex + 1

    goTo(nextIndex)
  }, [canGoNext, state.currentIndex, images.length, goTo])

  const goToPrevious = useCallback(() => {
    if (!canGoPrevious) return

    const prevIndex =
      state.currentIndex === 0 ? images.length - 1 : state.currentIndex - 1

    goTo(prevIndex)
  }, [canGoPrevious, state.currentIndex, images.length, goTo])

  const goToFirst = useCallback(() => {
    goTo(0)
  }, [goTo])

  const goToLast = useCallback(() => {
    goTo(images.length - 1)
  }, [goTo, images.length])

  const close = useCallback(() => {
    dispatch({ type: 'CLOSE' })
    closeTimeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLOSED' })
      onClose()
    }, LIGHTBOX_TIMING.closeAnimationDuration)
  }, [onClose])

  const showControls = useCallback(() => {
    dispatch({ type: 'SHOW_CONTROLS' })
  }, [])

  const hideControls = useCallback(() => {
    dispatch({ type: 'HIDE_CONTROLS' })
  }, [])

  const toggleControls = useCallback(() => {
    dispatch({ type: 'TOGGLE_CONTROLS' })
  }, [])

  const markImageLoaded = useCallback((index: number) => {
    dispatch({ type: 'IMAGE_LOADED', payload: index })
  }, [])

  const value = useMemo<LightboxContextValue>(
    () => ({
      images,
      currentIndex: state.currentIndex,
      state: state.state,
      isLoading: state.isLoading,
      loadedImages: state.loadedImages,
      controlsVisible: state.controlsVisible,
      direction: state.direction,
      goTo,
      goToNext,
      goToPrevious,
      goToFirst,
      goToLast,
      close,
      showControls,
      hideControls,
      toggleControls,
      markImageLoaded,
      canGoPrevious,
      canGoNext,
    }),
    [
      images,
      state,
      goTo,
      goToNext,
      goToPrevious,
      goToFirst,
      goToLast,
      close,
      showControls,
      hideControls,
      toggleControls,
      markImageLoaded,
      canGoPrevious,
      canGoNext,
    ]
  )

  return (
    <LightboxContext.Provider value={value}>
      {children}
    </LightboxContext.Provider>
  )
}

export function useLightbox(): LightboxContextValue {
  const context = useContext(LightboxContext)

  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }

  return context
}
