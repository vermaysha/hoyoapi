import { ICookie } from './cookie.interface'
import { toSnakeCase, toCamelCase } from './cookie.helper'
import { Language } from '../language'
import { HoyoAPIError } from '../error'

/**
 * Represents a cookie object.
 *
 * @class
 * @category Main
 */
export class Cookie {
  /**
   * Parses a cookie string and returns a parsed ICookie object.
   *
   * @param cookieString - The cookie string to be parsed.
   * @returns {string} - A parsed ICookie object.
   * @throws {HoyoAPIError} when ltuid or ltoken keys are not found in the cookie string.
   */
  static parseCookieString(cookieString: string): ICookie {
    const cookies: Map<string, any> = new Map()

    const keys: string[] = [
      'ltoken_v2',
      'ltuid_v2',
      'account_id',
      'cookie_token',
      'account_id_v2',
      'account_mid_v2',
      'cookie_token_v2',
      'mi18nLang',
    ]

    cookieString.split('; ').forEach((cookie) => {
      const cookieSplited = cookie.trim().split(/=(?=.+)/)

      /* c8 ignore next 3 */
      if (keys.includes(cookieSplited[0]) === false) {
        return
      }

      const key = toCamelCase(cookieSplited[0]).trim()
      const val = decodeURIComponent(cookieSplited[1]).replace(';', '').trim()

      cookies.set(key, val)

      if (['ltuid_v2', 'account_id', 'account_id_v2'].includes(cookieSplited[0])) {
        cookies.set(key, parseInt(cookies.get(key), 10))
      } else if (cookieSplited[0] === 'mi18nLang') {
        cookies.set(key, Language.parseLang(cookies.get(key)))
      }
    })

    const ltuid = cookies.get('ltuidV2')
    const accountId = cookies.get('accountId')
    const accountIdV2 = cookies.get('accountIdV2')

    if (ltuid && !accountId) {
      cookies.set('accountId', ltuid)
    } else if (!ltuid && accountId) {
      cookies.set('ltuidV2', accountId)
    }

    if (!accountIdV2 && (accountId || ltuid) !== null) {
      cookies.set('accountIdV2', accountId || ltuid)
    }

    if (!cookies.get('ltokenV2') || !cookies.get('ltuidV2')) {
      throw new HoyoAPIError('Cookie key ltuid or ltoken doesnt exist !')
    }

    return Object.fromEntries(cookies) as ICookie
  }

  /**
   * Converts an `ICookie` object into a cookie string.
   * @param {ICookie} cookie - The `ICookie` object to convert.
   * @returns {string} A string representing the cookie.
   * @throws {HoyoAPIError} If the `ltuidV2` or `ltokenV2` key is missing in the `ICookie` object.
   */
  static parseCookie(cookie: ICookie): string {
    if (!cookie.accountId) {
      cookie.accountId = cookie.ltuidV2
    }

    const cookies = Object.entries(cookie)
      .map(([key, value]) => {
        /* c8 ignore next 3 */
        if (!value) {
          return undefined
        }

        if (
          [
            'cookieToken',
            'accountId',
            'cookieTokenV2',
            'accountIdV2',
            'accountMidV2',
          ].includes(key)
        ) {
          key = toSnakeCase(key)
        }
        return `${key}=${value}`
      })
      .filter((val) => {
        return val !== undefined
      })

    return cookies.join('; ')
  }
}
