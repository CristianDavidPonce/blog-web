import { IOption, IRecord } from '@/types/types'

export const url = 'permissions'
export interface IPermission extends IRecord {
  module: string
  action: string
}

export interface IOptions {
  module: IOption[]
  action: IOption[]
}
