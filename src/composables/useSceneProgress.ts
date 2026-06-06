import { inject, ref, type Ref } from 'vue'

export const SCENE_PROGRESS = Symbol('verso:sceneProgress')

/** Read the scrubbed 0..1 progress provided by an enclosing <PinnedScene>. */
export function useSceneProgress(): Ref<number> {
  return inject<Ref<number>>(SCENE_PROGRESS, ref(1))
}
