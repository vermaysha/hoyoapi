import { Cookie, ICookie } from '../../cookie'
import { Language, LanguageEnum } from '../../language'
import { DailyModule } from '../../module/daily'
import { RedeemModule } from '../../module/redeem'
import { HTTPRequest } from '../../request'
import { IHi3Options } from './hi.interface'
import { DEFAULT_REFERER } from '../../routes'
import { getHi3Region } from './hi.helper'
import { GamesEnum, Hoyolab, IGame } from '../hoyolab'

/**
 * Class representing the Honkai Impact 3rd game.
 *
 * @public
 * @class
 * @category Main
 */
export class HonkaiImpact {
  /**
   * The Daily module for the Honkai Impact 3rd game.
   *
   * @public
   * @readonly
   */
  readonly daily: DailyModule

  /**
   * The Redeem module for the Honkai Impact 3rd game.
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
   * The UID of the Honkai Impact 3rd account.
   *
   * @public
   */
  public uid: number | null

  /**
   * The region of the Honkai Impact 3rd account.
   *
   * @public
   */
  public region: string | null

  /**
   * The language of the Honkai Impact 3rd account.
   *
   * @public
   */
  public lang: LanguageEnum

  /**
   * Create a new instance of HonkaiImpact.
   *
   * @public
   * @constructor
   * @param {IHi3Options} options - The options for the HonkaiImpact instance.
   */
  constructor(options: IHi3Options) {
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
    this.region = this.uid !== null ? getHi3Region(this.uid) : null
    this.lang = options.lang

    this.daily = new DailyModule(
      this.request,
      this.lang,
      GamesEnum.HONKAI_IMPACT,
      this.region,
    )
    this.redeem = new RedeemModule(
      this.request,
      this.lang,
      GamesEnum.HONKAI_IMPACT,
      this.region,
      this.uid,
    )
  }

  /**
   * Create a new instance of HonkaiImpact using a Hoyolab account.
   * If `uid` is not provided in the `options`, the account with the highest level will be used.
   *
   * @public
   * @static
   * @param {IHi3Options} options - The options for the HonkaiImpact instance.
   * @returns {Promise<HonkaiImpact>} - A promise that resolves with a new HonkaiImpact instance.
   */
  static async create(options: IHi3Options): Promise<HonkaiImpact> {
    let game: IGame | null = null
    if (typeof options.uid === 'undefined') {
      const hoyolab = new Hoyolab({
        cookie: options.cookie,
      })

      game = await hoyolab.gameAccount(GamesEnum.HONKAI_IMPACT)
      options.uid = parseInt(game.game_uid)
      options.region = getHi3Region(parseInt(game.game_uid))
    }
    const hi = new HonkaiImpact(options)
    hi.account = game
    return hi
  }

  /**
   * Retrieves daily information.
   *
   * @alias {@link DailyModule.info | DailyModule.info }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.info() } instead
   */
  dailyInfo() {
    return this.daily.info()
  }

  /**
   *
   * @alias {@link DailyModule.rewards | DailyModule.rewards }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.rewards() } instead
   */
  dailyRewards() {
    return this.daily.rewards()
  }

  /**
   * Fetch reward from daily login based on day
   *
   * @param day number | null
   * @alias {@link DailyModule.reward | DailyModule.reward }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.reward() } instead
   */
  dailyReward(day: number | null = null) {
    return this.daily.reward(day)
  }

  /**
   * Claim current reward
   *
   * @alias {@link DailyModule.claim | DailyModule.claim }
   * @deprecated Use through { @link HonkaiImpact.daily | HonkaiImpact.daily.claim() } instead
   */
  dailyClaim() {
    return this.daily.claim()
  }

  /**
   * Redeem Code
   *
   * @param code string
   * @alias {@link RedeemModule.claim | RedeemModule.claim }
   * @deprecated Use through { @link HonkaiImpact.redeem | HonkaiImpact.redeem.claim() } instead
   */
  redeemCode(code: string) {
    return this.redeem.claim(code)
  }
}
