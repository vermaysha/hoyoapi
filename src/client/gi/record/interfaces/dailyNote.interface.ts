/**
 * Interface for Genshin Impact daily note.
 */
export interface IGenshinDailyNote {
  /**
   * Current resin.
   */
  current_resin: number

  /**
   * Maximum resin.
   */
  max_resin: number

  /**
   * Resin recovery time.
   */
  resin_recovery_time: string

  /**
   * Number of finished tasks.
   */
  finished_task_num: number

  /**
   * Total number of tasks.
   */
  total_task_num: number

  /**
   * Whether extra task reward is received or not.
   */
  is_extra_task_reward_received: boolean

  /**
   * Remaining resin discount number.
   */
  remain_resin_discount_num: number

  /**
   * Maximum resin discount number.
   */
  resin_discount_num_limit: number

  /**
   * Current expedition number.
   */
  current_expedition_num: number

  /**
   * Maximum expedition number.
   */
  max_expedition_num: number

  /**
   * List of expeditions.
   */
  expeditions: {
    /**
     * Avatar side icon.
     */
    avatar_side_icon: string

    /**
     * Expedition status.
     */
    status: 'Finished' | 'Ongoing'

    /**
     * Remaining time of the expedition.
     */
    remained_time: string
  }[]

  /**
   * Current home coin.
   */
  current_home_coin: number

  /**
   * Maximum home coin.
   */
  max_home_coin: number

  /**
   * Home coin recovery time.
   */
  home_coin_recovery_time: string

  /**
   * URL of calendar.
   */
  calendar_url: string

  /**
   * Transformer information.
   */
  transformer: {
    /**
     * Whether it is obtained or not.
     */
    obtained: boolean

    /**
     * Recovery time.
     */
    recovery_time: {
      /**
       * Days.
       */
      Day: number

      /**
       * Hours.
       */
      Hour: number

      /**
       * Minutes.
       */
      Minute: number

      /**
       * Seconds.
       */
      Second: number

      /**
       * Whether recovery time is reached or not.
       */
      reached: boolean
    }

    /**
     * URL of the wiki page.
     */
    wiki: string

    /**
     * Whether it is noticed or not.
     */
    noticed: boolean

    /**
     * Latest job ID.
     */
    latest_job_id: string
  }
}
