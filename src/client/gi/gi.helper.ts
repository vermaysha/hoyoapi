import { HoyoAPIError } from '../../error'
import { GenshinRegion, GenshinRegionKeyType } from './gi.interface'

/**
 * Get Genshin Impact region based on UID.
 *
 * @param uid User ID.
 * @returns Region for the UID.
 * @throws `HoyoAPIError` when the UID is invalid.
 */
export function getGenshinRegion(uid: number): GenshinRegion {
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

  return GenshinRegion[key as GenshinRegionKeyType]
}
