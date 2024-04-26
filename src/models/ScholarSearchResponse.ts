import { Aggregation } from './Aggregation'
import { JoinStats } from './JoinStats'
import { Metadatum } from './Metadatum'
import { ScholarHit } from './ScholarHit'
import { ScholarTermsAggregationKey } from './ScholarTermsAggregationKey'
import { TotalRelation } from './TotalRelation'

export interface ScholarSearchResponse {
  queryId: string
  totalHits: number
  totalRelation: TotalRelation
  hits: ScholarHit[]
  metadata: { [key: string]: Metadatum }
  joinStats: JoinStats
  aggregations: Record<ScholarTermsAggregationKey, Aggregation>
}
