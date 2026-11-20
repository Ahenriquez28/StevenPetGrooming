export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isDesktop = () =>
  typeof window !== 'undefined' && window.matchMedia('(min-width: 861px)').matches
