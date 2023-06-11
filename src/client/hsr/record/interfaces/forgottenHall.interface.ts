export interface IHSRForgottenHallTime {
  year: number
  month: number
  day: number
  hour: number
  minute: number
}

export interface IHSRForgottenHall {
  schedule_id: number
  begin_time: IHSRForgottenHallTime
  end_time: IHSRForgottenHallTime
  star_num: number
  max_floor: string
  battle_num: number
  has_data: boolean
  max_floor_detail: any
  all_floor_detail: any
}
