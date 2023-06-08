import test from 'ava'
import { cookie } from './setup'
import { Cookie, HonkaiStarRail } from '../../src'

test('HonkaiStarRail.constructor() should be able to handle cookie string', async (t) => {
  const cookieString = Cookie.parseCookie(cookie)

  const gi = new HonkaiStarRail({
    cookie: cookieString,
  })

  t.deepEqual(gi.cookie, Cookie.parseCookieString(cookieString))
})
