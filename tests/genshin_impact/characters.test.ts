import test from 'ava'
import { genshin, cookie } from './setup'
import { GenshinImpact, HoyoAPIError } from '../../src'

test('record.characters() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.record.characters()

  t.is(typeof res.role.AvatarUrl, 'string')
  t.is(typeof res.role.level, 'number')
  t.is(typeof res.role.nickname, 'string')
  t.is(typeof res.role.region, 'string')

  t.deepEqual(
    Object.keys(res.role).sort(),
    ['AvatarUrl', 'level', 'nickname', 'region'].sort(),
  )

  t.deepEqual(Object.keys(res).sort(), ['role', 'avatars'].sort())

  res.avatars.forEach((avatar) => {
    t.deepEqual(typeof avatar.id, 'number')
    t.deepEqual(typeof avatar.image, 'string')
    t.deepEqual(typeof avatar.icon, 'string')
    t.deepEqual(typeof avatar.name, 'string')
    t.deepEqual(typeof avatar.element, 'string')
    t.deepEqual(typeof avatar.rarity, 'number')
    t.deepEqual(typeof avatar.fetter, 'number')
    t.deepEqual(typeof avatar.level, 'number')
    t.deepEqual(typeof avatar.actived_constellation_num, 'number')
    t.deepEqual(typeof avatar.weapon.id, 'number')
    t.deepEqual(typeof avatar.weapon.name, 'string')
    t.deepEqual(typeof avatar.weapon.icon, 'string')
    t.deepEqual(typeof avatar.weapon.type, 'number')
    t.deepEqual(typeof avatar.weapon.rarity, 'number')
    t.deepEqual(typeof avatar.weapon.level, 'number')
    t.deepEqual(typeof avatar.weapon.promote_level, 'number')
    t.deepEqual(typeof avatar.weapon.type_name, 'string')
    t.deepEqual(typeof avatar.weapon.desc, 'string')
    t.deepEqual(typeof avatar.weapon.affix_level, 'number')
    t.deepEqual(typeof avatar.external, 'object')

    t.deepEqual(
      Object.keys(avatar).sort(),
      [
        'id',
        'image',
        'icon',
        'name',
        'element',
        'rarity',
        'fetter',
        'level',
        'actived_constellation_num',
        'weapon',
        'reliquaries',
        'constellations',
        'costumes',
        'external',
      ].sort(),
    )

    t.deepEqual(
      Object.keys(avatar.weapon).sort(),
      [
        'id',
        'name',
        'icon',
        'type',
        'rarity',
        'level',
        'promote_level',
        'type_name',
        'desc',
        'affix_level',
      ].sort(),
    )

    avatar.reliquaries.forEach((reli) => {
      t.is(typeof reli.id, 'number')
      t.is(typeof reli.name, 'string')
      t.is(typeof reli.icon, 'string')
      t.is(typeof reli.pos, 'number')
      t.is(typeof reli.rarity, 'number')
      t.is(typeof reli.level, 'number')
      t.is(typeof reli.pos_name, 'string')

      t.is(typeof reli.set.id, 'number')
      t.is(typeof reli.set.name, 'string')

      t.deepEqual(
        Object.keys(reli).sort(),
        [
          'id',
          'name',
          'icon',
          'pos',
          'rarity',
          'level',
          'pos_name',
          'set',
        ].sort(),
      )

      t.deepEqual(
        Object.keys(reli.set).sort(),
        ['id', 'name', 'affixes'].sort(),
      )

      reli.set.affixes.forEach((affix) => {
        t.is(typeof affix.activation_number, 'number')
        t.is(typeof affix.effect, 'string')

        t.deepEqual(
          Object.keys(affix).sort(),
          ['activation_number', 'effect'].sort(),
        )
      })
    })

    avatar.constellations.forEach((cons) => {
      t.is(typeof cons.id, 'number')
      t.is(typeof cons.name, 'string')
      t.is(typeof cons.icon, 'string')
      t.is(typeof cons.effect, 'string')
      t.is(typeof cons.is_actived, 'boolean')
      t.is(typeof cons.pos, 'number')
      t.deepEqual(
        Object.keys(cons).sort(),
        ['id', 'name', 'icon', 'effect', 'is_actived', 'pos'].sort(),
      )
    })

    avatar.costumes.forEach((cos) => {
      t.is(typeof cos.id, 'number')
      t.is(typeof cos.name, 'string')
      t.is(typeof cos.icon, 'string')

      t.deepEqual(Object.keys(cos).sort(), ['id', 'name', 'icon'].sort())
    })
  })
})

test('record.characters() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.record.characters()
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})

test('record.charactersSummary() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.record.charactersSummary([10_000_007])

  res.avatars.forEach((avatar) => {
    t.is(typeof avatar.id, 'number')
    t.is(typeof avatar.image, 'string')
    t.is(typeof avatar.icon, 'string')
    t.is(typeof avatar.name, 'string')
    t.is(typeof avatar.element, 'string')
    t.is(typeof avatar.rarity, 'number')
    t.is(typeof avatar.weapon_type, 'number')
    t.is(typeof avatar.weapon_type_name, 'string')

    t.deepEqual(
      Object.keys(avatar).sort(),
      [
        'id',
        'image',
        'icon',
        'name',
        'element',
        'rarity',
        'weapon_type',
        'weapon_type_name',
      ].sort(),
    )
  })
})

test('record.charactersSummary() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.record.charactersSummary([10_000_007])
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
