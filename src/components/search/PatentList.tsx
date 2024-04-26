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
    <div key={hit.document.record_lens_id} className={cn('p-3 flex flex-col gap-2', className)}>
      <Link href={`/patent/${hit.document.record_lens_id}`}>
        <h4 className="text-lg">{getTitle(hit)}</h4>
      </Link>
      <div className="flex flex-wrap">
        <PatentPills doc={hit.document} />
      </div>
      <div className="flex flex-col">
        <div className="text-sm">{hit.document.publication_type}</div>
        <div className="text-sm">
          Published: {hit.document.date_published || hit.document.year_published || 'unknown'}
        </div>
        <div className="text-sm">Inventors: {hit.document.inventor?.map((inventor) => inventor.name).join(', ')}</div>
        <div className="text-sm">
          Applicants: {hit.document.applicant?.map((applicant) => applicant.name).join(', ')}
        </div>
      </div>
      <div className={cn('flex flex-col overflow-hidden gap-2', { 'h-0': !isOpen })}>
        <div className="flex flex-col">
          <h5 className="font-semibold">Abstract:</h5>
          <div className="text-sm">{hit.document.abstract.en.map((en) => en.text)}</div>
        </div>
        <div className="flex flex-col">
          <h5 className="font-semibold">Applicants:</h5>
          <ul>
            {hit.document.applicant.map((applicant) => {
              return (
                <li key={applicant.name} className="text-sm">
                  {applicant.name}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex flex-col">
          <h5 className="font-semibold">Inventors:</h5>
          <ul>
            {hit.document.inventor.map((inventor) => {
              return (
                <li key={inventor.name} className="text-sm">
                  {inventor.name}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="font-semibold">CPC Classifications:</h5>
          <div className="flex flex-wrap gap-1">
            {hit.document['class_cpc.inv_symbol'].map((symbol) => (
              <div
                key={symbol}
                className="text-sm bg-accent text-accent-foreground border-accent-foreground border px-2 py-0.5 rounded-md"
              >
                {symbol}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h5 className="font-semibold">IPC Classifications:</h5>
          <div className="flex flex-wrap gap-1">
            {hit.document['class_ipcr.inv_symbol'].map((symbol) => (
              <div
                key={symbol}
                className="text-sm bg-accent text-accent-foreground border-accent-foreground border px-2 py-0.5 rounded-md"
              >
                {symbol}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-2 flex justify-center items-center">
        <ChevronDown className={cn('transition-transform', { 'rotate-180': isOpen })} />
      </button>
    </div>
  )
}
