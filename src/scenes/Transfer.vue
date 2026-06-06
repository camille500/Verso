<script setup lang="ts">
import { ref } from 'vue'
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import RevealText from '@/primitives/RevealText.vue'
import Artwork from '@/primitives/Artwork.vue'

const c = content.scenes.transfer
const transferred = ref(false)
</script>

<template>
  <Scene id="transfer" :label="c.title">
    <div class="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <p class="eyebrow mb-6">{{ c.eyebrow }}</p>
        <RevealText as="h2" :text="c.title" class="h-display text-[clamp(2.1rem,5.6vw,4.2rem)]" />
        <p class="body-lg mt-7 max-w-md">
          <span class="block">{{ c.lines?.[0] }}</span>
          <span class="block text-ink">{{ c.lines?.[1] }}</span>
        </p>
        <div class="mt-9 flex items-center gap-4">
          <button v-if="!transferred" class="btn-primary" @click="transferred = true">
            Geef door
          </button>
          <button v-else class="btn-ghost" @click="transferred = false">↻ Opnieuw</button>
        </div>
        <p class="note-line mt-7">{{ c.note }}</p>
      </div>

      <div class="stage">
        <div class="row">
          <div class="mini-phone" :class="{ dim: transferred }">
            <span class="who">Verkoper</span>
            <span class="cnt">{{ transferred ? 'Overgedragen' : '1 eigenaar' }}</span>
          </div>

          <div class="print">
            <Artwork :image="content.hero" :glow="transferred ? 0.8 : 0.4" />
          </div>

          <div class="mini-phone koper" :class="{ active: transferred }">
            <span class="who">Koper</span>
            <span class="cnt">{{ transferred ? '2 eigenaren' : '—' }}</span>
          </div>

          <span class="line"></span>
          <span class="spark" :class="{ on: transferred }"></span>
        </div>
        <p class="nowallet">⊘ geen wallet · geen seed phrase · geen blockchain-gedoe</p>
      </div>
    </div>
  </Scene>
</template>

<style scoped>
.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}
.row {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 3vw, 28px);
  width: 100%;
}
.print {
  width: min(28vw, 150px);
  flex: none;
  z-index: 2;
}
.mini-phone {
  flex: none;
  width: clamp(86px, 18vw, 116px);
  aspect-ratio: 9 / 17;
  border-radius: 20px;
  background: var(--color-paper-pure);
  box-shadow:
    0 24px 50px -30px rgba(23, 20, 14, 0.5),
    inset 0 0 0 1px var(--color-hairline);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px;
  text-align: center;
  transition: all 0.6s var(--ease-out-expo);
}
.mini-phone .who {
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-mist);
}
.mini-phone .cnt {
  font-family: var(--font-display);
  font-size: clamp(0.85rem, 2vw, 1.05rem);
  color: var(--color-ink);
  line-height: 1.1;
}
.mini-phone.dim {
  opacity: 0.5;
}
.koper {
  outline: 1px solid transparent;
}
.koper.active {
  box-shadow:
    0 24px 50px -28px rgba(182, 134, 47, 0.5),
    inset 0 0 0 1.5px var(--color-verified);
}
.koper.active .cnt {
  color: var(--color-verified);
}
.line {
  position: absolute;
  left: 14%;
  right: 14%;
  top: 50%;
  height: 1px;
  background: var(--color-hairline-strong);
  z-index: 1;
}
.spark {
  position: absolute;
  top: 50%;
  left: 16%;
  width: 12px;
  height: 12px;
  margin-top: -6px;
  border-radius: 9999px;
  background: var(--color-verified);
  box-shadow: 0 0 14px 3px rgba(182, 134, 47, 0.6);
  opacity: 0;
  z-index: 3;
}
.spark.on {
  animation: fly 0.9s var(--ease-out-expo) forwards;
}
@keyframes fly {
  0% {
    opacity: 1;
    left: 16%;
  }
  100% {
    opacity: 0;
    left: 84%;
  }
}
.nowallet {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--color-mist);
}
.note-line {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--color-ink-soft);
}
</style>
