import test, { ExecutionContext } from 'ava'
import { hsr } from './setup'
import {
  HoyoAPIError,
  IDailyInfo,
  IDailyReward,
  IDailyRewards,
} from '../../src'

function dailyInfoTest(t: ExecutionContext, res: IDailyInfo) {
  t.is(typeof res.total_sign_day, 'number')
  t.is(typeof res.today, 'string')
  t.is(typeof res.is_sign, 'boolean')
  t.is(typeof res.first_bind, 'boolean')
  t.is(typeof res.is_sub, 'boolean')
  t.is(typeof res.region, 'string')
  t.is(typeof res.month_last_day, 'boolean')
  t.is(typeof res.short_sign_day, 'number')
  t.is(typeof res.sign_cnt_missed, 'number')

  t.deepEqual(
    Object.keys(res).sort(),
    [
      'total_sign_day',
      'today',
      'is_sign',
      'first_bind',
      'is_sub',
      'region',
      'month_last_day',
      'short_sign_day',
      'sign_cnt_missed',
    ].sort(),
  )
}

function dailyRewardTest(t: ExecutionContext, res: IDailyReward) {
  t.is(typeof res.month, 'number')
  t.is(typeof res.resign, 'boolean')
  t.is(typeof res.now, 'string')
  t.is(typeof res.biz, 'string')
  t.is(typeof res.award, 'object')

  delete (res as any).short_extra_award

  t.deepEqual(
    Object.keys(res).sort(),
    ['month', 'resign', 'now', 'biz', 'award'].sort(),
  )

  t.is(typeof res.award.icon, 'string')
  t.is(typeof res.award.name, 'string')
  t.is(typeof res.award.cnt, 'number')

  t.deepEqual(Object.keys(res.award).sort(), ['icon', 'name', 'cnt'].sort())
}

test('daily.info() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.daily.info()

  dailyInfoTest(t, res)
})

test('daily.rewards() return should be valid', async (t) => {
  const client = await hsr()
  const res: IDailyRewards = await client.daily.rewards()

  t.is(typeof res.month, 'number')
  t.is(typeof res.resign, 'boolean')
  t.is(typeof res.now, 'string')
  t.is(typeof res.biz, 'string')
  t.is(typeof res.awards, 'object')

  delete (res as any).short_extra_award

  t.deepEqual(
    Object.keys(res).sort(),
    ['month', 'resign', 'now', 'biz', 'awards'].sort(),
  )

  res.awards.forEach((award) => {
    t.is(typeof award.icon, 'string')
    t.is(typeof award.name, 'string')
    t.is(typeof award.cnt, 'number')

    t.deepEqual(Object.keys(award).sort(), ['icon', 'name', 'cnt'].sort())
  })
})

test('daily.reward() should throw error', async (t) => {
  await t.throwsAsync(
    async () => {
      const client = await hsr()
      await client.daily.reward(33)
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})

test('daily.reward() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.daily.reward()

  dailyRewardTest(t, res)
})

test('daily.claim() return should be valid', async (t) => {
  const client = await hsr()
  const res = await client.daily.claim()

  t.is(typeof res.code, 'number')
  t.is(typeof res.info, 'object')
  t.is(typeof res.reward, 'object')
  t.is(typeof res.status, 'string')

  t.deepEqual(Object.keys(res).sort(), ['code', 'info', 'reward', 'status'])

  if (res.reward) {
    dailyRewardTest(t, res.reward)
  }

  dailyInfoTest(t, res.info)
})
