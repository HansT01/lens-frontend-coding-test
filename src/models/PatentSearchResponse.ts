import { JoinStats } from './JoinStats.1'
import { PatentHit } from './PatentHit'
import { PatentTermsAggregationKey } from './PatentTermsAggregationKey'
import { TermsAggregation } from './TermsAggregation'

export interface PatentSearchResponse {
  queryId: string
  totalHits: number
  totalRelation: string
  hits: PatentHit[]
  joinStats: JoinStats
  warnings: any[]
  aggregations: Record<PatentTermsAggregationKey, TermsAggregation>
}
