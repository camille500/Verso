<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { scrollToTarget } from '@/lib/lenisRef'

const props = defineProps<{ chapters: { id: string; label: string }[] }>()
const active = ref(0)
let io: IntersectionObserver | null = null

onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const idx = props.chapters.findIndex((c) => c.id === (e.target as HTMLElement).id)
          if (idx >= 0) active.value = idx
        }
      }
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
  )
  props.chapters.forEach((c) => {
    const el = document.getElementById(c.id)
    if (el) io!.observe(el)
  })
})
onUnmounted(() => io?.disconnect())
</script>

<template>
  <nav
    class="fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    aria-label="Hoofdstukken"
  >
    <button
      v-for="(c, i) in chapters"
      :key="c.id"
      class="chip group flex items-center gap-3"
      :aria-current="i === active"
      :aria-label="c.label"
      @click="scrollToTarget('#' + c.id)"
    >
      <span class="dot" :class="{ 'dot-active': i === active }"></span>
      <span class="label" :class="{ 'label-active': i === active }">{{ c.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
.chip {
  background: none;
  border: 0;
  cursor: pointer;
  padding: 2px 0;
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: var(--color-hairline-strong);
  transition: all 0.45s var(--ease-out-expo);
}
.dot-active {
  background: var(--color-ink);
  transform: scale(1.5);
}
.label {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.04em;
  white-space: nowrap;
  color: var(--color-mist);
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.45s var(--ease-out-expo);
}
.group:hover .label,
.label-active {
  opacity: 1;
  transform: translateX(0);
}
.label-active {
  color: var(--color-ink-soft);
}
</style>
