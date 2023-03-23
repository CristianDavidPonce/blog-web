import { Reducer } from 'redux'
import { omit } from 'lodash'
export interface IQueries {
  params?: {
    $limit?: number
    $page?: number
    $sort?: string
    $qFields?: string
    $qValues?: string
    $fields?: string
    exceptions?: string
  }
  filters?: {
    [key: string]: string | undefined
  }
  url?: string
}
const initialState: IQueries = {
  params: {
    $limit: 100,
    $page: 1,
    $sort: '',
  },
}

export interface IQueryAction {
  type: 'patch' | 'filter' | 'search' | 'reset'
  payload: IQueries
}
export const query: Reducer<IQueries, IQueryAction> = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case 'patch':
      return { ...state, ...payload }
    case 'filter':
      return {
        ...state,
        params: {
          ...state.params,
          $page: 1,
        },
        filters: payload.filters,
      }
    case 'search':
      if (
        payload.params?.$qValues === undefined ||
        payload.params?.$qValues === ''
      ) {
        return {
          ...state,
          params: { ...omit(state.params, ['$qFields', '$qValues']), $page: 1 },
        }
      }
      return {
        ...state,
        params: { ...state.params, ...payload.params, $page: 1 },
      }
    case 'reset':
      return payload
    default:
      return state
  }
}
