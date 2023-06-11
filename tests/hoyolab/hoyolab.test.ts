import test from 'ava'
import { cookie } from './setup'
import { Cookie, GamesEnum, Hoyolab, LanguageEnum } from '../../src'

const hoyolab = () => {
  return new Hoyolab({
    cookie: cookie,
    lang: LanguageEnum.ENGLISH,
  })
}

test('Hoyolab.constructor() should be able to handle cookie string', async (t) => {
  const cookieString = Cookie.parseCookie(cookie)

  const hoyolab = new Hoyolab({
    cookie: cookieString,
  })

  t.deepEqual(hoyolab.cookie, Cookie.parseCookieString(cookieString))
})

test('gamesList should be return valid response', async (t) => {
  const client = hoyolab()

  const games = async () => {
    return await client.gamesList(GamesEnum.GENSHIN_IMPACT)
  }

  const result = await games()

  result.forEach((res) => {
    t.is(typeof res.game_biz, 'string')
    t.is(typeof res.game_uid, 'string')
    t.is(typeof res.is_chosen, 'boolean')
    t.is(typeof res.is_official, 'boolean')
    t.is(typeof res.level, 'number')
    t.is(typeof res.nickname, 'string')
    t.is(typeof res.region, 'string')
    t.is(typeof res.region_name, 'string')
  })
})

test('gameAccount should be return valid response', async (t) => {
  const client = hoyolab()

  const games = async () => {
    return await client.gameAccount(GamesEnum.GENSHIN_IMPACT)
  }

  const result = await games()

  t.is(typeof result.game_biz, 'string')
  t.is(typeof result.game_uid, 'string')
  t.is(typeof result.is_chosen, 'boolean')
  t.is(typeof result.is_official, 'boolean')
  t.is(typeof result.level, 'number')
  t.is(typeof result.nickname, 'string')
  t.is(typeof result.region, 'string')
  t.is(typeof result.region_name, 'string')
})
