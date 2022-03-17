import { WorkingDayTypes } from '../types'

export const initialState = {
  data: null,
}

export const reducer = (state = initialState, action = {}) => {
  let nextState = null

  switch (action.type) {
    case WorkingDayTypes.SET_WORKING_DAY:
      nextState = {
        ...state,
        data: action.payload,
      }
      break

    default:
      nextState = state
  }

  return nextState
}