
import { all } from 'redux-saga/effects'
import * as appstate from './appstate'
import * as settings from './settings'

export const saga = function* (){
  yield all([
    appstate.saga(),
    settings.saga()
  ])
}