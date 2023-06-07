import { IHoyolabOptions } from '../hoyolab'

export enum HsrRegion {
  USA = 'prod_official_asia',
  EUROPE = 'prod_official_euro',
  ASIA = 'prod_official_asia',
  CHINA_TAIWAN = 'prod_official_cht',
}

export type HsrRegionKeyType = keyof typeof HsrRegion

export interface IHsrOptions extends IHoyolabOptions {
  uid?: number
  region?: HsrRegion
}
