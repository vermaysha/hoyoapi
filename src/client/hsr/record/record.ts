import { HoyoAPIError } from '../../../error'
import { LanguageEnum } from '../../../language'
import { HTTPRequest } from '../../../request'
import {
  HSR_RECORD_CHARACTER_API,
  HSR_RECORD_FORGOTTEN_HALL_API,
  HSR_RECORD_INDEX_API,
  HSR_RECORD_NOTE_API,
} from '../../../routes'
import {
  IHSRCharacterFull,
  IHSRForgottenHall,
  IHSRNote,
  IHSRRecord,
} from './interfaces'
import { ForgottenHallScheduleEnum } from './record.enum'

/**
 * HSRRecordModule class provides methods to interact with Honkai Star Rail record module endpoints.
 *
 * @class
 * @internal
 * @category Module
 */
export class HSRRecordModule {
  /**
   * Creates an instance of HSRRecordModule.
   *
   * @param request The HTTPRequest object used for making API requests.
   * @param lang The language enum value.
   * @param region The region string or null if not provided.
   * @param uid The UID number or null if not provided.
   */
  constructor(
    private request: HTTPRequest,
    private lang: LanguageEnum,
    private region: string | null,
    private uid: number | null,
  ) {}

  /**
   * Retrieves the characters associated with the provided region and UID.
   *
   * @returns {Promise<IHSRCharacterFull[]>} A Promise that resolves to an array of full HSR characters.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async characters(): Promise<IHSRCharacterFull[]> {
    if (!this.region || !this.uid) {
      throw new HoyoAPIError('UID parameter is missing or failed to be filled')
    }

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
      params,
      headers,
    } = await this.request.send(HSR_RECORD_CHARACTER_API)

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

    const data = res.data as any
    return data.avatar_list as IHSRCharacterFull[]
  }

  /**
   * Retrieves the records associated with the provided region and UID.
   *
   * @returns {Promise<IHSRRecord>} A Promise that resolves to the HSR record object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async records(): Promise<IHSRRecord> {
    if (!this.region || !this.uid) {
      throw new HoyoAPIError('UID parameter is missing or failed to be filled')
    }

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
      params,
      headers,
    } = await this.request.send(HSR_RECORD_INDEX_API)

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

    return res.data as IHSRRecord
  }

  /**
   * Retrieves the note associated with the provided region and UID.
   *
   * @returns {Promise<IHSRNote>} A Promise that resolves to the HSR note object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async note(): Promise<IHSRNote> {
    if (!this.region || !this.uid) {
      throw new HoyoAPIError('UID parameter is missing or failed to be filled')
    }

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
      params,
      headers,
    } = await this.request.send(HSR_RECORD_NOTE_API)

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

    return res.data as IHSRNote
  }

  /**
   * Retrieves the forgotten hall information associated with the provided region and UID.
   *
   * @param scheduleType The schedule type for the forgotten hall (optional, defaults to CURRENT).
   * @returns {Promise<IHSRForgottenHall>} A Promise that resolves to the forgotten hall information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if the given scheduleType parameter is invalid.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async forgottenHall(
    scheduleType: ForgottenHallScheduleEnum = ForgottenHallScheduleEnum.CURRENT,
  ): Promise<IHSRForgottenHall> {
    if (!this.region || !this.uid) {
      throw new HoyoAPIError('UID parameter is missing or failed to be filled')
    }

    if (
      Object.values(ForgottenHallScheduleEnum).includes(scheduleType) === false
    ) {
      throw new HoyoAPIError('The given scheduleType parameter is invalid !')
    }

    this.request
      .setQueryParams({
        server: this.region,
        role_id: this.uid,
        schedule_type: scheduleType,
        lang: this.lang,
        need_all: 'true',
      })
      .setDs()

    const {
      response: res,
      body,
      params,
      headers,
    } = await this.request.send(HSR_RECORD_FORGOTTEN_HALL_API)

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

    return res.data as IHSRForgottenHall
  }
}
