import { onUnmounted, ref } from 'vue'

const QUERY = '(prefers-reduced-motion: reduce)'

/** Non-reactive one-shot check (safe to call outside setup). */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(QUERY).matches
}

/** Reactive flag that updates if the OS setting changes mid-session. */
export function useReducedMotion() {
  const reduced = ref(prefersReducedMotion())
  if (typeof window !== 'undefined') {
    const mq = window.matchMedia(QUERY)
    const handler = (e: MediaQueryListEvent) => (reduced.value = e.matches)
    mq.addEventListener('change', handler)
    onUnmounted(() => mq.removeEventListener('change', handler))
  }
  return reduced
}
