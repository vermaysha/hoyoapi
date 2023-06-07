import { Language, LanguageEnum } from '@/language'
import { DailyModule } from '@/module/daily'
import { RedeemModule } from '@/module/redeem'
import { IGenshinOptions } from './gi.interface'
import { Cookie, ICookie } from '@/cookie'
import { HTTPRequest } from '@/request'
import { DEFAULT_REFERER } from '@/routes'
import { getGenshinRegion } from './gi.helper'
import { GamesEnum, Hoyolab, IGame } from '../hoyolab'

/**
 * The `Genshin` class provides an interface to interact with Genshin Impact-related features on the Mihoyo website.
 * It contains references to various modules such as `DailyModule`, `RedeemModule`, `RecordModule`, and `DiaryModule` which allow you to perform various operations related to these features.
 *
 * @class
 * @category Main
 */
export class GenshinImpact {
  /**
   * The `DailyModule` object provides an interface to interact with the daily check-in feature in Genshin Impact.
   *
   */
  readonly daily: DailyModule

  /**
   * The `RedeemModule` object provides an interface to interact with the code redemption feature in Genshin Impact.
   *
   */
  readonly redeem: RedeemModule

  /**
   * HoyYolab account object
   *
   * @public
   */
  public account: IGame | null = null

  /**
   * The cookie object to be used in requests.
   */
  readonly cookie: ICookie

  /**
   * The `Request` object used to make requests.
   */
  readonly request: HTTPRequest

  /**
   * The UID of the user, if available.
   */
  public uid: number | null

  /**
   * The region of the user, if available.
   */
  public region: string | null

  /**
   * The language to be used in requests.
   */
  public lang: LanguageEnum

  /**
   * Constructs a new `Genshin` object.
   * @param options The options object used to configure the object.
   * @param options.cookie The cookie string or object to be used in requests.
   * @param options.uid The UID of the user.
   * @param options.region The region of the user.
   * @param options.lang The language to be used in requests.
   */
  constructor(options: IGenshinOptions) {
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
    this.region = this.uid !== null ? getGenshinRegion(this.uid) : null
    this.lang = options.lang

    this.daily = new DailyModule(
      this.request,
      this.lang,
      GamesEnum.GENSHIN_IMPACT,
    )
    this.redeem = new RedeemModule(
      this.request,
      this.lang,
      GamesEnum.GENSHIN_IMPACT,
      this.region,
      this.uid,
    )
  }

  /**
   * Create a new instance of the GenshinImpact class asynchronously.
   *
   * @param options The options object used to configure the object.
   * @param options.cookie The cookie string or object to be used in requests.
   * @param options.lang The language to be used in requests.
   * @returns A promise that resolves with a new Genshin instance.
   */
  static async create(options: IGenshinOptions): Promise<GenshinImpact> {
    let game: IGame | null = null

    if (typeof options.uid === 'undefined') {
      const hoyolab = new Hoyolab({
        cookie: options.cookie,
      })

      game = await hoyolab.gameAccount(GamesEnum.GENSHIN_IMPACT)
      options.uid = parseInt(game.game_uid)
      options.region = getGenshinRegion(parseInt(game.game_uid))
    }

    const gi = new GenshinImpact(options)
    gi.account = game

    return gi
  }
}
