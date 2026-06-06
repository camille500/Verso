import { onMounted, onUnmounted } from 'vue'
import { lenisRef } from '@/lib/lenisRef'
import { prefersReducedMotion } from './useReducedMotion'

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Presentation-deck navigation: every discrete gesture (one wheel notch, one
 * swipe, one arrow press) advances exactly ONE screen with a smooth eased
 * glide, and input is locked mid-transition so you can never overshoot or skip.
 *
 * The page still really scrolls (programmatically, one "stop" at a time), so
 * all existing ScrollTrigger entrance animations keep firing unchanged. Tall
 * scenes contribute an extra bottom-aligned stop so they're seen, not clipped.
 *
 * Elements marked [data-deck-ignore] keep their own native scrolling when they
 * actually have overflow (the competitor matrix sideways, the phone screen).
 */
export function useDeckNavigation() {
  let stops: number[] = []
  let current = 0
  let locked = false
  let cooldown = 0
  let resizeT = 0
  let syncRaf = 0
  const reduced = prefersReducedMotion()

  const scrollY = () => (lenisRef.current ? lenisRef.current.scroll : window.scrollY)

  function computeStops() {
    const vh = window.innerHeight
    const maxY = document.documentElement.scrollHeight - vh
    const sections = Array.from(document.querySelectorAll('main section')) as HTMLElement[]
    const list: number[] = []
    for (const s of sections) {
      const top = s.offsetTop
      const h = s.offsetHeight
      list.push(top)
      if (h > vh + 8) list.push(Math.min(top + h - vh, maxY)) // tail of a tall scene
    }
    stops = Array.from(new Set(list.map((v) => Math.max(0, Math.round(v))))).sort((a, b) => a - b)
    syncCurrent()
  }

  function syncCurrent() {
    const y = scrollY()
    let best = 0
    let bestD = Infinity
    for (let i = 0; i < stops.length; i++) {
      const d = Math.abs(stops[i] - y)
      if (d < bestD) {
        bestD = d
        best = i
      }
    }
    current = best
  }

  function release() {
    window.clearTimeout(cooldown)
    cooldown = window.setTimeout(() => (locked = false), 180)
  }

  function animateTo(index: number) {
    const next = Math.min(stops.length - 1, Math.max(0, index))
    if (next === current || locked) return
    current = next
    const target = stops[next]
    locked = true
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: reduced ? 0.25 : 0.95,
        easing: easeOutExpo,
        lock: true,
        onComplete: release,
      })
    } else {
      window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' })
      window.setTimeout(release, reduced ? 60 : 720)
    }
  }
  const go = (dir: number) => animateTo(current + dir)

  // ── guards ──────────────────────────────────────────────────
  function ignoreAncestor(t: EventTarget | null): HTMLElement | null {
    const el = t as HTMLElement | null
    return (el?.closest?.('[data-deck-ignore]') as HTMLElement | null) ?? null
  }
  function typing() {
    const el = document.activeElement as HTMLElement | null
    const tag = el?.tagName
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || !!el?.isContentEditable
  }

  function onWheel(e: WheelEvent) {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return // horizontal intent passes through
    const ig = ignoreAncestor(e.target)
    if (ig && ig.scrollHeight > ig.clientHeight + 1) {
      const down = e.deltaY > 0
      const atTop = ig.scrollTop <= 0
      const atBottom = ig.scrollTop + ig.clientHeight >= ig.scrollHeight - 1
      if ((down && !atBottom) || (!down && !atTop)) return // let it scroll inside
    }
    e.preventDefault()
    if (locked || Math.abs(e.deltaY) < 4) return
    go(e.deltaY > 0 ? 1 : -1)
  }

  function onKey(e: KeyboardEvent) {
    const el = document.activeElement as HTMLElement | null
    const onControl = el?.tagName === 'BUTTON' || el?.tagName === 'A'
    switch (e.key) {
      case 'ArrowDown':
      case 'PageDown':
        if (typing()) return // let a focused slider take the arrow
        e.preventDefault()
        go(1)
        break
      case 'ArrowUp':
      case 'PageUp':
        if (typing()) return
        e.preventDefault()
        go(-1)
        break
      case ' ':
      case 'Spacebar':
        if (typing() || onControl) return // space should click a focused button
        e.preventDefault()
        go(1)
        break
      case 'Home':
        e.preventDefault()
        animateTo(0)
        break
      case 'End':
        e.preventDefault()
        animateTo(stops.length - 1)
        break
    }
  }

  let touchY = 0
  let touchX = 0
  let touchNative = false
  function onTouchStart(e: TouchEvent) {
    touchY = e.touches[0].clientY
    touchX = e.touches[0].clientX
    // Any opted-out region (sliders, inner scrollers) keeps fully native touch.
    touchNative = !!ignoreAncestor(e.target)
  }
  function onTouchMove(e: TouchEvent) {
    if (touchNative) return
    e.preventDefault() // kill native momentum
  }
  function onTouchEnd(e: TouchEvent) {
    if (touchNative || locked) return
    const dy = e.changedTouches[0].clientY - touchY
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dy) < 40 || Math.abs(dx) > Math.abs(dy)) return // tap / horizontal
    go(dy < 0 ? 1 : -1) // swipe up → next
  }

  function onScrollSettle() {
    cancelAnimationFrame(syncRaf)
    syncRaf = requestAnimationFrame(() => {
      if (!locked) syncCurrent()
    })
  }
  function onResize() {
    window.clearTimeout(resizeT)
    resizeT = window.setTimeout(computeStops, 150)
  }

  onMounted(() => {
    computeStops()
    window.setTimeout(computeStops, 600) // re-measure after fonts/images settle
    window.addEventListener('load', computeStops)
    window.addEventListener('resize', onResize)
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    if (lenisRef.current) lenisRef.current.on('scroll', onScrollSettle)
    else window.addEventListener('scroll', onScrollSettle, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('load', computeStops)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
    if (lenisRef.current) lenisRef.current.off('scroll', onScrollSettle)
    else window.removeEventListener('scroll', onScrollSettle)
    window.clearTimeout(cooldown)
    window.clearTimeout(resizeT)
    cancelAnimationFrame(syncRaf)
  })
}
