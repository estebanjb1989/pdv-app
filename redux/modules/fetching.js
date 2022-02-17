import { camelCase } from 'lodash'

export const initialState = {}

export const reducer = (state = initialState, action = {}) => {
  let fetching = null

  if (!action.type.includes('/')) {
    return state
  }

  const [reducerKey, actionName] = action.type.split(['/'])

  if (action.type.includes('START')) {
    fetching = true
  }

  if (action.type.includes('SUCCESS') || action.type.includes('ERROR')) {
    fetching = false
  }

  if (reducerKey === 'request' || fetching === null) {
    return state
  }

  let names = actionName.split('_')
  names = names.slice(0, names.length - 1)
  names = camelCase(names)

  const nextState = {
    ...state,
    [reducerKey]: {
      ...state[reducerKey],
      [names]: fetching,
    },
  }

  return nextState
}
