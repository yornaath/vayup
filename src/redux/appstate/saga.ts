import { AppState } from 'react-native'
import { Amplitude, Permissions } from 'expo'
import { channel } from 'redux-saga'
import { takeEvery, select, put, call } from 'redux-saga/effects'
import { setState } from './actions'
import { getAppState } from './reducer'

export const appStateChannel = channel()

AppState.addEventListener('change', (appState) => {
  appStateChannel.put(appState)
})

export function* saga() {
  yield call(init)
  yield takeEvery(appStateChannel, appStatechanged)
}

export function* init() {
  const hasNotificationPermission = yield call([Permissions, 'getAsync'], Permissions.NOTIFICATIONS)
  if(hasNotificationPermission.status !== "granted") {
    yield call([Permissions, 'askAsync'], Permissions.NOTIFICATIONS)
  }
}

function* appStatechanged(nextAppState:string) {
  const prevAppState = (yield select(getAppState)).appstate
  yield put(setState({ prevAppState, nextAppState }))
  yield call(Amplitude.logEventWithProperties, 'appStatechanged', { prevAppState, nextAppState })
}