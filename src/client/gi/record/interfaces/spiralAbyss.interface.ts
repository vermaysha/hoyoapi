/**
 * Represents an avatar rank in the Spiral Abyss event in Genshin Impact.
 */
export interface IGenshinSpiralAbyssRank {
  /**
   * The ID of the avatar.
   */
  avatar_id: number
  /**
   * The icon of the avatar.
   */
  avatar_icon: string
  /**
   * The rank value of the avatar.
   */
  value: number
  /**
   * The rarity of the avatar.
   */
  rarity: number
}

/**
 * Represents an avatar in the Spiral Abyss event in Genshin Impact.
 */
export interface IGenshinSpiralAbyssAvatar {
  /**
   * The ID of the avatar.
   */
  id: number
  /**
   * The icon of the avatar.
   */
  icon: string
  /**
   * The level of the avatar.
   */
  level: number
  /**
   * The rarity of the avatar.
   */
  rarity: number
}

/**
 * Represents a battle in the Spiral Abyss event in Genshin Impact.
 */
export interface IGenshinSpiralAbyssBattle {
  /**
   * The index of the battle.
   */
  index: number
  /**
   * The timestamp of the battle.
   */
  timestamp: string
  /**
   * The avatars involved in the battle.
   */
  avatars: IGenshinSpiralAbyssAvatar[]
}

/**
 * Represents a level in the Spiral Abyss event in Genshin Impact.
 */
export interface IGenshinSpiralAbyssLevel {
  /**
   * The index of the level.
   */
  index: number
  /**
   * The star rating of the level.
   */
  star: number
  /**
   * The maximum star rating of the level.
   */
  max_star: number
  /**
   * The battles that occurred in the level.
   */
  battles: IGenshinSpiralAbyssBattle[]
}

/**
 * Represents the floor of the Spiral Abyss in Genshin Impact.
 */
export interface IGenshinSpiralAbyssFloor {
  /**
   * The floor index.
   */
  index: number
  /**
   * The icon of the floor.
   */
  icon: string
  /**
   * Whether the floor is unlocked.
   */
  is_unlock: boolean
  /**
   * The time when the floor was completed and settled.
   */
  settle_time: string
  /**
   * The number of stars obtained in the floor.
   */
  star: number
  /**
   * The maximum number of stars that can be obtained in the floor.
   */
  max_star: number
  /**
   * The levels in the floor.
   */
  levels: IGenshinSpiralAbyssLevel[]
}

/**
 * Represents the Spiral Abyss in Genshin Impact.
 */
export interface IGenshinSpiralAbyss {
  /**
   * The ID of the Spiral Abyss schedule.
   */
  schedule_id: number
  /**
   * The start time of the Spiral Abyss.
   */
  start_time: string
  /**
   * The end time of the Spiral Abyss.
   */
  end_time: string
  /**
   * The total number of battles fought in the Spiral Abyss.
   */
  total_battle_times: number
  /**
   * The total number of battles won in the Spiral Abyss.
   */
  total_win_times: number
  /**
   * The maximum floor reached in the Spiral Abyss.
   */
  max_floor: string
  /**
   * The rankings for revealing the floor in the Spiral Abyss.
   */
  reveal_rank: IGenshinSpiralAbyssRank[]
  /**
   * The rankings for defeating the monsters in the Spiral Abyss.
   */
  defeat_rank: IGenshinSpiralAbyssRank[]
  /**
   * The rankings for damage dealt in the Spiral Abyss.
   */
  damage_rank: IGenshinSpiralAbyssRank[]
  /**
   * The rankings for taking damage in the Spiral Abyss.
   */
  take_damage_rank: IGenshinSpiralAbyssRank[]
  /**
   * The rankings for using normal skills in the Spiral Abyss.
   */
  normal_skill_rank: IGenshinSpiralAbyssRank[]
  /**
   * The rankings for using elemental burst skills in the Spiral Abyss.
   */
  energy_skill_rank: IGenshinSpiralAbyssRank[]
  /**
   * The floors in the Spiral Abyss.
   */
  floors: IGenshinSpiralAbyssFloor[]
  /**
   * The total number of stars obtained in the Spiral Abyss.
   */
  total_star: number
  /**
   * Whether the Spiral Abyss is unlocked.
   */
  is_unlock: boolean
}
