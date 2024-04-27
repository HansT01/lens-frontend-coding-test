import { jurisdictionName } from '@/jurisdictions'
import { PatentTermsAggregationKey } from '@/models/PatentTermsAggregationKey'
import { useTranslation } from 'react-i18next'
import { TermsAggregation } from '../models/TermsAggregation'
import { Button } from './ui/Button'

export interface FacetFilterGroupProps {
  aggregationKey: PatentTermsAggregationKey
  aggregation: TermsAggregation
  label: string
}

export function FacetFilter({
  aggregationKey,
  aggregation
}: {
  aggregationKey: PatentTermsAggregationKey
  aggregation: TermsAggregation
}) {
  const { t } = useTranslation()
  return (
    <div className={'p-2'}>
      {aggregation?.buckets?.map((bucket) => {
        return <FacetFilterItem key={bucket.key} aggregationKey={aggregationKey} bucket={bucket} />
      })}
      <div className="flex py-2">
        <Button size="sm">{t('Refine')}</Button>
      </div>
    </div>
  )
}

export function FacetFilterItem({
  aggregationKey,
  bucket
}: {
  aggregationKey: PatentTermsAggregationKey
  bucket: any
}) {
  return (
    <label
      className="flex text-sm small cursor-pointer py-1 hover:bg-slate-100 dark:hover:bg-slate-900"
      key={bucket.key}
    >
      <span className="mr-1">
        <input type="checkbox" />
      </span>
      <span className="flex-1 text-ellipsis line-clamp-1">
        {aggregationKey === PatentTermsAggregationKey.Jurisdiction
          ? jurisdictionName[bucket.key]
          : bucket.key.replaceAll('_', ' ')}
      </span>
      <span className="justify-self-end">({bucket.doc_count.toLocaleString()})</span>
    </label>
  )
}
