import { usePathParams } from 'raviger'
import { useScholar } from '../api'
import { Loading } from './Loading'
import { ScholarHit } from '@/models/ScholarHit'
import { ViewScholarlyWork } from './ViewScholarlyWork'

export function ViewScholarlyWorkContainer() {
  const { id } = usePathParams('/scholar/:id') || { id: null }
  const { data } = useScholar({ q: `record_lens_id:${id}` }, true, 1)
  if (!data) return <Loading />
  const hit = (data?.hits.at(0) || {}) as ScholarHit
  if (!hit) return <div>Scholar Work Not Found</div>
  return <ViewScholarlyWork hit={hit} />
}
