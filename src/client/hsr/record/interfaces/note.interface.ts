export interface IHSRExpedition {
  avatars: string[]
  status: string
  remaining_time: number
  name: string
}
export interface IHSRNote {
  current_stamina: number
  max_stamina: number
  stamina_recover_time: number
  accepted_epedition_num: number
  total_expedition_num: number
  expeditions: IHSRExpedition[]
}
