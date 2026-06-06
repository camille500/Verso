<script setup lang="ts">
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import RevealText from '@/primitives/RevealText.vue'
import Artwork from '@/primitives/Artwork.vue'

const c = content.scenes.whatif
const hero = content.hero
</script>

<template>
  <Scene id="whatif" :label="c.title">
    <div class="mx-auto max-w-4xl text-center">
      <p class="eyebrow mb-6">{{ c.eyebrow }}</p>
      <RevealText as="h2" :text="c.title" class="h-display text-[clamp(2.2rem,6vw,4.6rem)]" />

      <div class="relative mx-auto my-12 w-[min(44vw,250px)]">
        <Artwork :image="hero" :glow="0.85" />
        <span class="heartbeat"></span>
      </div>

      <ul class="space-y-2.5">
        <li v-for="(l, i) in c.lines" :key="i" class="body-lg">{{ l }}</li>
      </ul>
    </div>
  </Scene>
</template>

<style scoped>
.heartbeat {
  position: absolute;
  left: -7px;
  bottom: 20px;
  width: 13px;
  height: 13px;
  border-radius: 9999px;
  background: var(--color-verified);
  animation: beat 1.9s ease-in-out infinite;
}
@keyframes beat {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(182, 134, 47, 0.5);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(182, 134, 47, 0);
  }
}
</style>
