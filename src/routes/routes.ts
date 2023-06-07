import { GamesEnum } from '../client/hoyolab'

/* Main API Endpoint */
export const BBS_API = 'https://bbs-api-os.hoyolab.com'
export const ACCOUNT_API = 'https://api-account-os.hoyolab.com'
export const HK4E_API = 'https://sg-hk4e-api.hoyolab.com'
export const PUBLIC_API = `https://sg-public-api.hoyolab.com`
export const DEFAULT_REFERER = 'https://hoyolab.com'

/* HoYoLab API Endpoint */
export const USER_GAMES_LIST = `${ACCOUNT_API}/account/binding/api/getUserGameRolesByCookieToken`

const getEventName = (game: GamesEnum) => {
  if (game == GamesEnum.GENSHIN_IMPACT) {
    return 'sol'
  } else if (game === GamesEnum.HONKAI_IMPACT) {
    return 'mani'
  } else if (game === GamesEnum.HONKAI_STAR_RAIL) {
    return 'luna'
  }

  return ''
}

const getEventBaseUrl = (game: GamesEnum) => {
  if (game === GamesEnum.GENSHIN_IMPACT) {
    return HK4E_API
  } else if (
    game === GamesEnum.HONKAI_IMPACT ||
    game === GamesEnum.HONKAI_STAR_RAIL
  ) {
    return PUBLIC_API
  }
}

/* Daily Check-In API Endpoint */
export const DAILY_INFO_API = (game: GamesEnum) => {
  return `${getEventBaseUrl(game)}/event/${getEventName(game)}/info`
}

export const DAILY_REWARD_API = (game: GamesEnum) => {
  return `${getEventBaseUrl(game)}/event/${getEventName(game)}/home`
}

export const DAILY_CLAIM_API = (game: GamesEnum) => {
  return `${getEventBaseUrl(game)}/event/${getEventName(game)}/claim`
}

/* Redeem API Endpoint */
export const REDEEM_CLAIM_API = `${HK4E_API}/common/apicdkey/api/webExchangeCdkey`
