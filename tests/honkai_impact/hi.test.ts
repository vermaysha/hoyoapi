import test from 'ava'
import { cookie } from './setup'
import { Cookie, HonkaiImpact } from '../../src'

test('HonkaiImpact.constructor() should be able to handle cookie string', async (t) => {
  const cookieString = Cookie.parseCookie(cookie)

  const gi = new HonkaiImpact({
    cookie: cookieString,
  })

  t.deepEqual(gi.cookie, Cookie.parseCookieString(cookieString))
})
