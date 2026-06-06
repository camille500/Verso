<script setup lang="ts">
import { ref } from 'vue'
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import RevealText from '@/primitives/RevealText.vue'
import Artwork from '@/primitives/Artwork.vue'
import Signature from '@/primitives/Signature.vue'
import { useAudioNarration } from '@/composables/useAudioNarration'

const ask = content.ask
const askCopy = content.scenes.ask
const committed = ref(false)
const { toggle } = useAudioNarration(content.artistNote.audioSrc, content.artistNote.durationSec)

function commit() {
  committed.value = true
  toggle()
}
</script>

<template>
  <Scene id="ask" :label="ask.title">
    <div class="mx-auto max-w-3xl text-center">
      <!-- callback to Scene 2: the print meets the light again — but keeps its soul -->
      <div class="relative mx-auto mb-12 w-[min(50vw,250px)]">
        <div class="doorway"></div>
        <Artwork :image="content.hero" :glow="committed ? 1 : 0.7" />
      </div>

      <p class="eyebrow mb-5">{{ askCopy.eyebrow }}</p>
      <RevealText as="h2" :text="ask.title" class="h-display text-[clamp(2.2rem,6.2vw,4.8rem)]" />
      <p class="body-lg mx-auto mt-7 max-w-md">{{ ask.lines[0] }}</p>

      <button class="btn-primary mt-9" @click="commit">{{ ask.cta }}</button>

      <div class="mx-auto mt-12 w-[140px] text-ink/85">
        <Signature :delay="0.4" />
      </div>

      <p class="tail" :class="{ show: committed }">{{ ask.tail }}</p>
    </div>
  </Scene>
</template>

<style scoped>
.doorway {
  position: absolute;
  inset: -24% -34%;
  z-index: 0;
  background: radial-gradient(closest-side, rgba(255, 247, 228, 0.95), transparent 70%);
  filter: blur(34px);
}
.tail {
  margin-top: 30px;
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.1rem, 2.6vw, 1.6rem);
  color: var(--color-mist);
  transition: all 0.7s var(--ease-out-expo);
}
.tail.show {
  color: var(--color-verified);
  transform: scale(1.04);
}
</style>
