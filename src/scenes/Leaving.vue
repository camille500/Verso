<script setup lang="ts">
import { ref } from 'vue'
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import Artwork from '@/primitives/Artwork.vue'
import { gsap } from '@/lib/gsap'
import { useGsapScene } from '@/composables/useGsapScene'
import { prefersReducedMotion } from '@/composables/useReducedMotion'
import { smoothstep } from '@/lib/math'

const c = content.scenes.leaving
const hero = content.hero

// 0 → 1 progress, auto-played once the scene is reached (deck model).
const p = ref(0)
const root = ref<HTMLElement | null>(null)

useGsapScene(root, (el) => {
  if (prefersReducedMotion()) {
    p.value = 1
    return
  }
  const obj = { v: 0 }
  gsap.to(obj, {
    v: 1,
    duration: 3.4,
    delay: 0.35,
    ease: 'power1.inOut',
    scrollTrigger: { trigger: el, start: 'top 60%', once: true },
    onUpdate: () => (p.value = obj.v),
  })
})
</script>

<template>
  <Scene id="leaving" :label="c.title">
    <div ref="root" class="relative mx-auto flex w-full max-w-5xl flex-col items-center">
      <!-- the painting meets the doorway and goes mute -->
      <div class="relative flex h-[42svh] w-full items-center justify-center">
        <div class="doorway" :style="{ opacity: smoothstep(0.12, 0.95, p) }"></div>
        <div
          class="art-stage"
          :style="{
            transform: `translateX(${p * 22}vw) scale(${1 - p * 0.1})`,
            opacity: 1 - smoothstep(0.82, 1, p) * 0.4,
          }"
        >
          <div class="w-[min(42vw,240px)]">
            <Artwork :image="hero" :grey="p" />
          </div>
        </div>
      </div>

      <!-- the two beats, crossfading -->
      <div class="relative mt-10 h-[7rem] w-full px-6 text-center">
        <h2
          class="h-display absolute inset-x-0 mx-auto max-w-3xl text-[clamp(1.7rem,4.8vw,3.4rem)]"
          :style="{ opacity: 1 - smoothstep(0.12, 0.46, p) }"
        >
          {{ c.title }}
        </h2>
        <h2
          class="h-display absolute inset-x-0 mx-auto max-w-3xl text-[clamp(1.7rem,4.8vw,3.4rem)]"
          :style="{ opacity: smoothstep(0.5, 0.86, p) }"
        >
          <span class="text-graphite">{{ c.lines?.[0] }}</span>
          {{ c.lines?.[1] }}
        </h2>
      </div>
    </div>
  </Scene>
</template>

<style scoped>
.doorway {
  position: absolute;
  right: -2%;
  top: 0;
  bottom: 0;
  width: 48%;
  background: linear-gradient(90deg, transparent, var(--color-paper-pure) 55%, #fff);
  filter: blur(10px);
}
.art-stage {
  will-change: transform;
}
</style>
