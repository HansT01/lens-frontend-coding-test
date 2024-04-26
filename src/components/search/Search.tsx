import { SearchType, usePatents, useScholar } from '@/api'
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/Breadcrumb'
import { useQueryParams } from 'raviger'
import { useLensStore } from '../../store'
import { PatentResults } from './PatentResults'
import { ScholarResults } from './ScholarResults'
import { SearchForm } from './SearchForm'
import { SearchTab } from './SearchTab'

export function Search() {
  const [{ q = '' }, setQuery] = useQueryParams()
  const { searchType, showSearchResults } = useLensStore()

  const {
    data: patentResponse,
    error: patentsError,
    isFetching: patentsFetching,
    isLoading: patentsLoading
  } = usePatents({ q }, showSearchResults)
  console.log(patentResponse)

  const {
    data: scholarResponse,
    error: scholarError,
    isFetching: scholarFetching,
    isLoading: scholarLoading
  } = useScholar({ q }, showSearchResults)

  if (patentsError || scholarError) console.log({ patentsError, scholarError })

  return (
    <>
      <div className="flex p-2 items-center">
        <div>
          <BreadcrumbList className="col-span-2">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/search">Search</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{searchType}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </div>
        <div className="flex-1 ms-4">
          <SearchForm q={q} setQuery={setQuery} />
        </div>
      </div>
      <div className={'flex px-2 relative top-px'}>
        <SearchTab type={SearchType.PATENT}>Patent</SearchTab>
        <SearchTab type={SearchType.SCHOLAR}>Scholar</SearchTab>
      </div>
      <div className="border-t mb-2" />
      <div className={'overflow-x-hidden'}>
        <div className={'relative w-screen'} style={{ height: 'calc(100vh - 220px)' }}>
          <div className={`search-slide w-full absolute ${searchType === SearchType.SCHOLAR && 'active'}`}>
            <ScholarResults response={scholarResponse} fetching={scholarFetching} loading={scholarLoading} />
          </div>
          <div className={`search-slide w-full absolute ${searchType === SearchType.PATENT && 'active'}`}>
            <PatentResults response={patentResponse} fetching={patentsFetching} loading={patentsLoading} />
          </div>
        </div>
      </div>
    </>
  )
}
