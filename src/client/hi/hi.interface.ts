import { IHoyolabOptions } from '../hoyolab'

/**
 * An enum representing Honkai servers region.
 */
export enum HonkaiRegion {
  /** United States */
  USA = 'usa01',
  /** Europe */
  EUROPE = 'eur01',
  /** Asia */
  ASIA = 'overseas01',
}

export type HonkaiRegionKeyType = keyof typeof HonkaiRegion

/**
 * Interface representing the options for the Honkai Impact API.
 * Inherits from `IHoyolabOptions`.
 *
 * @interface
 */
export interface IHi3Options extends IHoyolabOptions {
  /**
   * The UID of the Honkai Impact player.
   */
  uid?: number
  /**
   * The region of the Honkai Impact player.
   */
  region?: HonkaiRegion
}
