import { IHoyolabOptions } from '../hoyolab'

/**
 * Genshin Impact Regions
 *
 * @remarks
 * This enum represents the available regions in Genshin Impact game.
 *
 * @enum
 * @readonly
 */
export enum GenshinRegion {
  /** United States */
  USA = 'os_usa',
  /** Europe */
  EUROPE = 'os_euro',
  /** Asia */
  ASIA = 'os_asia',
  /** China Taiwan */
  CHINA_TAIWAN = 'os_cht',
}

export type GenshinRegionKeyType = keyof typeof GenshinRegion

/**
 * Interface representing the options for the Genshin Impact API.
 * Inherits from `IHoyolabOptions`.
 *
 * @interface
 */
export interface IGenshinOptions extends IHoyolabOptions {
  /**
   * The UID of the Genshin Impact player.
   */
  uid?: number
  /**
   * The region of the Genshin Impact player.
   */
  region?: GenshinRegion
}
