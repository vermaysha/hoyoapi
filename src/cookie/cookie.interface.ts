import { LanguageEnum } from '../language'

/**
 * Defines the structure of a cookie object.
 *
 * @interface
 */
export interface ICookie {
  /**
   * The value of the "ltoken_v2" cookie.
   */
  ltokenV2: string

  /**
   * The value of the "ltuid_v2" cookie.
   */
  ltuidV2: number

  /**
   * The value of the "cookieToken" cookie, if it exists.
   */
  cookieToken?: string | null

  /**
   * The value of the "cookieTokenV2" cookie.
   * CookieTokenV2 has a short expiration time and, so far, cannot be refreshed, so it is best to avoid using methods that rely on CookieTokenV2.
   */
  cookieTokenV2?: string | null

  /**
   * The value of the "accountId" cookie, if it exists.
   */
  accountId?: number

  /**
   * The value of the "accountIdV2" cookie, if it exists.
   */
  accountIdV2?: number

  /**
   * The value of the "accountMidV2" cookie, if it exists.
   */
  accountMidV2?: string

  /**
   * The value of the "mi18nLang" cookie, if it exists.
   * This can be either a string or a LanguageEnum value.
   */
  mi18nLang?: LanguageEnum | string | null
}
