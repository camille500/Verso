import Lenis from 'lenis'
import { onMounted, onUnmounted } from 'vue'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { lenisRef } from '@/lib/lenisRef'
import { prefersReducedMotion } from './useReducedMotion'

/**
 * The one place scroll is bootstrapped. Marries Lenis to GSAP's ticker so
 * ScrollTrigger and the smooth-scroll share a single rAF loop (no jank).
 * Call once, from App.vue.
 */
export function useLenis() {
  onMounted(() => {
    // Respect reduced-motion: native scroll, ScrollTrigger still functions.
    if (prefersReducedMotion()) {
      ScrollTrigger.refresh()
      return
    }

    // smoothWheel is OFF: the deck navigation controller (useDeckNavigation)
    // owns wheel/touch and drives one section per gesture via lenis.scrollTo.
    // Lenis stays purely as the eased scroll animator + ScrollTrigger sync.
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: false,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Let ScrollTrigger recompute once everything (fonts, images) has settled.
    requestAnimationFrame(() => ScrollTrigger.refresh())

    onUnmounted(() => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
    })
  })
}
