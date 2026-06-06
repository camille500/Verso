<script setup lang="ts">
import { computed } from 'vue'
import type { LineageEntry } from '@/content/content.types'

const props = withDefaults(
  defineProps<{ entries: LineageEntry[]; revealed?: number }>(),
  { revealed: 1 },
)
const shown = computed(() => props.entries.slice(0, Math.max(0, props.revealed)))
</script>

<template>
  <div class="spine">
    <div class="rail"></div>
    <TransitionGroup tag="div" name="node" class="nodes">
      <div v-for="(e, i) in shown" :key="e.year + e.owner" class="node">
        <span class="dot" :class="{ origin: i === 0 }"></span>
        <div class="meta">
          <span class="year font-display tabular-nums">{{ e.year }}</span>
          <span class="owner">{{ e.owner }}</span>
          <span class="place">{{ e.place }}</span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.spine {
  position: relative;
  padding-left: 28px;
}
.rail {
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: 6px;
  width: 1.5px;
  background: linear-gradient(var(--color-hairline-strong), var(--color-hairline));
}
.nodes {
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 3vw, 30px);
}
.node {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 16px;
}
.dot {
  position: absolute;
  left: -26px;
  top: 8px;
  width: 11px;
  height: 11px;
  border-radius: 9999px;
  background: var(--color-paper);
  box-shadow: 0 0 0 1.5px var(--color-hairline-strong);
}
.dot.origin {
  background: var(--color-verified);
  box-shadow: 0 0 0 5px rgba(182, 134, 47, 0.16);
}
.meta {
  display: flex;
  align-items: baseline;
  gap: 14px;
  flex-wrap: wrap;
}
.year {
  font-size: clamp(1.5rem, 4vw, 2.4rem);
  letter-spacing: -0.02em;
  color: var(--color-ink);
}
.owner {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-ink-soft);
}
.place {
  font-size: 13px;
  color: var(--color-mist);
}

.node-enter-active {
  transition: all 0.7s var(--ease-out-expo);
}
.node-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
.node-leave-active {
  transition: all 0.35s ease;
}
.node-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
