/**
 * The interface for Genshin Impact character weapon information.
 */
export interface IGenshinCharacterWeapon {
  /**
   * The ID of the weapon.
   */
  id: number

  /**
   * The name of the weapon.
   */

  name: string
  /**
   * The icon of the weapon.
   */

  icon: string

  /**
   * The type of the weapon.
   */
  type: number

  /**
   * The rarity level of the weapon.
   */
  rarity: number
  /**
   * The level of the weapon.
   */
  level: number

  /**
   * The promote level of the weapon.
   */
  promote_level: number

  /**
   * The type name of the weapon.
   */
  type_name: string
  /**
   * The description of the weapon.
   */
  desc: string
  /**
   * The affix level of the weapon.
   */
  affix_level: number
}

/**
 * Represents a set of reliquaries that can be equipped by a character in Genshin Impact.
 */
export interface IGenshinCharacterReliquariesSet {
  /**
   * The unique identifier of the reliquary set.
   */
  id: number
  /**
   * The name of the reliquary set.
   */
  name: string
  /**
   * The affixes of the reliquary set.
   */
  affixes: IGenshinCharacterReliquariesAffix[]
}

/**
 * Represents a single reliquary that can be equipped by a character in Genshin Impact.
 */
export interface IGenshinCharacterReliquaries {
  /**
   * The unique identifier of the reliquary.
   */
  id: number
  /**
   * The name of the reliquary.
   */
  name: string
  /**
   * The icon of the reliquary.
   */
  icon: string
  /**
   * The position of the reliquary.
   */
  pos: number
  /**
   * The rarity of the reliquary.
   */
  rarity: number
  /**
   * The level of the reliquary.
   */
  level: number
  /**
   * The set of the reliquary.
   */
  set: IGenshinCharacterReliquariesSet
  /**
   * The name of the position of the reliquary.
   */
  pos_name: string
}

/**
 * Represents a single affix of a reliquary set in the Genshin Impact game.
 */
export interface IGenshinCharacterReliquariesAffix {
  /**
   * The activation number of the affix.
   */
  activation_number: number
  /**
   * The effect of the affix.
   */
  effect: string
}

/**
 * Defines the shape of a Genshin Impact character constellation object.
 */
export interface IGenshinCharacterConstellation {
  /**
   * The unique identifier of the constellation.
   */
  id: number
  /**
   * The name of the constellation.
   */
  name: string
  /**
   * The icon of the constellation.
   */
  icon: string
  /**
   * The effect of the constellation.
   */
  effect: string
  /**
   * Whether the constellation is activated.
   */
  is_actived: boolean
  /**
   * The position of the constellation.
   */
  pos: number
}

export interface IGenshinCharacterCostume {
  id: number
  name: string
  icon: string
}

/**
 * Represents the base information of a Genshin Impact character.
 */
export interface IGenshinCharacterBase {
  /**
   * The character ID.
   */
  id: number

  /**
   * The URL of the character's full image.
   */
  image: string

  /**
   * The URL of the character's icon.
   */
  icon: string

  /**
   * The name of the character.
   */
  name: string

  /**
   * The element of the character.
   */
  element: string

  /**
   * The rarity of the character.
   */
  rarity: number
}

/**
 * This interface extends the IGenshinCharacterBase interface and defines an object
 * representing a fully detailed character avatar in the Genshin Impact game,
 * including additional properties such as the character's current level,
 * equipped weapon, constellations, and costumes.
 */
export interface IGenshinCharacterAvatarFull extends IGenshinCharacterBase {
  /**
   * The current fetter of the character
   */
  fetter: number
  /**
   * The current level of the character
   */
  level: number
  /**
   * The equipped weapon of the character
   */
  weapon: IGenshinCharacterWeapon
  /**
   * The list of reliquaries equipped by the character, if any
   */
  reliquaries: IGenshinCharacterReliquaries[] | []
  /**
   * The list of constellations of the character
   */
  constellations: IGenshinCharacterConstellation[]
  /**
   * The number of activated constellations of the character
   */
  actived_constellation_num: number
  /**
   * The list of costumes of the character, if any
   */
  costumes: IGenshinCharacterCostume[] | []
  /**
   * An external property that can hold any type of data or null
   */
  external: unknown | null
}

/**
 * Represents a character role in Genshin Impact.
 */
export interface IGenshinCharacterRole {
  /**
   * The URL of the avatar image of the character role.
   */
  AvatarUrl: string
  /**
   * The nickname of the character role.
   */
  nickname: string
  /**
   * The region of the character role.
   */
  region: string
  /**
   * The level of the character role.
   */
  level: number
}

/**
 * Represents a collection of Genshin Impact characters and user information
 */
export interface IGenshinCharacters {
  /**
   * List of Genshin Impact characters
   */
  avatars: IGenshinCharacterAvatarFull[]

  /**
   * User information associated with the characters
   */
  role: IGenshinCharacterRole
}

/**
 * Interface for a summary of Genshin Impact characters, containing only basic information and weapon type.
 */
export interface IGenshinCharacterSummary {
  /**
   * An array of characters, containing basic information and weapon type.
   */
  avatars: Array<
    /**
     * Basic information of a Genshin Impact character.
     */
    IGenshinCharacterBase & {
      /**
       * The type of weapon used by the character.
       */
      weapon_type: number
      /**
       * The name of the weapon type used by the character.
       */
      weapon_type_name: string
    }
  >
}
