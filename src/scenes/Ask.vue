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

// gold embers for the finale (precomputed, deterministic-enough per load)
const rand = (a: number, b: number) => a + Math.random() * (b - a)
const embers = Array.from({ length: 46 }, () => ({
  left: rand(8, 92),
  size: rand(4, 11),
  tx: rand(-40, 40),
  ty: rand(-95, -25),
  s: rand(0.4, 1.5),
  delay: rand(0, 0.55),
  dur: rand(1.5, 2.8),
}))

function emberStyle(e: (typeof embers)[number]) {
  return {
    left: e.left + '%',
    width: e.size + 'px',
    height: e.size + 'px',
    '--tx': String(e.tx),
    '--ty': String(e.ty),
    '--s': String(e.s),
    '--delay': e.delay + 's',
    '--dur': e.dur + 's',
  } as Record<string, string>
}

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
        <div class="art-pop" :class="{ go: committed }">
          <Artwork :image="content.hero" :glow="committed ? 1 : 0.7" />
        </div>
      </div>

      <div class="crest" :class="{ show: committed }">✦&nbsp;&nbsp;Kunstenaar #001&nbsp;&nbsp;✦</div>
      <p class="eyebrow mb-5" :class="{ 'fade-out': committed }">{{ askCopy.eyebrow }}</p>
      <RevealText as="h2" :text="ask.title" class="h-display text-[clamp(2.2rem,6.2vw,4.8rem)]" />
      <p class="body-lg mx-auto mt-7 max-w-md">{{ ask.lines[0] }}</p>

      <button
        class="btn-primary mt-9"
        :class="committed ? 'is-committed' : 'cue-pulse'"
        @click="commit"
      >
        {{ committed ? 'Welkom, Kunstenaar #001 ✦' : ask.cta }}
      </button>

      <div class="mx-auto mt-12 w-[140px] text-ink/85">
        <Signature :delay="0.4" />
      </div>

      <p class="tail" :class="{ show: committed }">{{ ask.tail }}</p>
    </div>

    <!-- THE FINALE -->
    <div class="finale" :class="{ go: committed }" aria-hidden="true">
      <div class="bloom"></div>
      <span v-for="(e, i) in embers" :key="i" class="ember" :style="emberStyle(e)"></span>
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
.art-pop {
  transition:
    transform 0.9s var(--ease-out-expo),
    filter 0.9s var(--ease-out-expo);
}
.art-pop.go {
  transform: scale(1.06);
  filter: saturate(1.18);
}

.crest {
  font-family: var(--font-sans);
  font-size: clamp(11px, 1.6vw, 13px);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-verified);
  height: 0;
  opacity: 0;
  overflow: visible;
  transform: scale(1.5) rotate(-4deg);
}
.crest.show {
  height: auto;
  margin-bottom: 14px;
  animation: stamp 0.75s var(--ease-out-expo) 0.1s forwards;
}
@keyframes stamp {
  0% {
    opacity: 0;
    transform: scale(1.6) rotate(-5deg);
    letter-spacing: 0.5em;
  }
  55% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0);
    letter-spacing: 0.22em;
  }
}
.fade-out {
  transition: opacity 0.5s;
  opacity: 0;
}

.is-committed {
  background: var(--color-verified) !important;
  transform: translateY(-2px);
  box-shadow: 0 16px 40px -16px rgba(182, 134, 47, 0.7);
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

/* ── finale overlay ── */
.finale {
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
  overflow: hidden;
}
.bloom {
  position: absolute;
  left: 50%;
  top: 64%;
  width: 12px;
  height: 12px;
  transform: translate(-50%, -50%) scale(0);
  border-radius: 9999px;
  background: radial-gradient(closest-side, rgba(241, 213, 156, 0.95), rgba(241, 213, 156, 0) 70%);
  opacity: 0;
}
.finale.go .bloom {
  animation: bloom 1.9s var(--ease-out-expo) forwards;
}
@keyframes bloom {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
  18% {
    opacity: 0.9;
  }
  100% {
    transform: translate(-50%, -50%) scale(300);
    opacity: 0;
  }
}
.ember {
  position: absolute;
  bottom: 6%;
  border-radius: 9999px;
  background: radial-gradient(closest-side, var(--color-verified-glow), var(--color-verified));
  box-shadow: 0 0 8px 1px rgba(241, 213, 156, 0.7);
  transform: translate(0, 0) scale(0);
  opacity: 0;
}
.finale.go .ember {
  animation: ember var(--dur) ease-out var(--delay) forwards;
}
@keyframes ember {
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  100% {
    transform: translate(calc(var(--tx) * 1vw), calc(var(--ty) * 1vh)) scale(var(--s));
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .finale.go .bloom,
  .finale.go .ember,
  .crest.show {
    animation: none;
  }
  .crest.show {
    opacity: 1;
    transform: none;
    height: auto;
    margin-bottom: 14px;
  }
}
</style>
