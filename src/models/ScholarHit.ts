import { Highlight } from './Highlight'
import { HitSource } from './HitSource'

export interface ScholarHit {
  highlight: Highlight
  score: number
  source: HitSource
}
