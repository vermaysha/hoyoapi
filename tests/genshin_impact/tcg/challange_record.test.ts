import test from 'ava'
import { genshin, cookie } from '../setup'
import { GenshinImpact, HoyoAPIError } from '../../../src'

test('tcg.challengeRecord() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.tcg.challengeRecord(1)

  t.deepEqual(
    Object.keys(res).sort(),
    ['basic', 'honor_character', 'deck_list', 'recommend_url'].sort(),
  )

  t.is(typeof res.basic, 'object')
  t.is(typeof res.honor_character, 'object')
  t.is(typeof res.deck_list, 'object')
  t.is(typeof res.recommend_url, 'string')

  t.deepEqual(
    Object.keys(res.basic).sort(),
    ['schedule', 'nickname', 'uid', 'win_cnt', 'medal', 'has_data'].sort(),
  )

  t.is(typeof res.basic.schedule, 'object')
  t.is(typeof res.basic.nickname, 'string')
  t.is(typeof res.basic.uid, 'string')
  t.is(typeof res.basic.win_cnt, 'number')
  t.is(typeof res.basic.medal, 'string')
  t.is(typeof res.basic.has_data, 'boolean')

  t.is(typeof res.basic.schedule.id, 'number')
  t.is(typeof res.basic.schedule.name, 'string')
  t.is(typeof res.basic.schedule.begin, 'object')
  t.is(typeof res.basic.schedule.end, 'object')

  t.deepEqual(
    Object.keys(res.basic.schedule.begin).sort(),
    ['year', 'month', 'day', 'hour', 'minute', 'second'].sort(),
  )

  t.is(typeof res.basic.schedule.begin.year, 'number')
  t.is(typeof res.basic.schedule.begin.month, 'number')
  t.is(typeof res.basic.schedule.begin.day, 'number')
  t.is(typeof res.basic.schedule.begin.hour, 'number')
  t.is(typeof res.basic.schedule.begin.minute, 'number')
  t.is(typeof res.basic.schedule.begin.second, 'number')

  t.deepEqual(
    Object.keys(res.basic.schedule.end).sort(),
    ['year', 'month', 'day', 'hour', 'minute', 'second'].sort(),
  )

  t.is(typeof res.basic.schedule.end.year, 'number')
  t.is(typeof res.basic.schedule.end.month, 'number')
  t.is(typeof res.basic.schedule.end.day, 'number')
  t.is(typeof res.basic.schedule.end.hour, 'number')
  t.is(typeof res.basic.schedule.end.minute, 'number')
  t.is(typeof res.basic.schedule.end.second, 'number')

  res.deck_list.forEach((deck) => {
    t.is(typeof deck.deck.id, 'number')
    t.is(typeof deck.deck.name, 'string')
    t.is(typeof deck.deck.is_valid, 'boolean')
    t.is(typeof deck.deck.avatar_cards, 'object')
    t.is(typeof deck.deck.action_cards, 'object')
  })
})

test('tcg.challengeRecord() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.tcg.challengeRecord(8)
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
