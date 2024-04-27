import { jurisdictionName } from '@/jurisdictions'
import { Bucket } from '@/models/Bucket'
import { PatentTermsAggregationKey } from '@/models/PatentTermsAggregationKey'
import Fuse from 'fuse.js'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TermsAggregation } from '../models/TermsAggregation'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

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
        <Input type="checkbox" checked={isChecked} onChange={onChange} className="h-4" />
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

interface FacetFilterProps {
  aggregationKey: PatentTermsAggregationKey
  aggregation: TermsAggregation
}

export function FacetFilter({ aggregationKey, aggregation }: FacetFilterProps) {
  const { t } = useTranslation()
  const [buckets, setBuckets] = useState(
    aggregation.buckets.map((bucket) => {
      return { ...bucket, checked: false }
    })
  )
  const [fuzzySearch, setFuzzySearch] = useState('')

  let sortedBuckets = buckets
  if (aggregationKey === PatentTermsAggregationKey.Jurisdiction && fuzzySearch !== '') {
    const fuse = new Fuse(buckets, {
      keys: ['key'],
      getFn: (bucket, path) => jurisdictionName[bucket[path as string]],
      findAllMatches: true,
      threshold: 2
    })
    const searchResults = fuse.search(fuzzySearch)
    sortedBuckets = searchResults.map((result) => result.item)
  }

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
    const isAllChecked = buckets.filter((bucket) => bucket.checked === false).length === 0
    setBuckets(
      buckets.map((bucket) => {
        return { ...bucket, checked: !isAllChecked }
      })
    )
  }

  return (
    <div className="p-2 flex flex-col gap-1">
      {aggregationKey === PatentTermsAggregationKey.Jurisdiction && (
        <div className="flex flex-col gap-2">
          <Input type="text" className="w-full" value={fuzzySearch} onChange={(e) => setFuzzySearch(e.target.value)} />
          <div>
            <Button onClick={handleCheckAll} size="sm">
              Check All
            </Button>
          </div>
        </div>
      )}
      <div>
        {sortedBuckets.map((bucket) => {
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
