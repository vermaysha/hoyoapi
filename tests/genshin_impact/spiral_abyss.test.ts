import test from 'ava'
import { genshin, cookie } from './setup'
import { SpiralAbyssScheduleEnum, GenshinImpact, HoyoAPIError } from '../../src'

test('record.spiralAbyss() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.record.spiralAbyss()

  t.is(typeof res.schedule_id, 'number')
  t.is(typeof res.start_time, 'string')
  t.is(typeof res.end_time, 'string')
  t.is(typeof res.total_battle_times, 'number')
  t.is(typeof res.total_win_times, 'number')
  t.is(typeof res.max_floor, 'string')
  t.is(typeof res.total_star, 'number')
  t.is(typeof res.is_unlock, 'boolean')

  res.reveal_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')

    t.deepEqual(
      Object.keys(rank).sort(),
      ['avatar_id', 'avatar_icon', 'value', 'rarity'].sort(),
    )
  })

  res.defeat_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')

    t.deepEqual(
      Object.keys(rank).sort(),
      ['avatar_id', 'avatar_icon', 'value', 'rarity'].sort(),
    )
  })

  res.damage_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')

    t.deepEqual(
      Object.keys(rank).sort(),
      ['avatar_id', 'avatar_icon', 'value', 'rarity'].sort(),
    )
  })

  res.take_damage_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')

    t.deepEqual(
      Object.keys(rank).sort(),
      ['avatar_id', 'avatar_icon', 'value', 'rarity'].sort(),
    )
  })

  res.normal_skill_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')

    t.deepEqual(
      Object.keys(rank).sort(),
      ['avatar_id', 'avatar_icon', 'value', 'rarity'].sort(),
    )
  })

  res.energy_skill_rank.forEach((rank) => {
    t.is(typeof rank.avatar_id, 'number')
    t.is(typeof rank.avatar_icon, 'string')
    t.is(typeof rank.value, 'number')
    t.is(typeof rank.rarity, 'number')

    t.deepEqual(
      Object.keys(rank).sort(),
      ['avatar_id', 'avatar_icon', 'value', 'rarity'].sort(),
    )
  })

  res.floors.forEach((floor) => {
    t.is(typeof floor.index, 'number')
    t.is(typeof floor.icon, 'string')
    t.is(typeof floor.is_unlock, 'boolean')
    t.is(typeof floor.settle_time, 'string')
    t.is(typeof floor.star, 'number')
    t.is(typeof floor.max_star, 'number')

    floor.levels.forEach((level) => {
      t.is(typeof level.index, 'number')
      t.is(typeof level.star, 'number')
      t.is(typeof level.max_star, 'number')

      level.battles.forEach((battle) => {
        t.is(typeof battle.index, 'number')
        t.is(typeof battle.timestamp, 'string')

        battle.avatars.forEach((avatar) => {
          t.is(typeof avatar.id, 'number')
          t.is(typeof avatar.icon, 'string')
          t.is(typeof avatar.level, 'number')
          t.is(typeof avatar.rarity, 'number')

          t.deepEqual(
            Object.keys(avatar).sort(),
            ['avatar_id', 'avatar_icon', 'value', 'rarity'].sort(),
          )
        })

        t.deepEqual(Object.keys(battle).sort(), [
          'index',
          'timestamp',
          'avatars',
        ])
      })

      t.deepEqual(
        Object.keys(level).sort(),
        ['index', 'star', 'max_star', 'battles'].sort(),
      )
    })

    t.deepEqual(
      Object.keys(floor).sort(),
      [
        'index',
        'icon',
        'is_unlock',
        'settle_time',
        'star',
        'max_star',
        'levels',
      ].sort(),
    )
  })

  t.deepEqual(
    Object.keys(res).sort(),
    [
      'schedule_id',
      'start_time',
      'end_time',
      'total_battle_times',
      'total_win_times',
      'max_floor',
      'total_star',
      'is_unlock',
      'reveal_rank',
      'defeat_rank',
      'damage_rank',
      'take_damage_rank',
      'normal_skill_rank',
      'energy_skill_rank',
      'floors',
    ].sort(),
  )
})

test('record.spiralAbyss() should throw when schedule is invalid', async (t) => {
  const client = await genshin()

  await t.throwsAsync(
    async () => {
      await client.record.spiralAbyss(10 as SpiralAbyssScheduleEnum)
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})

test('record.spiralAbyss() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.record.spiralAbyss(SpiralAbyssScheduleEnum.CURRENT)
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
