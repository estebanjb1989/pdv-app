import { InventoryTypes } from '../types'

export const initialState = {
  list: [],
}

export const reducer = (state = initialState, action = {}) => {
  let nextState = null

  switch (action.type) {
    case InventoryTypes.INVENTORY_ADD:
      nextState = {
        ...state,
        list: [...state.list, action.payload],
      }
      break

    default:
      nextState = state
  }

  return nextState
}