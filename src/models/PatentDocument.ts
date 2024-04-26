import { Abstract } from './Abstract'
import { Applicant } from './Applicant'
import { ApplicationReference } from './ApplicationReference'
import { CitedBy } from './CitedBy'
import { Claim } from './Claim'
import { Class } from './Class'
import { ClassNational } from './ClassNational'
import { Description } from './Description'
import { Family } from './Family'
import { Jurisdiction } from './Jurisdiction'
import { Kind } from './Kind'
import { Lang } from './Lang'
import { LegalStatus } from './LegalStatus'
import { LensInternal } from './LensInternal'
import { OwnerAll } from './OwnerAll'
import { PriorityClaim } from './PriorityClaim'
import { PublicationType } from './PublicationType'
import { Sequence } from './Sequence'
import { Source } from './Source'

export interface PatentDocument {
  record_lens_id: string
  lens_id: any[]
  doc_key: string
  lens_internal: LensInternal
  jurisdiction: Jurisdiction
  doc_number: string
  kind: Kind
  date_published: string
  year_published: number
  ids: any[]
  publication_type: PublicationType
  application_reference: ApplicationReference
  priority_claim: PriorityClaim[]
  'priority_claim.source': Source
  earliest_priority_claim_date: Date
  title: Abstract
  title_lang: Lang[]
  has_title: boolean
  applicant: Applicant[]
  applicant_count: number
  has_applicant: boolean
  inventor: Applicant[] // oops
  inventor_count: number
  has_inventor: boolean
  agent: any[]
  agent_count: number
  has_agent: boolean
  owner: any[]
  owner_count: number
  owner_all: OwnerAll[]
  owner_all_count: number
  has_owner: boolean
  has_examiner: boolean
  class_ipcr: Class[]
  'class_ipcr.first_symbol': string
  'class_ipcr.later_symbol': string[]
  'class_ipcr.inv_symbol': string[]
  'class_ipcr.add_symbol': any[]
  'class_ipcr.source': Source
  class_cpc: Class[]
  class_cpc_cset: any[]
  'class_cpc.later_symbol': string[]
  'class_cpc.inv_symbol': string[]
  'class_cpc.add_symbol': string[]
  'class_cpc.source': Source
  class_national: ClassNational[]
  'class_national.later_symbol': string[]
  reference_cited: any[]
  'reference_cited.patent_count': number
  cites_patent: boolean
  'reference_cited.npl_count': number
  'reference_cited.npl_resolved_count': number
  cites_npl: boolean
  cites_resolved_npl: boolean
  cited_by: CitedBy
  cited_by_patent: boolean
  family: Family
  sequence?: Sequence
  has_sequence: boolean
  legal_status: LegalStatus
  abstract: Abstract
  abstract_lang: Lang[]
  has_abstract: boolean
  claim: Claim
  has_claim: boolean
  description: Description
  description_lang: any[]
  has_description: boolean
  has_docdb: boolean
  has_inpadoc: boolean
  has_full_text: boolean
  'class_cpc.first_symbol'?: string
  claim_lang?: Lang[]
  'class_national.first_symbol'?: string
  'class_national.source'?: Source
}
