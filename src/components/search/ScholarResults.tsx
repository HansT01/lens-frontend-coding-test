import { ScholarSearchResponse } from '../../models/ScholarSearchResponse'
import { ScholarTermsAggregationKey } from '../../models/ScholarTermsAggregationKey'
import { ScholarTermsAggregationLabels } from '../../models/ScholarTermsAggregationLabels'
import { SearchView } from '../../models/SearchView'
import { TermsAggregation } from '../../models/TermsAggregation'
import { TotalRelation } from '../../models/TotalRelation'
import { useLensStore } from '../../store'
import { FacetFilterGroup } from '../FacetFilterGroup'
import { Loading } from '../Loading'
import { BigMessage } from '../ui/BigMessage'
import { ScholarList } from './ScholarList'
import { SelectView } from './SelectView'

type ScholarResultsProps = {
  fetching: boolean
  loading?: boolean
  response?: ScholarSearchResponse
}

export function ScholarResults({ fetching, response, loading }: ScholarResultsProps) {
  const view = useLensStore((d) => d.view)
  const facetKeys = [ScholarTermsAggregationKey.Institution, ScholarTermsAggregationKey.Author]

  if (loading) return <Loading />
  if (!response) return <BigMessage>No results</BigMessage>

  return (
    <>
      <div className="md:grid grid-cols-12 grid-flow-row gap-2">
        <aside className="md:col-span-3 xl:col-span-2 dark:bg-[#26323b]">
          {response?.aggregations &&
            facetKeys.map((k) => (
              <FacetFilterGroup
                key={k}
                aggregation={response.aggregations[k] as TermsAggregation}
                label={ScholarTermsAggregationLabels[k]}
              />
            ))}
        </aside>
        <div className={'col-span-8 border divide-y divide-solid'}>
          <div className={'flex p-2 justify-between'}>
            <h4 className={'font-bold'}>
              Scholar
              {!fetching && (
                <span className="ml-1">
                  ({response?.totalRelation === TotalRelation.GREATER_THAN_OR_EQUAL_TO && 'over '}
                  {response?.totalHits?.toLocaleString()})
                </span>
              )}
            </h4>
            <SelectView />
          </div>
          {response && <div>{view === SearchView.List && <ScholarList response={response} />}</div>}
        </div>
      </div>
    </>
  )
}
