<script setup lang="ts">
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import RevealText from '@/primitives/RevealText.vue'

const c = content.scenes.vision

// faint satellite artist-nodes around the bright origin (his) node
const nodes = [
  { x: 18, y: 26 },
  { x: 78, y: 20 },
  { x: 88, y: 58 },
  { x: 66, y: 84 },
  { x: 24, y: 78 },
  { x: 8, y: 54 },
  { x: 50, y: 12 },
]
const center = { x: 50, y: 50 }
</script>

<template>
  <Scene id="vision" :label="c.title">
    <div class="w-full">
      <div class="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p class="eyebrow mb-6">{{ c.eyebrow }}</p>
          <RevealText as="h2" :text="c.title" class="h-display text-[clamp(2rem,5.2vw,3.8rem)]" />
          <ul class="mt-9 space-y-2.5">
            <li v-for="(l, i) in c.lines" :key="i" class="body-lg">{{ l }}</li>
          </ul>
          <p class="note-line mt-8">{{ c.note }}</p>
        </div>

        <div class="constellation" aria-hidden="true">
          <svg class="links" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line
              v-for="(n, i) in nodes"
              :key="i"
              :x1="center.x"
              :y1="center.y"
              :x2="n.x"
              :y2="n.y"
              stroke="var(--color-hairline-strong)"
              stroke-width="0.3"
            />
          </svg>
          <span
            v-for="(n, i) in nodes"
            :key="i"
            class="node"
            :style="{ left: n.x + '%', top: n.y + '%', animationDelay: 0.3 + i * 0.12 + 's' }"
          ></span>
          <span class="node origin" :style="{ left: center.x + '%', top: center.y + '%' }">
            <span class="label">Kunstenaar #001</span>
          </span>
        </div>
      </div>

      <!-- economics -->
      <div class="mt-16 grid gap-5 sm:grid-cols-3">
        <div
          v-for="(t, i) in content.economics"
          :key="i"
          class="tier"
          :class="{ future: t.future, lead: i === 1 }"
        >
          <span class="t-label">{{ t.label }}</span>
          <span class="t-value font-display">{{ t.value }}</span>
          <span class="t-detail">{{ t.detail }}</span>
        </div>
      </div>
    </div>
  </Scene>
</template>

<style scoped>
.constellation {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  max-width: 440px;
  margin-inline: auto;
}
.links {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.node {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background: var(--color-hairline-strong);
  transform: translate(-50%, -50%) scale(0);
  animation: pop 0.7s var(--ease-out-expo) forwards;
}
@keyframes pop {
  to {
    transform: translate(-50%, -50%) scale(1);
  }
}
.origin {
  width: 18px;
  height: 18px;
  background: var(--color-verified);
  box-shadow: 0 0 0 6px rgba(182, 134, 47, 0.16);
  animation: none;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  z-index: 2;
}
.origin .label {
  position: absolute;
  top: 26px;
  white-space: nowrap;
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--color-verified);
}
.tier {
  border-radius: 16px;
  padding: 24px;
  background: var(--color-paper-pure);
  box-shadow: inset 0 0 0 1px var(--color-hairline);
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.tier.lead {
  box-shadow:
    inset 0 0 0 1.5px var(--color-verified),
    0 30px 60px -40px rgba(182, 134, 47, 0.4);
}
.tier.future {
  border: 1px dashed var(--color-hairline-strong);
  background: transparent;
  box-shadow: none;
  opacity: 0.75;
}
.t-label {
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-mist);
}
.t-value {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: var(--color-ink);
  line-height: 1;
}
.lead .t-value {
  color: var(--color-verified);
}
.t-detail {
  font-size: 13.5px;
  color: var(--color-graphite);
  line-height: 1.5;
}
.note-line {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.1rem, 2.6vw, 1.5rem);
  color: var(--color-ink-soft);
}
</style>
