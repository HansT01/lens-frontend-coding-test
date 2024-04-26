import { legalStatusColourScale, metaNoticeColourScale } from '@/theme'
import colors from 'tailwindcss/colors'
import { PatentDocument } from '../models/PatentDocument'
import { Pill } from './ui/Pill'

export function PatentPills({ doc }: { doc: PatentDocument }) {
  const { patent_status: legalStatus } = doc.legal_status
  const legalStatusColor = legalStatusColourScale[legalStatus]
  return (
    <>
      {doc.legal_status.patent_status && (
        <Pill color={legalStatusColor || colors.slate['700']}>{doc.legal_status.patent_status}</Pill>
      )}
      {doc.has_claim && <Pill color={colors.red['500']}>{'Has Claim'}</Pill>}
      {doc.has_abstract && <Pill color={colors.blue['500']}>{'Has Abstract'}</Pill>}
      {doc.has_sequence && <Pill color={metaNoticeColourScale.BIO}>{'Has Sequence'}</Pill>}
    </>
  )
}
