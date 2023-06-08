import test from 'ava'
import { cookie } from './setup'
import { Cookie, GenshinImpact } from '../../src'

test('GenshinImpact.constructor() should be able to handle cookie string', async (t) => {
  const cookieString = Cookie.parseCookie(cookie)

  const gi = new GenshinImpact({
    cookie: cookieString,
  })

  t.deepEqual(gi.cookie, Cookie.parseCookieString(cookieString))
})
