import { OutputData } from '@editorjs/editorjs'

import { IOption, IRecord } from '@/types/types'
import { ITag } from '../Admin/Tags/types'
import { IUser } from '../Admin/Users/types'

export const postsOwnUrl = 'posts/manage/own'
export interface IPost extends IRecord {
  title: string
  content: OutputData['blocks']
  tags: ITag[]
  author: IUser
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
