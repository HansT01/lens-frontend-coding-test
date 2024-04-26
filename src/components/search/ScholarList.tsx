import { Link } from 'raviger'
import { ScholarSearchResponse } from '../../models/ScholarSearchResponse'
import { ScholarPills } from '../ScholarPills'

export function ScholarList({ response }: { response: ScholarSearchResponse }) {
  return (
    <div className={'divide-y divide-solid'}>
      {response?.hits?.map((hit, i) => {
        const isEven = i % 2 === 0
        return (
          <Link
            href={`/scholar/${hit.source.record_lens_id}`}
            className={`block p-3 cursor-pointer ${isEven ? '' : 'bg-slate-100 dark:bg-[#26323b]'}`}
            key={hit.source.record_lens_id}
          >
            <h4 className={'text-lg'}>{hit.source.title}</h4>
            <div className={'py-2'}>
              <ScholarPills source={hit.source} />
            </div>
            <div>
              <small>Authors: </small>
              {hit.source.author?.map((author) => <small key={author.display_name}>{author.display_name} </small>)}
            </div>
            <div>
              <small>{hit.source.publication_type}</small>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
