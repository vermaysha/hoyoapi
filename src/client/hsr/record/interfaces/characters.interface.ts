export interface IHSREquipment {
  id: number
  level: number
  rank: number
  name: string
  desc: string
  icon: string
}

export interface IHSRRelic {
  id: number
  level: number
  pos: number
  name: string
  desc: string
  icon: string
  rarity: number
}

export interface IHSROrnament extends IHSRRelic {}

export interface IHSRRank {
  id: number
  pos: number
  name: string
  icon: string
  desc: string
  is_unlocked: boolean
}

export interface IHSRCharacterBase {
  id: number
  level: number
  name: string
  element: string
  icon: string
  rarity: number
  rank: number
}
export interface IHSRCharacterSummary extends IHSRCharacterBase {
  is_chosen: false
}

export interface IHSRCharacterFull extends IHSRCharacterBase {
  image: string
  equip: IHSREquipment | null
  relics: IHSRRelic[]
  ornaments: IHSROrnament[]
  ranks: IHSRRank[]
}
