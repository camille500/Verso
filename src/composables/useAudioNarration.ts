import { onUnmounted, ref } from 'vue'

/**
 * Plays the artist's voice note. If no real audio is wired yet (placeholder
 * build) or playback is blocked, it gracefully *simulates* playback — the
 * waveform + progress still animate, so the demo never falls flat.
 */
export function useAudioNarration(src: string | undefined, simDurationSec = 14) {
  const isPlaying = ref(false)
  const progress = ref(0) // 0..1

  let audio: HTMLAudioElement | null = null
  let simRaf = 0
  let simStart = 0

  if (src) {
    audio = new Audio(src)
    audio.preload = 'metadata'
    audio.addEventListener('timeupdate', () => {
      if (audio && audio.duration) progress.value = audio.currentTime / audio.duration
    })
    audio.addEventListener('ended', reset)
  }

  function reset() {
    isPlaying.value = false
    progress.value = 0
    cancelAnimationFrame(simRaf)
  }

  function startSimulated() {
    isPlaying.value = true
    simStart = performance.now() - progress.value * simDurationSec * 1000
    const tick = (now: number) => {
      const elapsed = (now - simStart) / 1000
      progress.value = Math.min(1, elapsed / simDurationSec)
      if (progress.value >= 1) {
        reset()
        return
      }
      simRaf = requestAnimationFrame(tick)
    }
    simRaf = requestAnimationFrame(tick)
  }

  function pause() {
    isPlaying.value = false
    audio?.pause()
    cancelAnimationFrame(simRaf)
  }

  function toggle() {
    if (isPlaying.value) {
      pause()
      return
    }
    if (audio) {
      audio
        .play()
        .then(() => {
          isPlaying.value = true
          cancelAnimationFrame(simRaf)
        })
        .catch(() => startSimulated())
    } else {
      startSimulated()
    }
  }

  function stop() {
    reset()
    if (audio) audio.currentTime = 0
    audio?.pause()
  }

  onUnmounted(stop)

  return { isPlaying, progress, toggle, stop }
}
