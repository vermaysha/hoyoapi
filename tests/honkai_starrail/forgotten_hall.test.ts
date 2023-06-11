import test, { ExecutionContext } from 'ava'
import { hsr } from './setup'
import { IHSRForgottenHallTime } from '../../src'

function testTime(time: IHSRForgottenHallTime, t: ExecutionContext) {
  t.deepEqual(
    Object.keys(time).sort(),
    ['year', 'month', 'day', 'hour', 'minute'].sort(),
  )

  t.is(typeof time.year, 'number')
  t.is(typeof time.month, 'number')
  t.is(typeof time.day, 'number')
  t.is(typeof time.hour, 'number')
  t.is(typeof time.minute, 'number')
}

test('record.forgottenHall() should return valid response', async (t) => {
  const client = await hsr()
  const res = await client.record.forgottenHall()

  t.deepEqual(
    Object.keys(res).sort(),
    [
      'schedule_id',
      'begin_time',
      'end_time',
      'star_num',
      'max_floor',
      'battle_num',
      'has_data',
      'max_floor_detail',
      'all_floor_detail',
    ].sort(),
  )

  t.is(typeof res.schedule_id, 'number')
  t.is(typeof res.star_num, 'number')
  t.is(typeof res.max_floor, 'string')
  t.is(typeof res.battle_num, 'number')
  t.is(typeof res.has_data, 'boolean')
  t.is(typeof res.max_floor_detail, 'object')
  t.is(typeof res.all_floor_detail, 'object')

  testTime(res.begin_time, t)
  testTime(res.end_time, t)
})
