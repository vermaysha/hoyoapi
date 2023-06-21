import test from 'ava'
import { genshin, cookie } from '../setup'
import { GenshinImpact, HoyoAPIError } from '../../../src'

test('tcg.challengeSchedule() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.tcg.challengeSchedule()

  res.forEach((schedule) => {
    t.deepEqual(
      Object.keys(schedule).sort(),
      ['begin', 'end', 'name', 'id'].sort(),
    )

    t.is(typeof schedule.id, 'number')
    t.is(typeof schedule.name, 'string')
    t.is(typeof schedule.begin, 'object')
    t.is(typeof schedule.end, 'object')

    t.deepEqual(
      Object.keys(schedule.begin).sort(),
      ['year', 'month', 'day', 'hour', 'minute', 'second'].sort(),
    )

    t.is(typeof schedule.begin.year, 'number')
    t.is(typeof schedule.begin.month, 'number')
    t.is(typeof schedule.begin.day, 'number')
    t.is(typeof schedule.begin.hour, 'number')
    t.is(typeof schedule.begin.minute, 'number')
    t.is(typeof schedule.begin.second, 'number')

    t.deepEqual(
      Object.keys(schedule.end).sort(),
      ['year', 'month', 'day', 'hour', 'minute', 'second'].sort(),
    )

    t.is(typeof schedule.end.year, 'number')
    t.is(typeof schedule.end.month, 'number')
    t.is(typeof schedule.end.day, 'number')
    t.is(typeof schedule.end.hour, 'number')
    t.is(typeof schedule.end.minute, 'number')
    t.is(typeof schedule.end.second, 'number')
  })
})

test('tcg.challengeSchedule() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.tcg.challengeSchedule()
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
