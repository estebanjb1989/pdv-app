import { BottomSheetTypes } from '../types'

export const initialState = {
  open: false,
  route: null,
}

export const reducer = (state = initialState, action = {}) => {
  let nextState = null

  switch (action.type) {
    case BottomSheetTypes.TOGGLE:
      nextState = {
        ...state,
        open: !state.open,
        ...(action.payload || {}),
      }
      break

    default:
      nextState = state
  }

  return nextState
}

const toggle = () => (dispatch) =>
  dispatch({
    type: BottomSheetTypes.TOGGLE,
  })

export default {
  toggle,
}
