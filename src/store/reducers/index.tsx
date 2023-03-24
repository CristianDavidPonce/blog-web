import { combineReducers } from 'redux'

import { IAuthUser, authUser } from './User/authUser'
import { mode } from './mode'
import { IQueries, query } from './query'

export interface IRootState {
  mode: boolean
  authUser: IAuthUser
  query: IQueries
}

export default combineReducers<IRootState>({
  mode,
  authUser,
  query,
})
