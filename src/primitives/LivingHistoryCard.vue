<script setup lang="ts">
import { computed } from 'vue'
import type { ArtistNote, Edition, LineageEntry } from '@/content/content.types'
import { useAudioNarration } from '@/composables/useAudioNarration'

const props = withDefaults(
  defineProps<{
    edition: Edition
    artistFirstName: string
    artistNote: ArtistNote
    lineage: LineageEntry[]
    /** how many lineage entries are visible */
    revealed?: number
  }>(),
  { revealed: 1 },
)

const { isPlaying, progress, toggle } = useAudioNarration(
  props.artistNote.audioSrc,
  props.artistNote.durationSec,
)

// deterministic, organic-looking waveform
const bars = Array.from({ length: 34 }, (_, i) =>
  0.28 + 0.72 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37 + 1)),
)

const shown = computed(() => props.lineage.slice(0, Math.max(0, props.revealed)))
const ownerWord = computed(() => (props.revealed === 1 ? 'eigenaar' : 'eigenaren'))

function fmt(sec: number) {
  const s = Math.max(0, Math.floor(sec))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}
const current = computed(() => fmt(progress.value * props.artistNote.durationSec))
const total = computed(() => fmt(props.artistNote.durationSec))
</script>

<template>
  <div class="lh-card font-sans text-ink">
    <div class="verified-tag">
      <span class="vdot"></span>
      Echt · geverifieerd
    </div>

    <h3 class="font-display text-[clamp(1.6rem,4vw,2.2rem)] leading-[1.04] tracking-tight">
      {{ edition.title }}
    </h3>
    <p class="mt-1 text-[13px] text-graphite">
      #{{ edition.number }} / {{ edition.total }} · gesigneerd door {{ artistFirstName }}
    </p>
    <p class="text-[12px] text-mist">{{ edition.technique }} · {{ edition.year }}</p>

    <div class="hairline"></div>

    <!-- voice note -->
    <button class="voice group" :aria-pressed="isPlaying" @click="toggle">
      <span class="play">
        <svg v-if="!isPlaying" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
          <path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" />
        </svg>
      </span>
      <span class="flex-1 text-left">
        <span class="block text-[12.5px] font-medium">{{ artistNote.label }}</span>
        <span class="wave" :class="{ 'wave-on': isPlaying }">
          <span
            v-for="(h, i) in bars"
            :key="i"
            class="bar"
            :class="{ 'bar-played': i / bars.length <= progress }"
            :style="{ height: 28 + 64 * h + '%', animationDelay: i * 40 + 'ms' }"
          ></span>
        </span>
      </span>
      <span class="tabular-nums text-[11px] text-mist">{{ current }} / {{ total }}</span>
    </button>

    <div class="hairline"></div>

    <!-- lineage -->
    <div class="ln-head">Herkomst · {{ revealed }} {{ ownerWord }}</div>
    <TransitionGroup tag="ul" name="ln" class="mt-2 space-y-2">
      <li v-for="(e, i) in shown" :key="e.year + e.owner" class="ln-row">
        <span class="ln-node" :class="{ 'ln-origin': i === 0 }"></span>
        <span class="ln-year tabular-nums">{{ e.year }}</span>
        <span class="ln-owner">{{ e.owner }}</span>
        <span class="ln-place">{{ e.place }}</span>
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.lh-card {
  background: var(--color-paper-pure);
  border-radius: 18px;
  padding: clamp(18px, 4vw, 26px);
  box-shadow:
    0 40px 90px -50px rgba(23, 20, 14, 0.55),
    0 2px 0 0 rgba(255, 255, 255, 0.8) inset,
    0 0 0 1px var(--color-hairline);
}
.verified-tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 10.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-verified);
  margin-bottom: 14px;
}
.vdot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--color-verified);
  box-shadow: 0 0 0 4px rgba(182, 134, 47, 0.16);
}
.hairline {
  height: 1px;
  background: var(--color-hairline);
  margin: 16px 0;
}
.voice {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 0;
}
.play {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  color: var(--color-paper-pure);
  background: var(--color-ink);
  transition: transform 0.3s var(--ease-out-expo);
}
.group:hover .play {
  transform: scale(1.06);
}
.wave {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 22px;
  margin-top: 5px;
}
.bar {
  width: 2px;
  border-radius: 2px;
  background: var(--color-hairline-strong);
  transform-origin: center;
}
.bar-played {
  background: var(--color-verified);
}
.wave-on .bar {
  animation: pulse 0.9s ease-in-out infinite alternate;
}
@keyframes pulse {
  to {
    transform: scaleY(1.7);
  }
}
.ln-head {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-mist);
}
.ln-row {
  display: grid;
  grid-template-columns: 14px 42px 1fr auto;
  align-items: baseline;
  gap: 8px;
  font-size: 13px;
}
.ln-node {
  width: 7px;
  height: 7px;
  margin-top: 4px;
  border-radius: 9999px;
  background: var(--color-hairline-strong);
}
.ln-origin {
  background: var(--color-verified);
}
.ln-year {
  color: var(--color-mist);
  font-size: 11.5px;
}
.ln-owner {
  color: var(--color-ink-soft);
  font-weight: 500;
}
.ln-place {
  color: var(--color-mist);
  font-size: 12px;
}

/* lineage entry transition */
.ln-enter-active {
  transition: all 0.55s var(--ease-out-expo);
}
.ln-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.ln-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}
.ln-leave-to {
  opacity: 0;
}
</style>
