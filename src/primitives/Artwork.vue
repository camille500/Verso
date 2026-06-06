<script setup lang="ts">
import type { ArtworkImage } from '@/content/content.types'

withDefaults(
  defineProps<{
    image: ArtworkImage
    /** 0..1 — the earned "verified" gold glow */
    glow?: number
    /** 0..1 — desaturation toward a mute, anonymous grey */
    grey?: number
  }>(),
  { glow: 0, grey: 0 },
)
</script>

<template>
  <figure class="artwork relative select-none" :style="{ aspectRatio: String(image.aspect) }">
    <div class="glow" :style="{ opacity: glow }"></div>
    <img
      :src="image.src"
      :alt="image.alt"
      draggable="false"
      loading="lazy"
      class="art-img relative z-10 h-full w-full rounded-[3px] object-cover"
      :style="{ filter: `grayscale(${grey}) contrast(${1 - grey * 0.18}) brightness(${1 - grey * 0.04})` }"
    />
    <div class="frame rounded-[3px]"></div>
  </figure>
</template>

<style scoped>
.glow {
  position: absolute;
  inset: -10% -10% -12% -10%;
  z-index: 0;
  background: radial-gradient(closest-side, var(--color-verified-glow), transparent 72%);
  filter: blur(38px);
  transition: opacity 0.8s var(--ease-out-expo);
}
.art-img {
  box-shadow:
    0 34px 80px -34px rgba(23, 20, 14, 0.5),
    0 10px 26px -14px rgba(23, 20, 14, 0.28);
  transition: filter 0.8s var(--ease-out-expo);
}
.frame {
  position: absolute;
  inset: 0;
  z-index: 11;
  pointer-events: none;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.5),
    inset 0 0 0 2px rgba(23, 20, 14, 0.08);
}
</style>
