import type Lenis from 'lenis'

// Module-level handle so non-scroll UI (chapter nav, CTA buttons) can drive
// the same Lenis instance, with a graceful native-scroll fallback.
export const lenisRef: { current: Lenis | null } = { current: null }

export function scrollToTarget(
  target: string | HTMLElement | number,
  opts: { duration?: number; offset?: number } = {},
) {
  const { duration = 1.4, offset = 0 } = opts
  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, { duration, offset })
    return
  }
  // Reduced-motion / no-Lenis fallback
  if (typeof target === 'string') {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' })
  } else {
    window.scrollTo({ top: target, behavior: 'smooth' })
  }
}
