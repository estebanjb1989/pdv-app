import { combineReducers } from 'redux'

import {
  reducer as errorReducer,
  initialState as errorInitialState,
} from './modules/error'

import {
  reducer as fetchingReducer,
  initialState as fetchingInitialState,
} from './modules/fetching'

import {
  reducer as sessionReducer,
  initialState as sessionInitialState,
} from './modules/session'

import {
  reducer as bottomSheetReducer,
  initialState as bottomSheetInitialState,
} from './modules/bottomSheet'

import {
  reducer as msgBoxReducer,
  initialState as msgBoxInitialState,
} from './modules/msgBox'

// modules
import {
  reducer as inventoryReducer,
  initialState as inventoryInitialState,
} from './modules/inventory'

import {
  reducer as salesReducer,
  initialState as salesInitialState,
} from './modules/sales'

import {
  reducer as cartReducer,
  initialState as cartInitialState,
} from './modules/cart'

const RootState = {
  error: errorInitialState,
  fetching: fetchingInitialState,
  session: sessionInitialState,
  bottomSheet: bottomSheetInitialState,
  msgBox: msgBoxInitialState,

  inventory: inventoryInitialState,
  sales: salesInitialState,
  cart: cartInitialState,
}

const RootReducer = combineReducers({
  error: errorReducer,
  fetching: fetchingReducer,
  session: sessionReducer,
  bottomSheet: bottomSheetReducer,
  msgBox: msgBoxReducer,

  inventory: inventoryReducer,
  sales: salesReducer,
  cart: cartReducer,
})

export { RootReducer, RootState }
