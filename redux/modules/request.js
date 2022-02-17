import { takeEvery, call, put, select } from 'redux-saga/effects'
import axios from 'axios'
import settings from '../../settings'
import { RequestTypes, MsgBoxTypes, TokenTypes, AuthTypes } from '../types'
/*import Path from 'navigation/Path'
import { navigate } from 'navigation/Navigator'
import { Endpoints as AuthEndpoints } from 'redux/modules/auth'*/

axios.defaults.validateStatus = (status) => status >= 200 && status < 300
axios.defaults.timeout = 20000
axios.interceptors.request.use((req) => {
  try {
    if (!req.url) {
      return req
    }
    console.info(req.method, '>>', req.url)
  } catch (err) {
    console.error(err)
  }
  return req
})

function* apiCall(action, headers, useLocale = false) {
  const method = action.payload?.method || 'post'
  let response = null
  const url =
    action.payload?.urlAbsolute || `${settings.apiUrl}${action.payload?.url}`

  const currentLang = yield select(
    (state) => state.session.languageSelected?.slug
  )

  axios.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8'
  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.headers.common['Accept-Language'] = currentLang

  if (headers?.Authorization) {
    axios.defaults.headers.common['Authorization'] = headers.Authorization
  }

  if (action.payload?.isPublicEndpoint) {
    axios.defaults.headers.common['Authorization'] = null
  }

  if (method === 'get') {
    response = yield call(axios.request, {
      method: 'get',
      url,
      headers: {
        Authorization: headers?.Authorization,
      },
    })
  } else {
    response = yield call(
      axios[method],
      action.payload?.urlAbsolute || `${useLocale ? '/en' : ''}${url}`,
      action.payload?.params
    )
  }

  return response
}

function* handleError(action, error) {
  yield put({
    type: RequestTypes.ERROR,
    payload: {
      status: error.response?.status,
      error: error.response?.data || error.toString(),
    },
  })

  if (error.response.status === 500) {
    yield put({
      type: MsgBoxTypes.TOGGLE,
      mode: 'text',
      title: 'Unidos',
      children: 'An error occured, please try again later',
    })
  }

  if (error?.response?.data?.detail) {
    yield put({
      type: MsgBoxTypes.TOGGLE,
      mode: 'text',
      title: 'Error',
      children: error?.response?.data?.detail,
    })
  }

  if (error?.response?.data?.non_field_errors) {
    yield put({
      type: MsgBoxTypes.TOGGLE,
      mode: 'text',
      title: 'Error',
      children: error?.response?.data?.non_field_errors.join(','),
    })
  }

  if (
    error?.response?.data?.detail ===
    'Invalid token header. No credentials provided.'
  ) {
    yield put({
      type: MsgBoxTypes.TOGGLE,
      mode: 'text',
      title: 'Error',
      children:
        'In order to protect your information, we logged you out. Kindly sign in again.',
    })
  }

  if (action.payload?.onError) {
    action.payload.onError(error)
  }
}

export function* request() {
  let headers = {}

  yield takeEvery(RequestTypes.START, function* (action) {
    const tokenData = yield select((state) => state.session.tokenData)

    if (tokenData?.access_token) {
      headers = {
        Authorization: `Bearer ${tokenData.access_token}`,
      }
    }

    try {
      let response = null
      response = yield call(apiCall, action, headers)

      if (response?.data && typeof response.data === 'string') {
        // Got HTML response
        throw response.data
      }

      yield put({
        type: RequestTypes.SUCCESS,
        payload: response?.data || [],
      })

      if (action.payload.onSuccess) {
        action.payload.onSuccess(response.data)
      }
    } catch (error) {
      if (
        error?.response?.data?.detail ===
        'Invalid token header. No credentials provided.'
      ) {
        /*navigate(Path.Public.Root, {
          screen: Path.Public.Onboard.SignIn,
        })*/
        yield put({
          type: AuthTypes.LOGOUT_SUCCESS,
        })
      }

      if (
        error?.response?.data?.detail ===
          'Authentication credentials were not provided.' ||
        error.response?.data?.code === 'token_not_valid'
      ) {
        try {
          /*const refreshResponse = yield call(apiCall, {
            payload: {
              url: AuthEndpoints.Token,
              params: {
                grant_type: 'refresh_token',
                refresh_token: tokenData.refresh,
              },
              isPublicEndpoint: true,
            },
          })

          const { access } = refreshResponse.data

          yield put({
            type: TokenTypes.TOKEN_SUCCESS,
            payload: { ...tokenData, access },
          })

          headers = {
            Authorization: `Bearer ${access}`,
          }
          const response = yield call(apiCall, action, headers)
          yield put({
            type: RequestTypes.SUCCESS,
            payload: response.data,
          })
          if (action.payload.onSuccess) {
            action.payload.onSuccess(response.data)
          }*/
        } catch (retryError) {
          if (
            retryError.response?.data?.code === 'token_not_valid' ||
            retryError.response?.status === 500
          ) {
            /*navigate(Path.Public.Root, {
              screen: Path.Public.Onboard.SignIn,
            })*/
            yield put({
              type: AuthTypes.LOGOUT_SUCCESS,
            })
          }
          yield put({
            type: RequestTypes.ERROR,
            payload: {
              status: error.response?.status,
              error: error.response?.data || error.toString(),
            },
          })
        }
      } else {
        yield call(handleError, action, error)
      }
    }
  })
}
