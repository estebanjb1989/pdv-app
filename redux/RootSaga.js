import { fork } from 'redux-saga/effects'
import { request } from './modules/request'

export default function* rootSaga() {
  yield fork(request)
}
