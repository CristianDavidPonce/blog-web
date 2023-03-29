import { IOption, IRecord } from '@/types/types'
import { ITag } from '../Admin/Tags/types'

export const postsOwnUrl = 'posts/manage/own'
export interface IPost extends IRecord {
  title: string
  content: object
  tags: ITag[]
}

export interface IOptions {
  module: IOption[]
  action: IOption[]
}

export interface ICreatePost {
  title: string
  content: object
  tags: number[]
}
