import { IHIReport } from './abyss.interface'

export interface IHIElysian {
  records: IHIReport[]
  collections: {
    type: string
    collected_number: number
    total_number: number
  }[]
  summary: {
    max_level_avatar_number: number
    max_support_point: number
    extra_item_number: number
    max_punish_level: number
    max_challenge_score: number
    avatar_numbers: number
    max_challenge_level: number
  }
  avatar_transcript: any
}
