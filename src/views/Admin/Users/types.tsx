import { IOption, IRecord } from '@/types/types'
import { IRol } from '../Roles/types'

export const url = 'users'
export interface IUser extends IRecord {
  userName: string
  firstName: string
  lastName: string
  isActive: boolean
  email: string
  role: IRol
}

export interface IOptions {
  module: IOption[]
  action: IOption[]
}
export interface ICreate {
  userName: string
  firstName: string
  lastName: string
  isActive: boolean
  email: string
  role: number
  password: string
}
export interface IEdit extends ICreate {}
