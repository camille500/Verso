<script setup lang="ts">
import { ref } from 'vue'
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import { gsap } from '@/lib/gsap'
import { useGsapScene } from '@/composables/useGsapScene'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

const c = content.scenes.reveal
const word = ref<HTMLElement | null>(null)

useGsapScene(word, (el) => {
  if (prefersReducedMotion()) return
  gsap.from(el, {
    opacity: 0,
    scale: 1.18,
    filter: 'blur(16px)',
    letterSpacing: '0.3em',
    duration: 1.5,
    ease: 'expo.out',
    scrollTrigger: { trigger: el, start: 'top 72%', once: true },
  })
})
</script>

<template>
  <Scene id="reveal" :label="c.title">
    <div class="text-center">
      <h1 ref="word" class="brand h-display leading-none text-[clamp(4rem,17vw,12rem)]">
        Vers<span class="o">o</span>
      </h1>
      <p class="body-lg mx-auto mt-4 max-w-xl">{{ c.lines?.[0] }}</p>
      <p class="fine mx-auto mt-9 max-w-md">{{ c.note }}</p>
    </div>
  </Scene>
</template>

<style scoped>
.brand {
  font-weight: 400;
}
.o {
  position: relative;
  display: inline-block;
  animation: oglow 2.2s ease-in-out infinite;
}
@keyframes oglow {
  0%,
  100% {
    text-shadow: 0 0 0 rgba(182, 134, 47, 0);
  }
  50% {
    text-shadow: 0 0 30px rgba(182, 134, 47, 0.5);
  }
}
</style>
