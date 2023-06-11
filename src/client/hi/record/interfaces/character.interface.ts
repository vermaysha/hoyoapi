export interface IHIAvatar {
  id: string
  name: string
  star: number
  avatar_background_path: string
  icon_path: string
  background_path: string
  large_background_path: string
  figure_path: string
  level: number
  oblique_avatar_background_path: string
  half_length_icon_path: string
  image_path: string
}

export interface IHIWeapon {
  id: number
  name: string
  max_rarity: number
  rarity: number
  icon: string
}

export interface IHIStigmata extends IHIWeapon {}

export interface IHICharacter {
  character: {
    avatar: IHIAvatar
    weapon: IHIWeapon
    stigmatas: IHIStigmata[]
  }
  is_chosen: boolean
}

export interface IHICharacters {
  characters: IHICharacter[]
}
