<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { lenisRef } from '@/lib/lenisRef'

const scaleX = ref(0)
let raf = 0

function update() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const y = lenisRef.current ? lenisRef.current.scroll : window.scrollY
  scaleX.value = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0
  raf = requestAnimationFrame(update)
}

onMounted(() => {
  raf = requestAnimationFrame(update)
})
onUnmounted(() => cancelAnimationFrame(raf))
</script>

<template>
  <div class="fixed left-0 top-0 z-50 h-px w-full">
    <div
      class="h-full origin-left bg-ink/40"
      :style="{ transform: `scaleX(${scaleX})` }"
    ></div>
  </div>
</template>
