import { IComment } from '@/views/Home/Post/Comments/types'

import { IOption } from '@/types/types'

export const commentsUrl = 'comments'
export interface IPermission extends IComment {}

export interface IOptions {
  module: IOption[]
  action: IOption[]
}
