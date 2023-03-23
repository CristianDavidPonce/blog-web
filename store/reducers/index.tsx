import { combineReducers } from 'redux'
import { mode } from './mode'
import { IQueries, query } from './query'
import { authUser, IAuthUser } from './User/authUser'

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
