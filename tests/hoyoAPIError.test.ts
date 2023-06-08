import { HoyoAPIError } from '../src'

import test from 'ava'

test('Should be return HoyoAPIError', (t) => {
  t.throws(
    () => {
      throw new HoyoAPIError('Error')
    },
    {
      instanceOf: HoyoAPIError,
      message: 'Error',
    },
  )
})
