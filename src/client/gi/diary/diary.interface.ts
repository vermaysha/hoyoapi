/**
 * Interface representing the base structure of a Genshin diary.
 */
export interface IGenshinDiaryBase {
  /**
   * The unique identifier of the diary.
   */
  uid: number
  /**
   * The region of the diary.
   */
  region: string
  /**
   * The nickname associated with the diary.
   */
  nickname: string
  /**
   * An array of optional months for the diary.
   */
  optional_month: number[]
  /**
   * The current month's data for the diary.
   */
  data_month: number
}

/**
 * Interface representing additional information for a Genshin diary.
 * @extends {IGenshinDiaryBase}
 */
export interface IGenshinDiaryInfo extends IGenshinDiaryBase {
  /**
   * The month of the diary.
   */
  month: number
  /**
   * The data for the current month.
   */
  month_data: {
    /**
     * The current number of primogems.
     */
    current_primogems: number
    /**
     * The current amount of mora.
     */
    current_mora: number
    /**
     * The number of primogems from last month.
     */
    last_primogems: number
    /**
     * The amount of mora from last month.
     */
    last_mora: number
    /**
     * The rate of primogems earned.
     */
    primogem_rate: number
    /**
     * The rate of mora earned.
     */
    mora_rate: number
    /**
     * An array of grouped actions.
     */
    group_by: {
      /**
       * The action ID.
       */
      action_id: number
      /**
       * The action name.
       */
      action: string
      /**
       * The number of actions performed.
       */
      num: number
      /**
       * The percentage of actions performed.
       */
      percent: number
    }[]
  }
  /**
   * The data for the current day.
   */
  day_data: {
    /**
     * The current number of primogems.
     */
    current_primogems: number
    /**
     * The current amount of mora.
     */
    current_mora: number
  }
}

/**
 * Interface representing the history of a Genshin diary.
 */
export interface IGenshinDiaryHistory {
  /**
   * The ID of the action.
   */
  action_id: number
  /**
   * The name of the action.
   */
  action: string
  /**
   * The time the action was performed.
   */
  time: string
  /**
   * The number of times the action was performed.
   */
  num: number
}

/**
 * Interface representing detailed information for a Genshin diary.
 * @extends {IGenshinDiaryBase}
 */
export interface IGenshinDiaryDetail extends IGenshinDiaryBase {
  /**
   * The current page of the diary.
   */
  current_page: number
  /**
   * An array of history objects.
   */
  list: IGenshinDiaryHistory[]
}

const currentMonth = new Date().getMonth()
const oneMonthAgo = new Date()
oneMonthAgo.setMonth(currentMonth - 1)
const twoMonthAgo = new Date()
twoMonthAgo.setMonth(currentMonth - 2)

/**
 * Enum for diary months.
 * @readonly
 * @enum {number}
 */
export enum DiaryMonthEnum {
  /**
   * Current month
   */
  CURRENT = currentMonth + 1,
  /**
   * One month ago
   */
  ONE_MONTH_AGO = oneMonthAgo.getMonth() + 1,
  /**
   * Two months ago
   */
  TWO_MONTH_AGO = twoMonthAgo.getMonth() + 1,
}

/**
 * Enum for diary rewards.
 * @readonly
 * @enum {number}
 */
export enum DiaryEnum {
  /**
   * Primogems reward
   */
  PRIMOGEMS = 1,
  /**
   * Mora reward
   */
  MORA = 2,
}
