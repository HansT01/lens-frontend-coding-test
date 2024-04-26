import { usePathParams } from 'raviger'
import { usePatents } from '@/api'
import { Loading } from '@/components/Loading'
import { ErrorPage } from '@/components/Error'
import { PatentDocument } from '@/models/PatentDocument'
import { ViewPatent } from './ViewPatent'

export function ViewPatentContainer() {
  const { id } = usePathParams('/patent/:id') || { id: null }
  const q = `record_lens_id:${id}`
  const { data } = usePatents({ q }, true, 1)
  if (!data) return <Loading />
  const patent = data.hits.at(0)?.document as PatentDocument
  if (!patent) return <ErrorPage />
  return <ViewPatent patent={patent} />
}
