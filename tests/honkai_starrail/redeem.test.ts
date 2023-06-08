import test from 'ava'
import { hsr, cookie } from './setup'
import { HonkaiStarRail, HoyoAPIError } from '../../src'

test('redeem.claim() should return be valid', async (t) => {
  const client = await hsr()
  const res = await client.redeem.claim('STARRAILGIFT')

  if (res.data) {
    t.is(typeof res.data, 'string')
  } else {
    t.assert(res.data === null)
  }

  t.is(typeof res.message, 'string')
  t.is(typeof res.retcode, 'number')

  t.deepEqual(Object.keys(res).sort(), ['data', 'message', 'retcode'].sort())
})

test('redeem.claim() should throw when UID is nullable', async (t) => {
  const client = new HonkaiStarRail({ cookie })

  await t.throwsAsync(
    async () => {
      await client.redeem.claim('STARRAILGIFT')
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
