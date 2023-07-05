import { HoyoAPIError } from '../../../error'
import { LanguageEnum } from '../../../language'
import { HTTPRequest } from '../../../request'
import {
  HI_RECORD_ABYSS_API,
  HI_RECORD_ARENA_API,
  HI_RECORD_CHARACTER_API,
  HI_RECORD_ELYSIAN_API,
  HI_RECORD_INDEX_API,
} from '../../../routes'
import {
  IHIAbyss,
  IHIArena,
  IHICharacter,
  IHICharacters,
  IHIElysian,
  IHIRecord,
} from './interfaces'

/**
 * HIRecordModule class provides methods to interact with Honkai Impact record module endpoints.
 *
 * @class
 * @internal
 * @category Module
 */
export class HIRecordModule {
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
   * Retrieves the records associated with the provided region and UID.
   *
   * @returns {Promise<IHIRecord>} A Promise that resolves to the HI record object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async records(): Promise<IHIRecord> {
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
      params,
      body,
      headers,
    } = await this.request.send(HI_RECORD_INDEX_API)

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

    return res.data as IHIRecord
  }

  /**
   * Retrieves the characters associated with the provided region and UID.
   *
   * @returns {Promise<IHICharacter[]>} A Promise that resolves to an array of HI characters.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   */
  async characters(): Promise<IHICharacter[]> {
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
      params,
      body,
      headers,
    } = await this.request.send(HI_RECORD_CHARACTER_API)

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

    return (res.data as IHICharacters).characters
  }

  /**
   * Retrieves the abyss information associated with the provided region and UID.
   *
   * @returns {Promise<IHIAbyss>} A Promise that resolves to the HI abyss information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   *
   * @beta
   * @remarks
   * This method is still in beta, as the response obtained from the server is not yet complete.
   * If you would like to contribute, please send a more complete response by creating a pull request.
   */
  async abyss(): Promise<IHIAbyss> {
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
      params,
      body,
      headers,
    } = await this.request.send(HI_RECORD_ABYSS_API)

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

    return res.data as IHIAbyss
  }

  /**
   * Retrieves the arena information associated with the provided region and UID.
   *
   * @returns {Promise<IHIArena>} A Promise that resolves to the HI arena information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   *
   * @beta
   * @remarks
   * This method is still in beta, as the response obtained from the server is not yet complete.
   * If you would like to contribute, please send a more complete response by creating a pull request.
   */
  async arena(): Promise<IHIArena> {
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
      params,
      body,
      headers,
    } = await this.request.send(HI_RECORD_ARENA_API)

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

    return res.data as IHIArena
  }

  /**
   * Retrieves the elysian information associated with the provided region and UID.
   *
   * @returns {Promise<IHIElysian>} A Promise that resolves to the HI elysian information object.
   * @throws {HoyoAPIError} if the region or UID parameters are missing or failed to be filled.
   * @throws {HoyoAPIError} if failed to retrieve data, please double-check the provided UID.
   *
   * @beta
   * @remarks
   * This method is still in beta, as the response obtained from the server is not yet complete.
   * If you would like to contribute, please send a more complete response by creating a pull request.
   */
  async elysian(): Promise<IHIElysian> {
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
      params,
      body,
      headers,
    } = await this.request.send(HI_RECORD_ELYSIAN_API)

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

    return res.data as IHIElysian
  }
}
