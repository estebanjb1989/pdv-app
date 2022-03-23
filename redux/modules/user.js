import { UserTypes } from '../types'

export const initialState = {
  list: [],
}

export const reducer = (state = initialState, action = {}) => {
  let nextState = null

  switch (action.type) {
    case UserTypes.SET_USERS:
      nextState = {
        ...state,
        list: action.payload,
      }
      break

    default:
      nextState = state
  }

  return nextState
}