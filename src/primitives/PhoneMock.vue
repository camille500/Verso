<script setup lang="ts">
// Presentational device frame. The screen is a slot; tap logic lives in the scene.
withDefaults(defineProps<{ width?: number }>(), { width: 320 })
</script>

<template>
  <div class="phone" :style="{ width: width + 'px' }">
    <div class="frame">
      <div class="speaker"></div>
      <div class="screen no-scrollbar">
        <div class="glare"></div>
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.phone {
  max-width: 88vw;
  aspect-ratio: 320 / 660;
}
.frame {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 46px;
  padding: 12px;
  background: linear-gradient(160deg, #2a2620, #14110d 60%);
  box-shadow:
    0 50px 110px -45px rgba(23, 20, 14, 0.6),
    inset 0 0 0 1.5px rgba(255, 255, 255, 0.08),
    inset 0 2px 3px rgba(255, 255, 255, 0.1);
}
.speaker {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 46px;
  height: 5px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.12);
  z-index: 5;
}
.screen {
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 34px;
  background: var(--color-paper);
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 26px 18px 18px;
}
.glare {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 34px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), transparent 40%);
  z-index: 20;
  mix-blend-mode: screen;
  opacity: 0.5;
}
</style>
