import { IOption, IRecord } from '@/types/types'

export interface IResponse extends IRecord {
  module: string
  action: string
}

export interface IOptions {
  module: IOption[]
  action: IOption[]
}
