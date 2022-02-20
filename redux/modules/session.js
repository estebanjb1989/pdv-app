import { SessionTypes } from '../types'

export const initialState = {
  credentials: null,
}

export const reducer = (state = initialState, action = {}) => {
  let nextState = null

  switch (action.type) {
    case SessionTypes.SET_USER: {
      nextState = {
        ...state,
        credentials: action.payload,
      }
      break
    }
    default: {
      nextState = state
      break
    }

  }

  return nextState
}
