import test from 'ava'
import { genshin, cookie } from '../setup'
import { GenshinImpact, HoyoAPIError } from '../../../src'

test('tcg.basicInfo() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.tcg.basicInfo()

  t.deepEqual(
    Object.keys(res).sort(),
    [
      'level',
      'nickname',
      'avatar_card_num_gained',
      'avatar_card_num_total',
      'action_card_num_gained',
      'action_card_num_total',
      'covers',
      'replays',
      'hornor_character',
      'challenge_basic',
    ].sort(),
  )

  t.is(typeof res.level, 'number')
  t.is(typeof res.nickname, 'string')
  t.is(typeof res.avatar_card_num_gained, 'number')
  t.is(typeof res.avatar_card_num_total, 'number')
  t.is(typeof res.action_card_num_gained, 'number')
  t.is(typeof res.action_card_num_total, 'number')
  t.is(typeof res.covers, 'object')
  t.is(typeof res.replays, 'object')
  t.is(typeof res.hornor_character, 'object')
  t.is(typeof res.challenge_basic, 'object')

  res.replays.forEach((replay) => {
    t.deepEqual(
      Object.keys(replay).sort(),
      [
        'game_id',
        'self',
        'opposite',
        'match_type',
        'match_time',
        'is_win',
      ].sort(),
    )

    t.is(typeof replay.game_id, 'string')
    t.is(typeof replay.self, 'object')
    t.is(typeof replay.opposite, 'object')
    t.is(typeof replay.match_type, 'string')
    t.is(typeof replay.match_time, 'object')
    t.is(typeof replay.is_win, 'boolean')

    t.deepEqual(
      Object.keys(replay.self).sort(),
      ['name', 'linups', 'is_overflow'].sort(),
    )

    t.is(typeof replay.self.name, 'string')
    t.is(typeof replay.self.linups, 'object')
    t.is(typeof replay.self.is_overflow, 'boolean')

    t.deepEqual(
      Object.keys(replay.opposite).sort(),
      ['name', 'linups', 'is_overflow'].sort(),
    )

    t.is(typeof replay.opposite.name, 'string')
    t.is(typeof replay.opposite.linups, 'object')
    t.is(typeof replay.opposite.is_overflow, 'boolean')

    t.deepEqual(
      Object.keys(replay.match_time).sort(),
      ['year', 'month', 'day', 'hour', 'minute', 'second'].sort(),
    )

    t.is(typeof replay.match_time.year, 'number')
    t.is(typeof replay.match_time.month, 'number')
    t.is(typeof replay.match_time.day, 'number')
    t.is(typeof replay.match_time.hour, 'number')
    t.is(typeof replay.match_time.minute, 'number')
    t.is(typeof replay.match_time.second, 'number')
  })

  t.is(typeof res.challenge_basic.schedule, 'object')
  t.is(typeof res.challenge_basic.nickname, 'string')
  t.is(typeof res.challenge_basic.uid, 'string')
  t.is(typeof res.challenge_basic.win_cnt, 'number')
  t.is(typeof res.challenge_basic.medal, 'string')
  t.is(typeof res.challenge_basic.has_data, 'boolean')

  t.deepEqual(
    Object.keys(res.challenge_basic).sort(),
    ['schedule', 'nickname', 'uid', 'win_cnt', 'medal', 'has_data'].sort(),
  )

  t.deepEqual(
    Object.keys(res.challenge_basic.schedule).sort(),
    ['begin', 'end', 'name', 'id'].sort(),
  )

  t.is(typeof res.challenge_basic.schedule.id, 'number')
  t.is(typeof res.challenge_basic.schedule.name, 'string')
  t.is(typeof res.challenge_basic.schedule.begin, 'object')
  t.is(typeof res.challenge_basic.schedule.end, 'object')

  t.deepEqual(
    Object.keys(res.challenge_basic.schedule.begin).sort(),
    ['year', 'month', 'day', 'hour', 'minute', 'second'].sort(),
  )

  t.is(typeof res.challenge_basic.schedule.begin.year, 'number')
  t.is(typeof res.challenge_basic.schedule.begin.month, 'number')
  t.is(typeof res.challenge_basic.schedule.begin.day, 'number')
  t.is(typeof res.challenge_basic.schedule.begin.hour, 'number')
  t.is(typeof res.challenge_basic.schedule.begin.minute, 'number')
  t.is(typeof res.challenge_basic.schedule.begin.second, 'number')

  t.deepEqual(
    Object.keys(res.challenge_basic.schedule.end).sort(),
    ['year', 'month', 'day', 'hour', 'minute', 'second'].sort(),
  )

  t.is(typeof res.challenge_basic.schedule.end.year, 'number')
  t.is(typeof res.challenge_basic.schedule.end.month, 'number')
  t.is(typeof res.challenge_basic.schedule.end.day, 'number')
  t.is(typeof res.challenge_basic.schedule.end.hour, 'number')
  t.is(typeof res.challenge_basic.schedule.end.minute, 'number')
  t.is(typeof res.challenge_basic.schedule.end.second, 'number')
})

test('tcg.basicInfo() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.tcg.basicInfo()
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
