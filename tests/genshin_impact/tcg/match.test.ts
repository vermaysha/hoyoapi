import test from 'ava'
import { genshin, cookie } from '../setup'
import { GenshinImpact, HoyoAPIError } from '../../../src'

test('tcg.matchs() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.tcg.matchs()

  t.deepEqual(
    Object.keys(res).sort(),
    ['recent_matches', 'favourite_matches'].sort(),
  )

  t.is(typeof res.favourite_matches, 'object')
  t.is(typeof res.recent_matches, 'object')

  res.recent_matches.forEach((match) => {
    t.deepEqual(
      Object.keys(match).sort(),
      [
        'game_id',
        'self',
        'opposite',
        'match_type',
        'match_time',
        'is_win',
      ].sort(),
    )

    t.is(typeof match.game_id, 'string')
    t.is(typeof match.self, 'object')
    t.is(typeof match.opposite, 'object')
    t.is(typeof match.match_type, 'string')
    t.is(typeof match.match_time, 'object')
    t.is(typeof match.is_win, 'boolean')

    t.deepEqual(
      Object.keys(match.self).sort(),
      ['name', 'linups', 'is_overflow'].sort(),
    )

    t.is(typeof match.self.name, 'string')
    t.is(typeof match.self.linups, 'object')
    t.is(typeof match.self.is_overflow, 'boolean')

    t.deepEqual(
      Object.keys(match.opposite).sort(),
      ['name', 'linups', 'is_overflow'].sort(),
    )

    t.is(typeof match.opposite.name, 'string')
    t.is(typeof match.opposite.linups, 'object')
    t.is(typeof match.opposite.is_overflow, 'boolean')

    t.deepEqual(
      Object.keys(match.match_time).sort(),
      ['year', 'month', 'day', 'hour', 'minute', 'second'].sort(),
    )

    t.is(typeof match.match_time.year, 'number')
    t.is(typeof match.match_time.month, 'number')
    t.is(typeof match.match_time.day, 'number')
    t.is(typeof match.match_time.hour, 'number')
    t.is(typeof match.match_time.minute, 'number')
    t.is(typeof match.match_time.second, 'number')
  })
})

test('tcg.matchs() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.tcg.matchs()
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
