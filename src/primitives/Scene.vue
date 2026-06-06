<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    label?: string
    /** full-bleed (no centred max-width column) */
    bare?: boolean
  }>(),
  { bare: false },
)
</script>

<template>
  <section
    :id="id"
    :aria-label="label"
    class="scene relative flex min-h-svh w-full items-center justify-center overflow-x-clip px-6 py-24 sm:px-10 md:px-16"
  >
    <div class="relative w-full" :class="bare ? '' : 'mx-auto max-w-6xl'">
      <slot />
    </div>
  </section>
</template>
