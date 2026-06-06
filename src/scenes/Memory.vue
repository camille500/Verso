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
const interacted = ref(false)
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

        <div class="scrubber mt-12" data-deck-ignore :class="{ pulse: !interacted }">
          <div class="track-wrap">
            <div class="ticks">
              <span v-for="i in total" :key="i" class="tick" :class="{ on: i <= revealed }"></span>
            </div>
            <input
              type="range"
              min="1"
              :max="total"
              step="1"
              v-model.number="revealed"
              aria-label="Sleep door de tijd"
              @input="interacted = true"
            />
          </div>
          <p class="hint">
            <span class="grip" aria-hidden="true">↔</span>
            Sleep door de tijd · {{ revealed }} / {{ total }}
          </p>
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
.track-wrap {
  position: relative;
}
.ticks {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 11px;
  pointer-events: none;
}
.tick {
  width: 5px;
  height: 5px;
  border-radius: 9999px;
  background: var(--color-hairline-strong);
  transition: background 0.35s var(--ease-out-expo);
}
.tick.on {
  background: var(--color-verified);
}
.scrubber input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  position: relative;
  width: 100%;
  height: 2px;
  background: var(--color-hairline-strong);
  border-radius: 9999px;
  cursor: grab;
}
.scrubber input[type='range']:active {
  cursor: grabbing;
}
.scrubber input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 26px;
  height: 26px;
  border-radius: 9999px;
  background: var(--color-ink);
  border: 3px solid var(--color-paper);
  box-shadow: 0 2px 12px -2px rgba(23, 20, 14, 0.55);
  cursor: grab;
}
.scrubber input[type='range']::-moz-range-thumb {
  width: 26px;
  height: 26px;
  border-radius: 9999px;
  background: var(--color-ink);
  border: 3px solid var(--color-paper);
  box-shadow: 0 2px 12px -2px rgba(23, 20, 14, 0.55);
  cursor: grab;
}
.scrubber.pulse input[type='range']::-webkit-slider-thumb {
  animation: thumbPulse 1.9s ease-in-out infinite;
}
.scrubber.pulse input[type='range']::-moz-range-thumb {
  animation: thumbPulse 1.9s ease-in-out infinite;
}
@keyframes thumbPulse {
  0%,
  100% {
    box-shadow:
      0 2px 12px -2px rgba(23, 20, 14, 0.55),
      0 0 0 0 rgba(182, 134, 47, 0.5);
  }
  50% {
    box-shadow:
      0 2px 12px -2px rgba(23, 20, 14, 0.55),
      0 0 0 13px rgba(182, 134, 47, 0);
  }
}
.hint {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-graphite);
}
.hint .grip {
  color: var(--color-verified);
  font-size: 16px;
  letter-spacing: 0;
}
@media (prefers-reduced-motion: reduce) {
  .scrubber.pulse input[type='range']::-webkit-slider-thumb,
  .scrubber.pulse input[type='range']::-moz-range-thumb {
    animation: none;
  }
}
</style>
