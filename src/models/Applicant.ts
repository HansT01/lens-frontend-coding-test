import { AppType } from './AppType'
import { Jurisdiction } from './Jurisdiction'

export interface Applicant {
  name: string
  sequence: number
  app_type?: AppType
  residence?: Jurisdiction
}
