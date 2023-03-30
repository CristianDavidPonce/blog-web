import { IUser } from '@/views/Admin/Users/types'

import { IRecord } from '@/types/types'

export const commentsUrl = 'comments'
export interface IComment extends IRecord {
  description: string
  author: IUser
}
