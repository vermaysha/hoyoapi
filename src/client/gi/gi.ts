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
