import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { patentSearchFields, scholarSearchFields } from './fields'
import { PatentSearchResponse } from './models/PatentSearchResponse'
import { ScholarSearchResponse } from './models/ScholarSearchResponse'
import { patentAggregations } from './patentAggregations'
import { defaultScholarAggs } from './scholarAggs'

export const API_BASE: string = 'https://localhost:9443/lens'
export const SEARCH_API_BASE: string = `${API_BASE}/api/search`

export interface SearchBody {}

export interface SearchQuery {
  body: SearchBody
  params: SearchParams
}

export interface SearchParams {
  q?: string
  authorship?: boolean
  inventorship?: boolean
}

export enum SearchType {
  SCHOLAR = 'SCHOLAR',
  PATENT = 'PATENT'
}

export async function search(type: SearchType, { params, body }: SearchQuery) {
  const url = SEARCH_API_BASE + `/${type.toLowerCase()}`
  const response = await axios.post(url, body, {
    params
  })

  return response.data
}

export async function searchScholar(query: SearchQuery): Promise<ScholarSearchResponse> {
  return await search(SearchType.SCHOLAR, query)
}

export async function searchPatents(query: SearchQuery): Promise<PatentSearchResponse> {
  return await search(SearchType.PATENT, query)
}

export function usePatents(params: SearchParams, enabled: boolean = true, size: number = 10) {
  const body = {
    size,
    aggregations: patentAggregations,
    _source: patentSearchFields
  }
  return usePatentsWithBody(params, enabled, body)
}

export function usePatentsWithBody(params: SearchParams, enabled: boolean = true, body: any) {
  return useQuery({
    queryKey: ['patents', JSON.stringify({ params, body })],
    queryFn: () =>
      searchPatents({
        params,
        body
      }),
    enabled,
    refetchOnWindowFocus: false
  })
}

export function useScholar(params: SearchParams, enabled: boolean = true, size: number = 10, overrides: any = {}) {
  const body = {
    _source: overrides._source || scholarSearchFields,
    size,
    aggregations: defaultScholarAggs
  }
  return useScholarWithBody(params, enabled, body)
}

export function useScholarWithBody(params: SearchParams, enabled: boolean = true, body: any) {
  return useQuery({
    queryKey: ['scholar', JSON.stringify({ params, body })],
    queryFn: () =>
      searchScholar({
        params,
        body
      }),
    enabled,
    refetchOnWindowFocus: false
  })
}
