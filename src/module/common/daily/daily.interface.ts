/**
 * Interface representing a daily award item.
 */
export interface IDailyAwardItem {
  /**
   * The icon of the award item.
   */
  icon: string

  /**
   * The name of the award item.
   */
  name: string

  /**
   * The count of the award item.
   */
  cnt: number
}

/**
 * Interface representing a daily information .
 */
export interface IDailyInfo {
  /**
   * The total number of days the user has signed in.
   */
  total_sign_day: number

  /**
   * The current date in YYYY-MM-DD format.
   */
  today: string

  /**
   * Whether the user has signed in today.
   */
  is_sign: boolean

  /**
   * Whether this is the user's first time signing in.
   */
  first_bind: boolean

  /**
   * Whether the user has subscribed to the game.
   */
  is_sub: boolean

  /**
   * The region of the user's game account.
   */
  region: string

  /**
   * Whether today is the last day of the current month.
   */
  month_last_day: boolean

  short_sign_day: number

  sign_cnt_missed: number
}

/**
 * An object describing a daily reward.
 */
export interface IDailyReward {
  /**
   * The month number in which the reward is available.
   */
  month: number

  /**
   * Whether the user can resign for the reward.
   */
  resign: boolean

  /**
   * The current date in string format.
   */
  now: string

  /**
   * The business code of the reward.
   */
  biz: string

  /**
   * The award item associated with the reward.
   */
  award: IDailyAwardItem
}

/**
 * Represents daily rewards for a specific month.
 */
export interface IDailyRewards {
  /**
   * Represents daily rewards for a specific month.
   */
  month: number

  /**
   * Represents daily rewards for a specific month.
   */
  resign: boolean

  /**
   * The date of the reward in miliseconds.
   */
  now: string

  /**
   * The business name associated with the reward.
   */
  biz: string

  /**
   * An array of daily award items.
   */
  awards: IDailyAwardItem[]
}

/**
 * Interface representing the response data for claiming daily rewards.
 */
export interface IDailyClaim {
  /** The status of the claim request. */
  status: string
  /** The response code for the claim request. */
  code: number
  /** The claimed reward, if any. */
  reward: IDailyReward | null
  /** Information about the user's daily claim status. */
  info: IDailyInfo
}
