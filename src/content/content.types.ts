// ─────────────────────────────────────────────────────────────
// The shape of EVERYTHING personal + every Dutch string.
// Swapping the artist = editing content.ts + dropping files in /public.
// No component hard-codes copy; it all flows from here.
// ─────────────────────────────────────────────────────────────

export interface ArtworkImage {
  /** Path under /public, e.g. '/artwork/hero.svg'. */
  src: string
  alt: string
  /** width / height — keeps layout stable before the image loads. */
  aspect: number
}

export interface Edition {
  number: number
  total: number
  title: string
  year: number
  technique: string
}

export interface ArtistNote {
  /** Real voice note when available; falls back to simulated playback. */
  audioSrc?: string
  durationSec: number
  label: string
  transcript: string
}

export interface LineageEntry {
  year: string
  owner: string
  place: string
}

export type CapabilityKey =
  | 'editionCoa'
  | 'phoneTap'
  | 'fusedToObject'
  | 'offlineResale'
  | 'noWallet'

export interface Competitor {
  name: string
  /** Honest one-line note (Dutch), shown on tap. */
  note: string
  caps: Record<CapabilityKey, boolean | 'partial'>
  isVerso?: boolean
}

export interface EconomicsTier {
  label: string
  value: string
  detail: string
  /** Rendered as a faint "later" upside rather than a promise. */
  future?: boolean
}

export interface SceneCopy {
  eyebrow?: string
  title: string
  lines?: string[]
  /** The emphasised closing beat of a scene. */
  note?: string
  /** Confident honesty fine-print (guardrails). */
  fine?: string
}

export type SceneId =
  | 'opening'
  | 'leaving'
  | 'anonymous'
  | 'whatif'
  | 'reveal'
  | 'tap'
  | 'memory'
  | 'anchor'
  | 'transfer'
  | 'compare'
  | 'vision'
  | 'ask'

export interface VersoContent {
  artist: { firstName: string; fullName: string; discipline: string }
  brand: { name: string; tagline: string }
  hero: ArtworkImage
  edition: Edition
  artistNote: ArtistNote
  lineage: LineageEntry[]
  capabilityLabels: Record<CapabilityKey, string>
  competitors: Competitor[]
  economics: EconomicsTier[]
  ask: { title: string; lines: string[]; cta: string; tail: string }
  scenes: Record<SceneId, SceneCopy>
}
