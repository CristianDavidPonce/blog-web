import { IValidateToken } from '@/types/types'

export interface IAuthUser {
  isValidated: boolean
  token?: string
  user?: IValidateToken
}

const initialState: IAuthUser = {
  isValidated: false,
}

export interface IAuthUserAction {
  type: 'setUser' | 'resetAuth' | 'setToken'
  user?: IValidateToken
  token?: string
}
export const authUser = (
  state = initialState,
  { type, user, token }: IAuthUserAction
) => {
  switch (type) {
    case 'setUser':
      return {
        ...state,
        isValidated: true,
        user,
      }
    case 'resetAuth':
      return { ...initialState }
    case 'setToken':
      return {
        ...state,
        token,
      }
    default:
      return state
  }
}
