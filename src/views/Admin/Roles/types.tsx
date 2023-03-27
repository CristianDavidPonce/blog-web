import { IOption, IRecord } from '@/types/types'
import { IPermission } from '../Permissions/types'

export const url = 'roles'
export interface IRol extends IRecord {
  name: string
  description?: string
  permissions: IPermission[]
}

export interface IOptions {
  module: IOption[]
  action: IOption[]
}
