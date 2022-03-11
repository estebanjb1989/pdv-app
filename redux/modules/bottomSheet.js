import { BottomSheetTypes } from '../types'

export const initialState = {
  open: false,
  route: null,
}

export const reducer = (state = initialState, action = {}) => {
  let nextState = null

  switch (action.type) {
    case BottomSheetTypes.NAVIGATE:
      nextState = {
        ...state,
        open: true,
        route: action.payload.route,
      }
      break

    case BottomSheetTypes.CLOSE:
      nextState = {
        ...state,
        open: false,
        route: null,
      }
      break

    default:
      nextState = state
  }

  return nextState
}

const open = (route) => (dispatch) =>
  dispatch({
    type: BottomSheetTypes.NAVIGATE,
    payload: {
      route,
    }
  })

const close = () => (dispatch) =>
  dispatch({
    type: BottomSheetTypes.CLOSE,
  })

export default {
  open,
  close,
}
