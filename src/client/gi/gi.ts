import { Language, LanguageEnum } from '../../language'
import { DailyModule } from '../../module/daily'
import { RedeemModule } from '../../module/redeem'
import { IGenshinOptions } from './gi.interface'
import { Cookie, ICookie } from '../../cookie'
import { HTTPRequest } from '../../request'
import { DEFAULT_REFERER } from '../../routes'
import { getGenshinRegion } from './gi.helper'
import { GamesEnum, Hoyolab, IGame } from '../hoyolab'
import { GenshinRecordModule, SpiralAbyssScheduleEnum } from './record'
import { DiaryEnum, GenshinDiaryModule, DiaryMonthEnum } from './diary'
import { HoyoAPIError } from '../../error'
import { GenshinTCGModule } from './tcg'

/**
 * The `Genshin` class provides an interface to interact with Genshin Impact-related features on the Mihoyo website.
 * It contains references to various modules such as `DailyModule`, `RedeemModule`, `GenshinRecordModule`, and `GenshinDiaryModule` which allow you to perform various operations related to these features.
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
   * The `GenshinRecordModule` object provides an interface to interact with the user record feature in Genshin Impact.
   *
   */
  readonly record: GenshinRecordModule

  /**
   * The `GenshinDiaryModule` object provides an interface to interact with the user diary feature in Genshin Impact.
   *
   */
  readonly diary: GenshinDiaryModule

  /**
   * The `GenshinTCGModule` object provides an interface to interact with the user diary feature in Genshin Impact.
   *
   */
  readonly tcg: GenshinTCGModule

  /**
   * HoyYolab account object
   *
   */
  private _account: IGame | null = null

  /**
   * The cookie object to be used in requests.
   */
  readonly cookie: ICookie

  /**
   * The `Request` object used to make requests.
   */
  private request: HTTPRequest

  /**
   * The UID of the user, if available.
   */
  readonly uid: number | null

  /**
   * The region of the user, if available.
   */
  readonly region: string | null

  /**
   * The language to be used in requests.
   */
  private lang: LanguageEnum

  /**
   * Constructs a new `Genshin` object.
   *
   * @param options The options object used to configure the object.
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

    // Parse language to prevent language error
    options.lang = Language.parseLang(options.lang)

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
      this.region,
    )
    this.redeem = new RedeemModule(
      this.request,
      this.lang,
      GamesEnum.GENSHIN_IMPACT,
      this.region,
      this.uid,
    )
    this.record = new GenshinRecordModule(
      this.request,
      this.lang,
      this.region,
      this.uid,
    )
    this.diary = new GenshinDiaryModule(
      this.request,
      this.lang,
      this.region,
      this.uid,
    )
    this.tcg = new GenshinTCGModule(
      this.request,
      this.lang,
      this.region,
      this.uid,
    )
  }

  /**
   * Create a new instance of the GenshinImpact class asynchronously.
   *
   * @param options The options object used to configure the object.
   * @throws {HoyoAPIError} Error Wnen the CookieTokenV2 is not set.
   * @returns {Promise<GenshinImpact>} A promise that resolves with a new Genshin instance.
   *
   * @remarks
   * If an object is instantiated from this method but options.cookie.cookieTokenV2 is not set,
   * it will throw an error. This method will access an Endpoint that contains a list of game accounts,
   * which requires the cookieTokenV2 option.

   * @remarks
   * Because CookieTokenV2 has a short expiration time and cannot be refreshed so far.
   * It is evident that every few days, when logging in, it always requests authentication first.
   * Therefore, this method that uses CookieTokenV2 is not suitable if filled statically.
   */
  static async create(options: IGenshinOptions): Promise<GenshinImpact> {
    try {
      let game: IGame | null = null

      if (typeof options.uid === 'undefined') {
        const hoyolab = new Hoyolab({
          cookie: options.cookie,
        })

        game = await hoyolab.gameAccount(GamesEnum.GENSHIN_IMPACT)
        options.uid = parseInt(game.game_uid)
      }

      const gi = new GenshinImpact(options)
      gi.account = game
      return gi
    } catch (error: any) {
      throw new HoyoAPIError(error.message, error.code)
    }
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
   * Get user's Genshin Impact record
   *
   * @alias {@link GenshinImpact.record | Genshin.record.records()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.records()} instead
   */
  async records() {
    return this.record.records()
  }

  /**
   * Retrieves the Genshin characters of the user.
   *
   * @alias {@link GenshinImpact.record | Genshin.record.characters()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.characters()} instead
   */
  async characters() {
    return this.record.characters()
  }

  /**
   * Returns the summary information of Genshin Impact game characters
   *
   * @param characterIds number[] Characters ID
   * @alias {@link GenshinImpact.record | Genshin.record.charactersSummary()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.charactersSummary()} instead
   */
  async charactersSummary(characterIds: number[]) {
    return this.record.charactersSummary(characterIds)
  }

  /**
   * Retrieves information about the player's performance in the Spiral Abyss.
   *
   * @param scheduleType SpiralAbyssScheduleEnum
   * @alias {@link GenshinImpact.record | Genshin.record.spiralAbyss()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.spiralAbyss()} instead
   */
  async spiralAbyss(
    scheduleType: SpiralAbyssScheduleEnum = SpiralAbyssScheduleEnum.CURRENT,
  ) {
    return this.record.spiralAbyss(scheduleType)
  }

  /**
   * Retrieve the daily note information for a Genshin Impact user.
   *
   * @alias {@link GenshinImpact.record | Genshin.record.dailyNote()}
   * @deprecated Use through {@link GenshinImpact.record | Genshin.record.dailyNote()} instead
   */
  async dailyNote() {
    return this.record.dailyNote()
  }

  /**
   * Returns the diary information of a given month for a user
   *
   * @param month
   * @alias {@link GenshinImpact.diary | Genshin.diary.list()}
   * @deprecated Use through {@link GenshinImpact.diary | Genshin.diary.list()} instead
   */
  async diaryList(month: DiaryMonthEnum = DiaryMonthEnum.CURRENT) {
    return this.diary.list(month)
  }

  /**
   * Returns the diary details of a given type and month for a user
   *
   * @param type DiaryEnum
   * @param month DiaryMonthEnum
   * @alias {@link GenshinImpact.diary | Genshin.diary.detail()}
   * @deprecated Use through {@link GenshinImpact.diary | Genshin.diary.detail()} instead
   */
  async diaryDetail(
    type: DiaryEnum,
    month: DiaryMonthEnum = DiaryMonthEnum.CURRENT,
  ) {
    return this.diary.detail(type, month)
  }

  /**
   * Retrieves daily information.
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.info()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.info()} instead
   */
  dailyInfo() {
    return this.daily.info()
  }

  /**
   * Retrieve daily rewards information.
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.rewards()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.rewards()} instead
   */
  dailyRewards() {
    return this.daily.rewards()
  }

  /**
   * Get the daily reward for a specific day or the current day
   *
   * @param day number | null
   * @alias {@link GenshinImpact.daily | Genshin.daily.reward()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.reward()} instead
   */
  dailyReward(day: number | null = null) {
    return this.daily.reward(day)
  }

  /**
   * Claim current reward
   *
   * @alias {@link GenshinImpact.daily | Genshin.daily.claim()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.daily.claim()} instead
   */
  dailyClaim() {
    return this.daily.claim()
  }

  /**
   * Redeems a code for a specific account.
   *
   * @param code string
   * @alias {@link GenshinImpact.daily | Genshin.redeem.claim()}
   * @deprecated Use through {@link GenshinImpact.daily | Genshin.redeem.claim()} instead
   */
  redeemCode(code: string) {
    return this.redeem.claim(code)
  }
}
