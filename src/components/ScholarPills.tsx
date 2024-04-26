import { HitSource } from '@/models/HitSource'
import { scholarPillColors } from '@/theme'
import { useTranslation } from 'react-i18next'
import { Pill } from './ui/Pill'

export function ScholarPills({ source }: { source: HitSource }) {
  const { t } = useTranslation()
  return (
    <>
      {source.is_open_access && <Pill color={scholarPillColors.is_open_access}>{t('Is Open Access')}</Pill>}
      {source.has_field_of_study && <Pill color={scholarPillColors.has_field_of_study}>{'Has Field Of Study'}</Pill>}
      {source.has_affiliation && <Pill color={scholarPillColors.has_affiliation}>{'Has Affiliation'}</Pill>}
      {source.has_abstract && <Pill color={scholarPillColors.has_abstract}>{'Has Abstract'}</Pill>}
      {source.has_fulltext && <Pill color={scholarPillColors.has_fulltext}>{'Has Fulltext'}</Pill>}
      {source.has_funding && <Pill color={scholarPillColors.has_funding}>{'Has Funding'}</Pill>}
    </>
  )
}
