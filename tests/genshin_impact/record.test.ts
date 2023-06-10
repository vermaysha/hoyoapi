import test from 'ava'
import { genshin, cookie } from './setup'
import { GenshinImpact, HoyoAPIError } from '../../src'

test('record.records() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.record.records()

  t.is(typeof res.city_explorations, 'object')

  res.avatars.forEach((avatar) => {
    t.is(typeof avatar.id, 'number')
    t.is(typeof avatar.image, 'string')
    t.is(typeof avatar.name, 'string')
    t.is(typeof avatar.element, 'string')
    t.is(typeof avatar.fetter, 'number')
    t.is(typeof avatar.level, 'number')
    t.is(typeof avatar.rarity, 'number')
    t.is(typeof avatar.actived_constellation_num, 'number')
    t.is(typeof avatar.card_image, 'string')
    t.is(typeof avatar.is_chosen, 'boolean')

    t.deepEqual(
      Object.keys(avatar).sort(),
      [
        'id',
        'image',
        'name',
        'element',
        'fetter',
        'level',
        'rarity',
        'actived_constellation_num',
        'card_image',
        'is_chosen',
      ].sort(),
    )
  })

  res.homes.forEach((home) => {
    t.is(typeof home.level, 'number')
    t.is(typeof home.visit_num, 'number')
    t.is(typeof home.comfort_num, 'number')
    t.is(typeof home.item_num, 'number')
    t.is(typeof home.name, 'string')
    t.is(typeof home.icon, 'string')
    t.is(typeof home.comfort_level_name, 'string')
    t.is(typeof home.comfort_level_icon, 'string')

    t.deepEqual(
      Object.keys(home).sort(),
      [
        'level',
        'visit_num',
        'comfort_num',
        'item_num',
        'name',
        'icon',
        'comfort_level_name',
        'comfort_level_icon',
      ].sort(),
    )
  })

  res.world_explorations.forEach((explore) => {
    t.is(typeof explore.level, 'number')
    t.is(typeof explore.exploration_percentage, 'number')
    t.is(typeof explore.icon, 'string')
    t.is(typeof explore.name, 'string')
    t.is(typeof explore.type, 'string')
    t.is(typeof explore.id, 'number')
    t.is(typeof explore.parent_id, 'number')
    t.is(typeof explore.map_url, 'string')
    t.is(typeof explore.strategy_url, 'string')
    t.is(typeof explore.background_image, 'string')
    t.is(typeof explore.inner_icon, 'string')
    t.is(typeof explore.cover, 'string')

    t.deepEqual(
      Object.keys(explore).sort(),
      [
        'level',
        'exploration_percentage',
        'icon',
        'name',
        'type',
        'id',
        'parent_id',
        'map_url',
        'strategy_url',
        'background_image',
        'inner_icon',
        'cover',
        'offerings',
      ].sort(),
    )

    explore.offerings.forEach((offering) => {
      t.is(typeof offering.name, 'string')
      t.is(typeof offering.level, 'number')
      t.is(typeof offering.icon, 'string')

      t.deepEqual(
        Object.keys(offering).sort(),
        ['name', 'level', 'icon'].sort(),
      )
    })
  })

  t.deepEqual(
    Object.keys(res).sort(),
    [
      'avatars',
      'homes',
      'world_explorations',
      'role',
      'stats',
      'city_explorations',
    ].sort(),
  )

  t.is(typeof res.role.AvatarUrl, 'string')
  t.is(typeof res.role.nickname, 'string')
  t.is(typeof res.role.region, 'string')
  t.is(typeof res.role.level, 'number')

  t.deepEqual(
    Object.keys(res.role).sort(),
    ['AvatarUrl', 'nickname', 'region', 'level'].sort(),
  )

  t.is(typeof res.stats.active_day_number, 'number')
  t.is(typeof res.stats.achievement_number, 'number')
  t.is(typeof res.stats.anemoculus_number, 'number')
  t.is(typeof res.stats.geoculus_number, 'number')
  t.is(typeof res.stats.avatar_number, 'number')
  t.is(typeof res.stats.way_point_number, 'number')
  t.is(typeof res.stats.domain_number, 'number')
  t.is(typeof res.stats.spiral_abyss, 'string')
  t.is(typeof res.stats.precious_chest_number, 'number')
  t.is(typeof res.stats.luxurious_chest_number, 'number')
  t.is(typeof res.stats.exquisite_chest_number, 'number')
  t.is(typeof res.stats.common_chest_number, 'number')
  t.is(typeof res.stats.electroculus_number, 'number')
  t.is(typeof res.stats.magic_chest_number, 'number')
  t.is(typeof res.stats.dendroculus_number, 'number')

  t.deepEqual(
    Object.keys(res.stats).sort(),
    [
      'active_day_number',
      'achievement_number',
      'anemoculus_number',
      'geoculus_number',
      'avatar_number',
      'way_point_number',
      'domain_number',
      'spiral_abyss',
      'precious_chest_number',
      'luxurious_chest_number',
      'exquisite_chest_number',
      'common_chest_number',
      'electroculus_number',
      'magic_chest_number',
      'dendroculus_number',
    ].sort(),
  )
})

test('record.records() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.record.records()
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
