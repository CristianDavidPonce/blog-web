import { IOption, IRecord } from '@/types/types'

export const urlTags = 'tags'
export interface ITag extends IRecord {
  name: string
}

export interface IOptions {
  module: IOption[]
  action: IOption[]
}
