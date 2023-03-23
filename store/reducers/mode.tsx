import { Reducer } from 'redux'

export interface IActionMode {
  type: 'setDark' | 'setLight'
}

const initialMode = false

export const mode: Reducer<boolean, IActionMode> = (
  state = initialMode,
  action
) => {
  switch (action.type) {
    case 'setDark':
      return true
    case 'setLight':
      return false
    default:
      return state
  }
}
