import test from 'ava'
import { cookie } from './setup'
import { Cookie, Hoyolab } from '../../src'

test('Hoyolab.constructor() should be able to handle cookie string', async (t) => {
  const cookieString = Cookie.parseCookie(cookie)

  const gi = new Hoyolab({
    cookie: cookieString,
  })

  t.deepEqual(gi.cookie, Cookie.parseCookieString(cookieString))
})
