<script setup lang="ts">
import { content } from '@/content/content'
import PinnedScene from '@/primitives/PinnedScene.vue'
import Artwork from '@/primitives/Artwork.vue'
import { smoothstep } from '@/lib/math'

const c = content.scenes.leaving
const hero = content.hero
</script>

<template>
  <PinnedScene id="leaving" :distance="1.5" :label="c.title">
    <template #default="{ progress }">
      <div class="relative flex h-svh w-full items-center justify-center">
        <!-- the doorway of white light it exits into -->
        <div class="doorway" :style="{ opacity: smoothstep(0.12, 0.95, progress) }"></div>

        <!-- the hero artwork — the same object that recurs through the film -->
        <div
          class="art-stage"
          :style="{
            transform: `translateX(${progress * 24}vw) scale(${1 - progress * 0.1})`,
            opacity: 1 - smoothstep(0.82, 1, progress) * 0.4,
          }"
        >
          <div class="w-[min(46vw,340px)]">
            <Artwork :image="hero" :grey="progress" />
          </div>
        </div>

        <!-- the two beats, crossfading -->
        <div class="pointer-events-none absolute inset-x-0 top-[15%] px-6 text-center">
          <h2
            class="h-display mx-auto max-w-3xl text-[clamp(1.7rem,4.8vw,3.4rem)]"
            :style="{ opacity: 1 - smoothstep(0.12, 0.46, progress) }"
          >
            {{ c.title }}
          </h2>
          <h2
            class="h-display absolute inset-x-0 top-0 mx-auto max-w-3xl px-6 text-[clamp(1.7rem,4.8vw,3.4rem)]"
            :style="{ opacity: smoothstep(0.5, 0.86, progress) }"
          >
            <span class="text-graphite">{{ c.lines?.[0] }}</span>
            {{ c.lines?.[1] }}
          </h2>
        </div>
      </div>
    </template>
  </PinnedScene>
</template>

<style scoped>
.doorway {
  position: absolute;
  right: -2%;
  top: 0;
  bottom: 0;
  width: 48%;
  background: linear-gradient(90deg, transparent, var(--color-paper-pure) 55%, #fff);
  filter: blur(10px);
}
.art-stage {
  will-change: transform;
}
</style>
