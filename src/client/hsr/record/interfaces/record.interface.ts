import { IHSRCharacterSummary } from './characters.interface'
import { IHSRStats } from './stats.interface'

export interface IHSRRecord {
  avatar_list: IHSRCharacterSummary[]
  stats: IHSRStats
}
