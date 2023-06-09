/**
 * Interface representing a Genshin Impact character's avatar data as recorded in the player's game data.
 */
export interface IGenshinRecordAvatar {
  /**
   * The ID of the avatar.
   */
  id: number
  /**
   * The URL for the avatar's image.
   */
  image: string
  /**
   * The name of the avatar.
   */
  name: string
  /**
   * The element associated with the avatar.
   */
  element: string
  /**
   * The number of fetters unlocked for the avatar.
   */
  fetter: number
  /**
   * The level of the avatar.
   */
  level: number
  /**
   * The rarity of the avatar.
   */
  rarity: number
  /**
   * The number of constellations unlocked for the avatar.
   */
  actived_constellation_num: number
  /**
   * The URL for the avatar's card image.
   */
  card_image: string
  /**
   * Whether the avatar has been chosen as the player's current character.
   */
  is_chosen: boolean
}

/**
 * Represents the statistics of a player's Genshin Impact game record.
 */
export interface IGenshinRecordStat {
  /**
   * The number of days the player has been actively playing.
   */
  active_day_number: number

  /**
   * The number of achievements the player has unlocked.
   */
  achievement_number: number

  /**
   * The number of Anemoculi the player has found.
   */
  anemoculus_number: number

  /**
   * The number of Geoculi the player has found.
   */
  geoculus_number: number

  /**
   * The number of characters the player has obtained.
   */
  avatar_number: number

  /**
   * The number of waypoints the player has unlocked.
   */
  way_point_number: number

  /**
   * The number of domains the player has unlocked.
   */
  domain_number: number

  /**
   * The player's current Spiral Abyss progress.
   */
  spiral_abyss: string

  /**
   * The number of Precious Chests the player has opened.
   */
  precious_chest_number: number

  /**
   * The number of Luxurious Chests the player has opened.
   */
  luxurious_chest_number: number

  /**
   * The number of Exquisite Chests the player has opened.
   */
  exquisite_chest_number: number

  /**
   * The number of Common Chests the player has opened.
   */
  common_chest_number: number

  /**
   * The number of Electroculi the player has found.
   */
  electroculus_number: number

  /**
   * The number of Magic Chests the player has opened.
   */
  magic_chest_number: number

  /**
   * The number of Dendroculi the player has found.
   */
  dendroculus_number: number
}

/**
 * Represents the world exploration record of a player in Genshin Impact.
 * @interface
 */
export interface IGenshinRecordWorldExploration {
  /**
   * The current level of world exploration. */
  level: number

  /**
   * The percentage of world exploration completion. */
  exploration_percentage: number

  /**
   * The URL of the icon representing the exploration region. */
  icon: string

  /**
   * The name of the exploration region. */
  name: string

  /**
   * The type of the exploration region. */
  type: string
  /**
   * An array of offerings available in the exploration region.
   * @property {string} name - The name of the offering.
   * @property {number} level - The level requirement of the offering.
   * @property {string} icon - The URL of the icon representing the offering.
   * */
  offerings: {
    name: string
    level: number
    icon: string
  }[]

  /**
   * The ID of the exploration region. */
  id: number

  /**
   * The parent ID of the exploration region. */
  parent_id: number

  /**
   * The URL of the map of the exploration region. */
  map_url: string

  /**
   * The URL of the strategy guide of the exploration region. */
  strategy_url: string

  /**
   * The URL of the background image of the exploration region. */
  background_image: string

  /**
   * The URL of the inner icon of the exploration region. */
  inner_icon: string

  /**
   * The URL of the cover image of the exploration region. */
  cover: string
}

/**
 * Interface representing Genshin Impact player's home record information.
 */
export interface IGenshinRecordHome {
  /**
   * The level of the player's home.
   */
  level: number
  /**
   * The number of times the player has visited their home.
   */
  visit_num: number
  /**
   * The comfort level of the player's home.
   */
  comfort_num: number
  /**
   * The number of items the player has placed in their home.
   */
  item_num: number
  /**
   * The name of the player's home.
   */
  name: string
  /**
   * The URL of the icon representing the player's home.
   */
  icon: string
  /**
   * The name of the comfort level of the player's home.
   */
  comfort_level_name: string
  /**
   * The URL of the icon representing the comfort level of the player's home.
   */
  comfort_level_icon: string
}

/**
 * Interface representing a Genshin Impact player record.
 */
export interface IGenshinRecord {
  /**
   * An object containing player role information.
   */
  role: {
    /**
     * The URL of the player's avatar image.
     */
    AvatarUrl: string
    /**
     * The player's nickname.
     */
    nickname: string
    /**
     * The region of the player's game account.
     */
    region: string
    /**
     * The player's level.
     */
    level: number
  }
  /**
   * An array of the player's avatars.
   */
  avatars: IGenshinRecordAvatar[]
  /**
   * An object containing the player's statistics.
   */
  stats: IGenshinRecordStat
  /**
   * An array of the player's world explorations.
   */
  world_explorations: IGenshinRecordWorldExploration[]
  /**
   * An array of the player's homes.
   */
  homes: IGenshinRecordHome[]
  /**
   * An array of the player's city explorations.
   * The structure of this array is not specified.
   */
  city_explorations: unknown[]
}
