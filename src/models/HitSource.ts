import { Author } from './Author'
import { IDS } from './IDS'
import { SourceSource } from './SourceSource'

export interface HitSource {
  record_lens_id: string
  has_affiliation_ror: boolean
  is_open_access: boolean
  has_chemical: boolean
  source?: SourceSource
  title: string
  lens_id_num: number[]
  has_mesh_term: boolean
  is_referenced_by_scholarly: boolean
  referenced_by_patent_count: number
  has_clinical_trial: boolean
  has_affiliation: boolean
  has_field_of_study: boolean
  has_abstract: boolean
  referenced_by_count: number
  has_fulltext: boolean
  year_published: number
  record_lens_id_num: number
  author: Author[]
  publication_type: string
  has_orcid: boolean
  has_funding: boolean
  ids: IDS
  has_keyword: boolean
  is_referenced_by_patent: boolean
  reference_count: number
  date_published?: string
  issue?: string
  volume?: string
  end_page?: number
  start_page?: number
}
