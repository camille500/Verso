<script setup lang="ts">
import { provide, ref } from 'vue'
import { ScrollTrigger } from '@/lib/gsap'
import { useGsapScene } from '@/composables/useGsapScene'
import { prefersReducedMotion } from '@/composables/useReducedMotion'
import { SCENE_PROGRESS } from '@/composables/useSceneProgress'

const props = withDefaults(
  defineProps<{
    id?: string
    label?: string
    /** pin length as a multiple of viewport height */
    distance?: number
    bare?: boolean
  }>(),
  { distance: 1.4, bare: false },
)

const root = ref<HTMLElement | null>(null)
const pinEl = ref<HTMLElement | null>(null)
const progress = ref(0)
provide(SCENE_PROGRESS, progress)

useGsapScene(root, () => {
  if (prefersReducedMotion() || !pinEl.value) {
    progress.value = 1
    return
  }
  ScrollTrigger.create({
    trigger: pinEl.value,
    start: 'top top',
    end: () => `+=${window.innerHeight * props.distance}`,
    pin: pinEl.value,
    pinSpacing: true,
    scrub: 1,
    anticipatePin: 1,
    onUpdate: (self) => {
      progress.value = self.progress
    },
  })
})
</script>

<template>
  <section :id="id" :aria-label="label" ref="root" class="relative w-full">
    <div
      ref="pinEl"
      class="relative flex min-h-svh w-full items-center justify-center overflow-hidden px-6 sm:px-10 md:px-16"
    >
      <div class="relative w-full" :class="bare ? '' : 'mx-auto max-w-6xl'">
        <slot :progress="progress" />
      </div>
    </div>
  </section>
</template>
