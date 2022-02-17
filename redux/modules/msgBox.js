import { MsgBoxTypes } from '../types'

export const initialState = {
  open: false,
  children: null,
  mode: null,
}

export const reducer = (state = initialState, action = {}) => {
  let nextState = null

  switch (action.type) {
    case MsgBoxTypes.TOGGLE:
      nextState = {
        ...state,
        open: !state.open,
        ...action,
      }
      break

    default:
      nextState = state
  }

  return nextState
}

const toggle = () => (dispatch) =>
  dispatch({
    type: MsgBoxTypes.TOGGLE,
  })

export default {
  toggle,
}
