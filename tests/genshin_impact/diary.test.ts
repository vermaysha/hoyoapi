import test from 'ava'
import { genshin, cookie } from './setup'
import { DiaryMonthEnum, GenshinImpact, HoyoAPIError } from '../../src'

test('diary.list() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.diary.list()

  t.is(typeof res.uid, 'number')
  t.is(typeof res.region, 'string')
  t.is(typeof res.nickname, 'string')
  t.is(typeof res.data_month, 'number')
  res.optional_month.forEach((month) => {
    t.is(typeof month, 'number')
  })
  t.is(typeof res.month, 'number')

  t.is(typeof res.month_data.current_primogems, 'number')
  t.is(typeof res.month_data.current_mora, 'number')
  t.is(typeof res.month_data.last_primogems, 'number')
  t.is(typeof res.month_data.last_mora, 'number')
  t.is(typeof res.month_data.primogem_rate, 'number')
  t.is(typeof res.month_data.mora_rate, 'number')

  res.month_data.group_by.forEach((group) => {
    t.is(typeof group.action_id, 'number')
    t.is(typeof group.action, 'string')
    t.is(typeof group.num, 'number')
    t.is(typeof group.percent, 'number')

    t.deepEqual(
      Object.keys(group).sort(),
      ['action_id', 'action', 'num', 'percent'].sort(),
    )
  })

  t.is(typeof res.day_data.current_primogems, 'number')
  t.is(typeof res.day_data.current_mora, 'number')

  t.deepEqual(
    Object.keys(res).sort(),
    [
      'uid',
      'region',
      'nickname',
      'data_month',
      'optional_month',
      'month_data',
      'month',
      'day_data',
    ].sort(),
  )

  t.deepEqual(
    Object.keys(res.day_data).sort(),
    ['current_primogems', 'current_mora'].sort(),
  )

  t.deepEqual(
    Object.keys(res.month_data).sort(),
    [
      'current_primogems',
      'current_mora',
      'last_primogems',
      'last_mora',
      'primogem_rate',
      'mora_rate',
      'group_by',
    ].sort(),
  )
})

test('diaryDetail() should throw when type is invalid', async (t) => {
  const client = await genshin()

  await t.throwsAsync(
    async () => {
      const currentDate = new Date()
      const currentMonth = currentDate.getMonth()

      const month = new Date()
      month.setMonth(currentMonth + 1)

      await client.diary.list((month.getMonth() + 1) as DiaryMonthEnum)
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})

test('diary.list() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.diary.list()
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
