import test from 'ava'
import { genshin, cookie } from '../setup'
import { GenshinImpact, HoyoAPIError } from '../../../src'

test('tcg.challengeRecord() should return be valid', async (t) => {
  const client = await genshin()
  const schedules = await client.tcg.challengeSchedule()

  for (const schedule of schedules) {
    const res = await client.tcg.challengeRecord(schedule.id)

    t.deepEqual(
      Object.keys(res).sort(),
      ['basic', 'honor_character', 'deck_list', 'recommend_url'].sort(),
    )

    t.is(typeof res.basic, 'object')
    t.is(typeof res.honor_character, 'object')
    t.is(typeof res.deck_list, 'object')
    t.is(typeof res.recommend_url, 'string')

    t.deepEqual(
      Object.keys(res.basic).sort(),
      ['schedule', 'nickname', 'uid', 'win_cnt', 'medal', 'has_data'].sort(),
    )

    t.is(typeof res.basic.schedule, 'object')
    t.is(typeof res.basic.nickname, 'string')
    t.is(typeof res.basic.uid, 'string')
    t.is(typeof res.basic.win_cnt, 'number')
    t.is(typeof res.basic.medal, 'string')
    t.is(typeof res.basic.has_data, 'boolean')

    if (res.basic.schedule) {
      t.is(typeof res.basic.schedule.id, 'number')
      t.is(typeof res.basic.schedule.name, 'string')
      t.is(typeof res.basic.schedule.begin, 'object')
      t.is(typeof res.basic.schedule.end, 'object')

      t.deepEqual(
        Object.keys(res.basic.schedule.begin).sort(),
        ['year', 'month', 'day', 'hour', 'minute', 'second'].sort(),
      )

      t.is(typeof res.basic.schedule.begin.year, 'number')
      t.is(typeof res.basic.schedule.begin.month, 'number')
      t.is(typeof res.basic.schedule.begin.day, 'number')
      t.is(typeof res.basic.schedule.begin.hour, 'number')
      t.is(typeof res.basic.schedule.begin.minute, 'number')
      t.is(typeof res.basic.schedule.begin.second, 'number')

      t.deepEqual(
        Object.keys(res.basic.schedule.end).sort(),
        ['year', 'month', 'day', 'hour', 'minute', 'second'].sort(),
      )

      t.is(typeof res.basic.schedule.end.year, 'number')
      t.is(typeof res.basic.schedule.end.month, 'number')
      t.is(typeof res.basic.schedule.end.day, 'number')
      t.is(typeof res.basic.schedule.end.hour, 'number')
      t.is(typeof res.basic.schedule.end.minute, 'number')
      t.is(typeof res.basic.schedule.end.second, 'number')
    }

    res.deck_list.forEach((deck) => {
      t.is(typeof deck.deck.id, 'number')
      t.is(typeof deck.deck.name, 'string')
      t.is(typeof deck.deck.is_valid, 'boolean')
      t.is(typeof deck.deck.avatar_cards, 'object')
      t.is(typeof deck.deck.action_cards, 'object')

      deck.deck.action_cards.forEach((card) => {
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

      deck.deck.avatar_cards.forEach((card) => {
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
  }
})

test('tcg.challengeRecord() should throw when UID is nullable', async (t) => {
  const client = new GenshinImpact({ cookie })

  await t.throwsAsync(
    async () => {
      await client.tcg.challengeRecord(8)
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
})
