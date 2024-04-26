import { ScholarHit } from '@/models/ScholarHit'
import { ScholarPills } from './ScholarPills'

export function ViewScholarlyWork({ hit }: { hit: ScholarHit }) {
  return (
    <div className={'container mx-auto py-5'}>
      <h1 className={'text-xl mb-2'}>{hit.source.title}</h1>
      <p className={'capitalize py-2'}>{hit.source.publication_type}</p>
      <p className={'py-2'}>Published: {hit.source.date_published || hit.source.year_published || 'unknown'}</p>
      <p>
        {hit.source.source?.title}: {hit.source.start_page}-{hit.source.end_page}
      </p>
      <div className={'py-2 mb-2'}>
        <ScholarPills source={hit.source} />
      </div>
      <pre>{JSON.stringify(hit, null, 2)}</pre>
    </div>
  )
}
