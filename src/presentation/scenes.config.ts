import type { Component } from 'vue'
import type { SceneId } from '@/content/content.types'

import Opening from '@/scenes/Opening.vue'
import Leaving from '@/scenes/Leaving.vue'
import Anonymous from '@/scenes/Anonymous.vue'
import WhatIf from '@/scenes/WhatIf.vue'
import Reveal from '@/scenes/Reveal.vue'
import Tap from '@/scenes/Tap.vue'
import Memory from '@/scenes/Memory.vue'
import Anchor from '@/scenes/Anchor.vue'
import Transfer from '@/scenes/Transfer.vue'
import Compare from '@/scenes/Compare.vue'
import Vision from '@/scenes/Vision.vue'
import Ask from '@/scenes/Ask.vue'

export interface SceneEntry {
  id: SceneId
  label: string
  component: Component
}

// The story spine. Reorder / comment-out freely — each scene is self-contained.
export const scenes: SceneEntry[] = [
  { id: 'opening', label: 'Voor jou', component: Opening },
  { id: 'leaving', label: 'Het verlaat', component: Leaving },
  { id: 'anonymous', label: 'Anoniem', component: Anonymous },
  { id: 'whatif', label: 'Wat als', component: WhatIf },
  { id: 'reveal', label: 'Verso', component: Reveal },
  { id: 'tap', label: 'Tik', component: Tap },
  { id: 'memory', label: 'Geheugen', component: Memory },
  { id: 'anchor', label: 'Het anker', component: Anchor },
  { id: 'transfer', label: 'Doorgeven', component: Transfer },
  { id: 'compare', label: 'Vergelijking', component: Compare },
  { id: 'vision', label: 'Potentie', component: Vision },
  { id: 'ask', label: 'De vraag', component: Ask },
]
