export interface IHILineup {
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

export interface IHIBoss {
  id: string
  name: string
  avatar: string
}

export interface IHIReport {
  score: number
  time_second: string
  area: number
  lineup: IHILineup
  boss: IHIBoss
  level: string
  reward_type: string
  elf: any
  type: string
  floor: number
}

export interface IHIAbyss {
  reports: IHIReport[]
}
