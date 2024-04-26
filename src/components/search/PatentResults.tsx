import { PatentSearchResponse } from '../../models/PatentSearchResponse'
import { PatentTermsAggregationKey } from '../../models/PatentTermsAggregationKey'
import { PatentTermsAggregationLabels } from '../../models/PatentTermsAggregationLabels'
import { SearchView } from '../../models/SearchView'
import { TermsAggregation } from '../../models/TermsAggregation'
import { useLensStore } from '../../store'
import { FacetFilterGroup } from '../FacetFilterGroup'
import { Loading } from '../Loading'
import { BigMessage } from '../ui/BigMessage'
import { PatentList } from './PatentList'
import { SelectView } from './SelectView'

type PatentResultsProps = {
  fetching: boolean
  loading?: boolean
  response?: PatentSearchResponse
}

export function PatentResults({ response, loading }: PatentResultsProps) {
  const view = useLensStore((d) => d.view)
  const facetKeys = [
    PatentTermsAggregationKey.Jurisdiction,
    PatentTermsAggregationKey.PublicationType,
    PatentTermsAggregationKey.LegalStatus
  ]

  if (loading) return <Loading />
  if (!response) return <BigMessage>No results</BigMessage>

  return (
    <div className="md:grid grid-cols-12 grid-flow-row gap-2">
      <aside className="md:col-span-3 xl:col-span-2">
        {response?.aggregations &&
          facetKeys.map((k) => (
            <FacetFilterGroup
              key={k}
              aggregation={response.aggregations[k] as TermsAggregation}
              label={PatentTermsAggregationLabels[k]}
            />
          ))}
      </aside>
      <div className={'col-span-8'}>
        <div className={'flex p-2 justify-between'}>
          <h4 className={'font-bold'}>
            Patents
            <span className="ml-1">
              ({response?.totalRelation === 'gte' && 'over '}
              {response?.totalHits?.toLocaleString()})
            </span>
          </h4>
          <SelectView />
        </div>
        {view === SearchView.List && <PatentList response={response} />}
      </div>
    </div>
  )
}
