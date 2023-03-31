import { IUser } from '@/views/Admin/Users/types'
import { IPost } from '@/views/Posts/types'

import { IRecord } from '@/types/types'

export const commentsUrl = 'comments'
export interface IComment extends IRecord {
  description: string
  author: IUser
  post: IPost
}
