import test from 'ava'
import { honkaiImpact } from './setup'

test('record.records() should return valid response', async (t) => {
  const client = await honkaiImpact()
  const res = await client.record.records()

  t.deepEqual(Object.keys(res).sort(), ['role', 'stats', 'preference'].sort())

  t.deepEqual(
    Object.keys(res.role).sort(),
    ['AvatarUrl', 'nickname', 'region', 'level'].sort(),
  )

  t.deepEqual(
    Object.keys(res.preference).sort(),
    [
      'abyss',
      'main_line',
      'battle_field',
      'open_world',
      'community',
      'comprehensive_score',
      'comprehensive_rating',
      'god_war',
      'is_god_war_unlock',
    ].sort(),
  )

  t.deepEqual(
    Object.keys(res.stats).sort(),
    [
      'active_day_number',
      'suit_number',
      'achievement_number',
      'stigmata_number',
      'armor_number',
      'sss_armor_number',
      'battle_field_ranking_percentage',
      'old_abyss',
      'weapon_number',
      'god_war_max_punish_level',
      'god_war_extra_item_number',
      'god_war_max_challenge_score',
      'god_war_max_challenge_level',
      'five_star_weapon_number',
      'five_star_stigmata_number',
      'god_war_max_level_avatar_number',
      'battle_field_area',
      'battle_field_score',
      'abyss_score',
      'battle_field_rank',
      'god_war_max_support_point',
      'abyss_floor',
    ].sort(),
  )

  t.deepEqual(
    Object.keys(res.stats.old_abyss).sort(),
    [
      'level_of_quantum',
      'level_of_ow',
      'latest_type',
      'latest_level',
      'latest_area',
      'level_of_greedy',
    ].sort(),
  )
})
