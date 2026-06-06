<script setup lang="ts">
import { reactive } from 'vue'
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import RevealText from '@/primitives/RevealText.vue'

const c = content.scenes.anonymous
const hero = content.hero
const count = 24
const flipped = reactive<Record<number, boolean>>({})
const labels = ['kopie', '?', 'onbekend', 'kopie', '?', 'onbekend']

function toggle(i: number) {
  flipped[i] = !flipped[i]
}
</script>

<template>
  <Scene id="anonymous" :label="c.title">
    <div class="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <p class="eyebrow mb-6">{{ c.eyebrow }}</p>
        <RevealText as="h2" :text="c.title" class="h-display text-[clamp(2rem,5.4vw,3.9rem)]" />
        <ul class="mt-9 space-y-2.5">
          <li v-for="(l, i) in c.lines" :key="i" class="body-lg">{{ l }}</li>
        </ul>
        <p class="mt-9 font-display text-[clamp(1.1rem,2.4vw,1.5rem)] italic text-mist">
          {{ c.note }}
        </p>
      </div>

      <div class="copies-mask">
        <div class="grid grid-cols-6 gap-1.5">
          <button
            v-for="i in count"
            :key="i"
            class="tile"
            :style="{ aspectRatio: String(hero.aspect) }"
            :aria-label="'kopie ' + i"
            @click="toggle(i)"
          >
            <span class="inner" :class="{ flip: flipped[i] }">
              <span class="face front">
                <img :src="hero.src" alt="" />
                <span v-if="i % 4 === 0" class="blink">?</span>
              </span>
              <span class="face back">{{ labels[i % labels.length] }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  </Scene>
</template>

<style scoped>
.copies-mask {
  -webkit-mask-image: radial-gradient(125% 120% at 50% 42%, #000 52%, transparent 92%);
  mask-image: radial-gradient(125% 120% at 50% 42%, #000 52%, transparent 92%);
}
.tile {
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
  perspective: 700px;
}
.inner {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  transition: transform 0.6s var(--ease-out-expo);
  transform-style: preserve-3d;
}
.inner.flip {
  transform: rotateY(180deg);
}
.face {
  position: absolute;
  inset: 0;
  border-radius: 2px;
  overflow: hidden;
  backface-visibility: hidden;
  box-shadow: inset 0 0 0 1px var(--color-hairline);
}
.front img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(0.82) brightness(1.06);
  opacity: 0.8;
}
.blink {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--color-ink);
  font-size: 14px;
  opacity: 0;
  animation: blink 3.4s ease-in-out infinite;
}
@keyframes blink {
  0%, 100% { opacity: 0; }
  50% { opacity: 0.55; }
}
.back {
  transform: rotateY(180deg);
  background: var(--color-paper-deep);
  display: grid;
  place-items: center;
  color: var(--color-mist);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
</style>
