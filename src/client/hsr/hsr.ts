import { Cookie, ICookie } from '../../cookie'
import { Language, LanguageEnum } from '../../language'
import { DailyModule } from '../../module/daily'
import { RedeemModule } from '../../module/redeem'
import { HTTPRequest } from '../../request'
import { IHsrOptions } from './hsr.interface'
import { DEFAULT_REFERER } from '../../routes'
import { getHsrRegion } from './hsr.helper'
import { GamesEnum, Hoyolab, IGame } from '../hoyolab'

/**
 * Class representing the Honkai Star Rail game.
 *
 * @public
 * @class
 * @category Main
 */
export class HonkaiStarRail {
  /**
   * The Daily module for the Honkai Star Rail game.
   *
   * @public
   * @readonly
   */
  readonly daily: DailyModule

  /**
   * The Redeem module for the Honkai Star Rail game.
   *
   * @public
   * @readonly
   */
  readonly redeem: RedeemModule

  /**
   * The cookie used for authentication.
   *
   * @public
   * @readonly
   */
  readonly cookie: ICookie

  /**
   * The request object used to make HTTP requests.
   *
   * @public
   * @readonly
   */
  readonly request: HTTPRequest

  /**
   * HoyYolab account object
   *
   * @public
   */
  public account: IGame | null = null

  /**
   * The UID of the Honkai Star Rail account.
   *
   * @public
   */
  public readonly uid: number | null

  /**
   * The region of the Honkai Star Rail account.
   *
   * @public
   */
  public readonly region: string | null

  /**
   * The language of the Honkai Star Rail account.
   *
   * @public
   */
  public readonly lang: LanguageEnum

  /**
   * Create a new instance of HonkaiStarRail.
   *
   * @public
   * @constructor
   * @param {IHsrOptions} options - The options for the HonkaiStarRail instance.
   */
  constructor(options: IHsrOptions) {
    const cookie: ICookie =
      typeof options.cookie === 'string'
        ? Cookie.parseCookieString(options.cookie)
        : options.cookie

    this.cookie = cookie

    if (!options.lang) {
      options.lang = Language.parseLang(cookie.mi18nLang)
    }

    this.request = new HTTPRequest(Cookie.parseCookie(this.cookie))
    this.request.setReferer(DEFAULT_REFERER)
    this.request.setLang(options.lang)

    this.uid = options.uid ?? null
    this.region = this.uid !== null ? getHsrRegion(this.uid) : null
    this.lang = options.lang

    this.daily = new DailyModule(
      this.request,
      this.lang,
      GamesEnum.HONKAI_STAR_RAIL,
      this.region
    )
    this.redeem = new RedeemModule(
      this.request,
      this.lang,
      GamesEnum.HONKAI_STAR_RAIL,
      this.region,
      this.uid,
    )
  }

  /**
   * Create a new instance of HonkaiStarRail using a Hoyolab account.
   * If `uid` is not provided in the `options`, the account with the highest level will be used.
   *
   * @public
   * @static
   * @param {IHsrOptions} options - The options for the HonkaiStarRail instance.
   * @returns {Promise<HonkaiStarRail>} - A promise that resolves with a new HonkaiStarRail instance.
   */
  static async create(options: IHsrOptions): Promise<HonkaiStarRail> {
    let game: IGame | null = null
    if (typeof options.uid === 'undefined') {
      const hoyolab = new Hoyolab({
        cookie: options.cookie,
      })

      game = await hoyolab.gameAccount(GamesEnum.HONKAI_STAR_RAIL)
      options.uid = parseInt(game.game_uid)
      options.region = getHsrRegion(parseInt(game.game_uid))
    }
    const hsr = new HonkaiStarRail(options)
    hsr.account = game
    return hsr
  }

  /**
   * Retrieves daily information.
   *
   * @alias {@link DailyModule.info | DailyModule.info }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.info() } instead
   */
  dailyInfo() {
    return this.daily.info()
  }

  /**
   *
   * @alias {@link DailyModule.rewards | DailyModule.rewards }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.rewards() } instead
   */
  dailyRewards() {
    return this.daily.rewards()
  }

  /**
   * Fetch reward from daily login based on day
   *
   * @param day number | null
   * @alias {@link DailyModule.reward | DailyModule.reward }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.reward() } instead
   */
  dailyReward(day: number | null = null) {
    return this.daily.reward(day)
  }

  /**
   * Claim current reward
   *
   * @alias {@link DailyModule.claim | DailyModule.claim }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.claim() } instead
   */
  dailyClaim() {
    return this.daily.claim()
  }

  /**
   * Redeem Code
   *
   * @param code string
   * @alias {@link RedeemModule.claim | RedeemModule.claim }
   * @deprecated Use through { @link HonkaiStarRail.redeem | HonkaiStarRail.redeem.claim() } instead
   */
  redeemCode(code: string) {
    return this.redeem.claim(code)
  }
}
