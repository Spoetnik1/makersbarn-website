export const SPRING_OPTIONS = {
  type: 'tween' as const,
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
}

export const DRAG_BUFFER = 50

export const AUTO_DELAY_MS = 10000

export const HERO_ANIMATION = {
  heading: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 1.4,
      delay: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
  emphasis: {
    initial: { opacity: 0, scale: 0.9, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: {
      duration: 1.2,
      delay: 1.1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      scale: { type: 'spring' as const, stiffness: 100, damping: 15 },
    },
  },
  subheading: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 1.4,
      delay: 1,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
}
