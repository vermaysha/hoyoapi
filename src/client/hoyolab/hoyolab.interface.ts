export enum GamesEnum {
  GENSHIN_IMPACT = 'hk4e_global',
  HONKAI_IMPACT = 'bh3_global',
  HONKAI_STAR_RAIL = 'hkrpg_global',
}

import { ICookie } from '../../cookie'
import { LanguageEnum } from '../../language'

/**
 * Represents the options for accessing the Hoyolab API.
 *
 * @interface
 */
export interface IHoyolabOptions {
  /**
   * The cookie used to authenticate the request. This can be either a string or an {@link ICookie} object.
   */
  cookie: ICookie | string

  /**
   * The language to use for the request. This should be a value of {@link LanguageEnum}.
   */
  lang?: LanguageEnum
}

/**
 * Represents a game linked to a Hoyolab account.
 *
 * @interface
 */
export interface IGame {
  /**
   * The game's business type.
   */
  game_biz: string

  /**
   * The game's server region.
   */
  region: string

  /**
   * The game's unique ID.
   */
  game_uid: string

  /**
   * The game's nickname.
   */
  nickname: string

  /**
   * The game's level.
   */
  level: number

  /**
   * Whether the game is currently chosen as the active game.
   */
  is_chosen: boolean

  /**
   * The name of the game's region.
   */
  region_name: string

  /**
   * Whether the game is an official miHoYo game.
   */
  is_official: boolean
}

/**
 * Represents a list of games linked to a Hoyolab account.
 *
 * @interface
 */
export interface IGamesList {
  /**
   * The list of games linked to the account. This should be a value of {@link IGame}.
   */
  list: IGame[]
}

/**
 * Interface for representing a game record card.
 *
 * @interface
 */
export interface IGameRecordCard {
  has_role: boolean
  game_id: number
  game_role_id: string
  nickname: string
  region: string
  level: number
  background_image: string
  is_public: boolean
  data: {
    name: string
    type: number
    value: string
  }[]
  region_name: string
  url: string
  data_switches: {
    switch_id: string
    is_public: boolean
    switch_name: string
  }[]
  h5_data_switches: any[]
  background_color: string
}
