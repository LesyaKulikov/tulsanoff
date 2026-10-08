import type { Variants, ViewportOptions } from 'framer-motion'

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export const VIEWPORT: ViewportOptions = {
  once: true,
  margin: '0px 0px -80px 0px',
}

export interface DriftOptions {
  duration?: number
  distance?: number
  opacity?: number
}

export function fadeUp(delay = 0, options: DriftOptions = {}): Variants {
  const { duration = 0.8, distance = 36, opacity = 1 } = options
  return {
    hidden: { opacity: 0, y: distance },
    visible: { opacity, y: 0, transition: { duration, delay, ease: EASE } },
  }
}

export function fadeIn(delay = 0, duration = 1): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay, ease: EASE } },
  }
}

export interface ZoomOptions {
  duration?: number
  distance?: number
  from?: number
}

export function scaleIn(delay = 0, options: ZoomOptions = {}): Variants {
  const { duration = 0.9, distance = 24, from = 1 } = options
  return {
    hidden: { opacity: 0, y: distance, scale: from },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration, delay, ease: EASE } },
  }
}

export function reveal(variants: Variants) {
  return {
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: VIEWPORT,
    variants,
  }
}

export function enter(variants: Variants) {
  return {
    initial: 'hidden' as const,
    animate: 'visible' as const,
    variants,
  }
}
