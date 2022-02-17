import { camelCase } from 'lodash'

export const initialState = {}

export const reducer = (state = initialState, action = {}) => {
  if (!action.type.includes('/')) {
    return state
  }

  const [reducerKey, actionName] = action.type.split(['/'])

  if (reducerKey === 'request') {
    return state
  }

  let names = actionName.split('_')
  names = names.slice(0, names.length - 1)
  names = camelCase(names)

  let errors = null

  if (action.type.includes('ERROR')) {
    errors = JSON.stringify({
      status: action.payload?.response?.status,
      statusText: action.payload?.response?.statusText,
      ...action.payload?.response?.data,
    })
  }

  const nextState = {
    ...state,
    [reducerKey]: {
      ...state[reducerKey],
      [names]: errors,
    },
  }

  return nextState
}
