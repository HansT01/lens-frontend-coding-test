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
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div
      key={hit.document.record_lens_id}
      className={cn('p-4 flex flex-col gap-4', { 'bg-slate-100 dark:bg-[#26323b]': zebra })}
    >
      <MetaInfo hit={hit} />
      <div className={cn('flex overflow-hidden items-stretch gap-6 border-t py-4', { hidden: !isExpanded })}>
        <PatentBody hit={hit} />
        <ArticleSection hit={hit} />
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-2 flex justify-center items-center hover:bg-accent"
      >
        <ChevronDown className={cn('transition-transform', { 'rotate-180': isExpanded })} />
      </button>
    </div>
  )
}

function MetaInfo({ hit }: { hit: PatentHit }) {
  return (
    <div className="flex flex-col gap-4">
      <Link href={`/patent/${hit.document.record_lens_id}`}>
        <h4 className="text-lg">{getTitle(hit)}</h4>
      </Link>
      <div className="flex flex-wrap">
        <PatentPills doc={hit.document} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <div className="text-sm">
            {hit.document.jurisdiction} {hit.document.doc_number}
          </div>
          <div className="text-sm">{hit.document.publication_type}</div>
          <div className="text-sm">
            Family: {hit.document.family.simple.size}s / {hit.document.family.extended.size}ex
          </div>
          <div className="text-sm">Legal Status: {hit.document.legal_status.patent_status}</div>
          <div className="text-sm">Application Number: {hit.document.application_reference.doc_number}</div>
          <div className="text-sm">Filed: {hit.document.application_reference.date.toString()}</div>
          <div className="text-sm">
            Published: {hit.document.date_published || hit.document.year_published || 'unknown'}
          </div>
          <div className="text-sm">Earliest Priority: {hit.document.earliest_priority_claim_date.toString()}</div>
        </div>
        <div className="text-sm">
          Applicants: {hit.document.applicant?.map((applicant) => applicant.name).join(', ')}
        </div>
        <div className="text-sm">Inventors: {hit.document.inventor?.map((inventor) => inventor.name).join(', ')}</div>
      </div>
    </div>
  )
}

function PatentBody({ hit }: { hit: PatentHit }) {
  const [isShowingClaims, setIsShowingClaims] = useState(false)
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h5 className="font-semibold">Abstract:</h5>
        <div className="text-sm">{hit.document.abstract.en.map((en) => en.text)}</div>
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="font-semibold">Claims:</h5>
        {hit.document.claim.en !== undefined ? (
          <>
            <div>
              <button
                onClick={() => setIsShowingClaims(!isShowingClaims)}
                className="bg-primary text-primary-foreground text-sm rounded py-1 px-2 w-[93px]"
              >
                {isShowingClaims ? 'Hide' : 'Show'} Claims
              </button>
            </div>
            <div className={cn('line-clamp-6 flex flex-col', { hidden: !isShowingClaims })}>
              <ul className="list-decimal pl-6">
                {hit.document.claim.en?.map((en, i) => (
                  <li key={i} className="text-sm">
                    {en.text}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="text-sm">Information currently unavailable.</div>
        )}
      </div>
      {hit.document.owner.length > 0 && (
        <div className="flex flex-col">
          <h5 className="font-semibold">Owners:</h5>
          <ul className="list-disc pl-6">
            {hit.document.owner.map((owner) => (
              <li key={owner.name} className="text-sm">
                {owner.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col">
        <h5 className="font-semibold">Applicants:</h5>
        <ul className="list-disc pl-6">
          {hit.document.applicant.map((applicant) => (
            <li key={applicant.name} className="text-sm">
              {applicant.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col">
        <h5 className="font-semibold">Inventors:</h5>
        <ul className="list-disc pl-6">
          {hit.document.inventor.map((inventor) => (
            <li key={inventor.name} className="text-sm">
              {inventor.name}
            </li>
          ))}
        </ul>
      </div>
      {hit.document['class_cpc.inv_symbol'].length > 0 && (
        <div className="flex flex-col gap-2">
          <h5 className="font-semibold">CPC Classifications:</h5>
          <ul className="flex flex-wrap gap-2">
            {hit.document.class_cpc.map((cpc) => (
              <li
                key={cpc.symbol + cpc.action_date}
                className="text-sm bg-accent text-accent-foreground border-accent-foreground border px-2 py-0.5 rounded-md"
              >
                {cpc.symbol}
              </li>
            ))}
          </ul>
        </div>
      )}
      {hit.document['class_ipcr.inv_symbol'].length > 0 && (
        <div className="flex flex-col gap-2">
          <h5 className="font-semibold">IPC Classifications:</h5>
          <ul className="flex flex-wrap gap-2">
            {hit.document.class_ipcr.map((ipcr) => (
              <li
                key={ipcr.symbol + ipcr.action_date}
                className="text-sm bg-accent text-accent-foreground border-accent-foreground border px-2 py-0.5 rounded-md"
              >
                {ipcr.symbol}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function ArticleSection({ hit }: { hit: PatentHit }) {
  return (
    <div className="shrink-0 w-[250px] flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h5 className="font-semibold">Document Preview</h5>
        <div className="aspect-[1/1.414] border-border border bg-white w-full rounded flex items-start justify-center p-3 text-sm">
          Preview unavailable
        </div>
      </div>
      <div className="flex flex-col">
        <h5 className="font-semibold">History</h5>
        <div className="flex flex-col divide-y">
          <div className="py-2">
            <div className="text-sm">Publication: {hit.document.date_published}</div>
            <div className="text-sm">
              {hit.document.jurisdiction} {hit.document.doc_number}
            </div>
          </div>
          <div className="py-2">
            <div className="text-sm">Application: {hit.document.application_reference.date.toString()}</div>
            <div className="text-sm">
              {hit.document.jurisdiction} {hit.document.doc_number}
            </div>
          </div>
          {hit.document.priority_claim.map((priority) => (
            <div className="py-2">
              <div className="text-sm">Priority: {priority.date.toString()}</div>
              <div className="text-sm">
                {priority.jurisdiction} {priority.doc_number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
