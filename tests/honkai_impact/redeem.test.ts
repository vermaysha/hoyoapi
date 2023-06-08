import test from 'ava'
import { honkaiImpact, cookie } from './setup'
import { HonkaiImpact, HoyoAPIError } from '../../src'

test('redeem.claim() should return be valid', async (t) => {
  const client = await honkaiImpact()
  const res = await client.redeem.claim('NEWCHAP')

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
  const client = new HonkaiImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.redeem.claim('NEWCHAP')
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
