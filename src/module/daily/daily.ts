import { GamesEnum } from '../../client/hoyolab'
import { LanguageEnum } from '../../language'
import { HTTPRequest } from '../../request'
import { DAILY_CLAIM_API, DAILY_INFO_API, DAILY_REWARD_API } from '../../routes'
import {
  IDailyClaim,
  IDailyInfo,
  IDailyReward,
  IDailyRewards,
} from './daily.interface'
import { HoyoAPIError } from '../../error'

/**
 * DailyModule class provides methods to interact with Genshin Impact's daily module endpoints.
 *
 * @class
 * @internal
 * @category Module
 */
export class DailyModule {
  private dailyInfoUrl: string
  private dailyRewardUrl: string
  private dailySignUrl: string

  constructor(
    private request: HTTPRequest,
    private lang: LanguageEnum,
    private game: GamesEnum,
    private region: string | null,
  ) {
    this.dailyInfoUrl = DAILY_INFO_API(game)
    this.dailyRewardUrl = DAILY_REWARD_API(game)
    this.dailySignUrl = DAILY_CLAIM_API(game)
  }

  /**
   * Retrieves daily information.
   *
   * @returns {Promise<IDailyInfo>} A promise that resolves to an IDailyInfo object.
   */
  async info(): Promise<IDailyInfo> {
    this.request
      .setQueryParams({
        lang: this.lang,
      })
      .setLang(this.lang)

    const res: IDailyInfo = (await this.request.send(this.dailyInfoUrl)).data as IDailyInfo

    if (typeof res?.first_bind === 'undefined') {
      res.first_bind = false
    }

    if (typeof res.month_last_day === 'undefined') {
      const today = new Date()
      const lastDayOfMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      ).getDate()

      res.month_last_day = today.getDate() === lastDayOfMonth
    }

    if (typeof res.sign_cnt_missed === 'undefined') {
      res.sign_cnt_missed = 0
    }

    if (typeof res.short_sign_day === 'undefined') {
      res.short_sign_day = 0
    }

    if (res.region === '' && this.region) {
      res.region = this.region
    }

    return res
  }

  /**
   * Retrieve daily rewards information.
   *
   * @returns {Promise<IDailyRewards>} A promise that resolves to an IDailyRewards object.
   */
  async rewards(): Promise<IDailyRewards> {
    this.request
      .setQueryParams({
        lang: this.lang,
      })
      .setLang(this.lang)

    const res: any = (await this.request.send(this.dailyRewardUrl)).data

    if (typeof res.now === 'undefined') {
      res.now = Math.round(new Date().getTime() / 1000).toString()
    }

    if (this.game === GamesEnum.GENSHIN_IMPACT) {
      res.biz = 'hk4e'
    } else if (this.game === GamesEnum.HONKAI_IMPACT) {
      res.biz = 'hk4e'
    } else if (this.game === GamesEnum.HONKAI_STAR_RAIL) {
      res.biz = 'hkrpg'
      /* c8 ignore next 3 */
    } else {
      res.biz = ''
    }
    /* c8 ignore next 3 */

    if (typeof res.resign === 'undefined') {
      res.resign = false
    }

    return res as IDailyRewards
  }

  /**
   * Get the daily reward for a specific day or the current day
   *
   * @param {number | null} day - The day to retrieve the reward for. If null, retrieve the reward for the current day.
   * @returns {Promise<IDailyReward>} - A promise that resolves with the daily reward for the specified day or the current day
   * @throws {HoyoAPIError} - If the specified day is not a valid date in the current month or if the reward for the specified day is undefined.
   */
  async reward(day: number | null = null): Promise<IDailyReward> {
    const response = await this.rewards()

    if (day === null) {
      /* c8 ignore start */
      const now = response?.now
        ? new Date(parseInt(response.now) * 1000)
        : new Date()
      day = now.getDate()
      /* c8 ignore stop */
    }

    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    if (
      !(day > 0 && day <= daysInMonth) ||
      typeof response.awards[day - 1] === undefined
    ) {
      throw new HoyoAPIError(`${day} is not a valid date in this month.`)
    }

    return {
      month: response.month,
      now: response.now,
      biz: response.biz,
      resign: response.resign,
      award: response.awards[day - 1],
    }
  }

  /**
   * Claim the daily rewards.
   *
   * @returns {Promise<IDailyClaim>} The claim information.
   */
  async claim(): Promise<IDailyClaim> {
    this.request
      .setQueryParams({
        lang: this.lang,
      })
      .setLang(this.lang)

    const response = await this.request.send(this.dailySignUrl, 'POST')

    const info = await this.info()
    const reward = await this.reward()

    /* c8 ignore start */
    if (response.retcode === -5003) {
      return {
        status: response.message,
        code: -5003,
        reward,
        info,
      }
    }

    if (
      (response.data as IDailyClaim | undefined)?.code
        .toString()
        .toLowerCase() === 'ok' &&
      response.retcode === 0
    ) {
      return {
        status: response.message,
        code: 0,
        reward,
        info,
      }
    }

    return {
      status: response.message,
      code: response.retcode,
      reward: null,
      info,
    }
    /* c8 ignore start */
  }
}
