import { jurisdictionName } from '@/jurisdictions'
import { Bucket } from '@/models/Bucket'
import { PatentTermsAggregationKey } from '@/models/PatentTermsAggregationKey'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TermsAggregation } from '../models/TermsAggregation'
import { Button } from './ui/Button'

function JursidictionLabel({ jurisdiction }: { jurisdiction: string }) {
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

interface FacetFilterItemProps {
  aggregationKey: PatentTermsAggregationKey
  bucket: Bucket
  isChecked: boolean
  onChange: () => void
}

function FacetFilterItem({ aggregationKey, bucket, isChecked, onChange }: FacetFilterItemProps) {
  return (
    <label
      className="flex text-xs small cursor-pointer py-1 hover:bg-slate-100 dark:hover:bg-slate-900"
      key={bucket.key}
    >
      <span className="mr-2">
        <input type="checkbox" checked={isChecked} onChange={onChange} />
      </span>
      <span className="flex-1">
        {aggregationKey === PatentTermsAggregationKey.Jurisdiction ? (
          <JursidictionLabel jurisdiction={bucket.key} />
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
  const [buckets, setBuckets] = useState(
    aggregation.buckets.map((bucket) => {
      return { ...bucket, checked: false }
    })
  )

  const handleCheck = (bucketKey: string) => {
    setBuckets(
      buckets.map((bucket) => {
        if (bucket.key === bucketKey) {
          return { ...bucket, checked: !bucket.checked }
        }
        return bucket
      })
    )
  }

  const handleCheckAll = () => {
    setBuckets(
      buckets.map((bucket) => {
        return { ...bucket, checked: true }
      })
    )
  }

  return (
    <div className="p-2 flex flex-col gap-1">
      {aggregationKey === PatentTermsAggregationKey.Jurisdiction && (
        <div>
          <Button onClick={handleCheckAll} size="sm">
            Check All
          </Button>
        </div>
      )}
      <div>
        {buckets.map((bucket) => {
          return (
            <FacetFilterItem
              key={bucket.key}
              aggregationKey={aggregationKey}
              bucket={bucket}
              isChecked={bucket.checked}
              onChange={() => handleCheck(bucket.key)}
            />
          )
        })}
      </div>
      <div>
        <Button size="sm">{t('Refine')}</Button>
      </div>
    </div>
  )
}
