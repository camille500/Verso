<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useLenis } from '@/composables/useLenis'
import { useDeckNavigation } from '@/composables/useDeckNavigation'
import Presentation from '@/presentation/Presentation.vue'

useLenis()
useDeckNavigation()

// Press F to present full-screen.
function onKey(e: KeyboardEvent) {
  if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey && !e.altKey) {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.()
    else document.exitFullscreen?.()
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="grain-overlay"></div>
  <Presentation />
</template>
