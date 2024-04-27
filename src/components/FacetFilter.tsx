import { jurisdictionName } from '@/jurisdictions'
import { Bucket } from '@/models/Bucket'
import { PatentTermsAggregationKey } from '@/models/PatentTermsAggregationKey'
import { useTranslation } from 'react-i18next'
import { TermsAggregation } from '../models/TermsAggregation'
import { Button } from './ui/Button'

export interface FacetFilterGroupProps {
  aggregationKey: PatentTermsAggregationKey
  aggregation: TermsAggregation
  label: string
}

export function JurisdictionFilterItem({ jurisdiction }: { jurisdiction: string }) {
  const flagUrl = `https://static.lens.org/lens/9.1.3/img/flags/${jurisdiction}.png`
  return (
    <div className="flex gap-1 items-center">
      <span className="h-[13px] shrink-0">
        <img className="max-h-full" src={flagUrl} alt={jurisdiction} />
      </span>
      <div className="text-ellipsis line-clamp-1">{jurisdictionName[jurisdiction] ?? jurisdiction}</div>
    </div>
  )
}

export function FacetFilterItem({
  aggregationKey,
  bucket
}: {
  aggregationKey: PatentTermsAggregationKey
  bucket: Bucket
}) {
  return (
    <label
      className="flex text-xs small cursor-pointer py-1 hover:bg-slate-100 dark:hover:bg-slate-900"
      key={bucket.key}
    >
      <span className="mr-2">
        <input type="checkbox" />
      </span>
      <span className="flex-1">
        {aggregationKey === PatentTermsAggregationKey.Jurisdiction ? (
          <JurisdictionFilterItem jurisdiction={bucket.key} />
        ) : (
          bucket.key.replace('_', ' ')
        )}
      </span>
      <span className="justify-self-end">({bucket.doc_count.toLocaleString()})</span>
    </label>
  )
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
