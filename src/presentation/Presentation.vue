<script setup lang="ts">
import { scenes } from './scenes.config'
import ChapterIndicator from '@/primitives/ChapterIndicator.vue'
import ProgressBar from '@/primitives/ProgressBar.vue'

const chapters = scenes.map((s) => ({ id: s.id, label: s.label }))
</script>

<template>
  <ProgressBar />
  <ChapterIndicator :chapters="chapters" />
  <main>
    <component :is="s.component" v-for="s in scenes" :key="s.id" />
  </main>
</template>
