import test, { ExecutionContext } from 'ava'
import { hsr } from './setup'
import { IHSROrnament, IHSRRelic } from '../../src'

function testRelicAndOrnament(
  obj: IHSRRelic | IHSROrnament,
  t: ExecutionContext,
) {
  t.is(typeof obj.id, 'number')
  t.is(typeof obj.level, 'number')
  t.is(typeof obj.pos, 'number')
  t.is(typeof obj.name, 'string')
  t.is(typeof obj.desc, 'string')
  t.is(typeof obj.icon, 'string')
  t.is(typeof obj.rarity, 'number')

  t.deepEqual(
    Object.keys(obj).sort(),
    ['id', 'level', 'pos', 'name', 'desc', 'icon', 'rarity'].sort(),
  )
}

test('record.characters() should retun valid response', async (t) => {
  const client = await hsr()
  const res = await client.record.characters()

  res.forEach((char) => {
    t.deepEqual(
      Object.keys(char).sort(),
      [
        'id',
        'level',
        'name',
        'element',
        'icon',
        'rarity',
        'rank',
        'image',
        'equip',
        'relics',
        'ornaments',
        'ranks',
      ].sort(),
    )

    t.is(typeof char.id, 'number')
    t.is(typeof char.level, 'number')
    t.is(typeof char.name, 'string')
    t.is(typeof char.element, 'string')
    t.is(typeof char.icon, 'string')
    t.is(typeof char.rarity, 'number')
    t.is(typeof char.rank, 'number')
    t.is(typeof char.image, 'string')

    if (char.equip) {
      t.is(typeof char.equip.id, 'number')
      t.is(typeof char.equip.level, 'number')
      t.is(typeof char.equip.rank, 'number')
      t.is(typeof char.equip.name, 'string')
      t.is(typeof char.equip.desc, 'string')
      t.is(typeof char.equip.icon, 'string')
    } else {
      t.assert(char.equip === null)
    }

    char.relics.forEach((relic) => {
      testRelicAndOrnament(relic, t)
    })

    char.ornaments.forEach((ornament) => {
      testRelicAndOrnament(ornament, t)
    })

    char.ranks.forEach((rank) => {
      t.is(typeof rank.id, 'number')
      t.is(typeof rank.pos, 'number')
      t.is(typeof rank.name, 'string')
      t.is(typeof rank.icon, 'string')
      t.is(typeof rank.desc, 'string')
      t.is(typeof rank.is_unlocked, 'boolean')

      t.deepEqual(
        Object.keys(rank).sort(),
        ['id', 'pos', 'name', 'icon', 'desc', 'is_unlocked'].sort(),
      )
    })
  })
})
