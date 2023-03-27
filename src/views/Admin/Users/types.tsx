import { IOption, IRecord } from '@/types/types'

export const url = 'users'
export interface IUser extends IRecord {
  module: string
  action: string
}

export interface IOptions {
  module: IOption[]
  action: IOption[]
}
