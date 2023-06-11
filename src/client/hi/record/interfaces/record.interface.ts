export interface IHIPreference {
  abyss: number
  main_line: number
  battle_field: number
  open_world: number
  community: number
  comprehensive_score: number
  comprehensive_rating: string
  god_war: number
  is_god_war_unlock: boolean
}
export interface IHIStat {
  active_day_number: number
  suit_number: number
  achievement_number: number
  stigmata_number: number
  armor_number: number
  sss_armor_number: number
  battle_field_ranking_percentage: string
  old_abyss: {
    level_of_quantum: string
    level_of_ow: string
    latest_type: string
    latest_level: string
    latest_area: number
    level_of_greedy: string
  }
  weapon_number: number
  god_war_max_punish_level: number
  god_war_extra_item_number: number
  god_war_max_challenge_score: number
  god_war_max_challenge_level: number
  five_star_weapon_number: number
  five_star_stigmata_number: number
  god_war_max_level_avatar_number: number
  battle_field_area: number
  battle_field_score: number
  abyss_score: number
  battle_field_rank: number
  god_war_max_support_point: number
  abyss_floor: number
}

export interface IHIRole {
  AvatarUrl: string
  nickname: string
  region: string
  level: number
}

export interface IHIRecord {
  role: IHIRole
  stats: IHIStat
  preference: IHIPreference
}
