import { HoyoAPIError } from '../../../error'
import { LanguageEnum } from '../../../language'
import { HTTPRequest } from '../../../request'
import {
  GENSHIN_TCG_BASICINFO,
  GENSHIN_TCG_CARDLIST,
  GENSHIN_TCG_CHALLANGE_RECORD,
  GENSHIN_TCG_CHALLANGE_SCHEDULE,
  GENSHIN_TCG_MATCHLIST,
} from '../../../routes'
import {
  IGenshinTCGBasicInfo,
  IGenshinTCGCards,
  IGenshinTCGMatchs,
  IGenshinTCGRecord,
  IGenshinTCGSchedule,
} from './tcg.interface'

export class GenshinTCGModule {
  constructor(
    private request: HTTPRequest,
    private lang: LanguageEnum,
    private region: string | null,
    private uid: number | null,
  ) {}

  async basicInfo() {
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)

    const res = await this.request.send(GENSHIN_TCG_BASICINFO)

    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        res.message ??
          'Failed to retrieve data, please double-check the provided UID.',
        res.retcode,
      )
    }

    return res.data as IGenshinTCGBasicInfo
  }

  async cards() {
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

      const res = await this.request.send(GENSHIN_TCG_CARDLIST)

      if (res.retcode !== 0) {
        throw new HoyoAPIError(
          res.message ??
            'Failed to retrieve data, please double-check the provided UID.',
          res.retcode,
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

  async matchs() {
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)

    const res = await this.request.send(GENSHIN_TCG_MATCHLIST)

    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        res.message ??
          'Failed to retrieve data, please double-check the provided UID.',
        res.retcode,
      )
    }

    return res.data as IGenshinTCGMatchs
  }

  async challengeSchedule() {
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)

    const res = await this.request.send(GENSHIN_TCG_CHALLANGE_SCHEDULE)

    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        res.message ??
          'Failed to retrieve data, please double-check the provided UID.',
        res.retcode,
      )
    }

    return res.data as IGenshinTCGSchedule
  }

  async challengeRecord() {
    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        lang: this.lang,
      })
      .setDs(true)

    const res = await this.request.send(GENSHIN_TCG_CHALLANGE_RECORD)

    if (res.retcode !== 0) {
      throw new HoyoAPIError(
        res.message ??
          'Failed to retrieve data, please double-check the provided UID.',
        res.retcode,
      )
    }

    return res.data as IGenshinTCGRecord
  }
}
