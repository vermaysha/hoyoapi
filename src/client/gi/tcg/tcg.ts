import { HoyoAPIError } from '../../../error'
import { LanguageEnum } from '../../../language'
import { HTTPRequest } from '../../../request'
import {
  GENSHIN_TCG_BASICINFO,
  GENSHIN_TCG_CARDLIST,
  GENSHIN_TCG_CHALLANGE_DECK,
  GENSHIN_TCG_CHALLANGE_RECORD,
  GENSHIN_TCG_CHALLANGE_SCHEDULE,
  GENSHIN_TCG_MATCHLIST,
} from '../../../routes'
import {
  IGenshinTCGBasicInfo,
  IGenshinTCGCards,
  IGenshinTCGDeck,
  IGenshinTCGMatchs,
  IGenshinTCGRecord,
  IGenshinTCGSchedule,
  IGenshinTCGScheduleBasic,
} from './tcg.interface'

/**
 * Represents a module for the Genshin Impact TCG.
 *
 * @class
 * @internal
 * @category Module
 */
export class GenshinTCGModule {
  /**
   * Creates an instance of the GenshinTCGModule.
   * @param request - The HTTP request object.
   * @param lang - The language enumeration for the module.
   * @param region - The region string or null.
   * @param uid - The UID number or null.
   */
  constructor(
    private request: HTTPRequest,
    private lang: LanguageEnum,
    private region: string | null,
    private uid: number | null,
  ) {}

  /**
   * Retrieves basic information for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGBasicInfo>} The Genshin Impact TCG basic information.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async basicInfo(): Promise<IGenshinTCGBasicInfo> {
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)

    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(GENSHIN_TCG_BASICINFO)

    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        res.message ??
          'Failed to retrieve data, please double-check the provided UID.',
        res.retcode,
        {
          response: res,
          request: {
            body,
            headers,
            params,
          },
        },
      )
    }

    return res.data as IGenshinTCGBasicInfo
  }

  /**
   * Retrieves the cards for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGCards>} The Genshin Impact TCG cards.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async cards(): Promise<IGenshinTCGCards> {
    const perPage = 100
    let next = true
    let offset = 0
    const cardLists: Partial<IGenshinTCGCards> = {}

    do {
      this.request
        .setQueryParams({
          server: this.region,
          role_id: this.uid,
          need_avatar: 'true',
          need_action: 'true',
          need_stats: 'true',
          offset,
          limit: perPage,
        })
        .setDs(true)

      const {
        response: res,
        body,
        headers,
        params,
      } = await this.request.send(GENSHIN_TCG_CARDLIST)

      if (res.retcode !== 0) {
        throw new HoyoAPIError(
          res.message ??
            'Failed to retrieve data, please double-check the provided UID.',
          res.retcode,
          {
            response: res,
            request: {
              body,
              headers,
              params,
            },
          },
        )
      }

      const data = res.data as IGenshinTCGCards

      next = data.is_last === false
      offset = data.next_offset

      cardLists.card_list = [...(cardLists.card_list ?? []), ...data.card_list]
      cardLists.is_last = data.is_last
      cardLists.next_offset = data.next_offset
      cardLists.stats = data.stats
    } while (next)

    return cardLists as IGenshinTCGCards
  }

  /**
   * Retrieves the match data for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGMatchs>} The Genshin Impact TCG match data.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async matchs(): Promise<IGenshinTCGMatchs> {
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)

    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(GENSHIN_TCG_MATCHLIST)

    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        res.message ??
          'Failed to retrieve data, please double-check the provided UID.',
        res.retcode,
        {
          response: res,
          request: {
            body,
            headers,
            params,
          },
        },
      )
    }

    return res.data as IGenshinTCGMatchs
  }

  /**
   * Retrieves the challenge schedule for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGScheduleBasic[]>} The Genshin Impact TCG challenge schedule.
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async challengeSchedule(): Promise<IGenshinTCGScheduleBasic[]> {
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)

    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(GENSHIN_TCG_CHALLANGE_SCHEDULE)

    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        res.message ??
          'Failed to retrieve data, please double-check the provided UID.',
        res.retcode,
        {
          response: res,
          request: {
            body,
            headers,
            params,
          },
        },
      )
    }

    return (res.data as IGenshinTCGSchedule).schedule_list
  }

  /**
   * Retrieves the challenge record for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGRecord>} The Genshin Impact TCG challenge record.
   * @param schedule_id Schedule ID from {@link GenshinTCGModule.challengeSchedule | GenshinTCGModule.challengeSchedule()}
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async challengeRecord(schedule_id: number): Promise<IGenshinTCGRecord> {
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
        schedule_id,
      })
      .setDs(true)

    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(GENSHIN_TCG_CHALLANGE_RECORD)

    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        res.message ??
          'Failed to retrieve data, please double-check the provided UID.',
        res.retcode,
        {
          response: res,
          request: {
            body,
            headers,
            params,
          },
        },
      )
    }

    return res.data as IGenshinTCGRecord
  }

  /**
   * Retrieves the challenge deck for the Genshin Impact TCG.
   *
   * @returns {Promise<IGenshinTCGDeck>} The Genshin Impact TCG challenge record.
   * @param schedule_id Schedule ID from {@link GenshinTCGModule.challengeSchedule | GenshinTCGModule.challengeSchedule()}
   * @param deck_id Deck ID from {@link GenshinTCGModule.challengeRecord | GenshinTCGModule.challengeRecord()}
   * @throws {HoyoAPIError} If there is an error retrieving the data.
   */
  async challangeDeck(
    schedule_id: number,
    deck_id: number,
  ): Promise<IGenshinTCGDeck> {
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
        schedule_id,
        deck_id,
      })
      .setDs(true)

    const {
      response: res,
      body,
      headers,
      params,
    } = await this.request.send(GENSHIN_TCG_CHALLANGE_DECK)

    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        res.message ??
          'Failed to retrieve data, please double-check the provided UID.',
        res.retcode,
        {
          response: res,
          request: {
            body,
            headers,
            params,
          },
        },
      )
    }

    return res.data as IGenshinTCGDeck
  }
}
