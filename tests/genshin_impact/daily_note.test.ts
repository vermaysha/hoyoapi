import test from 'ava'
import { genshin, cookie } from './setup'
import { GenshinImpact, HoyoAPIError } from '../../src'

test('record.dailyNote() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.record.dailyNote()

  res.expeditions.forEach((expe) => {
    t.is(typeof expe.avatar_side_icon, 'string')
    t.is(typeof expe.status, 'string')
    t.is(typeof expe.remained_time, 'string')

    t.regex(expe.status, /Finished|Ongoing/)

    t.deepEqual(
      Object.keys(expe).sort(),
      ['avatar_side_icon', 'status', 'remained_time'].sort(),
    )
  })

  t.is(typeof res.current_resin, 'number')
  t.is(typeof res.max_resin, 'number')
  t.is(typeof res.resin_recovery_time, 'string')
  t.is(typeof res.finished_task_num, 'number')
  t.is(typeof res.total_task_num, 'number')
  t.is(typeof res.is_extra_task_reward_received, 'boolean')
  t.is(typeof res.remain_resin_discount_num, 'number')
  t.is(typeof res.resin_discount_num_limit, 'number')
  t.is(typeof res.current_expedition_num, 'number')
  t.is(typeof res.max_expedition_num, 'number')
  t.is(typeof res.current_home_coin, 'number')
  t.is(typeof res.max_home_coin, 'number')
  t.is(typeof res.home_coin_recovery_time, 'string')
  t.is(typeof res.calendar_url, 'string')
  t.is(typeof res.transformer.obtained, 'boolean')
  t.is(typeof res.transformer.recovery_time.Day, 'number')
  t.is(typeof res.transformer.recovery_time.Hour, 'number')
  t.is(typeof res.transformer.recovery_time.Minute, 'number')
  t.is(typeof res.transformer.recovery_time.Second, 'number')
  t.is(typeof res.transformer.recovery_time.reached, 'boolean')
  t.is(typeof res.transformer.wiki, 'string')
  t.is(typeof res.transformer.noticed, 'boolean')
  t.is(typeof res.transformer.latest_job_id, 'string')

  t.deepEqual(
    Object.keys(res).sort(),
    [
      'expeditions',
      'current_resin',
      'max_resin',
      'resin_recovery_time',
      'finished_task_num',
      'total_task_num',
      'is_extra_task_reward_received',
      'remain_resin_discount_num',
      'resin_discount_num_limit',
      'current_expedition_num',
      'max_expedition_num',
      'current_home_coin',
      'max_home_coin',
      'home_coin_recovery_time',
      'calendar_url',
      'transformer',
    ].sort(),
  )

  t.deepEqual(
    Object.keys(res.transformer).sort(),
    ['obtained', 'recovery_time', 'wiki', 'noticed', 'latest_job_id'].sort(),
  )

  t.deepEqual(
    Object.keys(res.transformer.recovery_time).sort(),
    ['Day', 'Hour', 'Minute', 'Second', 'reached'].sort(),
  )
})

test('record.dailyNote() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.record.dailyNote()
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
