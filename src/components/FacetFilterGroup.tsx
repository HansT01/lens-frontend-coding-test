import { PatentTermsAggregationKey } from '@/models/PatentTermsAggregationKey'
import { ScholarTermsAggregationKey } from '@/models/ScholarTermsAggregationKey'
import { TermsAggregation } from '@/models/TermsAggregation'
import { useState } from 'react'
import { FacetFilter } from './FacetFilter'

export type AggregationKey = PatentTermsAggregationKey | ScholarTermsAggregationKey

export interface FacetFilterGroupProps {
  aggregationKey: AggregationKey
  aggregation: TermsAggregation
  label: string
}

export function FacetFilterGroup({ aggregationKey, aggregation, label }: FacetFilterGroupProps) {
  const [show, setShow] = useState(true)
  // TODO: useScholar with aggregation enabled:show
  return (
    <div className="ml-2 border">
      <div className={'font-bold p-2 cursor-pointer'} onClick={() => setShow(!show)}>
        {label}
      </div>
      {show && <FacetFilter aggregationKey={aggregationKey} aggregation={aggregation} />}
    </div>
  )
}
