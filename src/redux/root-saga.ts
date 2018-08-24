
import { all } from 'redux-saga/effects'
import * as appstate from './appstate'
import * as settings from './settings'
import * as navigation from './navigation'

export const saga = function* (){
  yield all([
    appstate.saga(),
    settings.saga(),
    navigation.saga()
  ])
}