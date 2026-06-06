<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from '@/lib/gsap'
import { useGsapScene } from '@/composables/useGsapScene'
import { prepareDraw } from '@/composables/useDrawOnScroll'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

const props = withDefaults(
  defineProps<{ delay?: number; duration?: number }>(),
  { delay: 0.3, duration: 1.7 },
)
const root = ref<HTMLElement | null>(null)

useGsapScene(root, (el) => {
  const paths = Array.from(el.querySelectorAll('path')) as unknown as SVGPathElement[]
  paths.forEach(prepareDraw)
  if (prefersReducedMotion()) {
    paths.forEach((p) => (p.style.strokeDashoffset = '0'))
    return
  }
  const tl = gsap.timeline({
    delay: props.delay,
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
  })
  tl.to(paths[0], { strokeDashoffset: 0, duration: props.duration, ease: 'power1.inOut' })
  if (paths[1]) {
    tl.to(paths[1], { strokeDashoffset: 0, duration: props.duration * 0.45, ease: 'power2.out' }, '-=0.35')
  }
})
</script>

<template>
  <div ref="root" class="signature text-ink">
    <svg viewBox="0 0 620 220" fill="none" class="h-full w-full" aria-label="Handtekening">
      <path
        d="M28 150 C 36 78 92 58 100 120 C 106 168 132 172 140 122 C 146 84 168 86 178 132 C 184 166 206 168 216 118 C 222 82 250 88 252 132 C 253 164 272 168 290 130 C 304 100 322 110 334 142 C 346 176 374 172 392 120 C 404 82 432 86 440 130 C 445 162 468 166 492 118 C 524 58 566 70 560 132 C 556 168 532 180 470 172"
        stroke="currentColor"
        stroke-width="3.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M40 192 C 210 178 432 178 590 188"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>
