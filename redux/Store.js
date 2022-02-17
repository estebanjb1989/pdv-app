/* global __DEV__ */
import { RootReducer } from './RootReducer'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import RootSaga from './RootSaga'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['session'],
}

const persistedReducer = persistReducer(persistConfig, RootReducer)
let store = null
const saga = createSagaMiddleware()

export const getStore = () => {
  if (!store) {
    const middleware = [thunk, saga]

    if (__DEV__) {
      middleware.push(
        createLogger({
          collapsed: true,
        })
      )
    }

    store = createStore(
      persistedReducer,
      {},
      applyMiddleware(...middleware)
    )
    saga.run(RootSaga)
  }

  return store
}

export const getPersistor = () => persistStore(store)