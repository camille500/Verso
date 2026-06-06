<script setup lang="ts">
import { computed, ref } from 'vue'
import { gsap } from '@/lib/gsap'
import { useGsapScene } from '@/composables/useGsapScene'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

const props = withDefaults(
  defineProps<{
    text: string
    as?: string
    stagger?: number
    start?: string
    delay?: number
    duration?: number
  }>(),
  { as: 'p', stagger: 0.055, start: 'top 84%', delay: 0, duration: 1.0 },
)

const el = ref<HTMLElement | null>(null)
const words = computed(() => props.text.split(' '))

useGsapScene(el, (root) => {
  const inners = root.querySelectorAll('.rt-inner')
  if (prefersReducedMotion()) {
    gsap.set(inners, { yPercent: 0, opacity: 1 })
    return
  }
  gsap.set(inners, { yPercent: 118, opacity: 0 })
  gsap.to(inners, {
    yPercent: 0,
    opacity: 1,
    duration: props.duration,
    ease: 'expo.out',
    stagger: props.stagger,
    delay: props.delay,
    scrollTrigger: { trigger: root, start: props.start, once: true },
  })
})
</script>

<template>
  <component :is="as" ref="el" class="reveal-text">
    <span v-for="(w, i) in words" :key="i" class="rt-word"
      ><span class="rt-inner">{{ w }}</span></span
    >
  </component>
</template>

<style scoped>
.rt-word {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding: 0.04em 0 0.16em;
  margin-bottom: -0.16em;
}
.rt-word:not(:last-child) {
  margin-right: 0.26em;
}
.rt-inner {
  display: inline-block;
  will-change: transform;
}
</style>
