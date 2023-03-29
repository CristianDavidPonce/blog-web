import { IPost } from '@/views/Posts/types'

import { IOption } from '@/types/types'

export const postUrl = 'posts'
export interface IPermission extends IPost {}

export interface IOptions {
  module: IOption[]
  action: IOption[]
}
