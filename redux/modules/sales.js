import { SalesTypes } from '../types'

export const initialState = {
  list: [],
}

export const reducer = (state = initialState, action = {}) => {
  let nextState = null

  switch (action.type) {
    case SalesTypes.SET_SALES:
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