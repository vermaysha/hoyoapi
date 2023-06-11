import test from 'ava'
import { hsr } from './setup'

test('record.note() should return valid response', async (t) => {
  const client = await hsr()
  const res = await client.record.note()

  t.deepEqual(
    Object.keys(res).sort(),
    [
      'current_stamina',
      'max_stamina',
      'stamina_recover_time',
      'accepted_epedition_num',
      'total_expedition_num',
      'expeditions',
    ].sort(),
  )

  t.is(typeof res.current_stamina, 'number')
  t.is(typeof res.max_stamina, 'number')
  t.is(typeof res.stamina_recover_time, 'number')
  t.is(typeof res.accepted_epedition_num, 'number')
  t.is(typeof res.total_expedition_num, 'number')

  res.expeditions.forEach((expe) => {
    t.deepEqual(
      Object.keys(expe).sort(),
      ['avatars', 'status', 'remaining_time', 'name'].sort(),
    )

    t.is(typeof expe.status, 'string')
    t.is(typeof expe.remaining_time, 'number')
    t.is(typeof expe.name, 'string')

    expe.avatars.forEach((avatar) => {
      t.is(typeof avatar, 'string')
    })
  })
})
