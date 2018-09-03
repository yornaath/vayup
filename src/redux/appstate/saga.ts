import { AppState } from 'react-native'
import { Amplitude, Font, Permissions } from 'expo'
import { channel } from 'redux-saga'
import { takeEvery, select, put, call } from 'redux-saga/effects'
import { setState, setAssetsLoaded } from './actions'
import { getAppState } from './reducer'
import * as settings from '../settings'

export const appStateChannel = channel()

AppState.addEventListener('change', (appState) => {
  appStateChannel.put(appState)
})

export function* saga() {
  yield call(init)
  yield takeEvery(appStateChannel, appStatechanged)
}

export function* init() {
  yield call(loadAssets)
  yield put(setAssetsLoaded(true))
  const hasNotificationPermission = yield call([Permissions, 'getAsync'], Permissions.NOTIFICATIONS)
  if(hasNotificationPermission.status !== "granted") {
    const permissionResponse = yield call([Permissions, 'askAsync'], Permissions.NOTIFICATIONS)
    if(permissionResponse.status == "granted") {
      yield put(settings.setRemindersOn(true))
    }
  }
}

function* appStatechanged(nextAppState:string) {
  const prevAppState = (yield select(getAppState)).appstate
  yield put(setState({ prevAppState, nextAppState }))
  yield call(Amplitude.logEventWithProperties, 'appStatechanged', { prevAppState, nextAppState })
}

function* loadAssets() {
  yield call(Font.loadAsync, {
    'main-bold':    require('../../../assets/fonts/Comfortaa-Bold.ttf'),
    'main-regular': require('../../../assets/fonts/Comfortaa-Regular.ttf'),
    'main-light':   require('../../../assets/fonts/Comfortaa-Light.ttf'),
  })
}
