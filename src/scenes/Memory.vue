<script setup lang="ts">
import { computed, ref } from 'vue'
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import RevealText from '@/primitives/RevealText.vue'
import Artwork from '@/primitives/Artwork.vue'
import LineageSpine from '@/primitives/LineageSpine.vue'

const c = content.scenes.memory
const total = content.lineage.length
const revealed = ref(1)
const glow = computed(() => 0.2 + 0.8 * ((revealed.value - 1) / (total - 1)))
</script>

<template>
  <Scene id="memory" :label="c.title">
    <div class="grid items-center gap-14 lg:grid-cols-2">
      <div class="order-2 lg:order-1">
        <p class="eyebrow mb-6">{{ c.eyebrow }}</p>
        <RevealText as="h2" :text="c.title" class="h-display text-[clamp(1.9rem,5vw,3.5rem)]" />
        <p class="mt-4 font-display text-[clamp(1.3rem,3vw,2rem)] italic">
          <span class="text-graphite">{{ c.lines?.[0] }}</span>
          <span class="text-verified">{{ c.lines?.[1] }}</span>
        </p>

        <div class="mt-10">
          <LineageSpine :entries="content.lineage" :revealed="revealed" />
        </div>

        <div class="scrubber mt-10">
          <input
            type="range"
            min="1"
            :max="total"
            step="1"
            v-model.number="revealed"
            aria-label="Sleep door de tijd"
          />
          <p class="hint">Sleep door de tijd →</p>
        </div>
      </div>

      <div class="order-1 flex justify-center lg:order-2">
        <div class="w-[min(54vw,310px)]">
          <Artwork :image="content.hero" :glow="glow" />
        </div>
      </div>
    </div>
  </Scene>
</template>

<style scoped>
.scrubber input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 2px;
  background: var(--color-hairline-strong);
  border-radius: 9999px;
  cursor: pointer;
}
.scrubber input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 9999px;
  background: var(--color-ink);
  border: 3px solid var(--color-paper);
  box-shadow: 0 2px 10px -2px rgba(23, 20, 14, 0.5);
}
.scrubber input[type='range']::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 9999px;
  background: var(--color-ink);
  border: 3px solid var(--color-paper);
}
.hint {
  margin-top: 12px;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-mist);
}
</style>
