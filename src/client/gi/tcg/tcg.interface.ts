export type TCG_CARD_TYPE =
  | 'CardTypeCharacter'
  | 'CardTypeModify'
  | 'CardTypeUnknown'
export type TCG_COST_TYPE =
  | 'CostTypeHydro'
  | 'CostTypeEnergy'
  | 'CostTypePyro'
  | 'CostTypeElectro'
  | 'CostTypeAnemo'
  | 'CostTypeCryo'

export interface IGenshinTCGAccount {
  name: string
  linups: string[]
  is_overflow: boolean
}

export interface IGenshinTCGTime {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

export interface IGesnhinTCGReplay {
  game_id: string
  self: IGenshinTCGAccount
  opposite: IGenshinTCGAccount
  match_type: string
  match_time: IGenshinTCGTime
  is_win: boolean
}

export interface IGenshinTCGScheduleBasic {
  id: number
  name: string
  begin: IGenshinTCGTime
  end: IGenshinTCGTime
}

export interface IGenshinTCGChallangeBasic {
  schedule: IGenshinTCGScheduleBasic
  nickname: string
  uid: string
  win_cnt: number
  medal: string
  has_data: boolean
}

export interface IGenshinTCGStat {
  level: number
  nickname: string
  avatar_card_num_gained: number
  avatar_card_num_total: number
  action_card_num_gained: number
  action_card_num_total: number
}

export interface IGenshinTCGBasicInfo extends IGenshinTCGStat {
  covers: any[]
  replays: IGesnhinTCGReplay[]
  hornor_character: any
  challenge_basic: IGenshinTCGChallangeBasic
}

export interface IGenshinTCGCardSkill {
  id: number
  name: string
  desc: string
  tag: string
}

export interface IGenshinTCGActionCost {
  cost_type: TCG_COST_TYPE
  cost_value: number
}

export interface IGenshinTCGCard {
  id: number
  name: string
  image: string
  desc: string
  card_type: TCG_CARD_TYPE
  num: number
  tags: string[]
  proficiency: number
  use_count: number
  hp: number
  card_skills: IGenshinTCGCardSkill[]
  action_cost: IGenshinTCGActionCost[]
  card_sources: string[]
  rank_id: number
  deck_recommend: string
  card_wiki: string
  icon: string
}

export interface IGenshinTCGCards {
  card_list: IGenshinTCGCard[]
  is_last: boolean
  next_offset: number
  stats: IGenshinTCGStat | null
}

export interface IGenshinTCGMatch extends IGesnhinTCGReplay {}

export interface IGenshinTCGMatchs {
  recent_matches: IGenshinTCGMatch[]
  favourite_matches: any[]
}

export interface IGenshinTCGDeckDetail {
  id: number
  name: string
  is_valid: boolean
  avatar_cards: IGenshinTCGCard[]
  action_cards: IGenshinTCGCard[]
}

export interface IGenshinTCGDeckList {
  deck: IGenshinTCGDeckDetail
  win_cnt: number
}

export interface IGenshinTCGRecord {
  basic: {
    schedule: IGenshinTCGScheduleBasic | null
    nickname: string
    uid: string
    win_cnt: number
    medal: string
    has_data: boolean
  }
  honor_character: any[]
  deck_list: IGenshinTCGDeckList[]
  recommend_url: string
}

export interface IGenshinTCGSchedule {
  schedule_list: IGenshinTCGScheduleBasic[]
}

export interface IGenshinTCGDeck {
  basic: IGenshinTCGChallangeBasic
  deck_detail: IGenshinTCGDeckList
}
