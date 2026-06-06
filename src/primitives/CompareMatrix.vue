<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CapabilityKey, Competitor } from '@/content/content.types'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useGsapScene } from '@/composables/useGsapScene'
import { prefersReducedMotion } from '@/composables/useReducedMotion'

const props = defineProps<{
  competitors: Competitor[]
  labels: Record<CapabilityKey, string>
}>()

const keys = Object.keys(props.labels) as CapabilityKey[]
const verso = props.competitors[0]

// Columns where Verso is the ONLY one with a full "yes" — the empty column(s).
const uniqueKeys = computed<CapabilityKey[]>(() =>
  keys.filter(
    (k) =>
      verso.caps[k] === true &&
      props.competitors.slice(1).every((c) => c.caps[k] !== true),
  ),
)

const root = ref<HTMLElement | null>(null)
const highlighted = ref(false)
const selected = ref(0)
const touched = ref(false)

useGsapScene(root, (el) => {
  // NB: .cm-row uses display:contents (no box) — animate the actual grid cells.
  const cells = el.querySelectorAll('.cm-head, .cm-name, .cm-cell')
  if (prefersReducedMotion()) {
    highlighted.value = true
    return
  }
  gsap.set(cells, { opacity: 0, y: 16 })
  ScrollTrigger.create({
    trigger: el,
    start: 'top 68%',
    once: true,
    onEnter: () => {
      gsap.to(cells, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'expo.out',
        stagger: 0.02,
        onComplete: () => (highlighted.value = true),
      })
    },
  })
})

function cell(c: Competitor, k: CapabilityKey) {
  return c.caps[k]
}
</script>

<template>
  <div ref="root" class="cm-wrap">
    <div class="cm-scroll no-scrollbar" data-deck-ignore>
      <div class="cm-grid" :style="{ gridTemplateColumns: `minmax(118px,1.3fr) repeat(${keys.length}, minmax(82px,1fr))` }">
        <!-- header -->
        <div class="cm-row contents">
          <div class="cm-corner"></div>
          <div
            v-for="k in keys"
            :key="k"
            class="cm-head"
            :class="{ 'cm-gold': highlighted && uniqueKeys.includes(k) }"
          >
            {{ labels[k] }}
          </div>
        </div>

        <!-- competitor rows -->
        <div
          v-for="(c, ci) in competitors"
          :key="c.name"
          class="cm-row contents"
        >
          <button
            class="cm-name"
            :class="{ 'cm-verso': c.isVerso, 'cm-active': selected === ci }"
            @click="selected = ci; touched = true"
          >
            {{ c.name }}
            <span v-if="c.isVerso" class="cm-badge">jij</span>
          </button>
          <div
            v-for="k in keys"
            :key="k"
            class="cm-cell"
            :class="{
              'cm-cell-gold': highlighted && c.isVerso && uniqueKeys.includes(k),
            }"
          >
            <!-- yes -->
            <svg v-if="cell(c, k) === true" viewBox="0 0 24 24" width="18" height="18" aria-label="ja">
              <path
                d="M5 13l4 4L19 7"
                fill="none"
                stroke="currentColor"
                stroke-width="2.4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <!-- partial -->
            <span v-else-if="cell(c, k) === 'partial'" class="cm-partial" aria-label="deels"></span>
            <!-- no -->
            <span v-else class="cm-no" aria-label="nee"></span>
          </div>
        </div>
      </div>
    </div>

    <p v-if="!touched" class="cue-tag cm-hint">Tik op een merk voor de eerlijke nuance</p>

    <!-- honest note -->
    <Transition name="note" mode="out-in">
      <p :key="selected" class="cm-note">
        <span class="cm-note-name">{{ competitors[selected].name }}.</span>
        {{ competitors[selected].note }}
      </p>
    </Transition>
  </div>
</template>

<style scoped>
.cm-wrap {
  width: 100%;
}
.cm-scroll {
  overflow-x: auto;
}
.cm-grid {
  display: grid;
  align-items: stretch;
  min-width: 640px;
  gap: 1px;
  background: var(--color-hairline);
  border: 1px solid var(--color-hairline);
  border-radius: 14px;
  overflow: hidden;
}
.contents {
  display: contents;
}
.cm-corner {
  background: var(--color-paper);
}
.cm-head {
  background: var(--color-paper);
  padding: 14px 12px;
  font-size: 11px;
  line-height: 1.25;
  letter-spacing: 0.02em;
  color: var(--color-graphite);
  text-transform: uppercase;
  transition: all 0.5s var(--ease-out-expo);
}
.cm-gold {
  color: var(--color-verified);
  background: rgba(241, 213, 156, 0.16);
}
.cm-name {
  background: var(--color-paper);
  border: 0;
  cursor: pointer;
  text-align: left;
  padding: 16px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-ink-soft);
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s;
}
.cm-name:hover,
.cm-active {
  background: var(--color-paper-deep);
}
.cm-verso {
  font-family: var(--font-display);
  font-size: 17px;
  color: var(--color-ink);
}
.cm-badge {
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-paper-pure);
  background: var(--color-verified);
  padding: 2px 6px;
  border-radius: 9999px;
}
.cm-cell {
  background: var(--color-paper);
  display: grid;
  place-items: center;
  color: var(--color-ink);
  min-height: 52px;
  transition: all 0.5s var(--ease-out-expo);
}
.cm-cell-gold {
  background: rgba(241, 213, 156, 0.22);
  color: var(--color-verified);
  box-shadow: inset 0 0 0 1px rgba(182, 134, 47, 0.3);
}
.cm-partial {
  width: 9px;
  height: 9px;
  border-radius: 9999px;
  border: 2px solid var(--color-mist);
  background: linear-gradient(90deg, var(--color-mist) 50%, transparent 50%);
}
.cm-no {
  width: 14px;
  height: 1.5px;
  background: var(--color-hairline-strong);
  border-radius: 2px;
}
.cm-hint {
  margin-top: 18px;
}
.cm-note {
  margin-top: 14px;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-graphite);
  max-width: 56ch;
}
.cm-note-name {
  color: var(--color-ink);
  font-weight: 600;
}
.note-enter-active,
.note-leave-active {
  transition: all 0.3s var(--ease-out-expo);
}
.note-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.note-leave-to {
  opacity: 0;
}
</style>
