import test from 'ava'
import { Cookie, HoyoAPIError } from '../src'

test('parseCookie return should be valid', (t) => {
  const cookie = Cookie.parseCookie({
    ltokenV2: 'ltoken_v2',
    ltuidV2: 1,
    cookieToken: 'cookieToken',
    mi18nLang: 'id-id',
    cookieTokenV2: 'cookieTokenV2',
  })

  t.deepEqual(
    cookie,
    'ltoken_v2=ltoken; ltuid_v2=1; cookie_token=cookieToken; mi18nLang=id-id; cookie_token_v2=cookieTokenV2; account_id=1',
  )
})

test('parseCookieString return should be valid', (t) => {
  const cookieString = Cookie.parseCookieString(
    'ltoken_v2=ltokenV2; ltuid_v2=1; cookie_token=cookieToken; mi18nLang=id-id; cookie_token_v2=cookieTokenV2; account_id=1',
  )

  t.deepEqual(cookieString, {
    ltokenV2: 'ltokenV2',
    ltuidV2: 1,
    cookieToken: 'cookieToken',
    mi18nLang: 'id-id',
    cookieTokenV2: 'cookieTokenV2',
    accountIdV2: 1,
    accountId: 1,
  })
})

test('parseCookieString return should be valid when account_id is null', (t) => {
  const cookieString = Cookie.parseCookieString(
    'ltoken_v2=ltoken; ltuid_v2=1; cookie_token=cookieToken; cookie_token_v2=cookieTokenV2; mi18nLang=id-id',
  )

  t.deepEqual(cookieString, {
    ltokenV2: 'ltokenV2',
    ltuidV2: 1,
    cookieToken: 'cookieToken',
    mi18nLang: 'id-id',
    cookieTokenV2: 'cookieTokenV2',
    accountIdV2: 1,
    accountId: 1,
  })
})

test('parseCookieString return should be valid when ltuidV2 is null', (t) => {
  const cookieString = Cookie.parseCookieString(
    'ltoken_v2=ltokenV2; account_id=1; cookie_token_v2=cookieTokenV2; cookie_token=cookieToken; mi18nLang=id-id',
  )

  t.deepEqual(cookieString, {
    ltokenV2: 'ltokenV2',
    ltuid: 1,
    cookieToken: 'cookieToken',
    mi18nLang: 'id-id',
    accountId: 1,
    cookieTokenV2: 'cookieTokenV2',
    accountIdV2: 1,
  })
})

test('parseCookieString return should be throw errors', (t) => {
  t.throws(
    () => {
      Cookie.parseCookieString('mi18nLang=id-id')
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
