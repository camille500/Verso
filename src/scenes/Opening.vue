<script setup lang="ts">
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import RevealText from '@/primitives/RevealText.vue'
import Signature from '@/primitives/Signature.vue'

const c = content.scenes.opening
</script>

<template>
  <Scene id="opening" :label="c.title">
    <div class="mx-auto max-w-4xl text-center">
      <div class="mx-auto mb-12 w-[150px] text-ink/85">
        <Signature :delay="0.5" />
      </div>
      <p class="eyebrow mb-7">{{ c.eyebrow }}</p>
      <RevealText
        as="h1"
        :text="c.title"
        class="h-display text-[clamp(2.6rem,8.5vw,6.5rem)]"
        :delay="1.2"
      />
      <RevealText
        v-if="c.lines"
        as="p"
        :text="c.lines[0]"
        class="body-lg mx-auto mt-9 max-w-xl"
        :delay="2.0"
      />
    </div>
    <div class="scroll-hint">{{ c.note }}</div>
  </Scene>
</template>

<style scoped>
.scroll-hint {
  position: absolute;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-mist);
  animation: float 2.6s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translate(-50%, 0);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, 7px);
    opacity: 1;
  }
}
</style>
