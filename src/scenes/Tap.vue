<script setup lang="ts">
import { ref } from 'vue'
import { content } from '@/content/content'
import Scene from '@/primitives/Scene.vue'
import RevealText from '@/primitives/RevealText.vue'
import Artwork from '@/primitives/Artwork.vue'
import PhoneMock from '@/primitives/PhoneMock.vue'
import LivingHistoryCard from '@/primitives/LivingHistoryCard.vue'

const c = content.scenes.tap
const activated = ref(false)

function tap() {
  activated.value = true
}
function reset() {
  activated.value = false
}
</script>

<template>
  <Scene id="tap" :label="c.title">
    <div class="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <p class="eyebrow mb-6">{{ c.eyebrow }}</p>
        <RevealText as="h2" :text="c.title" class="h-display text-[clamp(2.1rem,5.6vw,4.2rem)]" />
        <p class="body-lg mt-7 max-w-md">{{ c.lines?.[0] }}</p>
        <div class="mt-9 flex items-center gap-4">
          <button v-if="!activated" class="btn-primary cue-pulse" @click="tap">Tik om te openen</button>
          <button v-else class="btn-ghost" @click="reset">↻ Opnieuw</button>
        </div>
      </div>

      <div class="stage">
        <div class="print">
          <Artwork :image="content.hero" :glow="activated ? 0.6 : 0" />
          <span class="ripple" :class="{ on: activated }"></span>
        </div>

        <div class="phone-wrap" :class="{ contact: activated }">
          <PhoneMock :width="262">
            <Transition name="rise" mode="out-in">
              <button v-if="!activated" key="prompt" class="prompt" @click="tap">
                <span class="nfc"><i></i><i></i><i></i></span>
                <p>Tik je telefoon<br />tegen de print</p>
              </button>
              <LivingHistoryCard
                v-else
                key="card"
                :edition="content.edition"
                :artist-first-name="content.artist.firstName"
                :artist-note="content.artistNote"
                :lineage="content.lineage"
                :revealed="1"
              />
            </Transition>
          </PhoneMock>
        </div>
      </div>
    </div>
  </Scene>
</template>

<style scoped>
.stage {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 460px;
}
.print {
  position: relative;
  width: min(40vw, 215px);
  transform: rotate(-3deg);
  flex: none;
}
.ripple {
  position: absolute;
  right: -6px;
  bottom: 30%;
  width: 16px;
  height: 16px;
  border-radius: 9999px;
  background: var(--color-verified);
  opacity: 0;
}
.ripple.on {
  animation: ripple 0.9s var(--ease-out-expo);
}
@keyframes ripple {
  0% {
    opacity: 0.8;
    box-shadow: 0 0 0 0 rgba(182, 134, 47, 0.5);
  }
  100% {
    opacity: 0;
    box-shadow: 0 0 0 60px rgba(182, 134, 47, 0);
  }
}
.phone-wrap {
  margin-left: -52px;
  z-index: 10;
  transition: transform 0.55s var(--ease-out-expo);
}
.phone-wrap.contact {
  transform: translateX(-12px) translateY(-4px);
}
.prompt {
  width: 100%;
  background: none;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  color: var(--color-graphite);
  font-size: 14px;
  text-align: center;
}
.nfc {
  position: relative;
  width: 54px;
  height: 54px;
  display: grid;
  place-items: center;
}
.nfc i {
  position: absolute;
  border: 2px solid var(--color-verified);
  border-radius: 9999px;
  opacity: 0;
  animation: nfc 2.1s ease-out infinite;
}
.nfc i:nth-child(1) {
  width: 18px;
  height: 18px;
  animation-delay: 0s;
}
.nfc i:nth-child(2) {
  width: 34px;
  height: 34px;
  animation-delay: 0.3s;
}
.nfc i:nth-child(3) {
  width: 52px;
  height: 52px;
  animation-delay: 0.6s;
}
@keyframes nfc {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  40% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
}

/* card rises out of the print */
.rise-enter-active {
  transition: all 0.7s var(--ease-out-expo);
}
.rise-leave-active {
  transition: all 0.35s ease;
}
.rise-enter-from {
  opacity: 0;
  transform: translateY(40px) scale(0.96);
}
.rise-leave-to {
  opacity: 0;
}
</style>
