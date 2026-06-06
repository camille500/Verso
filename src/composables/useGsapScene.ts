import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { gsap } from '@/lib/gsap'

/**
 * Scopes all GSAP selectors/timelines created in `setup` to a scene's root
 * element and reverts them automatically on unmount — so scenes never leak
 * ScrollTriggers into one another.
 */
export function useGsapScene(
  root: Ref<HTMLElement | null>,
  setup: (self: HTMLElement) => void,
) {
  let ctx: ReturnType<typeof gsap.context> | null = null

  onMounted(() => {
    if (!root.value) return
    const el = root.value
    ctx = gsap.context(() => setup(el), el)
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })
}
