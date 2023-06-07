import { HoyoAPIError } from '../../error'
import { HsrRegion, HsrRegionKeyType } from './hsr.interface'

/**
 * Get Server Region by UID
 *
 * @param uid number UID
 * @returns {string}
 */
export function getHsrRegion(uid: number): HsrRegion {
  const server_region = Number(uid.toString().trim().slice(0, 1))
  let key: string

  switch (server_region) {
    case 6:
      key = 'USA'
      break
    case 7:
      key = 'EUROPE'
      break
    case 8:
      key = 'ASIA'
      break
    case 9:
      key = 'CHINA_TAIWAN'
      break
    default:
      throw new HoyoAPIError(`Given UID ${uid} is invalid !`)
  }

  return HsrRegion[key as HsrRegionKeyType]
}
