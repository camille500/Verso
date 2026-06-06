<script setup lang="ts">
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import RevealText from '@/primitives/RevealText.vue'
import CompareMatrix from '@/primitives/CompareMatrix.vue'

const c = content.scenes.compare
</script>

<template>
  <Scene id="compare" :label="c.title">
    <div class="w-full">
      <div class="mx-auto mb-12 max-w-3xl text-center">
        <p class="eyebrow mb-6">{{ c.eyebrow }}</p>
        <RevealText as="h2" :text="c.title" class="h-display text-[clamp(1.9rem,5vw,3.6rem)]" />
        <p class="body-lg mt-7">{{ c.lines?.[0] }}</p>
        <p class="mt-3 text-[clamp(1.05rem,2.4vw,1.4rem)] font-medium leading-snug text-ink">
          {{ c.lines?.[1] }}
        </p>
      </div>

      <div class="mx-auto max-w-5xl">
        <CompareMatrix :competitors="content.competitors" :labels="content.capabilityLabels" />
      </div>

      <div class="mx-auto mt-12 max-w-3xl text-center">
        <p class="font-display text-[clamp(1.3rem,3.4vw,2.2rem)] italic text-ink">
          {{ c.note }}
        </p>
        <p class="fine mx-auto mt-7 max-w-2xl">{{ c.fine }}</p>
      </div>
    </div>
  </Scene>
</template>
