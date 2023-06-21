import test from 'ava'
import { genshin, cookie } from '../setup'
import { GenshinImpact, HoyoAPIError } from '../../../src'

test('tcg.cards() should return be valid', async (t) => {
  const client = await genshin()
  const res = await client.tcg.cards()

  t.deepEqual(
    Object.keys(res).sort(),
    ['card_list', 'is_last', 'next_offset', 'stats'].sort(),
  )

  t.is(typeof res.card_list, 'object')
  t.is(typeof res.is_last, 'boolean')
  t.is(typeof res.next_offset, 'number')
  t.is(typeof res.stats, 'object')

  res.card_list.forEach((card) => {
    t.deepEqual(
      Object.keys(card).sort(),
      [
        'id',
        'name',
        'image',
        'desc',
        'card_type',
        'num',
        'tags',
        'proficiency',
        'use_count',
        'hp',
        'card_skills',
        'action_cost',
        'card_sources',
        'rank_id',
        'deck_recommend',
        'card_wiki',
        'icon',
      ].sort(),
    )

    t.is(typeof card.id, 'number')
    t.is(typeof card.name, 'string')
    t.is(typeof card.image, 'string')
    t.is(typeof card.desc, 'string')
    t.is(typeof card.card_type, 'string')
    t.is(typeof card.num, 'number')
    t.is(typeof card.tags, 'object')
    t.is(typeof card.proficiency, 'number')
    t.is(typeof card.use_count, 'number')
    t.is(typeof card.hp, 'number')
    t.is(typeof card.card_skills, 'object')
    t.is(typeof card.action_cost, 'object')
    t.is(typeof card.card_sources, 'object')
    t.is(typeof card.rank_id, 'number')
    t.is(typeof card.deck_recommend, 'string')
    t.is(typeof card.card_wiki, 'string')
    t.is(typeof card.icon, 'string')

    card.card_skills.forEach((skill) => {
      t.deepEqual(
        Object.keys(skill).sort(),
        ['id', 'name', 'desc', 'tag'].sort(),
      )

      t.is(typeof skill.id, 'number')
      t.is(typeof skill.name, 'string')
      t.is(typeof skill.desc, 'string')
      t.is(typeof skill.tag, 'string')
    })

    card.action_cost.forEach((cost) => {
      t.deepEqual(Object.keys(cost).sort(), ['cost_type', 'cost_value'])

      t.is(typeof cost.cost_type, 'string')
      t.is(typeof cost.cost_value, 'number')
    })
  })
})

test('tcg.cards() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.tcg.cards()
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
