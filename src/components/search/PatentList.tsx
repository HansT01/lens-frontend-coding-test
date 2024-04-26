import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { Link } from 'raviger'
import { useState } from 'react'
import { PatentHit } from '../../models/PatentHit'
import { PatentSearchResponse } from '../../models/PatentSearchResponse'
import { PatentPills } from '../PatentPills'

// eslint-disable-next-line react-refresh/only-export-components
export const getTitle = (hit: PatentHit) => hit.document.title?.en?.at(0)?.text || ''

export function PatentList({ response }: { response: PatentSearchResponse }) {
  return (
    <div className={'divide-y divide-solid border'}>
      {response?.hits.map((hit, i) => {
        const isEven = i % 2 === 0
        return <PatentListItem hit={hit} zebra={isEven} />
      })}
    </div>
  )
}

export function PatentListItem({ hit, zebra }: { hit: PatentHit; zebra?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  console.log(hit)
  const className = zebra ? '' : 'bg-slate-100 dark:bg-[#26323b]'
  return (
    <div key={hit.document.record_lens_id} className={cn('p-3 flex flex-col gap-1', className)}>
      <Link href={`/patent/${hit.document.record_lens_id}`}>
        <h4 className="text-lg">{getTitle(hit)}</h4>
      </Link>
      <div className="py-2">
        <PatentPills doc={hit.document} />
      </div>
      <div className="text-sm">{hit.document.publication_type}</div>
      <div className="text-sm">
        Published: {hit.document.date_published || hit.document.year_published || 'unknown'}
      </div>
      <div className="text-sm">Inventors: {hit.document.inventor?.map((inventor) => inventor.name).join(', ')}</div>
      <div className="text-sm">Applicants: {hit.document.applicant?.map((applicant) => applicant.name).join(', ')}</div>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-2 flex justify-center items-center">
        <ChevronDown className={cn('transition-transform', { 'rotate-180': isOpen })} />
      </button>
    </div>
  )
}
