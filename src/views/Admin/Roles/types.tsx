import { IOption, IRecord } from '@/types/types'
import { IPermission } from '../Permissions/types'

export const urlRol = 'roles'
export interface IRol extends IRecord {
  name: string
  description?: string
  permissions: IPermission[]
}

export interface IOptions {
  module: IOption[]
  action: IOption[]
}
