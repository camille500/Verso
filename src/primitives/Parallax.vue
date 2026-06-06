<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from '@/lib/gsap'
import { useGsapScene } from '@/composables/useGsapScene'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

const props = withDefaults(defineProps<{ speed?: number }>(), { speed: 8 })
const el = ref<HTMLElement | null>(null)

useGsapScene(el, (root) => {
  if (prefersReducedMotion()) return
  gsap.fromTo(
    root,
    { yPercent: -props.speed },
    {
      yPercent: props.speed,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  )
})
</script>

<template>
  <div ref="el" class="parallax will-change-transform"><slot /></div>
</template>
