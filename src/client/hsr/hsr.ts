import { Cookie, ICookie } from '../../cookie'
import { Language, LanguageEnum } from '../../language'
import { DailyModule } from '../../module/daily'
import { RedeemModule } from '../../module/redeem'
import { HTTPRequest } from '../../request'
import { IHsrOptions } from './hsr.interface'
import { DEFAULT_REFERER } from '../../routes'
import { getHsrRegion } from './hsr.helper'
import { GamesEnum, Hoyolab, IGame } from '../hoyolab'
import { HSRRecordModule } from './record'

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
   */
  readonly daily: DailyModule

  /**
   * The Redeem module for the Honkai Star Rail game.
   *
   */
  readonly redeem: RedeemModule

  /**
   * The `HSRRecordModule` object provides an interface to interact with the user record feature in Honkai Star Rails.
   *
   */
  readonly record: HSRRecordModule

  /**
   * The cookie used for authentication.
   *
   */
  readonly cookie: ICookie

  /**
   * The request object used to make HTTP requests.
   *
   */
  private request: HTTPRequest

  /**
   * HoyYolab account object
   *
   */
  private _account: IGame | null = null

  /**
   * The UID of the Honkai Star Rail account.
   *
   */
  readonly uid: number | null

  /**
   * The region of the Honkai Star Rail account.
   *
   */
  readonly region: string | null

  /**
   * The language of the Honkai Star Rail account.
   *
   */
  private lang: LanguageEnum

  /**
   * Create a new instance of HonkaiStarRail.
   *
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

    // Parse language to prevent language error
    options.lang = Language.parseLang(options.lang)

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
      this.region,
    )
    this.redeem = new RedeemModule(
      this.request,
      this.lang,
      GamesEnum.HONKAI_STAR_RAIL,
      this.region,
      this.uid,
    )
    this.record = new HSRRecordModule(
      this.request,
      this.lang,
      this.region,
      this.uid,
    )
  }

  /**
   * Create a new instance of HonkaiStarRail using a Hoyolab account.
   * If `uid` is not provided in the `options`, the account with the highest level will be used.
   *
   * @param {IHsrOptions} options - The options for the HonkaiStarRail instance.
   * @returns {Promise<HonkaiStarRail>} - A promise that resolves with a new HonkaiStarRail instance.
   *
   * @remarks
   * If an object is instantiated from this method but options.cookie.cookieTokenV2 is not set,
   * it will throw an error. This method will access an Endpoint that contains a list of game accounts,
   * which requires the cookieTokenV2 option.
   *
   * @remarks
   * Because CookieTokenV2 has a short expiration time and cannot be refreshed so far.
   * It is evident that every few days, when logging in, it always requests authentication first.
   * Therefore, this method that uses CookieTokenV2 is not suitable if filled statically.
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
   * Setter for the account property. Prevents from changing the value once set
   * @param game The game object to set as the account.
   */
  public set account(game: IGame | null) {
    if (this.account === null && game !== null) {
      this._account = game
    }
  }

  /**
   * Getter for the account property.
   * @returns {IGame | null} The current value of the account property.
   */
  public get account(): IGame | null {
    return this._account
  }

  /**
   * Retrieves daily information.
   *
   * @alias {@link DailyModule.info | DailyModule.info }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.info() } instead
   */
  dailyInfo() {
    /* c8 ignore next 3 */
    return this.daily.info()
  }

  /**
   *
   * @alias {@link DailyModule.rewards | DailyModule.rewards }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.rewards() } instead
   */
  dailyRewards() {
    /* c8 ignore next 3 */
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
    /* c8 ignore next 3 */
    return this.daily.reward(day)
  }

  /**
   * Claim current reward
   *
   * @alias {@link DailyModule.claim | DailyModule.claim }
   * @deprecated Use through { @link HonkaiStarRail.daily | HonkaiStarRail.daily.claim() } instead
   */
  dailyClaim() {
    /* c8 ignore next 3 */
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
    /* c8 ignore next 3 */
    return this.redeem.claim(code)
  }
}
