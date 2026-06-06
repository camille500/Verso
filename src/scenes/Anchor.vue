<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import RevealText from '@/primitives/RevealText.vue'
import Artwork from '@/primitives/Artwork.vue'

const c = content.scenes.anchor
type Phase = 'idle' | 'forging' | 'rejected'
const phase = ref<Phase>('idle')
let timer = 0

function forge() {
  phase.value = 'forging'
  clearTimeout(timer)
  timer = window.setTimeout(() => {
    if (phase.value === 'forging') phase.value = 'rejected'
  }, 1000)
}
function reset() {
  clearTimeout(timer)
  phase.value = 'idle'
}
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <Scene id="anchor" :label="c.title">
    <div class="mx-auto mb-12 max-w-3xl text-center">
      <p class="eyebrow mb-6">{{ c.eyebrow }}</p>
      <RevealText as="h2" :text="c.title" class="h-display text-[clamp(2rem,5.4vw,3.8rem)]" />
    </div>

    <div class="grid items-center gap-12 lg:grid-cols-2">
      <!-- the two proofs -->
      <div class="space-y-6">
        <div class="proof">
          <span class="picon">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.6" />
              <path d="M9 3v3M12 3v3M15 3v3M9 18v3M12 18v3M15 18v3M3 9h3M3 12h3M3 15h3M18 9h3M18 12h3M18 15h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
          </span>
          <div>
            <h4 class="ptitle">De chip</h4>
            <p class="pbody">{{ c.lines?.[0] }}</p>
          </div>
        </div>
        <div class="proof">
          <span class="picon">
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
              <path d="M12 11a2 2 0 0 1 2 2v2a3 3 0 0 0 .4 1.5" />
              <path d="M9 11.5a3 3 0 0 1 6 .5v2" />
              <path d="M6.5 12a5.5 5.5 0 0 1 11 0v2.5" />
              <path d="M4 12.5a8 8 0 0 1 16 -.5" />
            </svg>
          </span>
          <div>
            <h4 class="ptitle">De vingerafdruk</h4>
            <p class="pbody">{{ c.lines?.[1] }}</p>
          </div>
        </div>
        <p class="fine border-t border-[var(--color-hairline)] pt-5">{{ c.fine }}</p>
      </div>

      <!-- the forgery demo -->
      <div class="demo">
        <div class="prints">
          <div class="pcol">
            <div class="mini">
              <Artwork :image="content.hero" :glow="phase === 'rejected' ? 0.6 : 0.4" />
            </div>
            <span class="verdict ok">✓ Echt</span>
          </div>

          <div class="pcol">
            <div class="mini" :class="{ shake: phase === 'rejected' }">
              <Artwork :image="content.hero" :grey="1" />
              <span v-if="phase === 'rejected'" class="reject-x">✕</span>
            </div>
            <span class="verdict" :class="phase === 'rejected' ? 'bad' : 'muted'">
              {{ phase === 'rejected' ? '✕ Geweigerd' : 'Vervalsing' }}
            </span>
          </div>

          <!-- the travelling chip -->
          <span class="chip-travel" :class="phase">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />
            </svg>
          </span>
        </div>

        <p class="check" :class="{ show: phase === 'rejected' }">
          Vingerafdruk: <b>komt niet overeen</b>
        </p>

        <div class="controls">
          <button v-if="phase === 'idle'" class="btn-ghost" @click="forge">
            Probeer te vervalsen
          </button>
          <button v-else class="btn-ghost" @click="reset">↻ Opnieuw</button>
        </div>

        <p class="note-line">{{ c.note }}</p>
      </div>
    </div>
  </Scene>
</template>

<style scoped>
.proof {
  display: flex;
  gap: 18px;
  align-items: flex-start;
}
.picon {
  flex: none;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  color: var(--color-ink);
  background: var(--color-paper-deep);
  box-shadow: inset 0 0 0 1px var(--color-hairline);
}
.ptitle {
  font-family: var(--font-display);
  font-size: 1.4rem;
  margin-bottom: 4px;
}
.pbody {
  color: var(--color-graphite);
  font-size: 14.5px;
  line-height: 1.55;
  max-width: 42ch;
}

.demo {
  background: var(--color-paper-pure);
  border-radius: 22px;
  padding: 30px;
  box-shadow:
    0 40px 90px -54px rgba(23, 20, 14, 0.5),
    inset 0 0 0 1px var(--color-hairline);
}
.prints {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  gap: 16px;
}
.pcol {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 42%;
}
.mini {
  width: 100%;
}
.mini.shake {
  animation: shake 0.5s;
}
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  30%, 70% { transform: translateX(4px); }
  50% { transform: translateX(-6px); }
}
.reject-x {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--color-forge);
  font-size: 2.4rem;
  font-weight: 700;
}
.pcol .mini {
  position: relative;
}
.verdict {
  font-size: 12px;
  letter-spacing: 0.06em;
  font-weight: 600;
}
.verdict.ok {
  color: var(--color-verified);
}
.verdict.bad {
  color: var(--color-forge);
}
.verdict.muted {
  color: var(--color-mist);
  font-weight: 500;
}
.chip-travel {
  position: absolute;
  top: 38%;
  left: 20%;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  display: grid;
  place-items: center;
  color: var(--color-paper-pure);
  background: var(--color-verified);
  box-shadow: 0 6px 16px -6px rgba(182, 134, 47, 0.7);
  transition: left 0.95s var(--ease-out-expo);
  z-index: 5;
}
.chip-travel.forging,
.chip-travel.rejected {
  left: 70%;
}
.chip-travel.rejected {
  background: var(--color-forge);
}
.check {
  margin-top: 22px;
  text-align: center;
  font-size: 14px;
  color: var(--color-forge);
  opacity: 0;
  transform: translateY(4px);
  transition: all 0.4s var(--ease-out-expo);
}
.check.show {
  opacity: 1;
  transform: translateY(0);
}
.check b {
  font-weight: 700;
}
.controls {
  margin-top: 18px;
  display: flex;
  justify-content: center;
}
.note-line {
  margin-top: 18px;
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-style: italic;
  color: var(--color-ink-soft);
}
</style>
