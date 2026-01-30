import { useEffect } from 'react'

export function useAutoHideControls(isOpen: boolean, showControls: () => void) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleMouseMove = () => {
      showControls()
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        // Auto-hide could be implemented here
      }, 3000)
    }

    if (isOpen) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeoutId)
    }
  }, [isOpen, showControls])
}
